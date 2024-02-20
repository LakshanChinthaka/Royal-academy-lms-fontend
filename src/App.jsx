import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar/NavBar';
import Footer from './Components/Footer/Footer';
import HomePage from './Components/HomePage/HomePage';
import Program from './Components/Programs/Programs';
import CourseInfo from './Components/CourseInfo/CourseInfo';
import Text from './Components/text/Text';
import SignInPage from '../src/page/SignInPage/SignInPage';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard';
import StudentTable from './Components/AdminDashboard/StudentsTable/StudentTable';
import Assigment from './Components/AdminDashboard/Assignment/Assigment';
import Registration from './Components/AdminDashboard/Registration/Registration';
import Inbox from '../src/Components/AdminDashboard/MailIndox/Inbox';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import School from './Components/AdminDashboard/School/School';
import SchoolCreate from './Components/AdminDashboard/School/SchoolCreate';
import SchoolUpdate from './Components/AdminDashboard/School/SchoolUpdate';
import Course from './Components/AdminDashboard/Course/Course';
import { TokenProvider } from './Components/Context/TokenProvider';
import CourseCreate from './Components/AdminDashboard/Course/CourseCreate';
import CourseUpdate from './Components/AdminDashboard/Course/CourseUpdate';
import AdminCourseInfo from './Components/AdminDashboard/Course/AdminCourseInfo';
import Batch from './Components/AdminDashboard/Batch/Batch';
import Subject from './Components/AdminDashboard/Subject/Subject';
import BatchCreate from './Components/AdminDashboard/Batch/BatchCreate';
import BatchInfo from './Components/AdminDashboard/Batch/BatchInfo';
import SubjectAssign from './Components/AdminDashboard/Subject/SubjectAssign';
import StudentEdit from './Components/AdminDashboard/StudentsTable/StudentEdit';
import StudentInfo from './Components/AdminDashboard/StudentsTable/StudentInfo';
import AdminPage from './Components/AdminDashboard/AdminPage';
import AdminDashboard from './Components/AdminDashboard/Dashboard/AdminDashboard';
import Account from './Components/AdminDashboard/Account/Account';
import StudentAssignToBatch from './Components/AdminDashboard/Batch/StudentAssignToBatch';
import MailSend from './Components/AdminDashboard/MailIndox/MailSend';
import AdminNavBar from './Components/AdminDashboard/AdminNavBar/AdminNavBar';
import MailInfo from './Components/AdminDashboard/MailIndox/MailInfo';



function App() {

  //get user role from local storage
  const [userRole, setUserRole] = useState(null);

  const getUserRole = () => {
    const storedUserRole = localStorage.getItem("userRole");
    setUserRole(storedUserRole);

  }

  useEffect(() => {
    getUserRole();
  }, []);

  console.log("User role in app.jsx- ", userRole)

  return (
    <>
      <TokenProvider>
        <BrowserRouter>


          {/* {(userRole !== "ROLE_ADMIN" && userRole !== "ROLE_USER") && ( */}
            {/* <NavBar userRole={userRole} /> */}
        <AdminNavBar userRole={userRole}/> 
           {/* )} */}

          <Routes>
            {/* <Route path="/" element={<HomePage logout />} /> */}
            <Route path="/login" element={<SignInPage />} />
            <Route path="/program" element={<Program />} />
            <Route path="/course" element={<CourseInfo />} />
            <Route path="/text" element={<Text />} />

            {userRole === "ROLE_ADMIN" && (
              <>
                {/* Adminside bar */}
                <Route path='/admin' element={<AdminPage />} />
                <Route path='/admin/dashboard' element={<AdminPage><AdminDashboard /></AdminPage>} />
                <Route path="/admin/assignments" element={<AdminPage><Assigment /></AdminPage>} />
                <Route path="/admin/registration" element={<AdminPage><Registration /></AdminPage>} />
                <Route path="/admin/students" element={<AdminPage><StudentTable /></AdminPage>} />
                <Route path="/admin/mail/indox" element={<AdminPage><Inbox /></AdminPage>} />
                <Route path="/admin/profile" element={<AdminPage><ProfilePage /></AdminPage>} />
                {/* School */}
                <Route path="/admin/school" element={<AdminPage><School /></AdminPage>} />
                <Route path="/admin/school/add" element={<AdminPage><SchoolCreate /></AdminPage>} />
                <Route path="/admin/school/update/:id/:code" element={<AdminPage><SchoolUpdate /></AdminPage>} />
                {/* Course */}
                <Route path="/admin/course/" element={<AdminPage><Course /></AdminPage>} />
                <Route path="/admin/course/add" element={<AdminPage><CourseCreate /></AdminPage>} />
                <Route path="/admin/course/update/:id/:code" element={<AdminPage><CourseUpdate /></AdminPage>} />
                <Route path="/admin/course/info/:id/:code/:courseType/:category/:name/:duration/:medium/:schoolName/:fees/:createBy/:createdDate/:modifiedBy/:modifiedData/:totalCredit/:totalHours" element={<AdminPage><AdminCourseInfo /></AdminPage>} />
                {/* Batch */}
                <Route path="/admin/batch" element={<AdminPage><Batch /></AdminPage>} />
                <Route path="/admin/batch/add" element={<AdminPage><BatchCreate /></AdminPage>} />
                <Route path="/admin/batch/info/:id/:code/:courseName/:schoolName" element={<AdminPage><BatchInfo /></AdminPage>} />
                <Route path="/admin/batch/assign/:id/:code" element={<AdminPage><StudentAssignToBatch /></AdminPage>} />

                {/* Subject */}
                <Route path="/admin/subject" element={<AdminPage><Subject /></AdminPage>} />
                <Route path="/admin/subject/assign/:id/:name/:code" element={<AdminPage><SubjectAssign /></AdminPage>} />
                {/* Student */}
                <Route path="/admin/subject/update/:id" element={<AdminPage><StudentEdit /></AdminPage>} />
                {/* <Route path="/admin/student/info/:id" element={<AdminPage><StudentInfo/></AdminPage>} /> */}
                <Route path="/admin/student/info/:id/:firstName/:lastName/:nic/:mobileNo/:gender/:dob/:activeStatus/:imageUrl/:address/:enrollId/:batchId/:batchCode/:courseId/:courseName/:enrollDate" element={<AdminPage><StudentInfo/></AdminPage>} />
                {/* Account */}

                <Route path="/admin/account" element={<AdminPage><Account /></AdminPage>} />

                {/* Mail */}
                <Route path="/admin/mail/send" element={<AdminPage><MailSend /></AdminPage>} />
                <Route path="/admin/mail/info/:mailId/:sendTo/:messageBody/:subject/:sendFrom/:createdDate" element={<AdminPage><MailInfo/></AdminPage>} />
              </>

            )}

            {userRole === "ROLE_USER" && (
              <>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
              </>
            )}
          </Routes>
          
          {/* {(userRole === "ROLE_ADMIN" && userRole == "ROLE_USER") && ( */}
            {/* <Footer />  */}
          {/* )} */}
        </BrowserRouter>
      </TokenProvider>
    </>
  );
}

export default App; // Only one default export
