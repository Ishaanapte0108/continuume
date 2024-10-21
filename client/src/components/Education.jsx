import React, { useState } from 'react';

const Education = ({ data, onChange }) => {

  // const [greTestTaken, setGreTestTaken] = useState(false)
  // const [toeflTestTaken, setToeflTestTaken] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name] : value,
    });
  };

  // const handleGreTaken = () =>{
  //   setGreTestTaken(prevState => !prevState);
  // }

  // const handleToeflTaken = () =>{
  //   setToeflTestTaken(prevState => !prevState)
  // }

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Education</h2>
      <form>
        <div className="grid grid-cols-2 gap-4">
        
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              School
            </label>
            <input
              type='text'
              name='school'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.school}
              onChange={handleInputChange}
              placeholder='Enter your school name'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              School Country
            </label>
            <input
              type='text'
              name='schoolCountry'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.schoolCountry}
              onChange={handleInputChange}
              placeholder='Enter your school country'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              School Address
            </label>
            <input
              type='text'
              name='schoolAddress'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.schoolAddress}
              onChange={handleInputChange}
              placeholder='Enter your school address'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              School Start Date
            </label>
            <input
              type='text'
              name='schoolStartDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.schoolStartDate}
              onChange={handleInputChange}
              placeholder='Enter your school start date'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              School End Date
            </label>
            <input
              type='text'
              name='schoolEndDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.schoolEndDate}
              onChange={handleInputChange}
              placeholder='Enter your school end date'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              School Grade
            </label>
            <input
              type='text'
              name='schoolGrade'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.schoolGrade}
              onChange={handleInputChange}
              placeholder='Enter your school grade (in %)'
            />
          </div>

          <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            High School
          </label>
          <input
            type='text'
            name='highSchool'
            className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={data.highSchool}
            onChange={handleInputChange}
            placeholder='Enter your high school name'
          />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              High School Country
            </label>
            <input
              type='text'
              name='highSchoolCountry'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.highSchoolCountry}
              onChange={handleInputChange}
              placeholder='Enter your high school country'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              High School Address
            </label>
            <input
              type='text'
              name='highSchoolAddress'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.highSchoolAddress}
              onChange={handleInputChange}
              placeholder='Enter your high school address'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              High School Start Date
            </label>
            <input
              type='text'
              name='highSchoolStartDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.highSchoolStartDate}
              onChange={handleInputChange}
              placeholder='Enter your high school start date'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              High School End Date
            </label>
            <input
              type='text'
              name='highSchoolEndDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.highSchoolEndDate}
              onChange={handleInputChange}
              placeholder='Enter your high school end date'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              High School Grade
            </label>
            <input
              type='text'
              name='highSchoolGrade'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.highSchoolGrade}
              onChange={handleInputChange}
              placeholder='Enter your high school grade (in %)'
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors In
            </label>
            <input
              type='text'
              name='bachelorIn'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorIn}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors From Institute 
            </label>
            <input
              type='text'
              name='bachelorsInstitute'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorsInstitute}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree granting institute or univeristy'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors Country
            </label>
            <input
              type='text'
              name='bachelorsCountry'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorsCountry}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree country'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors Address
            </label>
            <input
              type='text'
              name='bachelorsAddress'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorsAddress}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree address'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors Start Date
            </label>
            <input
              type='text'
              name='bachelorsStartDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorsStartDate}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree start date'
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors End Date
            </label>
            <input
              type='text'
              name='bachelorsEndDate'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorsEndDate}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree end date'
            />
          </div>

          <div className='col-span-2'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Bachelors Grade
            </label>
            <input
              type='text'
              name='bachelorsGrade'
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.bachelorsGrade}
              onChange={handleInputChange}
              placeholder='Enter your bachelor’s degree grade'
            />
          </div>

          <div className='col-span-1'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            GRE Taken
            </label>
            <select
              name="greTaken"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.greTaken}
              onChange={handleInputChange}
            >
              <option value="">Select Value</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>         

          <div className='col-span-1'>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Toefl Taken
            </label>
            <select
              name="toeflTaken"
              className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data.toeflTaken}
              onChange={handleInputChange}
            >
              <option value="">Select Value</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>          


    
           {data.greTaken == "Yes" && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  GRE Total Score
                </label>
                <input
                  type='number'
                  name='greTotalScore'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.greTotalScore}
                  onChange={handleInputChange}
                  placeholder='Enter your GRE total score'
                />
              </div>

             <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  GRE Verbal Score
                </label>
                <input
                  type='number'
                  name='greVerbalScore'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.greVerbalScore}
                  onChange={handleInputChange}
                  placeholder='Enter your GRE verbal score'
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  GRE Quantitative Score
                </label>
                <input
                  type='number'
                  name='greQuantScore'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.greQuantScore}
                  onChange={handleInputChange}
                  placeholder='Enter your GRE quantitative score'
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  GRE AWA Score
                </label>
                <select
                  name="greAWAScore"
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.greAWAScore}
                  onChange={handleInputChange}
                >
                  <option value="">Select GRE AWA Score</option>
                  <option value={0}>0</option>
                  <option value={0.5}>0.5</option>
                  <option value={1}>1</option>
                  <option value={1.5}>1.5</option>
                  <option value={2}>2</option>
                  <option value={2.5}>2.5</option>
                  <option value={3}>3</option>
                  <option value={3.5}>3.5</option>
                  <option value={4}>4</option>
                  <option value={4.5}>4.5</option>
                  <option value={5}>5</option>
                  <option value={5.5}>5.5</option>
                  <option value={6}>6</option>
                </select>
              </div>

              <div className='col-span-2'>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  GRE Test Date
                </label>
                <input
                  type='date'
                  name='greTestDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.greTestDate}
                  onChange={handleInputChange}
                  placeholder='Enter your GRE test date'
                />
              </div> 

            </>
          )} 

          {data.toeflTaken == "Yes" && (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  TOEFL Total Score
                </label>
                <input
                  type='number'
                  name='toeflTotalScore'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.toeflTotalScore}
                  onChange={handleInputChange}
                  placeholder='Enter your TOEFL total score'
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  TOEFL Test Date
                </label>
                <input
                  type='date'
                  name='toeflTestDate'
                  className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={data.toeflTestDate}
                  onChange={handleInputChange}
                  placeholder='Enter your toefl test date'
                />
              </div> 

            </>
          )} 


        </div>        
      </form>
    </div>
  );
};

export default Education;