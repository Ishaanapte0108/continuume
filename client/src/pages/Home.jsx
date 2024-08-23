import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GoToForm from '../components/GoToForm';
import GoToResource from '../components/GoToResource'
import GoToEvents from '../components/GoToEvents';
import Footer from '../components/Footer';
import GoToTask from '../components/GoToTask';

const Home = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {currentUser ? (
          <div className='container px-5 py-6 mx-auto'>
            <div className='flex flex-wrap -m-4'>
              <GoToForm />
              <GoToResource/>
              <GoToEvents/>
              <GoToTask />
              {/* <GoToAnnouncement/> */}
            </div>
          </div>
        ) : (
          <section className="text-gray-700 body-font">
            <div className="container mx-auto flex px-5 py-6 md:flex-row flex-col items-center">
              <div className="lg:flex-grow md:w-1/2 lg:pr-12 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Your Gateway to Global Education
                </h1>
                <p className="mb-8 leading-relaxed">Welcome to your one-stop destination for study abroad. Create your profile, connect with experts, and access essential resources. Stay updated with the latest events from your preferred universities. Start your journey with us and make your dreams a reality.</p>
                <div className="flex justify-center">
                  <Link to='/sign-in' className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign In</Link>
                  <Link to='/sign-up' className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Sign Up</Link>
                </div>
              </div>
              
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img className="object-cover object-center rounded" alt="hero" src="/images/travelWorld.jpg" />
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
