import React from 'react'

function ContactUs() {
  return (
    <div>
          <div class="bg-white text-[#333] font-[sans-serif] mt-8  mb-8">
      <div class="max-w-lg mx-auto p-4 text-center">
        <h2 class="text-4xl font-bold mb-6">Contact us</h2>
        <p class="text-base">Subscribe to our newsletter to get updates on new products and promotions.</p>
        <div class="mt-8 flex items-center bg-gray-100 rounded overflow-hidden sm:w-11/12 mx-auto">
          <input name="name" type="text" class="flex-1 w-full bg-transparent text-sm px-4 py-3 outline-none" placeholder="Enter email" />
          <button type="button"
            class="w-max px-6 py-3 text-sm tracking-wider font-semibold outline-none border-none bg-[#333] text-white hover:bg-[#111] transition-all duration-300">Submit</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ContactUs