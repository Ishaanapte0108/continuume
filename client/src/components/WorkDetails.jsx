import React, { useState } from 'react';
import { BSON } from "realm-web";
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const WorkDetails = ({ data, onChange }) => {
  const [workDetails, setWorkDetails] = useState(data.length > 0 ? data : [
    {
      _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
      jobTitle: '',
      organiztionName: '',
      organiztionAdd: '',
      organiztionPhone: '',
      startDate: '',
      endDate: '',
      jobCertificate: '',
    },
  ]);

  const handleAddWorkDetails = () => {
    setWorkDetails([
      ...workDetails,
      {
        _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
        jobTitle: '',
        organiztionName: '',
        organiztionAdd: '',
        organiztionPhone: '',
        startDate: '',
        endDate: '',
        jobCertificate: '',
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkDetails = [...workDetails];
    updatedWorkDetails[index] = { ...updatedWorkDetails[index], [name]: value };
    setWorkDetails(updatedWorkDetails);
    onChange(updatedWorkDetails);
  };

  const handleRemoveWorkDetails = (index) => {
    if (workDetails.length > 1) {
      const updatedWorkDetails = workDetails.filter((_, i) => i !== index);
      setWorkDetails(updatedWorkDetails);
      onChange(updatedWorkDetails);
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
      const updatedWorkDetails = [...workDetails];
      updatedWorkDetails[index].jobCertificate = downloadURL;
      setWorkDetails(updatedWorkDetails);
      onChange(updatedWorkDetails);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = (index) => {
    const updatedWorkDetails = [...workDetails];
    updatedWorkDetails[index].jobCertificate = '';
    setWorkDetails(updatedWorkDetails);
    onChange(updatedWorkDetails);
  };

  return (
    <div>
      <div className='text-xl font-medium pb-4 text-indigo-500'>Work Details</div>
      <form>
        {workDetails.map((workDetail, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job Title
                </label>
                <input
                  type='text'
                  name='jobTitle'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.jobTitle}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter job title'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Organiztion Name
                </label>
                <input
                  type='text'
                  name='organiztionName'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.organiztionName}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter organiztion name offering the job'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Organiztion Address
                </label>
                <input
                  type='text'
                  name='organiztionAdd'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.organiztionAdd}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter organiztion location or city'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Organiztion Phone or Contact
                </label>
                <input
                  type='text'
                  name='organiztionPhone'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.organiztionPhone}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter organization contact info'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job start date
                </label>
                <input
                  type='date'
                  name='startDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.startDate}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter exact job start date'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Job end date
                </label>
                <input
                  type='date'
                  name='endDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={workDetail.endDate}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter job end date'
                />
              </div>
              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Certification
                </label>
                {!workDetail.jobCertificate && (
                  <input
                    type='file'
                    accept='application/pdf,image/*'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-indigo-500
                    hover:file:bg-violet-100"
                    onChange={(e) => handleFileUpload(index, e.target.files[0])}
                  />
                )}
                {workDetail.jobCertificate && (
                  <div className='mt-2 flex items-center'>
                    <button
                      type='button'
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                      onClick={() => handleFileDelete(index)}
                    >
                      Delete File
                    </button>
                    <button
                      type='button'
                      className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                      onClick={() => window.open(workDetail.jobCertificate, '_blank', 'noopener,noreferrer')}
                    >
                      View File
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type='button'
                className="mt-2 text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleRemoveWorkDetails(index)}
              >
                Remove
              </button>

              {index === workDetails.length - 1 && (
                <button
                  type='button'
                  className="mt-2 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddWorkDetails}
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

export default WorkDetails;
