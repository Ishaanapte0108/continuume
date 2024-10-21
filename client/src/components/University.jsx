import React, { useState, useEffect } from "react";
import Select from "react-select";
import debounce from 'lodash/debounce';
import { motion, AnimatePresence } from 'framer-motion';

export default function University({ data, onChange }) {
  const [step, setStep] = useState(1);
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
    setStep(step + 1);
  };

  const filteredOptions = options.filter(option => 
    !Object.values(university).includes(option.value)
  );

  const renderStep = () => {
    if (step <= 5) {
      return (
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-2">Select University {step}</h3>
          <Select
            options={filteredOptions}
            onInputChange={handleInputChange}
            onChange={(option) => handleSelectChange(`uniChoice${step}`, option)}
            isLoading={loading}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </motion.div>
      );
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">University Priority List</h3>
          <ol className="list-decimal list-inside space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <li key={i} className="bg-white p-3 rounded-lg shadow-md">
                {university[`uniChoice${i}`]}
              </li>
            ))}
          </ol>
        </motion.div>
      );
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">University Selection</h2>
      <form>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        {step <= 5 && (
          <div className="mt-4 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
              >
                Previous
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
