import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Border from "../Border/Border";

function PaginationTable({ id, title, URL, headers, tableHeaders, itemName }) {
  const [tableData, setTableData] = useState([]);

  //Pagindation
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10; // Number of items per page

  //Pagination
  useEffect(() => {
    fetchOptions();
  }, [currentPage]);

  //Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchOptions = async () => {
    try {
      const response = await axios.get(URL, {
        headers: headers,
        params: {
          id: id,
          page: currentPage,
          size: pageSize,
        },
      });

      console.log("Response Table data:", response.data.data.content);
      //set data
      setTableData(response.data.data.content);
      //set total page
      setTotalPages(response.data.data.totalPages);
      //set total element
      setTotalElements(response.data.data.totalElements);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
      <Border/>
        <div className="inline-block overflow-x-auto">
          <h2 class="inline-block text-sm pr-10 mb-1 pl-5 font-bold text-gray-700 ">
            Total {itemName} - {totalElements}
          </h2>
          <h2 class="inline-block text-xl ml-[450px] mt-2  font-bold text-gray-700">
            {title}
          </h2>

        </div>
        <div class="">
          <table class="min-w-full bg-white font-[sans-serif] overflow-x-auto">
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
            <tbody class="whitespace-nowrap">
              {tableData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                  class="even:bg-blue-50"
                >
                  <td class="pr-2 pl-4 py-3 text-sm text-left">{data.code}</td>
                  <td class="pr-2 pl-4 py-1 text-sm text-left">{data.count}</td>
                  <td class="pr-2 pl-4 py-1 text-sm text-left">
                    {data.createBy}
                  </td>
                  <td class="pr-2 pl-4 py-1 text-sm text-left">
                    {" "}
                    {new Date(data.createdDate).toLocaleString()}
                  </td>
                  <td class="pr-2 pl-4 py-1 text-sm text-left">
                    {data.modifiedBy}
                  </td>
                  <td class="pr-2 pl-4 py-1 text-sm text-left">
                    {" "}
                    {new Date(data.modifiedData).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-sm justify-center">
                    <span
                      className={`w-[68px] block text-center py-0.5 border-2 border-${data.activeStatus ? "green" : "red"
                        }-500 text-${data.activeStatus ? "green" : "red"
                        }-500 font-semibold rounded text-xs`}
                    >
                      {data.activeStatus ? "Active" : "Inactive"}
                    </span>
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


                  {/* info icon  */}
                  <td class="pr-2 pl-4 py-1 text-sm text-left">
                 
                 <Link to="/admin/batch">
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
                        {" "}
                        <g>
                          {" "}
                          <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                 </Link>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="md:flex mt-4 px-6">
            <p className="text-sm text-gray-400 flex-1">
              Showing {currentPage * pageSize + 1} to{" "}
              {Math.min(
                currentPage * pageSize + pageSize,
                currentPage * pageSize + tableData.length
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
    </>
  );
}
export default PaginationTable;
