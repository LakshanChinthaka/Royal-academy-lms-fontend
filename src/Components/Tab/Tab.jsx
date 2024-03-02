import React from 'react'

function Tab() {
    return (
        <div>
            <ul class="flex mb-4 bg-gray-200 rounded-md p-1.5 overflow-hidden font-sans">
                <li class="text-gray-600 rounded-md font-bold w-full text-center text-base py-2 px-4 hover:bg-blue-500 cursor-pointer">
                    Student</li>
                <li class="text-gray-600 rounded-md font-bold w-full text-center text-base py-2 px-4 hover:bg-blue-500 cursor-pointer">Employee</li>
            </ul>
        </div>
    )
}

export default Tab