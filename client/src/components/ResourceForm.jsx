import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../firebase';  // Adjust the import according to your firebase config file path

const ResourceForm = ({onUploadSuccess, selectedUser}) => {
  
  const [resourceName, setResourceName] = useState('');
  const [resourceSize, setResourceSize] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(resourceName);
    setResourceSize(`${(file.size / 1e6).toFixed(2)} MB`);
    setResourceType("pdf");

    try {
      setIsUploading(true);
      const storage = getStorage(app);
      const fileStorageName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileStorageName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileUrl(downloadURL);
            setIsUploading(false);
          });
        }
      );
    } catch (err) {
      console.error('File upload error', err);
      setIsUploading(false);
    }
  };

  const handleFileDelete = () => {
    setFileUrl('');
    setFileName('');
    setResourceSize('');
    setResourceType('');
  };

  const handleResourceUploaded = () => {
    
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      const response = await fetch('/api/resource/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'resourceUserId': selectedUser._id,
          'resourceName': resourceName,
          'resourceDescription': resourceDescription,
          'resourceSize': resourceSize,
          'resourceType': resourceType,
          'resourceType': resourceType,
          'uploadedBy':"admin",
          'url': fileUrl
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      if (data)
        {onUploadSuccess()}
      else
        {throw new Error('Data was not ok');}

      setIsUploading(false);
      setResourceName('');
      setResourceDescription('');
      setResourceSize('');
      setResourceType('');
      setFileUrl('');
      setFileName('');
  
      
    } catch (error) {
      console.error('Error uploading resource:', error);
      setIsUploading(false);
    }
  };  

  return (
    <div className="mx-auto max-w-screen-lg pb-4">
      <form className="w-full mx-auto rounded-lg border p-4" onSubmit={handleFormSubmit}>
        {/* <h2 className="font-semibold text-gray-800 mb-3 text-center">Upload Resource</h2> */}
        <div className="relative z-0 w-full mb-5 group">
          
          <input type="text" value={resourceName} onChange={(e) => setResourceName(e.target.value)} name="resName" id="resNameGiven" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resource Name</label>

        </div>
        
        <div className="relative z-0 w-full mb-5 group">
          <textarea value={resourceDescription} onChange={(e) => setResourceDescription(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
          
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Resource Description</label>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          {
            fileUrl ? (
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-4">
                  <button type='button' onClick={handleFileDelete} className={`p-3 text-red-700 border border-red-700 rounded uppercase hover:shadow-lg ${isUploading ? 'disabled:opacity-80 cursor-not-allowed' : ''}`} disabled={isUploading}>
                    {isUploading ? 'Uploading...' : 'Delete File'}
                  </button>
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="p-3 text-blue-700 border border-blue-700 rounded uppercase hover:shadow-lg">View File</a>
                </div>
                <p className="mt-2 text-sm text-gray-700">{fileName}</p>
              </div>
            ) : (
              <div className="flex gap-4">
                <input onChange={handleFileUpload} disabled={isUploading} className='p-3 border border-gray-300 rounded w-full' type="file" id='fileUpload' accept='.pdf' />
              </div>
            )
          }
        </div>

        {fileUrl && (
          <div className="grid md:grid-cols-2 md:gap-6 mt-4">
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={resourceSize} readOnly className="block py-2.5 px-0 w-full text-sm dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-400" placeholder=" " />
              <label htmlFor="floating_size" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Size</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="text" value={resourceType} readOnly className="block py-2.5 px-0 w-full text-sm dark:text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-400" placeholder=" " />
              <label htmlFor="floating_type" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type</label>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-green-900 bg-green-200 hover:bg-green-300 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-200 dark:hover:bg-green-300 dark:focus:ring-green-300 mt-4 font-semibold"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
