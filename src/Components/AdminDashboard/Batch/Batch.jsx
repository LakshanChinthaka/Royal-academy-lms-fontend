import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../../utils/Button/Button";
import DeleteButton from "../ActionButton/DeleteButton";


function Batch() {
  const [subjectData, setSubjectData] = useState([]);
  const { token } = useToken();
  const BATCH_URL = "http://localhost:8080/api/v1/batch/find";
  const DELETE_URL = "http://localhost:8080/api/v1/batch/delete";

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
    getBatchData();
    console.log(subjectData);
  }, [currentPage]);

  const getBatchData = async () => {
    try {
      const res = await axios.get(BATCH_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setSubjectData(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setTotalElements(res.data.data.totalElements);
      console.log(subjectData);
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  const tableHeaders = [
    "Code",
    "Status",
    "No of Student",
    "Course",
    "School",
    "Student Assign",
    "Action",
    "Info",
  ];

  return (
    <div>
      <Grid container></Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <div className="grid justify-items-end mr-9 mt-2">
              <Link to="/admin/batch/add">
                <Button name={"Add New"} />
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <div className="inline-block">
        <h2 class="inline-block text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
          Total Batch- {totalElements}
        </h2>

        <h2 class="inline-block text-xl justify-items-center ml-[400px] mt-2  font-bold text-gray-700">
          All Batch
        </h2>
      </div>

      <div class="mb-5">
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

          {/* Table body */}
          <tbody class="whitespace-normal">
            {subjectData.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                class="even:bg-blue-50"
              >
                <td class="pr-2 pl-4 py-4 text-sm text-left">{data.code}</td>
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
                <td class="pr-2 pl-4 py-1 text-sm text-center">15</td>
                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  {data.courseName}
                </td>
                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  {data.schoolName}
                </td>

                <td class="pr-2 pl-4 py-1 text-sm text-center">
                <Link to={`/admin/batch/assign/${data.batchId}/${data.code}`}>
                 <button
                    type="button"
                    class="w-6 h-6 inline-flex items-center justify-center rounded-full border-none outline-none bg-purple-600 hover:bg-purple-700 active:bg-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      fill="#fff"
                      class="inline"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                 </Link>
                </td>


                <td class="pr-2 pl-4 py-1 text-sm text-center">
                  <DeleteButton id={data.batchId} DELETE_URL={DELETE_URL} />
                </td>
                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  <Link to={`/admin/batch/info/${data.batchId}`}>
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
                </td>
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
              currentPage * pageSize + subjectData.length
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
    </div>
  );
}

export default Batch;
