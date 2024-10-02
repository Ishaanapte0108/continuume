  import React, { useState, useEffect } from "react";
import Select from "react-select";
import debounce from 'lodash/debounce';

export default function University({ data, onChange }) {
  const [university, setUniversity] = useState(data);
  const [options, setOptions] = useState([
    { label: "University of Southern California", value: "University of Southern California" },
    { label: "Johns Hopkins University", value: "Johns Hopkins University" },
    { label: "University of Pennsylvania", value: "University of Pennsylvania" },
    { label: "University of Michigan", value: "University of Michigan" },
    { label: "The University of Texas at Austin", value: "The University of Texas at Austin" }
  ]);
  const [loading, setLoading] = useState(false);

  const fetchUniversities = async (query) => {
    if (query && query.length > 1) {
      setLoading(true);
      try {
        const response = await fetch(`api/universities/search?query=${query}`);
        const universities = await response.json();
        const formattedOptions = universities.map(university => ({
          label: university.name,
          value: university.name,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setOptions([
        { label: "University of Southern California", value: "University of Southern California" },
        { label: "Johns Hopkins University", value: "Johns Hopkins University" },
        { label: "University of Pennsylvania", value: "University of Pennsylvania" },
        { label: "University of Michigan", value: "University of Michigan" },
        { label: "The University of Texas at Austin", value: "The University of Texas at Austin" }
      ]);
    }
  };
  
  const handleMultiSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    const updatedUniversity = {
      ...university,
      otherInterestedUnis: selectedValues,
    };
    setUniversity(updatedUniversity);
    onChange(updatedUniversity);
  };

  const handleTypeChange = debounce((query) => {
    fetchUniversities(query);
  }, 300);

  const handleInputChange = (input) => {
    handleTypeChange(input);
  };

  const handleSelectChange = (field, selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : '';
    const updatedUniversity = {
      ...university,
      [field]: newValue,
    };
    setUniversity(updatedUniversity);
    onChange(updatedUniversity);
  };

  const getInitialSelectValue = (field) => {
    return {
      label: university[field] || '',
      value: university[field] || '',
    };
  };
  return (
    <div className=""> 
      <div className='text-2xl font-semibold pb-6 text-indigo-600'>University Selection</div> 
      <form className="space-y-6"> 
        <div className="form-group"> 
          <label htmlFor="uniChoice1" className="block text-gray-700 font-medium mb-2">University Choice 1</label> 
          <Select 
            name='uniChoice1' 
            options={options} 
            onInputChange={handleInputChange} 
            onChange={(option) => handleSelectChange('uniChoice1', option)}
            value={options.find(option => option.value === university.uniChoice1) || getInitialSelectValue('uniChoice1')}
            isLoading={loading}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div> 
        
        <div className="form-group"> 
          <label htmlFor="uniChoice2" className="block text-gray-700 font-medium mb-2">University Choice 2</label> 
          <Select 
            name='uniChoice2' 
            options={options} 
            onInputChange={handleInputChange} 
            onChange={(option) => handleSelectChange('uniChoice2', option)}
            value={options.find(option => option.value === university.uniChoice2) || getInitialSelectValue('uniChoice2')}
            isLoading={loading}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div> 
        
        <div className="form-group"> 
          <label htmlFor="uniChoice3" className="block text-gray-700 font-medium mb-2">University Choice 3</label> 
          <Select 
            name='uniChoice3' 
            options={options} 
            onInputChange={handleInputChange} 
            onChange={(option) => handleSelectChange('uniChoice3', option)}
            value={options.find(option => option.value === university.uniChoice3) || getInitialSelectValue('uniChoice3')}
            isLoading={loading}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div> 
      </form> 
    </div> 
  );
}
