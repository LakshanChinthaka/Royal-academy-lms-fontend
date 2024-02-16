import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from '../../Context/TokenProvider';
import { useState } from "react";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";

function BatchCreate() {
  const { token } = useToken();
  const { SuccessMessage } = SuccessAlert();

  const SCHOOL_URL = "http://localhost:8080/api/v1/school/find-all";
  const COURSE_URL ="http://localhost:8080/api/v1/course/find-all";

  const [data, setData] = useState({
    code: "",
    courseId: "",
    schoolId: ""
  });

  const navigate = useNavigate();

  //Handle school
  const handleSchoolChange = (selectedOption) => {
    if (selectedOption) {
      const schoolID = selectedOption.schoolID; // Assuming schoolID is the property name
      setFormData({ ...formData, schoolId: schoolID }); // Update formData with the selected schoolId
    } else {
      setFormData({ ...formData, schoolId: null }); // If no option is selected, set schoolId to null
    }
  };

  //Handle sourse
  const handleCourseChange = (selectedOption) => {
    if (selectedOption) {
      const schoolID = selectedOption.courseId; // Assuming schoolID is the property name
      setFormData({ ...formData, courseId: courseId }); // Update formData with the selected schoolId
    } else {
      setFormData({ ...formData, courseId: null }); // If no option is selected, set schoolId to null
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const payload = {
    ...data,
  };
  console.log(payload);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "http://localhost:8080/api/v1/school/add";
    try {
      const res = await axios.post(URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        schoolCode: "",
        schoolName: "",
      });

      const confirmed = await SuccessMessage(
        res.data.data,
        "success"
      );
      navigate(-1);
      //got to back
      
    } catch (error) {
      const confirmed = await SuccessMessage(error.response.data.data, "error");
    }
  };

  return (
    <div>
      <div className="mt-10">
       <div className="mt-10, ml-10">
       <BackButton  onClick={() => navigate(-1)}/>
       </div>
      <h2 class="text-2xl mt-5 ml-[200px] font-bold text-gray-700">
        Create Batch
      </h2>
      </div>
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label htmlFor="FirstName" class="text-sm mb-2 block">
                Batch code
              </label>
              <input
                value={data.schoolCode}
                onChange={handleChange}
                required
                // disabled
                name="schoolCode"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter name"
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
                Select School
              </label>
              <AutocompleteComponent
                endpoint={COURSE_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.courseName}
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
  )
}

export default BatchCreate