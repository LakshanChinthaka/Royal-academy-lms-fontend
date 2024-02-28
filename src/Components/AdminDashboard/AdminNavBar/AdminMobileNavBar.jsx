import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogOutButton from "../../logoutButton/LogOutButton";
import { FiAlignRight } from "react-icons/fi";


function AdminMobileNavBar({ userRole }) {

  const [isOpen, setOpen] = useState(false)
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

  console.log(isOpen)
  const toggleMenu = () => {
    setOpen(!isOpen);
  }

  return (
    <div className="">
  <header class='border-b border-1 bg-red-800 font-sans min-h-[60px]'>
                    <div class='flex flex-wrap items-center justify-center gap-6 px-10 py-3 relative'>
                        <div class='flex items-center ml-auto lg:hidden lg:order-1'>

                            <FiAlignRight onClick={toggleMenu} className="text-white  w-7 h-7 ml-5 cursor-pointer" />
                        </div>
                        <nav
                            class="transalet-x-0 bg-gray-900 shadow-lg h-screen fixed top-0 left-0 min-w-[270px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto">
                            <div class="flex flex-wrap items-center cursor-pointer">
                                <div class="relative">
                                    <img src='https://readymadeui.com/profile_2.webp' class="w-12 h-12 p-1 rounded-full border-2 border-gray-300" />
                                </div>
                                <div class="ml-6">
                                    <p class="text-xm text-gray-300">Admin</p>
                                    <h6 class="text-base  text-white mt-1">Chinthaka</h6>
                                </div>
                            </div>
                            <hr class="border-gray-500 my-4" />

                            {/* Sidebar itmes */}

                            <ul class="space-y-4">

                                {AdminNavBarItems.map((item) => (
                                    <div key={item.path}> {/* Wrap each item inside a parent element */}
                                        <Link to={item.path} >
                                            <ul className="mt-3">
                                                <li>
                                                    <a
                                                        className={`text-gray-300 text-[15px] flex items-center rounded-full px-4 py-2.5 transition-all 
            ${location.pathname === item.path ? "bg-blue-600" : "hover:bg-blue-600"}`}
                                                    >
                                                        <span>{item.label}</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </Link>
                                    </div>
                                ))}

                            </ul>

                            <div class="mt-5">
                                <button type="button" class="bg-red-500 rounded-full py-3 px-4 text-white text-sm font-semibold">

                                    Logout
                                </button>
                            </div>
                        </nav>
                    </div>
                </header>
      {/* )} */}

      {/* <ul className="flex bg-gray-800 p-1.5  font-sans py-4 w-full items-end justify-end pr-5">

        <FiAlignRight onClick={toggleMenu} className="text-white  w-7 h-7 ml-5 cursor-pointer" />
      </ul> */}
    </div>
  );
}

export default AdminMobileNavBar;






// {userRole ? (
//           <div className="">
//             <LogOutButton />

//           </div>
//         ) : (
//           <Link to="/login">
//             <button className="px-4 py-2 text-center text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
//               Login
//             </button>
//           </Link>
//         )} 