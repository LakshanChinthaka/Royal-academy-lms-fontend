import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/academy-logo.png";
import LogOutButton from "../../logoutButton/LogOutButton";

function AdminNavBar({userRole}) {

  const location = useLocation();

  const AdminNavBarItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/students", label: "Students" },
    { path: "/admin/assignments", label: "Assignments" },
    { path: "/admin/registration", label: "Registration" },
    { path: "/admin/course", label: "Course" },
    { path: "/admin/school", label: "School" },
    { path: "/admin/batch", label: "Batch" },
    { path: "/admin/subject", label: "Subject" },
    { path: "/admin/account", label: "Account" },
    { path: "/admin/mail/indox", label: "Mail Inbox" },
    // { path: "", label: "Payment" },
    { path: "/admin/profile", label: "Profile" },
  ];

  return (
    <div className="">
      <ul class="flex bg-gray-800 p-1.5 font-sans py-4 ">
        {/* <img src={logo} className="w-[250px] bg-transist" alt="logo" /> */}
        {AdminNavBarItems.map((item) => (
          <li key={item.path} className="w-full `">
            <Link
              to={item.path}
              className={`text-white rounded-md font-bold w-full text-center text-base py-1 px-2 cursor-pointer whitespace-nowrap ${
                location.pathname === item.path
                  ? "bg-blue-600 py-3  mx-3"
                  : "hover:bg-gray-700 py-3  mx-3"
              }`}
            >
              {item.label}
            </Link>
            {location.pathname === item.path && item.component}
          </li>
        ))}

        {userRole ? (
          <div className="item-center">
            <LogOutButton />

          </div>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 mb-5 text-center text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
              Login
            </button>
          </Link>
        )}
    
      </ul>
    </div>
  );
}

export default AdminNavBar;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function AdminNavBar() {
//   const AdminNavBarItems = [
//     { path: "/admin/dashboard", label: "Dashboard" },
//     { path: "/admin/students", label: "Students" },
//     { path: "/admin/assignments", label: "Assignments" },
//     { path: "/admin/registration", label: "Student Registration" },
//     { path: "/admin/course", label: "Course" },
//     { path: "/admin/school", label: "School" },
//     { path: "/admin/batch", label: "Batch" },
//     { path: "/admin/subject", label: "Subject" },
//     { path: "/admin/account", label: "Account" },
//     { path: "/admin/mail/indox", label: "Mail Inbox" },
//     { path: "/admin/profile", label: "Profile" },
//   ];

//   const location = useLocation();

//   return (
//     <div className="fixed top-0 w-full bg-gray-800">
//       <ul className="flex p-1.5 font-sans py-4 space-x-4">
        // {AdminNavBarItems.map((item) => (
        //   <li key={item.path} className="flex-1">
        //     <Link
        //       to={item.path}
        //       className={`text-white rounded-md font-bold w-full text-center text-base py- px-4 cursor-pointer ${
        //         location.pathname === item.path
        //           ? "bg-blue-600 py-3"
        //           : "hover:bg-gray-700 py-3"
        //       }`}
        //     >
        //       {item.label}
        //     </Link>
        //   </li>
        // ))}
//       </ul>
//     </div>
//   );
// }

// export default AdminNavBar;
