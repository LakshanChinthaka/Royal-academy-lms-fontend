import React from 'react'
import { useState } from "react";

function Dropdown() {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(!open);
    };

  return (
    <div>
         <div class="relative font-[sans-serif] w-max mt-5 ml-[100px]  justify-items-start">
            <button
            onClick={handleOpen}
              type="button"
              class="px-6 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
              Roles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 fill-white inline ml-3"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                  clip-rule="evenodd"
                  data-original="#000000"
                />
              </svg>
            </button>
            {open ? (
              <ul class="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
                <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                  USER
                </li>
                <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                  STUDENT
                </li>
                <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                  LECTURE
                </li>
                <li class="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer">
                  ADMIN
                </li>
              </ul>
            ) : null}
          </div>
    </div>
  )
}

export default Dropdown