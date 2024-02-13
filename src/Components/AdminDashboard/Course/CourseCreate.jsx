import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";

function CourseCreate() {
  const { token } = useToken();
  const URL = "http://localhost:8080/api/v1/school/find-all";
  const TypeURL = "http://localhost:8080/api/v1/enum/type";
  const CategoryURL = "http://localhost:8080/api/v1/enum/category";
  const MediumURL = "http://localhost:8080/api/v1/enum/medium";
  const BASE_URL = "http://localhost:8080/api/v1/course/add";

  // Message
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();

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
  });
  //   const [selectedSchoolId, setSelectedSchools] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await ConfirmMessage(
      "Submit Confirmation",
      "Are you sure you want to Submit?",
      "Yes, Submit",
      "Cancel"
    );

    if (confirmed) {
      try {
        const res = await axios.post(BASE_URL, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const confirmed = await SuccessMessage(res.data.data, "success");

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
      } catch (error) {
        const confirmed = await SuccessMessage(
          error.response.data.data,
          "error"
        );
      }
    } else {
      Swal.fire("Sumbit Cancelled", "", "info");
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
        <form onSubmit={handleSubmit}>
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
                endpoint={URL}
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
                endpoint={TypeURL}
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
                endpoint={CategoryURL}
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
                endpoint={MediumURL}
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
