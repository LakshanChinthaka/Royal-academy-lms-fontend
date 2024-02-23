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
    <div>
      <Grid container spacing={2} columns={5}>
        <Grid item xs={1}>
          <div class="flex flex-wrap items-center mt-10 ml-5 flex-col  rounded-full">
            {/* profile img */}
            {userDetails.imageUrl ? (
              <img
                src={userDetails.imageUrl}
                className="w-[200px] h-[200px] rounded-full"
                alt="Profile Image"
              />
            ) : (
              <img
                src="https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                className="w-[200px] h-[200px] rounded-full bg-gray-200"
                alt="Default Profile Image"
              />
            )}

            {/* {loading ? (
              "data"
            ) : ( */}
          


            {/* name */}
            <h4 class="text-xl text-[#333] font-bold mt-3">
              {userDetails.firstName}
            </h4>
            {/* posstion */}
            <p class="text-sm text-gray-500 mt-1">Student</p>
            {/* Edit profile*/}

            <label
              htmlFor="uploadFile1"
              className="bg-gray-800 hover:bg-gray-700 text-white text-xs pr-3 pl-4 mt-2 py-1 outline-none rounded w-max cursor-pointer mx-auto block font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 mr-2 fill-white inline"
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
            </label>
          </div>

          <button
            onClick={handleUploadImage}
            type="button"
            className="px-4 py-1 mt-5 ml-[110px] rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-800 hover:bg-[#222] active:bg-[#333]"
          >
            Upload
          </button>
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
                  {userDetails.address
                    ? userDetails.address.address +
                      ", " +
                      userDetails.address.city +
                      ", " +
                      userDetails.address.district
                    : "-"}
                </td>
              </tr>
              {/* Nic */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">NIC No:</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.nic}{" "}
                </td>
              </tr>
              {/* DOB */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  Bate of Birth:
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.dob}{" "}
                </td>
              </tr>
              {/* Gender */}
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Gender:</td>
                <td class="px-6 py-1 text-gray-500 text-[17px]">
                  {userDetails.gender ? (
                    <td class=" py-4 text-gray-500 text-[17px]">
                      {userDetails.gender.charAt(0).toUpperCase() +
                        userDetails.gender.slice(1).toLowerCase()}
                    </td>
                  ) : (
                    <td class="px-6 py-4 text-gray-500 text-[17px]">-</td>
                  )}
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
                  Course:{" "}
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {userDetails.enroll ? userDetails.enroll.courseName : "-"}
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Batch:</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.enroll ? userDetails.enroll.batchCode : "-"}
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">
                  Date of Enroll
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {userDetails.enroll
                    ? new Date(userDetails.createdDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-lg text-[#333] font-bold">Role</td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">{role}</td>
              </tr>
            </tbody>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentProfile;
