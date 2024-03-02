import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FileIcon from "../../../assets/file.png";
import UploadFileBtn from "../../../utils/Button/UploadFileBtn";
import Ok_Icon from "../../../assets/ok_icon.png"


function StudentAssignment() {
  const { token } = useToken();
  const [assignment, setAssignment] = useState([]);


  const ASSIGNMENT_URL = "http://localhost:8080/api/v1/assigment/find-by-id";
  const ASSIGNMENT_SUBMIT_URL = "http://localhost:8080/api/v1/assigment/submit";

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
    getData();
  }, [currentPage]);

  //get user id from localstorage
  const id = localStorage.getItem("id");

  const getData = async () => {
    try {
      const res = await axios.get(ASSIGNMENT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: id,
          page: currentPage,
          size: pageSize,
        },
      });

      setAssignment(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      setTotalElements(res.data.data.totalElements);

    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  const tableHeaders = [
    "Code",
    "Grade",
    "Download",
    "Release Date",
    "Deadline",
    "Submit",
    "Submit Date"
  ];


  return (
    <div>
      <Grid container></Grid>

      <div className="inline-block">
        <h2 class="inline-block text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
          Total Assignment- {totalElements}
        </h2>

        <h2 class="inline-block text-xl justify-items-center ml-[400px] mt-2  font-bold text-gray-700">
          Assignment
        </h2>
      </div>

      <div class="mb-5 p-2">
        <table class="min-w-full bg-white font-[sans-serif] ">
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
                <td class="pr-2 pl-4 py-4 text-sm text-left">{data.assiCode}</td>


                <td className="px-6 py-4 text-sm justify-items-center ">

                  {data.grade ? (
                    data.grade === "Distinction" ? (
                      <div class="px-3 py-1 bg-purple-500 block justify-items-center  w-max text-sm text-white rounded">Distinction</div>
                    ) : (
                      data.grade === "Merit" ? (

                        <div class="px-3 py-1 bg-blue-500 ml-4  w-max text-sm text-white rounded">Merit</div>

                      ) : (data.grade === "Pass" ? (

                        <div class="px-3 py-1 bg-green-500 ml-4  w-max text-sm font-semibold  text-white rounded">Pass</div>
                      ) :
                        <div class="px-3 py-1 bg-red-500 ml-2  w-max text-sm text-white rounded">Repeat</div>
                      )
                    )
                  ) : (
                    <div class="px-3 py-1 bg-yellow-500 ml-1  w-max text-sm text-white rounded">Pending</div>
                  )}

                </td>

                <td className="px-6 py-4 text-sm">
                  <a href={data.assiUrl} target="_blank" rel="noopener noreferrer"><img className="w-8" src={FileIcon} /></a>
                </td>

                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  {data.releaseData}
                </td>

                <td class="pr-2 pl-4 py-1 text-sm text-left">
                  {data.deadLine}
                </td>

                <td className="px-6 py-4 text-sm">

                {data.grade ? (
                    data.grade === "Repeat" ? (
                      <UploadFileBtn
                      title="Select file"
                      accept="image/pdf"
                      label="Upload your assignment"
                      subTitle="Your uploaded file"
                      btnName="Upload file"
                      assiId={data.assiId}
                      batchID={data.batchId}
                      assCode={data.assiCode}
                      URL={ASSIGNMENT_SUBMIT_URL}
                      
                      Id={id}
                      filePath="submit"
                      uploadFileName={`${data.assiCode}-${id} `}
                    />
                    ) : (
                      <img src={Ok_Icon} alt="ok-icon" className="ml-4" />
                    )
                  ) : (
                    <UploadFileBtn
                    title="Select file"
                    accept="image/pdf"
                    label="Upload your assignment"
                    subTitle="Your uploaded file"
                    btnName="Upload file"
                    assiId={data.assiId}
                    batchID={data.batchId}
                    assCode={data.assiCode}
                    URL={ASSIGNMENT_SUBMIT_URL}
                    // loadUse=""
                    Id={id}
                    filePath="submit"
                    uploadFileName={`${data.assiCode}-${id} `}
                  />
                  )}

                
                </td>

                <td className="px-6 py-4 text-sm">
                  2024/10/12
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
  )
}

export default StudentAssignment