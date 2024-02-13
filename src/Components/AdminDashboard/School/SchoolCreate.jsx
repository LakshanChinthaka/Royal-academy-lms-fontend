import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from '../../Context/TokenProvider';

function SchoolCreate() {
  const { token } = useToken();

  const { SuccessMessage } = SuccessAlert();

  const [data, setData] = useState({
    schoolCode: "",
    schoolName: "",
  });

  const navigate = useNavigate();

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
        Create School
      </h2>
      </div>
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
            <div>
              <label htmlFor="FirstName" class="text-sm mb-2 block">
                School code
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
              <label class="text-sm mb-2 block"> Name of School</label>
              <input
                value={data.schoolName}
                onChange={handleChange}
                required
                name="schoolName"
                type="text"
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter last name"
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

export default SchoolCreate;
