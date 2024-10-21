import React, { useState } from 'react';
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
// import { app } from '../firebase';

const PersonalDetails = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Personal Details</h2>
      <form>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              First Name
            </label>
            <input
              type='text'
              name='firstName'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.firstName}
              onChange={handleInputChange}
              placeholder='Enter your first name'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              type='text'
              name='lastName'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.lastName}
              onChange={handleInputChange}
              placeholder='Enter your last name'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type='text'
              name='email'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.email}
              onChange={handleInputChange}
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Phone Number
            </label>
            <input
              type='text'
              name='phoneNumber'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.phoneNumber}
              onChange={handleInputChange}
              placeholder='Enter your contact'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type='date'
              name='dateOfBirth'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Gender
            </label>
            <select
              name="gender"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Nationality
            </label>
            <input
              type='text'
              name='nationality'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.nationality}
              onChange={handleInputChange}
              placeholder='Enter your nationality'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Country of Birth
            </label>
            <input
              type='text'
              name='countryOfBirth'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.countryOfBirth}
              onChange={handleInputChange}
              placeholder='Enter your birth country'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Native Language
            </label>
            <input
              type='text'
              name='nativeLanguage'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.nativeLanguage}
              onChange={handleInputChange}
              placeholder='Enter your native language'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Passport Number
            </label>
            <input
              type='text'
              name='passportNumber'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.passportNumber}
              onChange={handleInputChange}
              placeholder='Enter your passport Number'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Name as per passport
            </label>
            <input
              type='text'
              name='nameAsPerPassport'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.nameAsPerPassport}
              onChange={handleInputChange}
              placeholder='Enter your name as per passport'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Passport issue location
            </label>
            <input
              type='text'
              name='passportIssueLocation'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.passportIssueLocation}
              onChange={handleInputChange}
              placeholder='Enter your passport issue location'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Passport Issue Date
            </label>
            <input
              type='date'
              name='passportIssueDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.passportIssueDate}
              onChange={handleInputChange}
              placeholder='Enter your passport issue date'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Passport expiry date
            </label>
            <input
              type='date'
              name='passportExpiryDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.passportExpiryDate}
              onChange={handleInputChange}
              placeholder='Enter your passport expiry date'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Address
            </label>
            <input
              type='text'
              name='addressP'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.addressP}
              onChange={handleInputChange}
              placeholder='Enter your street name'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Postal Code
            </label>
            <input
              type='text'
              name='postalCodeP'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.postalCodeP}
              onChange={handleInputChange}
              placeholder='Enter your zip code'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              State
            </label>
            <input
              type='text'
              name='stateP'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.stateP}
              onChange={handleInputChange}
              placeholder='Enter your state'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              City
            </label>
            <input
              type='text'
              name='cityP'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.cityP}
              onChange={handleInputChange}
              placeholder='Enter your city'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Emergency contact name
            </label>
            <input
              type='text'
              name='emergencyContactName'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.emergencyContactName}
              onChange={handleInputChange}
              placeholder='Enter emergencey contact name'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Emergency contact number
            </label>
            <input
              type='text'
              name='emergencyContactNumber'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.emergencyContactNumber}
              onChange={handleInputChange}
              placeholder='Enter your emergency contact number'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Emergency contact email
            </label>
            <input
              type='text'
              name='emergencyContactEmail'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.emergencyContactEmail}
              onChange={handleInputChange}
              placeholder='Enter your emergency contact email'
            />
          </div>
          <div>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Emergency contact relation
            </label>
            <input
              type='text'
              name='emergencyContactRelation'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.emergencyContactRelation}
              onChange={handleInputChange}
              placeholder='Enter your emergency contact relation'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;