import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import PersonalDetails from '../components/PersonalDetails';
import CourseDetails from '../components/CourseDetails';
import University from '../components/University';
import References from '../components/References';
import WorkDetails from '../components/WorkDetails';
import Documents from '../components/Documents';
import Education from '../components/Education';
import Travel from '../components/Travel';
import Visa from '../components/Visa';
import { useSelector } from 'react-redux';
import { selectUserIdToView } from '../redux/form/formSlice';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import ButtonsSection from '../components/ButtonsSection';
import PostAdmission from './PostAdmission';

const Form = () => {
  
  const { currentUser } = useSelector((state) => state.user);
  const userIdToView = useSelector(selectUserIdToView);

  const [formData, setFormData] = useState({
    personal_details: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      countryOfBirth: '',
      nativeLanguage: '',
      nameAsPerPassport: '',
      passportIssueLocation: '',
      passportNumber: '',
      passportIssueDate: '',
      passportExpiryDate: '',
      addressP: '',
      postalCodeP: '',
      stateP: '',
      cityP: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactEmail: '',
      emergencyContactRelation: '',      
    },
    education: {
      school: '',
      schoolCountry: '',
      schoolAddress: '',
      schoolStartDate: '',
      schoolEndDate: '',
      schoolGrade: '',
      highSchool: '',
      highSchoolCountry: '',
      highSchoolAddress: '',
      highSchoolStartDate: '',
      highSchoolEndDate: '',
      highSchoolGrade: '',

      bachelorsInstitute: '',
      bachelorIn: '',
      bachelorsCountry: '',
      bachelorsAddress: '',
      bachelorsStartDate: '',
      bachelorsEndDate: '',
      bachelorsGrade: '',
      
      greTaken: '',
      greTotalScore: 0,
      greVerbalScore: 0,
      greQuantScore: 0, 
      greAWAScore:0,
      greTestDate: '',

      toeflTaken: '',
      toeflTotalScore: 0,
      toeflTestDate: '',

    },
    travel: {
      startDate: '',
      endDate: '',
      country: '',
      reason: '',
      fileUrl: '',
    },
    visa: {
      visaRefuse: '',
      refusedFor: '',
      refusingCountry: '',
      refusalDate: '',
      refusalReason: '',
    },
    references:[],
    workDetails: [],  
    documents:{
      resume: '',
      passport: '',
      tenthMS: '',
      twelfthMS: '',
      sop: '',
      personalHistory: '',
      bachelorsMarkSheets: []
    },
    courseDetails:{
      flyingAfter: '',
      interestedInCourses: []
    },
    university:{
    uniChoice1: '',
    uniChoice2: '',
    uniChoice3: '',    
    },
    postAdmission: {
      finalUniversity: '',
      intake: '',
      i20: '',
      visaCopy: '',
      sevisFee: '',
    }
  });
  
  const [formExists, setFormExists] = useState(false); 
  const [selectedForm, setSelectedForm] = useState('PersonalDetails');
  const [formDataModified, setFormDataModified] = useState(false); // Track if formData has been modified
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  
  useEffect(() => {
    
      fetchData();
    
  }, []);
  
  
  const fetchData = async () => {
    try {
      const userId = userIdToView !== null ? userIdToView : currentUser._id;
      
      const res = await fetch(`/api/form/read/${userId}`);
      const data = await res.json();
  
      if (!res.ok) {
        if (res.status != 404) {
          throw new Error(data.message || 'Failed to fetch form data');
        }
        
      }
      else{
        setFormData(data); // Populate form fields with retrieved data
        setFormExists(true); // Set formExists to true if form data exists
      }
  
    } catch (error) {
      console.error('Error fetching form data:', error.message);
    }
  };
  

  const handleFormDataChange = (section, data) => { 
    setFormData((prevFormData) => {
      
      if (section === 'references' || section === 'workDetails') {
        // Flatten the new data into an array format
        const flattenedData = Object.values(data);
        
        return {
          ...prevFormData,
          [section]: flattenedData,
        };
      }
  
      return {
        ...prevFormData,
        [section]: { ...prevFormData[section], ...data },
      };
    });
  
    setFormDataModified(true);
  };
  

  const saveFormData = async () => {
    try {
      const endpoint = formExists ? `/api/form/update/${currentUser._id}` : `/api/form/create/${currentUser._id}`;
      const method = formExists ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to save form data');
      }
      
      setFormDataModified(false); // Reset formDataModified after successful save
      await fetchData(); // Fetch the latest data after saving
      
    } catch (error) {
      console.error('Error saving form data:', error.message);
    }
  };

  const goToNextSection = () => {
    switch (selectedForm) {
      case 'PersonalDetails':
        setSelectedForm('Education');
        break;
      case 'Education':
        setSelectedForm('Travel');
        break;
      case 'Travel':
        setSelectedForm('Visa');
        break;
      case 'Visa':
        setSelectedForm('References');
        break;
      case 'References':
        setSelectedForm('WorkDetails');
        break;
      case 'WorkDetails':
        setSelectedForm('Documents');
        break;
      case 'Documents':
        setSelectedForm('CourseDetails');
        break;
      case 'CourseDetails':
        setSelectedForm('University');
        break;
      case 'University':
        setSelectedForm('PostAdmission');
        break;
      default:
        break;
    }
  };
  
  const goToPreviousSection = () => {
    switch (selectedForm) {
      case 'Education':
        setSelectedForm('PersonalDetails');
        break;
      case 'Travel':
        setSelectedForm('Education');
        break;
      case 'Visa':
        setSelectedForm('Travel');
        break;
      case 'References':
        setSelectedForm('Visa');
        break;
      case 'WorkDetails':
        setSelectedForm('References');
        break;
      case 'Documents':
        setSelectedForm('WorkDetails');
        break;
      case 'CourseDetails':
        setSelectedForm('Documents');
        break;
      case 'University':
        setSelectedForm('CourseDetails');
        break;
      case 'PostAdmission':
        setSelectedForm('University');
        break;
      default:
        break;
    }
  };
  

  const renderFormSection = () => {
    switch (selectedForm) {
      case 'PersonalDetails':
        return <PersonalDetails data={formData.personal_details} onChange={(data) => handleFormDataChange('personal_details', data)} />;
      case 'Education':
        return <Education data={formData.education} onChange={(data) => handleFormDataChange('education', data)} />;
      case 'Travel':
        return <Travel data={formData.travel} onChange={(data) => handleFormDataChange('travel', data)} />;
      case 'Visa':
        return <Visa data={formData.visa} onChange={(data) => handleFormDataChange('visa', data)} />;
      case 'References':
        return <References data = {formData.references} onChange = {(data) => handleFormDataChange('references', data)}/>
      case 'WorkDetails':
          return <WorkDetails data = {formData.workDetails} onChange = {(data) => handleFormDataChange('workDetails', data)}/>
      case 'Documents':
        return <Documents data={formData.documents} onChange={(data)=>handleFormDataChange('documents',data)}/>
      case 'CourseDetails':
          return <CourseDetails data={formData.courseDetails} onChange={(data)=>handleFormDataChange('courseDetails',data)}/>        
      case 'University':
          return <University data={formData.university} onChange={(data)=>handleFormDataChange('university',data)}/>          
      case 'PostAdmission':
          return <PostAdmission data={formData.postAdmission} onChange={(data)=>handleFormDataChange('postAdmission',data)}/>          
      default:
        return <div>Select a form from the sidebar.</div>;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Menu Button */}
      <div className="md:hidden bg-slate-100">
        <button
          className="w-full p-2 flex items-center justify-center space-x-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span>{isSidebarOpen ? 'Close Menu' : 'Open Menu'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
            <path d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div className="md:hidden bg-slate-100">
          <Sidebar isOpen={isSidebarOpen} onSelect={setSelectedForm} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 md:flex-row">
        {/* Sidebar for Desktop */}
        <div className="hidden md:block bg-slate-100">
          <Sidebar isOpen={isSidebarOpen} onSelect={setSelectedForm} />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col flex-1">
          <div className=" flex-1 p-4 overflow-auto max-h-screen">
            {renderFormSection()}
          </div>
          <ButtonsSection 
            selectedForm={selectedForm}
            goToPreviousSection={goToPreviousSection}
            goToNextSection={goToNextSection}
            formDataModified={formDataModified}
            userIdToView={userIdToView}
            saveFormData={saveFormData}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Form;