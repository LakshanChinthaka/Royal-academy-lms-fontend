import React, { useState } from "react";

function Dropdown({ options, onSelect, label }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelect = (value) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div>
      <div className="relative font-[sans-serif] w-max mb-3 mt-3 ml-[100px]  justify-items-start">
        <button
          onClick={handleOpen}
          type="button"
          className="px-6 py-2.5 rounded text-white text-sm font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
        >
          {label}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 fill-white inline ml-3"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
              clipRule="evenodd"
              data-original="#000000"
            />
          </svg>
        </button>
        {open ? (
          <ul className="absolute shadow-lg bg-white py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="py-2.5 px-6 hover:bg-blue-50 text-black text-sm cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Dropdown;
