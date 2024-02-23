import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../Context/TokenProvider";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../Components/firebase";
import SuccessAlert from "../../utils/SuccessAlert";
import Loading from "../../utils/Loading/Loading";

function ProfilePage() {
  const { token } = useToken();
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);

  const [userDetails, setUserDetails] = useState({});
  const { SuccessMessage } = SuccessAlert();

  const PROFILE_URL = "http://localhost:8080/profile";
  const UPLOAD_IMAGE_URL = "http://localhost:8080/api/v1/employee/upload";

  //ROLE_ADMIN convert to Admin
  const role =
    localStorage.getItem("userRole").slice(5).charAt(0).toUpperCase() +
    localStorage.getItem("userRole").slice(6).toLowerCase();

  //Convert to data
  const dateOfJoin = new Date(userDetails.createdDate).toLocaleDateString();

  useEffect(() => {
    loadUser();
  }, []);
  console.log("File img: ", img);

  //load user detailsfrom api
  const loadUser = () => {
    setLoading(true);
    try {
      axios
        .get(PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserDetails(response.data.data);
          // setEId(response.data.data.id);
        });
    } catch (error) {
      setLoading(false)
      console.log("Load user:", error);

    } finally {

      console.log("Final block");
      setLoading(false);
    }
  };

  //file upload
  const handleUploadImage = async () => {
    if (!img) return; // Check if img is selected
    setLoading(true)
    // Dynamically generate the filename
    const fileName = `${userDetails.firstName}-profile`;

    const imgRef = ref(storage, `admin/profile/${fileName}`);

    try {
      // Check if an existing image already exists
      const existingUrl = await getDownloadURL(imgRef);
      // If an existing image is found, delete it
      const existingImageRef = ref(storage, existingUrl);
      await deleteObject(existingImageRef);
      // Upload the new image
      await uploadBytes(imgRef, img);
      // Get the download URL of the newly uploaded image
      const newImageUrl = await getDownloadURL(imgRef);

      console.log("Firebase Image url-", newImageUrl);


      uploadImageToDb(newImageUrl);

    } catch (error) {
      if (error.code === "storage/object-not-found") {
        // If no existing image is found, directly upload the new image
        await uploadBytes(imgRef, img);
        // Get the download URL of the newly uploaded image
        const newImageUrl = await getDownloadURL(imgRef);

        const confirmed = await SuccessMessage(
          "Image uploaded successfully",
          "success"
        );

        uploadImageToDb(newImageUrl);
      } else {
        setLoading(false)
        console.error("Error handling image:", error);
      }
    }
  };


  const uploadImageToDb = (newImageUrl) => {
    const payload = {
      employeeId: userDetails.id,
      imageUrl: newImageUrl,
    };

    console.log("4-Uplaod payload:", payload);
    try {
      axios.put(UPLOAD_IMAGE_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //refresh
      loadUser();

      const confirmed = SuccessMessage(
        "Image uploaded successfully",
        "success"
      );

    } catch (error) {
      console.error("Error:", error);
      setLoading(false)
    }
    setLoading(false)
  };


  if (loading) {
    console.log("Loading....")
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Grid container spacing={2} columns={5}>
        <Grid item xs={1}>
          <div className="flex flex-wrap items-center mt-10 ml-5 flex-col  rounded-full">
            {/* profile img */}
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
            {/* name */}
            <h4 className="text-xl text-[#333] font-bold mt-3">
              {userDetails.firstName}
            </h4>
            {/* posstion */}
            <p className="text-sm text-gray-500 mt-1">
              {userDetails.employeeType}
            </p>

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
            <tbody className="whitespace-nowrap">
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  {" "}
                  Full Name:
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.firstName + " " + userDetails.lastName}
                </td>
              </tr>
              {/* Mobule No */}
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  {" "}
                  Mobile No
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.mobileNo}
                </td>
              </tr>

              {/* Address */}
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  {" "}
                  Address:
                </td>
                <td className="px-6 py-4 whitespace-normal text-gray-500 text-[17px]">
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
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  NIC No:
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.nic}{" "}
                </td>
              </tr>
              {/* DOB */}
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  Bate of Birth:
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">
                  {" "}
                  {userDetails.dob}{" "}
                </td>
              </tr>
              {/* Gender */}
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  Gender:
                </td>
                <td className="px-6 py-1 text-gray-500 text-[17px]">
                  {userDetails.gender ? (
                    <td className=" py-4 text-gray-500 text-[17px]">
                      {userDetails.gender.charAt(0).toUpperCase() +
                        userDetails.gender.slice(1).toLowerCase()}
                    </td>
                  ) : (
                    <td className="px-6 py-4 text-gray-500 text-[17px]">-</td>
                  )}
                </td>
              </tr>
            </tbody>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className=" mt-[40px]">
            <tbody className="whitespace-nowrap">
              {/* Qualification */}
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  Qualification:{" "}
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">
                  {userDetails.qualification
                    ? userDetails.qualification.qualification
                    : "-"}
                </td>
              </tr>

              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  Work Experince:
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">
                  {userDetails.experince}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  Date of Join
                </td>
                <td class="px-6 py-4 text-gray-500 text-[17px]">
                  {dateOfJoin}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-lg text-[#333] font-bold">
                  Role
                </td>
                <td className="px-6 py-4 text-gray-500 text-[17px]">{role}</td>
              </tr>
            </tbody>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfilePage;
