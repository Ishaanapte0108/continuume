import React from 'react'
import { clearUserToView } from '../redux/form/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function GoToTask() {
  
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

  const handleGoClick = () =>{
    
    if (currentUser.role === 'admin'){
      dispatch(clearUserToView())
    }
    navigate('/tasks');
  }

  return (
    <div className="p-4 md:w-1/3">
    <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" transform="rotate(90 12 12)"
        />
        </svg>
        </div>
        <h2 className="text-gray-900 text-lg title-font font-medium">Tasks</h2>
      </div>
      <div className="flex-grow">
        <p className="leading-relaxed text-base"> View your to-do list here: track your tasks and stay on top of your work!</p>
        <button className="mt-3 text-indigo-500 inline-flex items-center" onClick={()=>handleGoClick()}>Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
    </div>    
  );
}
