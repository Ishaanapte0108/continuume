import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Form from './pages/Form';
import Footer from './components/Footer';
import Services from './pages/Services';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import Console from './pages/Console';
import Resource from './pages/Resource';
import Events from './pages/Events';
import UserManagement from './pages/UserManagement';
import ResourceManagement from './pages/ResourceManagement';
import EventsManagement from './pages/EventsManagement';
import Announcement from './pages/Announcement';
import Messages from './pages/Messages';
import VerifyEmail from './pages/VerifyEmail';
import CheckEmail from './pages/CheckEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Tasks from './pages/Tasks';
import TaskManagement from './pages/TaskManagement';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <div className="flex-grow h-dvh">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/verify' element={<VerifyEmail />} />
            <Route path = '/email-verification-call-out' element={<CheckEmail/>}/>
            <Route path = '/forgot-password' element={<ForgotPassword/>}/>
            <Route path = '/reset-password' element={<ResetPassword/>}/>
            {/* PrivateRoute wrapper for protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path='/form' element={<Form />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/events' element={<Events />} />
              <Route path='/resource' element={<Resource />} />
              <Route path='/announcement' element={<Announcement />} />
              <Route path='/messages' element={<Messages />} />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route path='/console' element={<Console />} />
              <Route path='/manage-users' element={<UserManagement />} />
              <Route path='/manage-resources' element={<ResourceManagement />} />
              <Route path='/manage-tasks' element={<TaskManagement />} />
              <Route path='/manage-events' element={<EventsManagement />} />
            </Route>
          </Routes>
        </div>
        {/* <Footer className="" /> */}
      </BrowserRouter>
    </div>
  );
}
