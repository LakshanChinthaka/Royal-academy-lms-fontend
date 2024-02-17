import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import { useState } from "react";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";

function BatchCreate() {
  const { token } = useToken();

  // Message
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();

  const BATCH_ADD_URL = "http://localhost:8080/api/v1/batch/add";
  const SCHOOL_URL = "http://localhost:8080/api/v1/school/find-all";
  const COURSE_URL = "http://localhost:8080/api/v1/course/find-with-name";

  const [formData, setFormData] = useState({
    code: "",
    courseId: "",
    schoolId: "",
  });

  const navigate = useNavigate();

  //Handle school
  const handleSchoolChange = (selectedOption) => {
    if (selectedOption) {
      const schoolId = selectedOption.schoolID; // Assuming schoolID is the property name
      setFormData({ ...formData, schoolId: schoolId }); // Update formData with the selected schoolId
    } else {
      setFormData({ ...formData, schoolId: null }); // If no option is selected, set schoolId to null
    }
  };

  //Handle sourse
  const handleCourseChange = (selectedOption) => {
    if (selectedOption) {
      const courseId = selectedOption.courseId; // Assuming schoolID is the property name
      setFormData({ ...formData, courseId: courseId }); // Update formData with the selected schoolId
    } else {
      setFormData({ ...formData, courseId: null }); // If no option is selected, set schoolId to null
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
  console.log(payload);

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
        <h2 class="text-2xl mt-5 ml-[200px] font-bold text-gray-700">
          Create Batch
        </h2>
      </div>
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label htmlFor="code" class="text-sm mb-2 block">
                Batch code
              </label>
              <input
                value={formData.code}
                onChange={handleChange}
                required
                name="code"
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
          </div>
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

export default BatchCreate;
