import React, { useState } from 'react';
import { BSON } from "realm-web";
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const TravelHistory = ({ data, onChange }) => {
  const [travels, setTravels] = useState(data.length > 0 ? data : [
    {
      _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
      startDate: '',
      endDate: '',
      country: '',
      reason: '',
      fileUrl: ''
    }
  ]);

  const handleAddTravel = () => {
    setTravels([
      ...travels,
      {
        _id: BSON.ObjectID(BSON.ObjectID.generate()).toHexString(),
        startDate: '',
        endDate: '',
        country: '',
        reason: '',
        fileUrl: ''
      },
    ]);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTravels = [...travels];
    updatedTravels[index] = { ...updatedTravels[index], [name]: value };
    setTravels(updatedTravels);
    onChange(updatedTravels);
  };

  const handleRemoveTravel = (index) => {
    if (travels.length > 1) {
      const updatedTravels = travels.filter((_, i) => i !== index);
      setTravels(updatedTravels);
      onChange(updatedTravels);
    }
  };

  return (
    <div>
      <div className='text-xl font-medium text-indigo-500'>Travel History</div>
      <div className='pb-4 text-sm text-gray-300-500'> Enter your travel hisory of last 5 years</div>
      <form>
        {travels.map((travel, index) => (
          <div key={index} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Date
                </label>
                <input
                  type='date'
                  name='startDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={travel.startDate}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Date
                </label>
                <input
                  type='date'
                  name='endDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={travel.endDate}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country
                </label>
                <input
                  type='text'
                  name='country'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={travel.country}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Enter country'
                />
              </div>

              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Reason for Travel
                </label>
                <select
                  name='reason'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={travel.reason}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option value='' disabled>Select reason</option>
                  <option value='Holiday'>Holiday</option>
                  <option value='Medical'>Medical</option>
                  <option value='Study(More than 3 months)'>Study (More than 3 months)</option>
                  <option value='Student Exchange (Less than 3 months)'>Student Exchange (Less than 3 months)</option>
                </select>
              </div>

            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                type='button'
                className='mt-2 text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                onClick={() => handleRemoveTravel(index)}
              >
                Remove
              </button>

              {index === travels.length - 1 && (
                <button
                  type='button'
                  className='mt-2 text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  onClick={handleAddTravel}
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

export default TravelHistory;
