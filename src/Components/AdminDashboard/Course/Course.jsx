import { Grid } from "@mui/material";
import axios from "axios";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import EditButton from "../ActionButton/EditButton";
import DeleteButton from "../ActionButton/DeleteButton";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useToken } from "../../Context/TokenProvider";
import InfoButton from "../../../utils/InfoButton";

function Course() {
  const { token } = useToken();
  const [courseData, setCourseData] = useState([]);
  const [subject, setSubject] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [type, setType] = useState();
  const pageSize = 10; // Number of items per page

  // URLs
  const URL = "http://localhost:8080/api/v1/course/find-all";
  const DELETE_URL = "http://localhost:8080/api/v1/course/delete";

  useEffect(() => {
    getCourseData();
    console.log("Subject list-", subject);
  }, [currentPage]);

  //get data from backend
  const getCourseData = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setCourseData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
      setSubject(response.data.data.content[9].subjectlist);

      console.log(response.data.data);
      console.log("Index-", response.data.data.content[9]);
      const subjectList = response.data.data.content[9].subjectlist;

      // const firstSubjectCode = subjectList;
      // console.log(firstSubjectCode);
      console.log("Subejct list-", subjectList);
    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Grid container>
        {/* Your grid items */}
        <Grid item xs={2} className="mb-2">
          <Dropdown options={["All", "Active", "Inactive"]} label="Status" />
        </Grid>
        <Grid item xs={2}>
          <Dropdown options={["All", "Active", "Inactive"]} label="Category" />
        </Grid>
        <Grid item xs={2}>
          <Dropdown options={["All", "Active", "Inactive"]} label="Medium" />
        </Grid>
        <Grid item xs={2}>
          <Dropdown options={["All", "Active", "Inactive"]} label="Type" />
        </Grid>
        <Grid item xs={4}>
          {/* Add new btn */}
          <Link to="/admin/course/add">
            <button
              type="button"
              className="ml-[250px] px-6 flex justify-items-end mt-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                fill="#fff"
                className="inline mr-3"
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
      {/* Table */}
      <Grid container>
        <Grid item xs={12}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-[sans-serif]  justify-self-start">
              <thead className="bg-gray-800 whitespace-normal text-left ">
                <tr>
                  <th className="pr-6 pl-3  py-3 text-left  text-sm font-semibold text-white">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Medium
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    School
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-white">
                    Viwe
                  </th>
                </tr>
              </thead>
              <tbody className="text-left">
                {courseData.map((data, index) => (
                  <tr
                    key={index}
                    // className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                    className="even:bg-blue-50"
                  >
                    <td className="pr-2 pl-4 py-4 text-sm text-left">
                      {data.code}
                    </td>
                    <td className="pl-4 pr-4  py-4 text-sm text-left">
                      {data.courseType}
                    </td>
                    <td className="px-6 py-4 text-sm text-left">
                      {data.category}
                    </td>
                    <td className="pl-2  pr-2 py-4 text-sm text-left">
                      {data.name}
                    </td>

                    <td className="px-4  py-4 text-sm text-left">
                      {data.duration}
                    </td>
                    <td className="px-4  py-4 text-sm text-left">
                      {data.medium}
                    </td>
                    <td className="px-6 py-4 text-sm text-left">
                      {data.schoolName}
                    </td>
                    {/* </Link> */}
                    {/* Status icon*/}
                    <td className="px-6 py-4 text-sm justify-center">
                      <span
                        className={`w-[68px] block text-center py-0.5 border-2 border-${
                          data.activeStatus ? "green" : "red"
                        }-500 text-${
                          data.activeStatus ? "green" : "red"
                        }-500 font-semibold rounded text-xs`}
                      >
                        {data.activeStatus ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Action icon*/}
                    <td className="pl-5 pr-2 py-4 flex justify-center items-center">
                      <Link
                        to={`/admin/course/update/${data.courseId}/${data.code}`}
                      >
                        <EditButton />
                      </Link>

                      <DeleteButton
                        id={data.courseId}
                        DELETE_URL={DELETE_URL}
                      />
                    </td>
                    {/* Information button */}
                    <td className="px-6  py-4 text-sm text-left">
                      <Link
                        to={`/admin/course/info/${data.courseId}/
                        ${data.code}/${data.courseType}/${data.category}/${data.name}/${data.duration}/
                        ${data.medium}/${data.schoolName}/${data.fees}/${data.createBy}/${data.createdDate}/${data.modifiedBy}/${data.modifiedData}/${data.totalCredit}/${data.totalHours}`}
                      >
                        {/* <InfoButton /> */}
                   
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
                  currentPage * pageSize + courseData.length
                )}{" "}
                of {totalPages * pageSize} entries
              </p>
              {/* Pagination  */}
              <div className="flex items-center max-md:mt-5 mb-5">
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

export default Course;
