import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SchoolCreate from '../School/SchoolCreate';


function AdminSideBar() {

  const AdminSideBarItems = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/students', label: 'Students' },
    { path: '/admin/assignments', label: 'Assignments'},
    { path: '/admin/registration', label: 'Student Registration'},
    { path: '/admin/course', label: 'Course'},
    { path: '/admin/school', label: 'School'},
    { path: '/admin/batch', label: 'Batch' },
    { path: '/admin/subject', label: 'Subject' },
    { path: '/admin/inbox', label: 'Inbox' },
    // { path: '/admin/refunds', label: 'Refunds'},
    { path: '/admin/profile', label: 'Profile'},
  ];

  const location = useLocation();

  return (
    <>
      <nav class="bg-[#121e31] h-screen left-0 min-w-[250px] py-5 px-3 font-[sans-serif] overflow-auto">
        <div className="flex flex-wrap items-center cursor-pointer">
          <img src="https://readymadeui.com/profile.webp" className="w-10 h-10 rounded-full border-2 border-white" />
          <div className="ml-5">
            <p className="text-sm text-white">John Doe</p>
            <p className="text-xs text-gray-300 mt-1">johndoe23@gmail.com</p>
          </div>
        </div>

        <ul className="space-y-2 mt-10">
          {AdminSideBarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`text-white text-sm flex items-center rounded px-4 py-3 transition-all ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
           
              >
                <span>{item.label}</span>
              </Link>
              {location.pathname === item.path && item.component}
            </li>
          ))}
        </ul>


        
      </nav>
    </>

  );
}


export default AdminSideBar;
