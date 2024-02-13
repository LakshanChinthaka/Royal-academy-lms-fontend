import React from 'react'
import { Link } from 'react-router-dom'
import hero_img from "../../assets/hero-2d.jpg"
import Status from '../Status/Status'
import Fetures from '../Fetures/Fetures'
import ContactUs from '../../page/ContactUs/ContactUs'

function HomePage() {
  return (
    <div logout>
        <div class="bg-gradient-to-r from-indigo-900 to-purple-900 font-[sans-serif]">
      <div class="relative overflow-hidden">
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div class="relative z-10 text-center lg:text-left">
            <h1 class="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl">
              Welcome to
              <br class="xl:hidden" />
              <span class="text-indigo-400"> Royal Academy</span>
            </h1>
            <p class="mt-4 ml-[-0px] max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
            Fostering a culture of continuous learning and innovation, our education academy is dedicated to empowering individuals with knowledge and skills. Through personalized guidance and collaborative experiences, we cultivate an environment where curiosity is sparked, challenges are embraced, and potential is realized.
            </p>
            <div class="mt-12 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
               <Link to="/program">
               <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-indigo-600 bg-white hover:text-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out">
                  Show Programs
                </button>
               </Link>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition duration-150 ease-in-out">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src={hero_img} alt="Delicious Food" />
        </div>
      </div>
    </div>
    {/* Status */}
        <Status/>
    {/* feture */}
    <Fetures/>
    {/* contact us */}
    <ContactUs/>
    </div>
  )
}

export default HomePage