import React from 'react'

function ShowButton({name}) {
  return (
    <div>
         <button
              type="button"
              className="md:ml-[250px] px-6 flex justify-items-end mt-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
   
              {name}
            </button>
    </div>
  )
}

export default ShowButton