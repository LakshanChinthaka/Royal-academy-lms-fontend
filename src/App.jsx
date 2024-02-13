import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar/NavBar';
import Footer from './Components/Footer/Footer';
import HomePage from './Components/HomePage/HomePage';
import Program from './Components/Programs/Programs';
import CourseInfo from './Components/CourseInfo/CourseInfo';
import Text from './Components/text/Text';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import SignInPage from '../src/page/SignInPage/SignInPage';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import StudentTable from './Components/AdminDashboard/StudentsTable/StudentTable';
import Assigment from './Components/AdminDashboard/Assignment/Assigment';
import Registration from './Components/AdminDashboard/Registration/Registration';
import Inbox from './Components/AdminDashboard/Inbox';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import School from './Components/AdminDashboard/School/School';
import SchoolCreate from './Components/AdminDashboard/School/SchoolCreate';
import SchoolUpdate from './Components/AdminDashboard/School/SchoolUpdate';
import Course from './Components/AdminDashboard/Course/Course';
import { TokenProvider } from './Components/Context/TokenProvider';



function App() {

  //get user role from local storage
  const [userRole, setUserRole] = useState(null);

  const getUserRole = () => {
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);
 
  }

  useEffect(()=>{
    getUserRole();
  },[]);

  console.log("User role in app.jsx- ", userRole)

  return (
    <>
   <TokenProvider>
        <BrowserRouter>
          <NavBar   userRole={userRole}/>
          <Routes>
            <Route path="/" element={<HomePage logout />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/program" element={<Program />} />
            <Route path="/course" element={<CourseInfo />} />
            <Route path="/text" element={<Text />} />

            {userRole === "ROLE_ADMIN" && (
              <>
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path="/admin/assignments" element={<AdminDashboard><Assigment /></AdminDashboard>} />
                <Route path="/admin/registration" element={<AdminDashboard><Registration /></AdminDashboard>} />
                <Route path="/admin/students" element={<AdminDashboard><StudentTable /></AdminDashboard>} />
                <Route path="/admin/inbox" element={<AdminDashboard><Inbox /></AdminDashboard>} />
                <Route path="/admin/profile" element={<AdminDashboard><ProfilePage /></AdminDashboard>} />
                <Route path="/admin/school" element={<AdminDashboard><School /></AdminDashboard>} />
                <Route path="/admin/school/add" element={<AdminDashboard><SchoolCreate /></AdminDashboard>} />
                <Route path="/admin/school/update/:id/:code" element={<AdminDashboard><SchoolUpdate /></AdminDashboard>} />
                <Route path="/admin/course/" element={<AdminDashboard><Course /></AdminDashboard>} />
              </>
             )}

            {userRole === "ROLE_USER" && ( 
              <>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
              </>
            )}
          </Routes>
          <Footer />
        </BrowserRouter>

        </TokenProvider>
    </>
  );
}

export default App; // Only one default export
