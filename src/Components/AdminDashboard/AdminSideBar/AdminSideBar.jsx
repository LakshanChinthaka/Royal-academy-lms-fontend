

import React from 'react';
import { Link } from 'react-router-dom';


function AdminSideBar() {
  const AdminSideBarItems = [
    // { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/students', label: 'Students' },
    { path: '/admin/assignments', label: 'Assignments'},
    { path: '/admin/registration', label: 'Registration'},
    { path: '/admin/inbox', label: 'Inbox' },
    // { path: '/admin/refunds', label: 'Refunds'},
    // { path: '/admin/profile', label: 'Profile'},
  ];

  return (
    <>
      <nav class="bg-[#121e31] min-h-[745px] left-0 min-w-[250px] py-6 px-4 font-[sans-serif] overflow-auto">
        <div className="flex flex-wrap items-center cursor-pointer">
          <img src="https://readymadeui.com/profile.webp" className="w-10 h-10 rounded-full border-2 border-white" />
          <div className="ml-4">
            <p className="text-sm text-white">John Doe</p>
            <p className="text-xs text-gray-300 mt-1">johndoe23@gmail.com</p>
          </div>
        </div>

        <ul className="space-y-3 mt-10">
          {AdminSideBarItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all"
              >
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>

  );
}


export default AdminSideBar;
