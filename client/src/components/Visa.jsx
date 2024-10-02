import React from 'react';

const Visa = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Visa Information</h2>
      <form>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='col-span-1'>
            <label className="block text-indigo-600 text-sm font-semibold mb-2">
              Have you ever been refused a visa?
            </label>
            <select
              name="visaRefuse"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
              value={data.visaRefuse}
              onChange={handleInputChange}
            >
              <option value="">Select Value</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {data.visaRefuse === "Yes" && (
            <div className='col-span-1 md:col-span-2'>
              <label className="block text-indigo-600 text-sm font-semibold mb-2">
                Visa refused for country
              </label>
              <input
                type='text'
                name='refusedFor'
                className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
                value={data.refusedFor}
                onChange={handleInputChange}
                placeholder='Enter the country you were refused visa for'
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Visa;
