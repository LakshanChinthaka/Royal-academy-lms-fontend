import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../Context/TokenProvider";

function ProfilePage() {
  const { token } = useToken();
  const [userDetails, setUserDetails] = useState({});

  const PROFILE_URL = "http://localhost:8080/profile";

  //ROLE_ADMIN convert to Admin
  const role = localStorage.getItem("userRole").slice(5).charAt(0).toUpperCase() 
  + localStorage.getItem("userRole").slice(6).toLowerCase();

  //Convert to data
  const dateOfJoin = new Date(userDetails.createdDate).toLocaleDateString();

  useEffect(() => {
    loadUser();

  }, []);

  const loadUser = async () => {
    const res = await axios.get(PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUserDetails(res.data.data);
    console.log("data", res.data.data);
    console.log("name", res.data.data.firstName);
  };

  console.log(userDetails.address?.address);

  return (
    <div>
      <Grid container spacing={2} columns={5}>
        <Grid item xs={1}>

          <div class="flex flex-wrap items-center mt-10 ml-5 flex-col cursor-pointer rounded-full">
            {/* profile img */}
            <img
              src={userDetails.imageUrl}
              class="w-[200px] h-[200px] rounded-full"
            />
            {/* name */}
            <h4 class="text-xl text-[#333] font-bold mt-3">
              {userDetails.firstName}
            </h4>
             {/* posstion */}
            <p class="text-sm text-gray-500 mt-1">{userDetails.employeeType}</p>
            {/* Edit profile*/}
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className=" mt-[40px]">
            <tbody class="whitespace-nowrap">
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  {" "}
                  Full Name:
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.firstName + " " + userDetails.lastName}
                </td>
              </tr>
              {/* Mobule No */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  {" "}
                  Mobile No
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.mobileNo}
                </td>
              </tr>

              {/* Address */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  {" "}
                  Address:
                </td>
                <td class="px-6 py-4 whitespace-normal text-gray-500 text-[17px]">
                  {userDetails.address ? userDetails.address.address + ", " + userDetails.address.city + ", " + userDetails.address.district : "-"}
                </td>
              </tr>
              {/* Nic */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">NIC No:</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> {userDetails.nic} </td>
              </tr>
              {/* DOB */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Bate of Birth:</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> {userDetails.dob} </td>
              </tr>
              {/* Gender */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Gender:</td>
                <td class="px-6 py-1 text-gray-500 text-[17px]">{userDetails.gender ?

                  <td class=" py-4 text-gray-500 text-[17px]">
                    {userDetails.gender.charAt(0).toUpperCase() + userDetails.gender.slice(1).toLowerCase()}
                  </td>
                  :
                  <td class="px-6 py-4 text-gray-500 text-[17px]">-</td>
                }
                </td>
              </tr>

            </tbody>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className=" mt-[40px]">
            <tbody class="whitespace-nowrap">
              {/* Qualification */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  Qualification:{" "}
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {userDetails.qualification ? userDetails.qualification.qualification : "-"}
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                Work Experince:
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">{userDetails.experince}</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  Date of Join
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">{dateOfJoin}</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Role</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {role}
                </td>
              </tr>
            </tbody>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
