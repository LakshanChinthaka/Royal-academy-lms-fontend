import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import DeleteButton from "../ActionButton/DeleteButton";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

function BatchInfo() {
  const { token } = useToken();
  const { id, code, courseName, schoolName } = useParams();
  const [studentData, setStudentData] = useState([]);

  const GET_ALL_STUENT_BY_BATCH_ID = "http://localhost:8080/api/v1/enroll/find";
  const DELETE_STUDENT = "http://localhost:8080/api/v1/enroll/remove";

  //Pagindation
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10; // Number of items per page

  //Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getStudentData();
  }, [currentPage]);

  const getStudentData = async () => {
    try {
      const res = await axios.get(GET_ALL_STUENT_BY_BATCH_ID, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
          page: currentPage,
          size: pageSize,
        },
      });

      setStudentData(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setTotalElements(res.data.data.totalElements);
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  console.log("studet", studentData.firstName);

  return (
    <div>
      <Grid container>
        <Grid item xs={4} className="mb-2">
          <div className="flex mt-3  mb-3 ml-50">
            <Link to="/admin/batch" className="mt-3 ml-10">
              <BackButton />
            </Link>
          </div>

          <div className="ml-10 mb-3">
            <tbody class="whitespace-nowrap">
              <tr>
                <td class="px-6 py-1 text-sm text-[#333] whitespnace-wrap font-bold">
                  Batch code:
                </td>
                <td class="px-6 py-2 text-gray-500 text-sm">{code}</td>
              </tr>
              <tr>
                <td class="px-6 py-2 text-sm text-[#333] font-bold">
                  Course Name:
                </td>
                <td class="px-6 py-2 text-gray-500 text-sm">{courseName}</td>
              </tr>
              <tr>
                <td class="px-6 py-2   text-sm text-[#333] font-bold">
                  School name:
                </td>
                <td class="px-6 py-2 text-gray-500 text-sm">{schoolName}</td>
              </tr>
              <tr>
                <td class="px-6 py-2   text-sm text-[#333] font-bold">
                  Total Student:
                </td>
                <td class="px-6 py-2 text-gray-500 text-sm">{totalElements}</td>
              </tr>
            </tbody>
          </div>
        </Grid>
        <Grid item xs={6}>
          {/* Filter option */}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-[sans-serif]">
              <thead class="bg-gray-300 whitespace-nowrap">
                <tr>
                  <th class="pr-6 pl-3  py-3 text-left text-sm font-semibold text-gray-700">
                    Assign id
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Nic
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Gender
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Assign date
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Assign by
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {studentData && studentData.length > 0 ? (
                  studentData.map((data, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                    >
                      <td className="pr-6 pl-4 py-4 text-sm">
                        {data.enrollId}
                      </td>
                      <td className="pl-2 pr-2 py-4 text-sm">
                        {data.firstName + " " + data.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm">{data.nic}</td>
                      <td className="px-6 py-4 text-sm">
                        {data.gender.charAt(0).toUpperCase() +
                          data.gender.slice(1).toLowerCase()}
                      </td>
                      <td className="px-6 py-4 text-sm">{data.enrollDate}</td>
                      <td className="px-6 py-4 text-sm">{data.assignBy}</td>
                      <td className="pl-2 pr-2 py-4 flex text-center">
                        <DeleteButton
                          id={data.studentId}
                          DELETE_URL={DELETE_STUDENT}
                        />
                      </td>
                      {/* Add other columns here */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-4 ml-10 text-center" colSpan="8">
                      No data
                    </td>
                  </tr>
                )}
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
    </div>
  );
}

export default BatchInfo;
