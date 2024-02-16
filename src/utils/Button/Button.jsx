import React from 'react'

function Button({name}) {
  return (
    <div>
         <button
              type="button inline-block"
              className="ml-[250px] px-6 flex justify-items-end mt-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                fill="#fff"
                className="inline mr-3"
                viewBox="0 0 512 512"
              >
                <path
                  d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                  data-original="#000000"
                />
              </svg>
              {name}
            </button>
    </div>
  )
}

export default Button