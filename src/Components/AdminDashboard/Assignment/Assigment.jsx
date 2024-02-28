import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../../utils/Button/Button";
import DeleteButton from "../ActionButton/DeleteButton";
import FileIcon from "../../../assets/file.png";
import ShowButton from "../../../utils/Button/ShowButton";


function Assigment() {
  const [assignment, setAssignment] = useState([]);
  const { token } = useToken();


  const ASSIGNMENT = "http://localhost:8080/api/v1/assigment/find";
  const DELETE_URL = "http://localhost:8080/api/v1/assigment/delete";
  const TYPE_URL = "http://localhost:8080/api/v1/enum/type";

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
  }, [currentPage]);

  const getBatchData = async () => {
    try {
      const res = await axios.get(ASSIGNMENT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setAssignment(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setTotalElements(res.data.data.totalElements);
    } catch (error) {
      console.error("Error fetching Assignment data:", error);
    }
  };



  const tableHeaders = [
    "Assignment Code",
    "Batch",
    "Course",
    "Download",
    "Release date",
    "Dead line",
    "Release by",
    "Action",
  ];



  return (
    <div>
      <Grid container></Grid>

      <div className="flex justify-between mb-3">

        <div className="ml-3 mt-2 justify-end md:ml-[-230px]">
          <Link to="/admin/assigment/add">
            <Button name={"Add New"} />
          </Link>
        </div>

        <div className="ml-3 mr-3 mt-2 justify-end md:ml-4">
          <Link to="/admin/assigment/all">
            <ShowButton name={"Show All"}/>
          </Link>
        </div>

      </div>
      <div className="md:inline-block">
        <h2 class="md:inline-block text-sm md:pr-10 mb-1 pl-3 md:pl-5 font-bold text-gray-700">
          Total Assignment- {totalElements}
        </h2>

        <h2 class="md:inline-block text-xl ml-3 mb-2 justify-items-center md:ml-[200px] lg:ml-[400px]  font-bold text-gray-700">
          All Assignment
        </h2>
      </div>

      <div class="mb-5 overflow-x-auto">

        <table class="w-[100%] bg-white font-[sans-serif] whitespace-normal">
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
            {assignment.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                class="even:bg-blue-50"
              >
                {/* <td class="pr-2 pl-4 py-4 text-sm text-left"> 
                  {data.subjectCode}
                </td> */}
                <td class="pr-2 pl-4 py-1 text-sm text-left">{data.assiCode}</td>
                <td className="px-6 py-4 text-sm">{data.batchCode}</td>
                <td className="px-6 py-4 text-sm">{data.courseName}</td>

                <td className="px-6 py-4 text-sm">
                  <a href={data.assiUrl} target="_blank" rel="noopener noreferrer"><img className="w-8" src={FileIcon} /></a>
                </td>


                <td className="px-6 py-4 text-sm">{data.releaseData}</td>
                <td className="px-6 py-4 text-sm">{data.deadLine}</td>
                <td className="px-6 py-4 text-sm">{data.releaseBy}</td>

                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  <DeleteButton id={data.assiId} DELETE_URL={DELETE_URL} />
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
              currentPage * pageSize + assignment.length
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
