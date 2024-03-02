import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../Context/TokenProvider";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../Components/firebase";
import SuccessAlert from "../../../utils/SuccessAlert";


function StudentProfile() {
  const { token } = useToken();
  const [userDetails, setUserDetails] = useState({});
  const [img, setImg] = useState("");
  const { SuccessMessage } = SuccessAlert();
  const [loading, setLoading] = useState(true); 

  const PROFILE_URL = "http://localhost:8080/profile";
  const UPLAOD_IMAGE_URL = "http://localhost:8080/api/v1/student/upload-image";

  //ROLE_ADMIN convert to Admin
  const role =
    localStorage.getItem("userRole").slice(5).charAt(0).toUpperCase() +
    localStorage.getItem("userRole").slice(6).toLowerCase();

     //Convert to data
  const dateOfJoin = new Date(userDetails.enroll?.enrollDate).toLocaleDateString();

  useEffect(() => {
    loadUser();
  }, []);

  console.log("Select file image url", img);

  //load user from api
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

  //file upload
  const handleUploadImage = async () => {
    if (!img) return;

    const fileName = `${userDetails.firstName}-profile`;

    const imgRef = ref(storage, `student/profile/${fileName}`);

    try {
      const existingUrl = await getDownloadURL(imgRef);
      const existingImageRef = ref(storage, existingUrl);
      await deleteObject(existingImageRef);
      await uploadBytes(imgRef, img);
      const newImageUrl = await getDownloadURL(imgRef);

      console.log("Firebase Image url-", newImageUrl);

      const confirmed = await SuccessMessage(
        "Image uploaded successfully",
        "success"
      );

      uploadImageToDb(newImageUrl);
    } catch (error) {
      if (error.code === "storage/object-not-found") {
        await uploadBytes(imgRef, img);
        const newImageUrl = await getDownloadURL(imgRef);

        const confirmed = await SuccessMessage(
          "Image uploaded successfully",
          "success"
        );

        uploadImageToDb(newImageUrl);
      } else {
        console.error("Error handling image:", error);
      }
    }
  };

  const uploadImageToDb = (newImageUrl) => {
    const payload = {
      studentId: userDetails.id,
      imageUrl: newImageUrl,
    };

    console.log("Upload payload: ", payload);

    try {
      axios.put(UPLAOD_IMAGE_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      //refresh
      loadUser();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
    <div class="bg-gray-50 p-6 w-full max-w-sm rounded-1xl overflow-hidden mx-auto mt-4 md:mt-[-20px]">
      <div class="flex flex-col items-center bg-gray-50">
        {userDetails.imageUrl ? (
          <img
            src={userDetails.imageUrl}
            className="w-[200px] h-[200px] rounded-full"
          />
        ) : (
          <img
            src="https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
            className="w-[200px] h-[200px] rounded-full border-2 border-gray-300"
            alt="Default Profile Image"
          />
        )}
        <div class="mt-2 sm:mt-1 text-center">
          <p class="text-xl sm:mt-[-2px] text-[#333] font-bold">{userDetails.firstName + " " + userDetails.lastName}</p>
          <p class="text-base sm:mt-[-2px] text-gray-500 mt-2">{role}</p>
          <p class="text-base sm:mt-[-2px] text-gray-500 mt-2">{userDetails.employeeType}</p>
        </div>
      </div>
    </div>



    {/* Bios */}
    <div class="sm:p-6 p-4 sm:w-full md:w-full bg-gray-200 rounded-tl-[50px] rounded-tr-[50px]">

      <div class="sm:ml-[10px]  grid lg:grid-cols-4 sm:grid-cols-2 lg:ml-[200px] md:grid-cols-3 sm:mr-32 sm:gap-7 gap-y-7 gap-x-7 ml-5">
        <div>
          <label class="text-sm mt-3 font-bold text-[#333] mb-1 block">Address</label>
          <label class=" w-full text-base text-gray-500 px-4 py-2 rounded-md ml-[-15px]" >  {userDetails.address
            ? userDetails.address.address +
            ", " +
            userDetails.address.city +
            ", " +
            userDetails.address.district
            : "-"}</label>
        </div>
        <div>
          <label class="text-sm font-bold text-[#333] mb-1 block">Mobile No</label>
          <label class=" w-full text-base text-gray-500 px-4 py-2 rounded-md ml-[-15px]" >  {userDetails.mobileNo}</label>
        </div>


        <div>
          <label class="text-sm font-bold text-[#333]  block">Gender</label>
          <label class=" w-full text-base text-gray-500 px-4 rounded-md ml-[-15px]" >   {userDetails.gender ? (
            <td className="  text-gray-500 text-[17px]">
              {userDetails.gender.charAt(0).toUpperCase() +
                userDetails.gender.slice(1).toLowerCase()}
            </td>
          ) : (
            <td className="px-6  text-gray-500 text-[17px]">-</td>
          )}</label>
        </div>

        <div>
          <label class="text-sm font-bold text-[#333] mb-1 block">Nic No</label>
          <label class=" w-full text-base text-gray-500 px-4 py-2 rounded-md ml-[-15px]" > {userDetails.nic}</label>
        </div>

        <div>
          <label class="text-sm font-bold text-[#333] mb-1 block">Date of Birth</label>
          <label class=" w-full text-base text-gray-500 px-4 py-2 rounded-md ml-[-15px]" >{userDetails.dob}</label>
        </div>

    
        <div>
          <label class="text-sm font-bold text-[#333] mb-1 block">Date of Join</label>
          <label class=" w-full text-base text-gray-500 px-4 py-2 rounded-md ml-[-15px]" > {dateOfJoin}</label>
        </div>

      </div>

   
    <label
      htmlFor="uploadFile1"
      className="bg-gray-800 hover:bg-gray-700  text-white text-sm lg:ml-[200px]  sm:ml-[100px] md:ml-[100px] pr-3 pl-4 py-1 ml-3 mt-5 outline-none rounded w-max cursor-pointer mx-auto block "
    
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 mr-2  fill-white inline"
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

      {/* Select image */}
      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
        id="uploadFile1"
        class="hidden"
      />
      Uplaod profile
    </label>

    <button
      onClick={handleUploadImage}
      type="button"
      className="px-4 ml-3 py-3 mt-5 sm:ml-[100px] md:ml-[100px] lg:ml-[200px] rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-800 hover:bg-[#222] active:bg-[#333]"
    >
      Upload
    </button>
    
    </div>
  </div>
  );
}

export default StudentProfile;
