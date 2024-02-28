import React, { useEffect, useState } from "react";
import { Grid,CircularProgress } from "@mui/material";
import axios from "axios";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import EditButton from "../ActionButton/EditButton";
import DeleteButton from "../ActionButton/DeleteButton";
import { useToken } from '../../Context/TokenProvider';
import Loading from "../../../utils/Loading/Loading";

function School() {
  const [schoolDetails, setSchooldetails] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const { token } = useToken();
  const DELETE_URL = "http://localhost:8080/api/v1/school/delete";
  const [loading, setLoading] = useState(true); 



  useEffect(() => {
    getSchoolData();
  }, []);



  const getSchoolData = async () => {
    console.log("Start get data")
    setLoading(true);
    try {

      const URL = "http://localhost:8080/api/v1/school/find-all";
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Parse date arrays to string format
      const parsedData = response.data.data.map((school) => ({
        ...school,
        createdDate: new Date(...school.createdDate).toLocaleString(),
        modifiedData: new Date(...school.modifiedData).toLocaleString(),
      }));
      setSchooldetails(parsedData);
      console.log(parsedData);
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
     finally {
      console.log("Final block")
      setLoading(false); 
    }
  };

  //filter data
  const filteredSchoolDetails = schoolDetails.filter(
    (school) =>
      filterStatus === "All" || school.activeStatus === (filterStatus === "Active")
  );

  const handleFilterSelect = (selectedOption) => {
    setFilterStatus(selectedOption); // Update filterStatus
  };

  if (loading) {
    console.log("Loading....")
    return (
      <Loading/>
    );
  }


  

  return (
    <div>
      <Grid container>
        <Grid item xs={4} className="mb-2">
          <Dropdown
            options={["All", "Active", "Inactive"]}
            label={`Selected Status: ${filterStatus}`}
            onSelect={handleFilterSelect}
          />
        </Grid>
        <Grid item xs={6}>
          {/* Filter option */}
        </Grid>
        <Grid item xs={2}>
          <Link to="/admin/school/add">
            <button
              type="button"
              class="px-6 flex justify-items-end mt-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                fill="#fff"
                class="inline mr-3"
                viewBox="0 0 512 512"
              >
                <path
                  d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                  data-original="#000000"
                />
              </svg>
              Add New
            </button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-[sans-serif]">
              <thead class="bg-gray-300 whitespace-nowrap">
                <tr>
                  <th class="pr-6 pl-3  py-3 text-left text-sm font-semibold text-gray-700">
                    Code
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Create Date
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Create By
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Modify Date
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Modify By
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {filteredSchoolDetails.map((data, index) => (
                  <tr key={index} className="even:bg-blue-50">
                    <td className="pr-6 pl-4 py-4 text-sm">
                      {data.schoolCode}
                    </td>
                    <td className="pl-2 pr-2 py-4 text-sm">
                      {data.schoolName}

                    </td>
                    <td className="px-6 py-4 text-sm">
                      {data.activeStatus ? (
                        <span class="w-[68px] block text-center py-0.5 border-2 border-green-500 text-green-500 font-semibold rounded text-xs">
                          Active
                        </span>
                      ) : (
                        <span class="w-[68px] block text-center py-0.5 border-2 border-red-500 text-red-500 font-semibold rounded text-xs">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">{data.createdDate}</td>
                    <td className="px-6 py-4 text-sm">{data.createBy}</td>
                    <td className="px-6 py-4 text-sm">{data.modifiedData}</td>
                    <td className="px-6 py-4 text-sm">{data.modifiedBy}</td>
                    <td class="pl-2 pr-2 py-4 flex">
      
                      <Link to={`/admin/school/update/${data.schoolID}/${data.schoolCode}`}>
                        <EditButton />
                      </Link>

                      <DeleteButton id={data.schoolID} DELETE_URL={DELETE_URL} />
                    </td>
                    {/* Add other columns here */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default School;
