import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';

const CourseDetails = ({ data, onChange }) => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (name, value) => {
    onChange({
      ...data,
      [name]: value,
      ...(name === 'specificProgram' && value !== 'Other' ? { otherSpecificProgram: '' } : {}),
    });
    setSelectedOption(value);
  };

  const programOptions = [
    { label: "Bachelors", value: "Bachelors" },
    { label: "Masters", value: "Masters" },
  ];

  const specificProgramOptions = [
    { label: "BCA", value: "BCA" },
    { label: "BS", value: "BS" },
    { label: "MS", value: "MS" },
    { label: "MBA", value: "MBA" },
    { label: "BAMMC", value: "BAMMC" },
    { label: "MAEMA", value: "MAEMA" },
    { label: "Other", value: "Other" },
  ];

  const intakeOptions = [
    { label: "Fall", value: "Fall" },
    { label: "Spring", value: "Spring" },
  ];

  const countryOptions = [
    { label: "USA", value: "USA" },
    { label: "UK", value: "UK" },
    { label: "Canada", value: "Canada" },
    { label: "Australia", value: "Australia" },
  ];

  const renderStep = () => {
    const steps = [
      {
        title: "For which Program do you want to apply?",
        options: programOptions,
        name: 'program'
      },
      {
        title: "Which specific Program you want to apply?",
        options: specificProgramOptions,
        name: 'specificProgram'
      },
      {
        title: "For which intake?",
        options: intakeOptions,
        name: 'intake'
      },
      {
        title: "Country preference",
        options: countryOptions,
        name: 'countryPreference'
      }
    ];

    const currentStep = steps[step - 1];

    return (
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-2">{currentStep.title}</h3>
        <Select
          options={currentStep.options}
          value={currentStep.options.find(option => option.value === data[currentStep.name])}
          onChange={(selected) => handleInputChange(currentStep.name, selected.value)}
          placeholder={`Select ${currentStep.name}`}
        />
        {currentStep.name === 'specificProgram' && data.specificProgram === 'Other' && (
          <input
            type="text"
            className="mt-2 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Please specify the program"
            value={data.otherSpecificProgram || ''}
            onChange={(e) => handleInputChange('otherSpecificProgram', e.target.value)}
          />
        )}
      </motion.div>
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      setSelectedOption(null);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Course Details</h2>
      <form>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition duration-300"
            >
              Previous
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
              disabled={!selectedOption}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CourseDetails;
