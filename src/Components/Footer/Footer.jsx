import React from 'react'

function Footer() {
  return (
    <div>
        <footer class="font-[sans-serif] bg-gray-800 py-12 px-10  ">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        <div>
          <h4 class="text-white text-lg font-bold mb-5">Company</h4>
          <ul class="space-y-4">
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">About Us</a></li>
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Contact</a></li>
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Branch Network</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-lg font-bold mb-5">Information</h4>
          <ul class="space-y-4">
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Privacy Policy</a></li>
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-lg font-bold mb-5">Resources</h4>
          <ul class="space-y-4">
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">W3 School</a></li>
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Shipping Information</a></li>
            <li><a href="javascript:void(0)" class="text-gray-300 hover:text-white text-sm">Returns & Exchanges</a></li>
          </ul>
        </div>
        <div class="md:col-span-2">
          <h4 class="text-white text-lg font-bold mb-5">Newsletter</h4>
          <p class="text-gray-300 mb-4 text-sm">Subscribe to our newslette Subscribe to our newsletter to get updates on new programs and promotionsr to get updates on new programs and promotions.
          </p>
          {/* <form class="mb-4">
            <div class="flex items-center">
              <input type="email" placeholder="Enter your email"
                class="bg-black px-4 py-3.5 rounded-l-lg w-full text-sm text-gray-300 outline-none" />
              <button type="button"
                class="bg-gray-700 text-sm text-gray-300 tracking-wide px-4 py-3.5 rounded-r-lg">Subscribe</button>
            </div>
          </form> */}
        </div>
      </div>
      <p class='text-gray-300 text-right text-sm mt-8'>© 2023<a href='https://readymadeui.com/' target='_blank'
        class="hover:underline mx-1">Royal Academy</a>All Rights Reserved.
      </p>
    </footer>
    </div>
  )
}

export default Footer