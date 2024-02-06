
import React, { useState } from "react";
import { Grid } from "@mui/material";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function Registration() {
  const [rb, setRb] = useState("");
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        console.log("Before submit - " + formData.gender);

        const address = {
          addressId: 1,
          address: formData.address,
        };

        const payload = {
          ...formData,
          address: address,
        };

        payload.gender = payload.gender.toUpperCase();

        console.log("Before submit payload - " + payload.address);
        const res = await axios.post(
          "http://localhost:8080/api/v1/student/add",
          payload
        );

        if (res.data.data.code === 200) {
          profileImageUpload(res);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  const profileImageUpload = (res) => {
    const fileUpload = (e) => {
      let file = e.target.files[0];
      if (!file) return;
      if (file == null || file == undefined) return;

      const storage = getStorage();
      const storageRef = ref(storage, "profile-image/" + file.name);

      let uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);

            const studentId = res.data.data;
            const imageUrl = downloadURL;

            axios.put(
              "http://localhost:8080/api/v1/student/upload-image",
              { imageUrl, studentId }
            ).then((response) => {
              console.log("Image upload response:", response.data);
            }).catch((error) => {
              console.log("Error uploading image:", error);
            });
          });
        }
      );
    };

    fileUpload(e);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Dropdown />
        </Grid>
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
                  <div class="!mt-10 flex flex-col">
                    {/* Image upload */}
                    <label
                      htmlFor="uploadFile"  
                      class="bg-gray-800 hover:bg-gray-700 flex max-w-[200px] text-white text-sm px-4 py-2.5 outline-none rounded  cursor-pointer   font-[sans-serif]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 mr-2 fill-white inline"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                          data-original="#000000"
                        />
                        <path
                          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                          data-original="#000000"
                        />
                      </svg>
                      Upload Profile Image
                      {/* <input  type="file" id="uploadFile" class="hidden" /> */}
                      <input onChange={profileImageUpload} type="file" id="uploadFile" class="hidden" />

                    </label>

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