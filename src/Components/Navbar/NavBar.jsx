import React from "react";
import NavBarLink from "../NavBarLink/NavBarLink";
import logo from "../../assets/academy-logo.png";
import { Link } from "react-router-dom";
import LogOutButton from "../logoutButton/LogOutButton";

function NavBar({ userRole }) {
  return (
    <>
      <header className="shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[30px]">
        <div className="flex flex-wrap items-center justify-between gap-5 relative">
          <Link to="/">
            <img src={logo} className="w-[250px]" alt="logo" />
          </Link>

          <div className="flex lg:order-1 max-sm:ml-auto">
            {userRole ? (
              <LogOutButton />
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]">
                  Login
                </button>
              </Link>
            )}
            <button id="toggle" className="lg:hidden ml-7">
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavBarLink userRole={userRole} />
        </div>
      </header>
    </>
  );
}

export default NavBar;
