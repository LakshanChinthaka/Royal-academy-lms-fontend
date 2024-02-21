import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import { useState } from "react";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";
import BatchDropdwon from "../../../utils/BatchDropdown";

function AssigmentAdd() {
  const { token } = useToken();

  // Message
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();

  const COURSE_URL = "http://localhost:8080/api/v1/course/find-with-name";
  const ASSIGNMENT_ADD_URL = "http://localhost:8080/api/v1/assignment/add";

  const [courseId, setCourseID] = useState({
    courseId: "",
  });

  console.log("Course id-", courseId.courseId);

  const [formData, setFormData] = useState({
    assiCode: "",
    batchId: "",
    deadLine: "",
  });

  const navigate = useNavigate();

  //Handle school
  const handleBatchChnage = (selectedOption) => {
    if (selectedOption) {
      const id = selectedOption.batchId;
      setFormData({ ...formData, batchId: id });
    } else {
      setFormData({ ...formData, batchId: null });
    }
  };

  //Seach batch details by course id
  const BATCH_URL = `http://localhost:8080/api/v1/batch/find-all?id=${courseId.courseId}`;

  //Handle course
  const handleCourseChange = (selectedOption) => {
    if (selectedOption) {
      const Id = selectedOption.courseId; // Assuming schoolID is the property name
      setCourseID({ ...courseId, courseId: Id }); // Update formData with the selected schoolId
    } else {
      setCourseID({ ...courseId, courseId: null }); // If no option is selected, set schoolId to null
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const payload = {
    ...formData,
  };
  console.log("Payload", payload);

  //Sumbit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await ConfirmMessage(
      "Save Confirmation",
      "Are you sure you want to Add?",
      "Yes, Add",
      "Cancel"
    );

    if (confirmed) {
      try {
        const res = await axios.post(BATCH_ADD_URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const confirmed = await SuccessMessage(res.data.data, "success");

        navigate(-1);
        //got to back
      } catch (error) {
        const confirmed = await SuccessMessage(
          error.response.data.data,
          "error"
        );

        setData({
          code: "",
          courseId: "",
          schoolId: "",
        });
      }
    } else {
      Swal.fire("Sumbit Cancelled", "", "info");
    }
  };

  return (
    <div>
      <div className="mt-10">
        <div className="mt-10, ml-10">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h2 class="text-2xl mt-5 mb-5 ml-[330px] font-bold text-gray-700">
          Add Assigment
        </h2>
      </div>
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label htmlFor="assiCode" class="text-sm mb-2 block">
                Assigment code
              </label>
              <input
                value={formData.assiCode}
                onChange={handleChange}
                required
                name="assiCode"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter code"
              />
            </div>
            <div>
              <label htmlFor="LasttName" class="text-sm mb-2 block">
                Select Course
              </label>
              <AutocompleteComponent
                endpoint={COURSE_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.name}
                clearOnEscape={true}
                label=" Select course"
                onChange={handleCourseChange}
              />
            </div>
            <div>
              <label htmlFor="LasttName" class="text-sm mb-2 block">
                Select Batch
              </label>
              <BatchDropdwon
                endpoint={BATCH_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.code}
                clearOnEscape={true}
                label=" Select Batch"
                onChange={handleBatchChnage}
              />
            </div>

            {/* Date of birth day */}
            <div class="relative w-full">
              <label htmlFor="deadLine" className="text-sm mb-2 block">
                Deadline
              </label>
              <input
                value={formData.deadLine}
                onChange={handleChange}
                // selected={dob}
                name="deadLine"
                type="date"
                className="bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
              />
            </div>

            {/* file upload button */}
            <div class="space-y-8 font-[sans-serif] ml-[4px] mt-5 mb-5 max-w-md mx-auto">
              <input
                type="file"
                class="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
              />
            </div>
          </div>

          {/* Sumbit button */}
          <button
            type="submit"
            class=" mt-5 max-w-[200px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssigmentAdd;
