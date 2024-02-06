import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessAlert from "../../utils/SuccessAlert";


function SigninPage() {
  const { SuccessMessage } = SuccessAlert();
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  console.log(loginData);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginData
      );

      const userRole = response.data.authorities[0].authority;
      const role = userRole.slice(5);

      localStorage.setItem("userData", JSON.stringify(response.data));

      console.log("Role:", role);

      if (role === "USER") {
        navigate("/");
      } else {
        navigate("/admin/dashboard");
      }

      // const confirmed = await SuccessMessage(
      //   "Successfully logged in",
      //   "success"
      // );

      window.location.reload();
    } catch (err) {
      if (err.response && err.response.data.code === 401) {
        const confirmed = await SuccessMessage(
          "Invalid username or password",
          "error"
        );
      } else {
        const confirmed = await SuccessMessage(
          "Something went to wrong",
          "error"
        );
      }
    }
  };

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
              <p class="text-1xl  mt-2">
                Fostering a culture of continuous learning and innovation, our
                education academy is dedicated to empowering individuals with
                knowledge and skills. Through personalized guidance and
                collaborative experiences, we cultivate an environment where
                curiosity is sparked, challenges are embraced, and potential is
                realized.{" "}
              </p>
            </div>
            <form
              onSubmit={handleLogin}
              class="space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full"
            >
              <h3 class="text-3xl font-extrabold mb-8 max-md:text-center">
                Sign in
              </h3>

              <div>
                <input
                  value={loginData.email}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                  placeholder="Email address"
                />
              </div>
              <div>
                <input
                  value={loginData.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-600"
                  placeholder="Password"
                />
              </div>

              <div class="!mt-10">
                <button
                  type="submit"
                  class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Log in
                </button>
              </div>
              {/* <span class="text-sm justify-center  text-red-500 text-center flex items-center"> Don't have an account, contact institute</span> */}
              <p class="text-sm mt-4 ">
                Don't have an account{" "}
                <a
                  href="javascript:void(0);"
                  class="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  contact institute
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default SigninPage;
