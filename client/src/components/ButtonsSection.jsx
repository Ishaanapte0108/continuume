import React from 'react';

const ButtonsSection = ({ selectedForm, goToPreviousSection, goToNextSection, formDataModified, userIdToView, saveFormData }) => {
  return (
    <div className="h-16 md:h-auto p-4 flex justify-between">
      <div>
        <button
          className={`px-4 py-2 rounded ml-3 ${selectedForm !== 'PersonalDetails' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={goToPreviousSection}
        >
          Back
        </button>
        
        <button
          className={`px-4 py-2 rounded ml-3 ${selectedForm !== 'PostAdmission' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={goToNextSection}
        >
          Next
        </button>
      </div>
      
      <button
        className={`px-4 py-2 rounded mr-3 ${formDataModified && userIdToView === null ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        onClick={saveFormData}
        disabled={!formDataModified && !userIdToView === null}
      >
        <div>Save</div> 
      </button>
    </div>
  );
};

export default ButtonsSection;
