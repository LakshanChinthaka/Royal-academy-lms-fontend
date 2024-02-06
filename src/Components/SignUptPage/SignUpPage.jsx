import React from 'react'

function SignUpPage() {
  return (
    <>
    
    <div class="font-[sans-serif] text-[#333]">
      <div class="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div class="max-md:text-center mt-[-18px]">
            <h2 class="lg:text-6xl h-[60px] text-4xl text-blue-600 font-extrabold lg:leading-[55px]">
              Royal Academy <br />
            </h2>
            <h2 class="lg:text-3xl mt-3 text-4xl font-extrabold lg:leading-[55px]">
            A Great Place For Education.
            </h2>
            <p class="text-1xl  mt-2">Fostering a culture of continuous learning and innovation, our education academy is dedicated to empowering individuals with knowledge and skills. Through personalized guidance and collaborative experiences, we cultivate an environment where curiosity is sparked, challenges are embraced, and potential is realized. </p>
           
          </div>
          <form class="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full">
            <h3 class="text-3xl font-extrabold mb-8 max-md:text-center">
              Sign in
            </h3>
            <div>
              <input name="email" type="email" autocomplete="email" required class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Email address" />
            </div>
            <div>
              <input name="password" type="password" autocomplete="current-password" required class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600" placeholder="Password" />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label for="remember-me" class="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="jajvascript:void(0);" class="text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div class="!mt-10">
              <button type="button" class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Log in
              </button>
            </div>
            <p class="text-sm mt-10">Don't have an account <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Register here</a></p>
           
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignUpPage