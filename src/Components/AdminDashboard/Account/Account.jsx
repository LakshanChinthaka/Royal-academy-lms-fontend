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
      <div className="mt-10 ml-[10%]">
        <div className="mt-10, ml-10">
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <h2 class="text-2xl mt-5 ml-[200px] font-bold text-gray-700">
          Create Account
        </h2>
      </div>

      <div className="inline-flex ml-[10%]">
        {/* Search feild */}
        <div class="bg-white mt-5 mb-5 ml-[200px] flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
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

        {/* Gender */}
        <div class="space-y-6 gap-5 mt-2 inline-block">
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
      </div>
      <div className="flex ml-[16%] mt-10 mb-5">
        <p className="text-sm font-bold text-gray-700 ml-[100px]">
          Name: {SearchData.firstName ? SearchData.firstName : "-"}{" "}
          {SearchData.lastName ? SearchData.lastName : "-"}
        </p>

        <p className="text-sm font-bold text-gray-700 ml-[100px]">
          Nic no: {SearchData.nic ? SearchData.nic : "-"}
        </p>
      </div>

      {/*From data  */}
      <div class="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
        <form onSubmit={handleSubmit}>
          <div class="grid sm:grid-cols-2 gap-y-7 gap-x-12">
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
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
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
                class="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
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
