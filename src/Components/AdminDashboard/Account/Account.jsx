import React, { useState, useEffect } from "react";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";

function Account() {
  const { token } = useToken();

  const [nic, setNic] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const [id, setId] = useState(0);
  const [role, setRole] = useState("");

  const SEARCH_URL = "http://localhost:8080/api/v1/student/find-by-nic";
  const ACCOUNT_CREATE_URL = "http://localhost:8080/api/v1/account/create";

  // Message
  const { SuccessMessage } = SuccessAlert();
  const { ConfirmMessage } = ConfirmAlert();

  const [data, setData] = useState({
    username: "",
    password: "",
    role: role,
    userId: id,
    userNic: nic,
  });

  const handleRb = (e) => {
    setRole(e.target.value);
    const roleToAssign = selectedRole === "STUDENT" ? "STUDENT" : "ADMIN";
    setRole(roleToAssign);
  };

  console.log("Role", role);

  console.log(id);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const payload = {
    ...data,
  };
  console.log("Account", payload);

  useEffect(() => {
    setData({ ...data, userId: id, role: role, userNic: nic }); // Update userId in data whenever id changes
  }, [id, role, nic]); // Trigger effect whenever id changes

  //Sumbit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await ConfirmMessage(
      "Submit Confirmation",
      "Are you sure you want to Create?",
      "Yes, Create",
      "Cancel"
    );

    if (confirmed) {
      try {
        const res = await axios.post(ACCOUNT_CREATE_URL, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData([]);

        const confirmed = await SuccessMessage(res.data.data, "success");
      } catch (error) {
        const confirmed = await SuccessMessage(
          error.response.data.data,
          "error"
        );
      }
    } else {
      Swal.fire("Account creation Cancelled", "", "info");
    }
  };

  //Search
  const handleSearchInputData = (e) => {
    const { name, value } = e.target;
    setNic(value); // Update nic state with the new value
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(SEARCH_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          nic: nic.trim(),
          role: role,
        },
      });

      setSearchData(res.data.data);
      setId(res.data.data.id);
      console.log("nId", res.data.data.id);
      console.log("Search Data - ", res.data.data);
    } catch (error) {
      const confirmed = await SuccessMessage(error.response.data.data, "error");
    }
  };

  // Email validation regex pattern
  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <div className="justify-center item-center">

      <div className="mt-3 ml-3 xl:ml-[330px]  md:ml-[3%]  lg:ml-[130px] ">
        
        <div className="mt-1">
          <BackButton onClick={() => navigate(-1)} />
        </div>

        <h2 class="text-2xl mt-2 font-bold text-gray-700">
          Create Account
        </h2>

      </div>

      <div className=" mt-3 ml-[-25px]">

           {/* Role */}
           <div class="md:space-y-6 gap-5 mt-2 lg:ml-[120px]  xl:ml-[310px] lg:my-3 inline-block">
          <div class="inline-block ml-10">
            <input
              type="radio"
              value="STUDENT"
              checked={role === "STUDENT"}
              onChange={handleRb}
              class="w-5 h-5"
            />
            <label class="text-sm text-black ml-4">Student</label>
          </div>

          <div class="inline-block ml-10">
            <input
              type="radio"
              class="w-5 h-5"
              value="ADMIN"
              checked={role === "ADMIN"}
              onChange={handleRb}
            />
            <label class="text-sm text-black ml-4">Employee</label>
          </div>
        </div>
        

        {/* Search feild */}
        <div class="bg-gray-50 mt-5 mb-5 ml-10 mr-4 lg:ml-[155px] xl:ml-[350px] flex px-1 py-1 rounded-full border border-blue-300 overflow-hidden max-w-md mx-auto font-[sans-serif]">
          <input
            value={nic.nic}
            onChange={handleSearchInputData}
            required
            type="text"
            name="nic"
            placeholder="Search by NIC no"
            class="w-full outline-none bg-white pl-4 text-sm"
          />
          <button
            onClick={handleSearch}
            type="button"
            class="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
          >
            Search
          </button>
        </div>

     
      </div>
    
      {/*From data  */}
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">

          <div>
              <label htmlFor="username" class="text-sm mb-2 block">
                Student Name
              </label>
              <input
                value={`${SearchData.firstName ? SearchData.firstName : ""} ${SearchData.lastName ? SearchData.lastName : ""}`}
                disabled
                className={`bg-yellow-100 w-full text-sm border px-4 py-3.5 rounded-md outline-blue-500
                 ${ SearchData.firstName ? 'border-green-300' : 'border-blue-100' }`}
                placeholder="Student name"
              />
            </div>

            <div>
              <label htmlFor="username" class="text-sm mb-2 block">
                Student Nic
              </label>
              <input
                value={`${SearchData.nic ? SearchData.nic: ""} `}
                disabled
                className={`bg-yellow-100 w-full text-sm border px-4 py-3.5 rounded-md outline-blue-500 ${
                  SearchData.nic ? 'border-green-300' : 'border-blue-100'
                }`}
                placeholder="Search nic"
              />
            </div>

            <div>
              <label htmlFor="username" class="text-sm mb-2 block">
                Username
              </label>
              <input
                value={data.username}
                onChange={handleChange}
                required
                // disabled
                // Validate email format
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Please enter a valid email address"
                name="username"
                type="email"
                class="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label class="text-sm mb-2 block"> Password</label>
              <input
                value={data.password}
                onChange={handleChange}
                required
                name="password"
                type="text"
                class="bg-gray-200 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter password"
              />
            </div>
          </div>
          <button
            type="submit"
            class=" mt-5 max-w-[200px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Account;
