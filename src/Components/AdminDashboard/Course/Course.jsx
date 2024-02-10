import { Grid } from "@mui/material";
import axios from "axios";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import EditButton from "../ActionButton/EditButton";
import DeleteButton from "../ActionButton/DeleteButton";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Course() {
  const [courseData, setCourseData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [type, setType] = useState();
  const pageSize = 10; // Number of items per page

  useEffect(() => {
    getCourseData();
  }, [currentPage]);

  const username = "laki@gmail.com";
  const password = "21022";

  const getCourseData = async () => {
    try {
      const URL = "http://localhost:8080/api/v1/course/find-all";
      const response = await axios.get(URL, {
        auth: {
          username: username,
          password: password,
        },
        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setCourseData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
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
          <Dropdown options={["All", "Active", "Inactive"]}
          label="Status" />
        </Grid>
        <Grid item xs={2}>
        <Dropdown options={["All", "Active", "Inactive"]}
          label="Category" />
        </Grid>
        <Grid item xs={2}>
        <Dropdown options={["All", "Active", "Inactive"]}
          label="Medium" />
        </Grid>
        <Grid item xs={2}>
        <Dropdown options={["All", "Active", "Inactive"]}
          label="Type" />
        </Grid>
        <Grid item xs={4}>
          <Link to="/admin/school/add">
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
            <table className="min-w-full bg-white font-[sans-serif]">
              <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                  <th className="pr-6 pl-3  py-3 text-left text-sm font-semibold text-white">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Medium
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap">
                {courseData.map((data, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                  >
                    <td className="pr-6 pl-4 py-4 text-sm">{data.code}</td>
                    <td className="pl-2 pr-2 py-4 text-sm">{data.name}</td>
                    <td className="px-6 py-4 text-sm">
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
                    <td className="px-6 py-4 text-sm">{data.duration}</td>
                    <td className="px-6 py-4 text-sm">{data.medium}</td>
                    <td className="px-6 py-4 text-sm">{data.category}</td>
                    <td className="px-6 py-4 text-sm">{data.courseType}</td>
                    <td className="pl-2 pr-2 py-4 flex">
                      <Link to={`/admin/course/update/${data.courseId}`}>
                        <EditButton />
                      </Link>
                      <DeleteButton courseId={data.courseId} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              <div className="flex items-center max-md:mt-5 mb-5" >
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

