import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import EditButton from "../ActionButton/EditButton";
import DeleteButton from "../ActionButton/DeleteButton";
import SuccessAlert from "../../../utils/SuccessAlert";

function StudentTable() {
  const { token } = useToken();
  const { SuccessMessage } = SuccessAlert();

  const [studentData, setStudentData] = useState([]);

  const STUDENT_URL = "http://localhost:8080/api/v1/student/find";
  const STUDENT_DELETE_URL =
    "http://localhost:8080/api/v1/student/delete-by-id";

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const pageSize = 10; // Number of items per page

  //Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getStudentData();
  }, [currentPage]);

  //get data from backend
  const getStudentData = async () => {
    try {
      const res = await axios.get(STUDENT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setStudentData(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setTotalElement(res.data.data.totalElements)
      console.log("Content-", res.data.data.content);
    } catch (error) {
      const confirmed = await SuccessMessage(
        error.response.data.data,
        "error"
      );
      console.error("Error fetching Student data:", error);
    }
  };

  const tableHeaders = [
    "Profile",
    "Course",
    "Batch",
    "Email",
    "Gender",
    "Address",
    "City",
    "Action",
  ];

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          Filter option
        </Grid>
        <Grid item xs={6}>
          Filter option
        </Grid>
        <Grid container>
          <Grid item xs={12}>

            <h2 class="inline-block text-sm pr-10 mb-2 ml-3  font-bold text-gray-700">
              Total Student- {totalElement}
            </h2>


            <div class="overflow-x-auto pb-8">
              <table class="min-w-full bg-white font-[sans-serif]">
                <thead class="bg-gray-800 whitespace-nowrap">
                  {/* Table deader */}
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <th
                        key={index}
                        class="pr-6 pl-5  py-3 text-left text-sm font-semibold text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody class="whitespace-nowrap divide-y divide-gray-200">
                  {studentData.map((data, index) => (
                    <tr key={index} className="even:bg-blue-50">
                      <td class="px-6 py-3 text-sm">

                        <div class="flex items-center ">
                          {data.imageUrl ? <img src={data.imageUrl} className="w-9 h-9 rounded-full shrink-0"/> : <img
                             src="https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                            class="w-9 h-9 rounded-full shrink-0  border-2 border-gray-300"
                          />}

                          <div class="ml-4">

                            <p class="text-sm text-black">
                              {data.firstName + " " + data.lastName}
                            </p>
                            <p class="text-xs text-gray-400">NIC: {data.nic}</p>
                          </div>

                        </div>
                      </td>
                      <td class="px-6 py-3 whitespace-normal text-sm ">
                        {data.enroll == null ? "No enroll" : `${data.enroll.courseName}`}
                      </td>
                      <td class="px-6 py-3 text-sm ">
                        {data.enroll == null ? "No enroll" : data.enroll.batchCode}
                      </td>
                      <td class="px-6 py-3 text-sm ">{data.mobileNo}</td>
                      <td class="px-6 py-3 text-sm ">{data.gender.charAt(0).toUpperCase() +
                        data.gender.slice(1).toLowerCase()}</td>

                      <td class="px-6 py-3 whitespace-normal text-sm ">
                        {data.address.address}
                      </td>

                      <td class="px-6 py-3 text-sm ">{data.address.district}</td>

                      <td className="pl-5 pr-2 py-4 flex justify-center items-center">
                        <Link to={`/admin/subject/update/${data.id}`}>
                          <EditButton />
                        </Link>

                        <DeleteButton
                          id={data.id}
                          DELETE_URL={STUDENT_DELETE_URL}
                        />
                      </td>
                      {/* <td class="pr-2 pl-4 py-1 text-sm text-left">
                        <Link
                          // to={`/admin/student/info/${data.id}`}
                          to={`/admin/student/info/${data.id}/${data.firstName}/${data.lastName}/${data.nic}/${data.mobileNo}/${data.gender}/${data.dob}/${data.activeStatus}/${data.imageUrl}/${data.address}/${data.enroll && data.enroll.enrollId != null ? data.enroll.enrollId : ""}/${data.enroll && data.enroll.batchId != null ? data.enroll.batchId : ""}/${data.enroll && data.enroll.batchCode != null ? data.enroll.batchCode : ""}/${data.enroll && data.enroll.courseId != null ? data.enroll.courseId : ""}/${data.enroll && data.enroll.courseName != null ? data.enroll.courseName : ""}/${data.enroll && data.enroll.enrollDate != null ? data.enroll.enrollDate : ""}`}
                          >
                          <svg
                            fill="#0071e1"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 416.979 416.979"
                            xml:space="preserve"
                            stroke="#0071e1"
                            className="w-6 h-6"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <g>
                                <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path>{" "}
                              </g>
                            </g>
                          </svg>
                        </Link>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pgination */}
              <div className="md:flex mt-4 px-6">
                <p className="text-sm text-gray-400 flex-1">
                  Showing {currentPage * pageSize + 1} to{" "}
                  {Math.min(
                    currentPage * pageSize + pageSize,
                    currentPage * pageSize + studentData.length
                  )}{" "}
                  of {totalPages * pageSize} entries
                </p>
                {/* Pagination  */}
                <div className="flex items-center max-md:mt-5 mb-1">
                  <Stack spacing={3}>
                    <Pagination
                      count={totalPages}
                      shape="rounded"
                      color="primary"
                      page={currentPage + 1}
                      onChange={(e, page) => handlePageChange(page - 1)}
                    />
                  </Stack>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default StudentTable;
