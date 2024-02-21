import React from "react";
import { Link, useLocation } from "react-router-dom";
import LogOutButton from "../../logoutButton/LogOutButton";

function StudentNavBar({userRole}) {

  const location = useLocation();

  const StudentNavBarItems = [
    { path: "/student/dashboard", label: "Dashboard" },
    { path: "/student/assignment", label: "Assignments" },
    { path: "/student/profile", label: "Profile" },
    { path: "/student/payment", label: "Pyment" },
    { path: "/student/course", label: "Indox" },
    
  ];

  return (
    <div className="">
      <ul class="flex bg-gray-800 p-1.5 font-sans py-4 ">
        {StudentNavBarItems.map((item) => (
          <li key={item.path} className="w-full `">
            <Link
              to={item.path}
              className={`text-white rounded-md font-bold  text-center text-base px-2 cursor-pointer whitespace-nowrap ${
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

export default StudentNavBar;

