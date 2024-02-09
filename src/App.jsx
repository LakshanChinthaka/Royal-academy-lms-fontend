import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import NavBar from "./Components/Navbar/NavBar";
import Footer from "./Components/Footer/Footer";
import Program from "./Components/Programs/Programs";
import CourseInfo from "./Components/CourseInfo/CourseInfo";
import StudentDashboard from "./Components/StudentDashboard/StudentDashboard";
import StudentTable from "./Components/AdminDashboard/StudentsTable/StudentTable";
import Assigment from "./Components/AdminDashboard/Assignment/Assigment";
import Registration from "./Components/AdminDashboard/Registration/Registration";
import SignInPage from "./Components/SignInPage/SignInPage";
import Text from "./Components/text/Text";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import Inbox from "./Components/AdminDashboard/Inbox";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import School from "./Components/AdminDashboard/School/School";
import SchoolCreate from "./Components/AdminDashboard/School/SchoolCreate";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isAuthenticated = userData && userData.enabled;
    const userRole = userData ? userData.authorities[0].authority : null;

    // Update state variables
    setIsAuthenticated(isAuthenticated);
    setUserRole(userRole);

    // Log information
    console.log('Is Authenticated:', isAuthenticated);
    console.log('User Role:', userRole);
    // return userRole;
  },[])


  return (
    <>
      <BrowserRouter>
        <NavBar userRole={userRole} />
        <Routes>
          <Route path="/" element={<HomePage logout/>}/>
          <Route path="/login" element={<SignInPage />} />
          <Route path="/program" element={<Program />} />
          <Route path="/course" element={<CourseInfo/>} /> 
          <Route path="/text" element={<Text />} />

           <>
            {userRole === "ROLE_ADMIN" && (
              <>
                <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
                <Route path="/admin/assignments" element={<AdminDashboard><Assigment /></AdminDashboard>} />
                <Route path="/admin/registration" element={<AdminDashboard><Registration/></AdminDashboard>} />
                <Route path="/admin/students" element={<AdminDashboard><StudentTable /></AdminDashboard>} />        
                <Route path="/admin/inbox" element={<AdminDashboard><Inbox/></AdminDashboard>} />        
                <Route path="/admin/profile" element={<AdminDashboard><ProfilePage/></AdminDashboard>} />        
                <Route path="/admin/school" element={<AdminDashboard><School/></AdminDashboard>} />        
                <Route path="/admin/school/add" element={<AdminDashboard><SchoolCreate/></AdminDashboard>} />        
              </>
            )}

            {userRole === "ROLE_USER" && (
              <>
                <Route path="/student/dashboard" element={<StudentDashboard/>} />         
              </>
            )}
          </>
        </Routes> 
          
        <Footer />
      </BrowserRouter>
    </>
  );

}
export default App;

