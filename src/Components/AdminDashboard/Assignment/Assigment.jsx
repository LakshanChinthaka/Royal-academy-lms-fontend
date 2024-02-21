import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../../utils/Button/Button";
import DeleteButton from "../ActionButton/DeleteButton";

function Assigment() {
  const [subjectData, setSubjectData] = useState([]);
  const { token } = useToken();
  const SUBJECT_URL = "http://localhost:8080/api/v1/subject/find";
  const DELETE_URL = "http://localhost:8080/api/v1/subject/delete";

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
      const res = await axios.get(SUBJECT_URL, {
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
    "Subject",
    "Course",
    "Batch",
    "Create by",
    "Release data",
    "Dead line",
    "Action",
  ];

  return (
    <div>
      <Grid container></Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <div className="grid justify-items-end mr-9 mt-2">
              <Link to="/admin/assigment/add">
                <Button name={"Add New"} />
              </Link>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <div className="inline-block">
        <h2 class="inline-block text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
          Total Subject- {totalElements}
        </h2>

        <h2 class="inline-block text-xl justify-items-center ml-[400px] mt-2  font-bold text-gray-700">
          All Assigment
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
                <td class="pr-2 pl-4 py-4 text-sm text-left">
                  {data.subjectCode}
                </td>
                <td class="pr-2 pl-4 py-1 text-sm text-left">{data.name}</td>
                <td className="px-6 py-4 text-sm">{data.createdDate}</td>
                <td className="px-6 py-4 text-sm">{data.createBy}</td>
                <td className="px-6 py-4 text-sm">{data.modifiedData}</td>
                <td className="px-6 py-4 text-sm">{data.modifiedBy}</td>

                <td class="pr-2 pl-4 py-1 text-sm text-center">
                <Link to={`/admin/subject/assign/${data.subjectId}/${data.name}/${data.subjectCode}`}>
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
                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  <DeleteButton id={data.subjectId} DELETE_URL={DELETE_URL} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pgination */}
        <div className="md:flex mt-4 px-6">
          <p className="text-sm  text-gray-400 flex-1">
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

export default Assigment;
