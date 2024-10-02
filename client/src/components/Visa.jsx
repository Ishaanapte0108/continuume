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
    <div>
      <div className='text-xl font-medium pb-4 text-indigo-500'>Visa</div>
      
      <form>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  For any reasons have you ever been refused a visa
                </label>
                <select
                  name="visaRefuse"
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.visaRefuse}
                  onChange={handleInputChange}
                >
                  <option value="">Select Value</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {data.visaRefuse == "Yes" && (
                <>
                  <div className='col-span-2'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Visa refused for country
                    </label>
                    <input
                      type='text'
                      name='refusedFor'
                      className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.refusedFor}
                      onChange={handleInputChange}
                      placeholder='Enter the country you are refused visa'
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Country from which visa was applied and refused
                    </label>
                    <input
                      type='text'
                      name='refusingCountry'
                      className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.refusingCountry}
                      onChange={handleInputChange}
                      placeholder='Enter the country where you had the visa appointment'
                    />
                  </div>                                

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date of refusal
                    </label>
                    <input
                      type='date'
                      name='refusalDate'
                      className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.refusalDate}
                      onChange={handleInputChange}
                      placeholder='Enter your visa refusal date'
                    />
                  </div>

                  <div className='col-span-2'>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Reason
                    </label>
                    <textarea
                      name='refusalReason'
                      className="appearance-none border rounded-md w-full py-2 px-3 h-32 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={data.refusalReason}
                      onChange={handleInputChange}
                      placeholder='Enter reason for visa refusal'
                    />
                  </div>

                </>
              )} 
            </div>
      </form>
    </div>
  );
};

export default Visa;
