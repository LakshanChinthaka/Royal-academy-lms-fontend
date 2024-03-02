import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";
import ConfirmAlert from "../../../utils/ConfiramAlert";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
 


function CourseCreate() {
  const { token } = useToken();
  const SCHOOL_URL = "http://localhost:8080/api/v1/school/find-all";
  const TYPE_URL = "http://localhost:8080/api/v1/enum/type";
  const CATEGORY_URL = "http://localhost:8080/api/v1/enum/category";
  const MEDIUM_URL = "http://localhost:8080/api/v1/enum/medium";
  const COURSE_ADD_URL = "http://localhost:8080/api/v1/course/add";

  // Message
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseId: 0,
    code: "",
    name: "",
    description: "",
    schoolId: "",
    courseType: null,
    category: null,
    medium: null,
    duration: "",
    fees: "",
    totalHours: "",
    totalCredit: "",
    // imageUrl: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSchoolChange = (selectedOption) => {
    if (selectedOption) {
      const schoolID = selectedOption.schoolID; // Assuming schoolID is the property name
      setFormData({ ...formData, schoolId: schoolID }); // Update formData with the selected schoolId
    } else {
      setFormData({ ...formData, schoolId: null }); // If no option is selected, set schoolId to null
    }
  };

  const handleTypeChange = (selectedOption) => {
    setFormData({ ...formData, courseType: selectedOption });
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption });
  };

  const handleMediumChange = (selectedOption) => {
    setFormData({ ...formData, medium: selectedOption });
  };

 console.log(formData)

// image upload to firebase
const handleSubmitWithImage = async (e) => {
  e.preventDefault();

  const confirmed = await ConfirmMessage(
    "Submit Confirmation",
    "Are you sure you want to Submit?",
    "Yes, Submit",
    "Cancel"
  );

  if (confirmed) {

    if (!img) return; 


    const fileName = `${formData.code}-course-Image`;

    const imgRef = ref(storage, `course/${fileName}`);

    try {
      const existingUrl = await getDownloadURL(imgRef);
      const existingImageRef = ref(storage, existingUrl);
      await deleteObject(existingImageRef);
      await uploadBytes(imgRef, img);
      const newImageUrl = await getDownloadURL(imgRef);

      console.log("Firebase Image url-", newImageUrl);

      console.log("Save file", formData)

      console.log("Save to db", formData);

      try {
        const res = await axios.post(
          COURSE_ADD_URL,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params:{
              imageUrl: newImageUrl
            }
          }
        );
  
        setFormData({
          courseId: 0,
          code: "",
          name: "",
          description: "",
          schoolId: "",
          courseType: null,
          category: null,
          medium: null,
          duration: "",
          fees: "",
          totalHours: "",
          totalCredit: "",
        });
        const confirmed = await SuccessMessage(res.data.data, "success");
        navigate("/admin/course");
    
      } catch (error) {
        // setLoading(false)
        const confirmed = await SuccessMessage(
          error.response.data.data,
          "error"
        );
      }
    } catch (error) {

      if (error.code === "storage/object-not-found") {
        await uploadBytes(imgRef, img);
        const newImageUrl = await getDownloadURL(imgRef);

        try {
          const res = await axios.post(
            COURSE_ADD_URL,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params:{
                imageUrl: newImageUrl
              }
            }
          );
    
          setFormData({
            courseId: 0,
            code: "",
            name: "",
            description: "",
            schoolId: "",
            courseType: null,
            category: null,
            medium: null,
            duration: "",
            fees: "",
            totalHours: "",
            totalCredit: "",
          });
          const confirmed = await SuccessMessage(res.data.data, "success");
          navigate("/admin/course");

        } catch (error) {
          const confirmed = await SuccessMessage(
            error.response.data.data,
            "error"
          );
        }

      } else {
        console.error("Error handling image:", error);
      }
    }
  }
};


  return (
    <div>
      <div>
        <div className="mt-[100px], pt-2 ml-10 w-8 absolute">
          <Link to="/admin/course">
            <BackButton />
          </Link>
        </div>
        <h2 class="text-2xl mt-5 ml-[200px] font-bold text-gray-700">
          Create New Course
        </h2>
      </div>
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmitWithImage}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label htmlFor="code" class="text-sm mb-2 block">
                Course Code
              </label>
              <input
                value={formData.code}
                onChange={handleChange}
                required
                name="code"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label class="text-sm mb-2 block">Course Name</label>
              <input
                value={formData.name}
                onChange={handleChange}
                required
                name="name"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label htmlFor="description" class="text-sm mb-2 block">
                Desciprion
              </label>
              <textarea
                max={5}
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={300}
                name="description"
                type="text"
                class="bg-gray-100 max-h-[300px] min-h-[100px] w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label htmlFor="LasttName" class="text-sm mb-2 block">
                Select School
              </label>
              <AutocompleteComponent
                endpoint={SCHOOL_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.schoolName}
                clearOnEscape={true}
                label=" Select school"
                onChange={handleSchoolChange}
              />
            </div>
            <div>
              <label htmlFor="LasttName" class="text-sm mb-2 block">
                Course Type
              </label>
              <AutocompleteComponent
                endpoint={TYPE_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option}
                clearOnEscape={true}
                label="Select type"
                onChange={handleTypeChange} // Use handleTypeChange for type selection
              />
            </div>
            <div>
              <label htmlFor="MobileNo" className="text-sm mb-2 block">
                Course Category
              </label>
              <AutocompleteComponent
                endpoint={CATEGORY_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option}
                clearOnEscape={true}
                label=" Select Category"
                onChange={handleCategoryChange}
              />
            </div>
            {/* Nic */}
            <div>
              <label htmlFor="NICNo" class="text-sm mb-2 block">
                Meduim
              </label>
              <AutocompleteComponent
                endpoint={MEDIUM_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option}
                clearOnEscape={true}
                label=" Select medium"
                onChange={handleMediumChange}
              />
            </div>
            <div>
              <label htmlFor="duration" class="text-sm mb-2 block">
                Duration
              </label>
              <input
                value={formData.duration}
                onChange={handleChange}
                required
                name="duration"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="fees" class="text-sm mb-2 block">
                Course Fees
              </label>
              <input
                value={formData.fees}
                onChange={handleChange}
                required
                name="fees"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="totalHours" class="text-sm mb-2 block">
                Total Hours
              </label>
              <input
                value={formData.totalHours}
                onChange={handleChange}
                required
                name="totalHours"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="totalCredit" class="text-sm mb-2 block">
                Total Credit
              </label>
              <input
                value={formData.totalCredit}
                onChange={handleChange}
                required
                name="totalCredit"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter name"
              />
            </div>






            <label
              htmlFor="uploadFile1"
              className="bg-gray-800 hover:bg-gray-700 text-center  text-white text-sm lg:ml-[200px]  sm:ml-[100px] md:ml-[100px] pr-3 pl-4 py-1 ml-3 mt-5 outline-none rounded w-max cursor-pointer mx-auto block "

            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 mr-2  fill-white inline items-center"
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
                class="hidden mt-10"
              />
              Uplaod cover image
            </label>









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
    </div>
  );
}

export default CourseCreate;
