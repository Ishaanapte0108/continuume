import React, { useState } from 'react';
import { BSON } from "realm-web";
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';

const Travel = ({ data, onChange }) => {
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
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Travel History</h2>
      <p className='text-sm text-gray-600 mb-4'>Enter your travel history for the last 5 years</p>
      <form>
        <AnimatePresence>
          {travels.map((travel, index) => (
            <motion.div
              key={travel._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="mb-4 p-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg"
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className="block text-indigo-600 text-sm font-semibold mb-2">Start Date</label>
                  <input
                    type='date'
                    name='startDate'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                    value={travel.startDate}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 text-sm font-semibold mb-2">End Date</label>
                  <input
                    type='date'
                    name='endDate'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                    value={travel.endDate}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 text-sm font-semibold mb-2">Country</label>
                  <input
                    type='text'
                    name='country'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                    value={travel.country}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder='Enter country visited'
                  />
                </div>
                <div>
                  <label className="block text-indigo-600 text-sm font-semibold mb-2">Reason</label>
                  <input
                    type='text'
                    name='reason'
                    className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                    value={travel.reason}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder='Enter reason for travel'
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type='button'
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300'
                  onClick={() => handleRemoveTravel(index)}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          type='button'
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300'
          onClick={handleAddTravel}
        >
          Add Travel
        </button>
      </form>
    </div>
  );
};

export default Travel;