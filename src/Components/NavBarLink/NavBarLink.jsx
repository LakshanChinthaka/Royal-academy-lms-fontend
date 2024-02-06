
import React from 'react';
import { Link } from 'react-router-dom';

function NavBarLink({ userRole }) {
  console.log("Nav bar user : " + userRole)
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/program', label: 'Programs' },
    { path: '/student/dashboard', label: 'Student Dashboard', role: 'ROLE_USER' },
    { path: '/admin/dashboard', label: 'Admin Dashboard', role: "ROLE_ADMIN" },

  ];


  return (
    <ul id="collapseMenu" className='lg:!flex lg:space-x-5 max-lg:space-y-2 max-lg:hidden max-lg:py-4 max-lg:w-full'>

      {navItems.map((item) => (
        (!item.role || item.role === userRole) && (
          <li key={item.path} className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'>
            <Link to={item.path} className='lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>
              {item.label}
            </Link>
          </li>
        )
      ))}

    </ul>
  );
}

export default NavBarLink;

