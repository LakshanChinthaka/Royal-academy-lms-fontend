import React, { useState } from "react";
import { Grid } from "@mui/material";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";

function Registration() {
  const [selectedRole, setSelectedRole] = useState("");
  const { SuccessMessage } = SuccessAlert();
  const [rb, setRb] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    gender: "",
    nic: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const handleRb = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(selectedRole);
  };
  // create address object
  const address = {
    addressId: 1,
    address: formData.address,
  };

  // add address in paylaod as a object
  const payload = {
    ...formData,
    address: address,
  };
  //defalut role
  const role = "USER";
  //gender conver to upper case
  payload.gender = payload.gender.toUpperCase();
  payload.role = role;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        let url = "http://localhost:8080/api/v1/student/add";

        const res = await axios.post(url, payload);
        

        setFormData({
          role: "",
          firstName: "",
          lastName: "",
          address: "",
          mobileNo: "",
          gender: "",
          nic: "",
          email: "",
          dob: "",
          password: "",
          confirmPassword: ""
        });

        const confirmed = await SuccessMessage(
          res.data.data,
          "success"
        );

      } catch (error) {
        const confirmed = await SuccessMessage(
          error.response.data.data,
          "error"
        );
      }
    } else {
      const confirmed = await SuccessMessage(
       " Passwords does not match",
        "error"
      );
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
                <form onSubmit={handleSubmit}>
                  <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
                    <div>
                      <label htmlFor="FirstName" class="text-sm mb-2 block">
                        First Name
                      </label>
                      <input
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        name="firstName"
                        type="text"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label class="text-sm mb-2 block">Last Name</label>
                      <input
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        name="lastName"
                        type="text"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label htmlFor="LasttName" class="text-sm mb-2 block">
                        Address
                      </label>
                      <input
                        max={5}
                        value={formData.address}
                        onChange={handleChange}
                        required
                        name="address"
                        type="text"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter address"
                      />
                    </div>
                    <div>
                      <label htmlFor="MobileNo" className="text-sm mb-2 block">
                        Mobile No
                      </label>
                      <input
                        value={formData.mobileNo}
                        onChange={handleChange}
                        name="mobileNo"
                        type="text" // Change type to "text" for a text input
                        className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    {/* Nic */}
                    <div>
                      <label htmlFor="NICNo" class="text-sm mb-2 block">
                        NIC No
                      </label>
                      <input
                        value={formData.nic}
                        onChange={handleChange}
                        required
                        name="nic"
                        type="text"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter nic"
                      />
                    </div>

                    {/* Date of birth day */}
                    <div class="relative w-full">
                      <label
                        htmlFor="DateOfBirth"
                        className="text-sm mb-2 block"
                      >
                        Date of Birth
                      </label>
                      <input
                        value={formData.dob}
                        onChange={handleChange}
                        // selected={dob}
                        name="dob"
                        type="date"
                        className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Select date"
                      />
                    </div>
                    {/* <DatePicker selected={dob} onChange={(handleChange) => formData(dob)} /> */}
                    {/* Gender */}
                    <div class="space-y-6">
                      <div class="flex items-center">
                        <input
                          type="radio"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleRb}
                          class="w-5 h-5"
                        />
                        <label class="text-sm text-black ml-4">Male</label>
                      </div>

                      <div class="flex items-center">
                        <input
                          type="radio"
                          class="w-5 h-5"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleRb}
                        />
                        <label class="text-sm text-black ml-4">Female</label>
                      </div>
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="EmailId" class="text-sm mb-2 block">
                        Email Id
                      </label>
                      <input
                        value={formData.email}
                        onChange={handleChange}
                        required
                        name="email"
                        type="text"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label htmlFor="Password" class="text-sm mb-2 block">
                        Password
                      </label>
                      <input
                        value={formData.password}
                        onChange={handleChange}
                        required
                        name="password"
                        type="password"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ConfirmPassword"
                        class="text-sm mb-2 block"
                      >
                        Confirm Password
                      </label>
                      <input
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        name="confirmPassword"
                        type="password"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter confirm password"
                      />
                    </div>
                  </div>
                  <div class="!mt-2 flex flex-col">
                    {/* Image upload */}

                    {/* Sumbit btn */}
                    <button
                      type="submit"
                      class=" mt-5 max-w-[200px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default Registration;
