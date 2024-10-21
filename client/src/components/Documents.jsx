import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState, useEffect } from 'react';
import { app } from '../firebase';
import { FaTrash, FaPlus, FaFilePdf, FaEye } from 'react-icons/fa';

const Documents = ({ data, onChange }) => {
  const [documents, setDocuments] = useState(data || {
    resume: '',
    passport: '',
    tenthMS: '',
    twelfthMS: '',
    sop: '',
    personalHistory: '',
    bachelorsMarkSheets: [],
    ieltsOrToefl: '',
    greScoreCard: '',
    satScoreCard: '',
    financialDocument: '',
  });
  const [uploading, setUploading] = useState({});
  const [pdfPreviews, setPdfPreviews] = useState({});

  useEffect(() => {
    // Generate previews for existing PDFs
    documents.bachelorsMarkSheets.forEach((url, index) => {
      generatePdfPreview(url, index);
    });
  }, [documents.bachelorsMarkSheets]);

  const storeFile = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleFileUpload = async (event, key) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploading((prev) => ({ ...prev, [key]: true }));

    try {
      const downloadURL = await storeFile(file);
      const updatedDocuments = { ...documents, [key]: downloadURL };
      setDocuments(updatedDocuments);
      onChange(updatedDocuments);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleMultipleFileUpload = async (event, key) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    
    setUploading(prev => ({ ...prev, [key]: true }));

    try {
      const uploadPromises = files.map(file => storeFile(file));
      const downloadURLs = await Promise.all(uploadPromises);
      const updatedDocuments = {
        ...documents,
        [key]: [...(documents[key] || []), ...downloadURLs]
      };
      setDocuments(updatedDocuments);
      onChange(updatedDocuments);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleFileDelete = (key) => {
    const updatedDocuments = { ...documents, [key]: '' };
    setDocuments(updatedDocuments);
    onChange(updatedDocuments);
  };

  const handleMultipleFileDelete = (key, url) => {
    const updatedDocuments = {
      ...documents,
      [key]: documents[key].filter((fileUrl) => fileUrl !== url)
    };
    setDocuments(updatedDocuments);
    onChange(updatedDocuments);
  };

  const namesToDisplay = {
    resume: 'Resume',
    passport: 'Passport',
    tenthMS: '10th Mark Sheet',
    twelfthMS: '12th Mark Sheet',
    sop: 'Statement of Purpose',
    personalHistory: 'Personal History',
    bachelorsMarkSheets: 'Bachelors Mark Sheets',
    ieltsOrToefl: 'IELTS/TOEFL Score Card',
    greScoreCard: 'GRE Score Card',
    satScoreCard: 'SAT Score Card',
    financialDocument: 'Financial Document'
  };

  const generatePdfPreview = async (url, index) => {
    try {
      const storage = getStorage(app);
      const fileRef = ref(storage, url);
      const signedUrl = await getDownloadURL(fileRef);
      
      // Use no-cors mode to fetch the PDF
      const response = await fetch(signedUrl, { mode: 'no-cors' });
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      
      setPdfPreviews(prev => ({ ...prev, [index]: objectUrl }));
    } catch (error) {
      console.error('Error generating PDF preview:', error);
    }
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse flex flex-col items-center justify-center w-full h-48 bg-gray-300 rounded-lg">
      <div className="w-20 h-20 bg-gray-400 rounded-full mb-4"></div>
      <div className="h-2 bg-gray-400 rounded w-1/2 mb-2"></div>
      <div className="h-2 bg-gray-400 rounded w-1/3"></div>
    </div>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Documents</h2>
      
      <div className='flex flex-col space-y-4'>
        {['resume', 'passport', 'tenthMS', 'twelfthMS', 'sop', 'personalHistory', 'ieltsOrToefl', 'greScoreCard', 'satScoreCard', 'financialDocument'].map((docKey) => (
          <div className="relative z-0 w-full mb-5 group" key={docKey}>
            <div className='pb-2 font-semibold text-gray-700'>{
              namesToDisplay[docKey]
            }</div>
            {documents[docKey] ? (
              <div>
                <div className='py-3'>
                  <button
                    type='button'
                    onClick={() => handleFileDelete(docKey)}
                    className="bg-red-500 text-white rounded hover:shadow-lg p-3 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    onClick={() => window.open(documents[docKey], '_blank', 'noopener,noreferrer')}
                    className="bg-gray-500 text-white rounded hover:shadow-lg p-3"
                  >
                    View {docKey}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-full file:border-0
                             file:text-sm file:font-semibold
                             file:bg-violet-50 file:text-indigo-500
                             hover:file:bg-violet-100"
                  accept="application/pdf"
                  onChange={(event) => handleFileUpload(event, docKey)}
                  disabled={uploading[docKey]}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Bachelor's Mark Sheets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {documents.bachelorsMarkSheets.map((url, index) => (
            <div key={index} className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMultipleFileDelete('bachelorsMarkSheets', url);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              >
                <FaTrash size={14} />
              </button>
              <div className="w-full h-48 flex flex-col items-center justify-center">
                <FaFilePdf size={60} className="text-red-500 mb-2" />
                <button
                  onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-full flex items-center"
                >
                  <FaEye className="mr-1" /> View PDF
                </button>
              </div>
              <div className="p-4 bg-white bg-opacity-30">
                <p className="text-sm font-medium text-indigo-900">Mark Sheet {index + 1}</p>
              </div>
            </div>
          ))}
          
          {/* Add new mark sheet card */}
          <label className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden cursor-pointer group">
            <input
              type="file"
              className="hidden"
              accept="application/pdf"
              onChange={(event) => handleMultipleFileUpload(event, 'bachelorsMarkSheets')}
              disabled={uploading['bachelorsMarkSheets']}
            />
            <div className="w-full h-48 flex items-center justify-center">
              {uploading['bachelorsMarkSheets'] ? (
                <SkeletonLoader />
              ) : (
                <FaPlus size={40} className="text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
              )}
            </div>
            <div className="p-4 bg-white bg-opacity-30">
              <p className="text-sm font-medium text-indigo-900">
                {uploading['bachelorsMarkSheets'] ? 'Uploading...' : 'Add Mark Sheet'}
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Documents;