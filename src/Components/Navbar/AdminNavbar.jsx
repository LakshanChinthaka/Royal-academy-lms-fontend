import React, { useState } from 'react'
import { FiAlignRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import LogOutButton from '../logoutButton/LogOutButton';

function AdminNavbar({ userRole }) {
    const [isOpen, setOpen] = useState(false)

    console.log(isOpen)
    const toggleMenu = () => {
        setOpen(!isOpen);
    }

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
        { path: "/admin/mail/indox", label: "Inbox" },
        // { path: "", label: "Payment" },
        { path: "/admin/profile", label: "Profile" },
    ];

    return (
        <div>

            <header class='border-b border-1 bg-gray-900 font-sans min-h-[60px]'>
                <div class='flex flex-wrap items-center justify-center md:gap-2 lg:gap-6 md:px-2 lg:px-10 lg:py-3 relative'>

                    <h2 className='lg:hidden text-blue-500 mt-3 ml-4 sm:mt-0 font-bold text-xl block'>Royal Academy</h2>

                    <div class='flex items-center ml-auto lg:hidden lg:order-1'>

                        <FiAlignRight onClick={toggleMenu} className="text-white mt-3 mr-4 ml-4  w-7 h-7 hover:text-[#007bff] cursor-pointer" />
                    </div>

                    <ul id="collapseMenu" class='lg:!flex max-lg:hidden max-lg:w-full lg:ml-10 lg:space-x-10 max-lg:space-y-3'>
                        {AdminNavBarItems.map((item) => (

                            <div key={item.path}>

                                <Link to={item.path}>
                                    <li class='max-lg:border-b max-lg:py-2'><a href='javascript:void(0)'
                                        class='hover:text-[#007bff] text-gray-300 font-bold text-sm block'>{item.label}</a></li>
                                </Link>

                            </div>
                        ))}
                 
                        {userRole ? (
                            <div className="">
                                <LogOutButton />

                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="px-4 py-2 pb-2 text-center text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                                    Login
                                </button>
                            </Link>
                        )} 

                    </ul>
                </div>
            </header>

            {isOpen ? (

                // {/* Sidebar menu */}
                <nav className="transalet-x-0 bg-gray-900 shadow-lg h-screen fixed top-0 left-0 min-w-[270px] py-6 px-4 font-[sans-serif] flex flex-col overflow-auto lg:hidden">
                    {/* User profile */}
                    <div className="flex flex-wrap items-center cursor-pointer">
                        <div className="relative">
                            <img src='https://readymadeui.com/profile_2.webp' className="w-12 h-12 p-1 rounded-full border-2 border-gray-300" alt="User Profile" />
                        </div>
                        <div className="ml-6">
                            <p className="text-xm text-gray-300">Admin</p>
                            <h6 className="text-base text-white mt-1">Chinthaka</h6>
                        </div>
                    </div>
                    <hr className="border-gray-500 my-4" />

                    {/* Sidebar items */}
                    <ul className="space-y-4">
                        {AdminNavBarItems.map((item) => (
                            <div key={item.path}>
                                <Link to={item.path}>
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

                    {/* Logout button */}

                    {userRole ? (
                        <div className="">
                            <LogOutButton />

                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="px-4 py-2 text-center text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                                Login
                            </button>
                        </Link>
                    )}
                </nav>

            ) : null}

        </div>

    )

}


export default AdminNavbar

