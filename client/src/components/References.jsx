import React, { useState } from 'react';
import { BSON } from "realm-web";
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const References = ({ data, onChange }) => {
  const [references, setReferences] = useState(data.length > 0 ? data : [
    {
      _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
      referenceName: '',
      referencePosition: '',
      referenceTitle: '',
      referenceWorkEmail: '',
      referenceKnowDuration: '',
      referencePhone: '',
      referenceRelationship: '',
      referenceInstitution: '',
      referenceInstitutionAdd: '',
      fileUrl: ''
    }
  ]);

  const handleAddReference = () => {
    setReferences([
      ...references,
      {
        _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
        referenceName: '',
        referencePosition: '',
        referenceTitle: '',
        referenceWorkEmail: '',
        referenceKnowDuration: '',
        referencePhone: '',
        referenceRelationship: '',
        referenceInstitution: '',
        referenceInstitutionAdd: '',
        fileUrl: ''
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedReferences = [...references];
    updatedReferences[index] = { ...updatedReferences[index], [name]: value };
    setReferences(updatedReferences);
    onChange(updatedReferences);
  };

  const handleRemoveReference = (index) => {
    if (references.length > 1) {
      const updatedReferences = references.filter((_, i) => i !== index);
      setReferences(updatedReferences);
      onChange(updatedReferences);
    }
  };

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
          console.log(progress)
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

  const handleFileUpload = async (index, file) => {
    try {
      const downloadURL = await storeFile(file);
      const updatedReferences = [...references];
      updatedReferences[index].fileUrl = downloadURL;
      setReferences(updatedReferences);
      onChange(updatedReferences);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = (index) => {
    const updatedReferences = [...references];
    updatedReferences[index].fileUrl = ''; // Remove file URL
    setReferences(updatedReferences);
    onChange(updatedReferences);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">References</h2>
      <form>
        {references.map((reference, index) => (
          <div key={index} className="mb-4 p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <label className="block text-indigo-600 text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  type='text'
                  name='referenceName'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                  value={reference.referenceName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference name'
                />
              </div>
              <div className='col-span-1'>
                <label className="block text-indigo-600 text-sm font-semibold mb-2">
                  Position
                </label>
                <input
                  type='text'
                  name='referencePosition'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                  value={reference.referencePosition}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference position'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type='text'
                  name='referenceTitle'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceTitle}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference title'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Work Email
                </label>
                <input
                  type='email'
                  name='referenceWorkEmail'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceWorkEmail}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference work email'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Duration Known
                </label>
                <input
                  type='text'
                  name='referenceKnowDuration'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceKnowDuration}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter duration known'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone
                </label>
                <input
                  type='text'
                  name='referencePhone'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referencePhone}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter reference phone'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Relationship
                </label>
                <input
                  type='text'
                  name='referenceRelationship'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceRelationship}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter relationship'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Institution
                </label>
                <input
                  type='text'
                  name='referenceInstitution'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceInstitution}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter institution'
                />
              </div>

              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Institution Address
                </label>
                <input
                  type='text'
                  name='referenceInstitutionAdd'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={reference.referenceInstitutionAdd}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter institution address'
                />
              </div>

              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Document
                </label>
                {!reference.fileUrl && (
                  <input
                    type='file'
                    accept='application/pdf,image/*'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-indigo-500
                  hover:file:bg-violet-100"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleFileUpload(index, e.target.files[0]);
                      }
                    }}
                  />
                )}

                {reference.fileUrl && (
                  <div className='flex items-center justify-between'>
                    <span className='text-green-600'>File Uploaded</span>
                    <button
                      type='button'
                      className='text-red-600 hover:text-red-800 font-bold'
                      onClick={() => handleFileDelete(index)}
                    >
                      Delete File
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type='button'
                className='mt-2 text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                onClick={() => handleRemoveReference(index)}
              >
                Remove
              </button>
              {index === references.length - 1 && (
                <button
                  type='button'
                  className='mt-2 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  onClick={handleAddReference}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default References;