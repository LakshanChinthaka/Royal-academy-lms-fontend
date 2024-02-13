import React, { useState } from "react";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";
import { useToken } from "../../Context/TokenProvider";

function SchoolUpdate() {
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();
  const { token } = useToken();

  const [data, setData] = useState({
    schoolName: "",
  });

  const { id, code } = useParams();

  console.log("School ID:", id);
  console.log("School code:", code);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const payload = {
    ...data,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await ConfirmMessage(
      "Update Confirmation",
      "Are you sure you want to Update?",
      "Yes, Update",
      "Cancel"
    );

    console.log(payload);
    if(confirmed){
      e.preventDefault();
      const URL = `http://localhost:8080/api/v1/school/edit?id=${id}`; 

      try {
        const res = await axios.put(URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData({
          schoolName: "",
        });

        const confirmed = await SuccessMessage(res.data.data, "success");
        navigate("/admin/school");
        //got to back
      } catch (error) {
        const confirmed = await SuccessMessage(error.response.data.data, "error");
      }
    }else{
      Swal.fire("Update Cancelled", "", "info");
    }
  };

  return (
    <div>
      <div className="mt-10">
        <div className="mt-10, ml-10">
          {/* <BackButton onClick={() => navigate(-1)} /> */}
          <Link to="/admin/school">
          <BackButton  />
          
          </Link>
        </div>
        <h2 class="text-2xl mt-5 ml-[200px] font-bold text-gray-700">
          Update School Details
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
                value={code}
                readOnly // Make the input field read-only
                name="schoolCode" // Optional: You can remove this if it's not needed
                type="text"
                className="bg-yellow-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default SchoolUpdate;
