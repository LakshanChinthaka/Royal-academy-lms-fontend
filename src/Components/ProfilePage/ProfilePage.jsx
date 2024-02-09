import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {

  const[userDetails,setUserDetails] = useState({})


  useEffect(() => {
    loadUser();
  },[]);

  const username = 'laki@gmail.com';
  const password = '21022';


  const loadUser = async ()=> {
    const URL = "http://localhost:8080/auth/user"
    const result = await axios.get(URL,{
      auth: {
        username: username,
        password: password
      }
    })
  setUserDetails(result.data.data);
    console.log(result.data.data)
    console.log(result.data.data.firstName)
 

  }

  console.log(userDetails.address?.address);
  
  return (
    <div>
      <Grid container spacing={2} columns={5}>
        <Grid item xs={1}>
          {/* <Item>xs=8</Item> */}
          <div class="flex flex-wrap items-center mt-10 ml-5 flex-col cursor-pointer rounded-full">
            <img
              src={userDetails.imageUrl}
              // src="https://readymadeui.com/team-1.webp"
              class="w-[200px] h-[200px] rounded-full"
            />
            <h4 class="text-xl text-[#333] font-bold mt-3">{userDetails.firstName}</h4>
            <p class="text-sm text-gray-500 mt-1">{userDetails.email}</p>
          </div>
        </Grid>

        <Grid item xs={2}>
          <div className=" mt-[40px]">
            <tbody class="whitespace-nowrap">
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold"> Full Name</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> {userDetails.firstName +" " + userDetails.lastName}</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold"> Course </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> Bsc Software Engineering</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold"> Address</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">{userDetails.address?.address};</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">NIC No</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> {userDetails.nic}</td>
              </tr>         
            </tbody>
          </div>
         
        </Grid>
        <Grid item xs={2}>
        <div className=" mt-[40px]">
            <tbody class="whitespace-nowrap">
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold"> Mobile No</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> {userDetails.mobileNo}</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold"> Date of Join </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> 2023/10/23</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold"> Date of Birth</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">2000/10/26</td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Role</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]"> {userDetails.role}</td>
              </tr>
            </tbody>
          </div>
            </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
