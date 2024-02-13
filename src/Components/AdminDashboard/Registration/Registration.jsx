import React, { useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";

function Registration() {
  const { SuccessMessage } = SuccessAlert();
  const [rb, setRb] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    gender: "",
    nic: "",
    dob: "",
    address: "",
    city: "",
    district: "",
  });

  const handleRb = (e) => {
    setFormData({ ...formData, gender: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // create address object
  const address = {
    addressId: 0,
    address: formData.address,
    city: formData.city,
    district: formData.district,
  };

  // add address in paylaod as a object
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    mobileNo: formData.mobileNo,
    gender: formData.gender.toUpperCase(),
    nic: formData.nic,
    dob: formData.dob,
    address: address,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("token- ", token);


    try {
      let URL = "http://localhost:8080/api/v1/student/add";

      const response = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        mobileNo: "",
        gender: "",
        nic: "",
        address: "",
        city: "",
        district: "",
      });
      const confirmed = await SuccessMessage(response.data.data, "success");
    } catch (error) {
      const confirmed = await SuccessMessage(
        error.response.data.data,
        "error"
      );
      console.log(error);
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
                        Address line
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
                      <label htmlFor="LasttName" class="text-sm mb-2 block">
                        City
                      </label>
                      <input
                        max={5}
                        value={formData.city}
                        onChange={handleChange}
                        required
                        name="city"
                        type="text"
                        class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter address"
                      />
                    </div>
                    <div>
                      <label htmlFor="LasttName" class="text-sm mb-2 block">
                        District
                      </label>
                      <input
                        max={5}
                        value={formData.district}
                        onChange={handleChange}
                        required
                        name="district"
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
                  </div>
                  <div class="!mt-2 flex flex-col">
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
