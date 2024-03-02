import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import EditButton from "../ActionButton/EditButton";
import DeleteButton from "../ActionButton/DeleteButton";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useToken } from "../../Context/TokenProvider";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";


function Course() {
  const { token } = useToken();
  const [courseData, setCourseData] = useState([]);
  const [subject, setSubject] = useState([]);

  //Filter
  const [selectType, setSelectType] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);


  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Number of items per page

  // URLs
  const URL = "http://localhost:8080/api/v1/course/find-all";
  const DELETE_URL = "http://localhost:8080/api/v1/course/delete";
  const MEDIUM_URL = "http://localhost:8080/api/v1/enum/medium";
  const TYPE_URL = "http://localhost:8080/api/v1/enum/type";
  const CATEGORY_URL = "http://localhost:8080/api/v1/enum/category";
 

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

      const subjectList = response.data.data.content[9].subjectlist;
      console.log("Subejct list-", subjectList);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  const filteredCourseDetails = courseData.filter((course) => {
    if (selectedMedium !== null && course.medium !== selectedMedium) {

      return false; // Ignore selectType filter if selectedMedium is not empty and doesn't match
    }
    else if (selectType !== null && course.courseType !== selectType) {

      return false; // Ignore selectedMedium filter if selectType is not empty and doesn't match

    }else if(selectedCategory !== null && course.category !== selectedCategory){

      return false; 
    }
    return true; // Return true if the course passes all filters
  });


  //Dropdown
  const handleTypeChange = (selectedOption) => {
    setSelectType(selectedOption);
  };

  const handleMediumChange = (selectedOption) => { 
    setSelectedMedium(selectedOption); // Update selectedMedium state
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };


  return (
    <div>
      <Grid container>
        <div className="block">

        <Grid item xs={2}>

          <div className="mt-3 ml-5">
            <AutocompleteComponent
              endpoint={TYPE_URL}
              headers={{ Authorization: `Bearer ${token}` }}
              getOptionLabel={(option) => option}
              clearOnEscape={true}
              label="Filter by Type"
              onChange={handleTypeChange} // Use handleTypeChange for type selection
              width={200}
            />
          </div>

        </Grid>

        <Grid item xs={2}>

          <div className="ml-5 mt-3 ">
            <AutocompleteComponent
              endpoint={MEDIUM_URL}
              headers={{ Authorization: `Bearer ${token}` }}
              getOptionLabel={(option) => option}
              clearOnEscape={true}
              label="Filter by Medium"
              onChange={handleMediumChange} // Use handleTypeChange for type selection
              width={200}

            />
          </div>

        </Grid>
        <Grid item xs={2}>
          
          <div className="ml-5 mt-3">
            <AutocompleteComponent
              endpoint={CATEGORY_URL}
              headers={{ Authorization: `Bearer ${token}` }}
              getOptionLabel={(option) => option}
              clearOnEscape={true}
              label="Filter by Category"
              onChange={handleCategoryChange} // Use handleTypeChange for type selection
              width={200}
            />
          </div>

        </Grid>
        </div>
        <Grid item xs={4}>
      <div className="ml-[150px] sm:justify-end mt-2">
          {/* Add new btn */}
          <Link to="/admin/course/add">
            <button
              type="button"
              className="px-6 flex justify-items-end mt-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-green-600 hover:bg-green-700 active:bg-green-600"
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
          </div>
        </Grid>

      </Grid>

      {/* Table */}
      <Grid container>
        <Grid item xs={12}>
          <div className="overflow-x-auto mt-3">
            <table className="w-[100%] bg-white font-[sans-serif]  justify-self-start">
              <thead className="bg-gray-300 whitespace-normal text-left ">
                <tr>
                  <th className="pr-6 pl-3  py-3 text-left  text-sm font-semibold text-gray-700">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Medium
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    School
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                  <th className="px-6 py-3 text-left  text-sm font-semibold text-gray-700">
                    Viwe
                  </th>
                </tr>
              </thead>

              <tbody className="text-left">

                {filteredCourseDetails && filteredCourseDetails.length > 0 ? (
                  filteredCourseDetails.map((data, index) => (
                    <tr
                      key={index}

                      className="even:bg-blue-50"
                    >
                      <td className="pr-2 pl-4 py-4 text-sm text-left">{data.code}</td>
                      <td className="pl-4 pr-4 py-4 text-sm text-left">{data.courseType}</td>
                      <td className="px-6 py-4 text-sm text-left">{data.category}</td>
                      <td className="pl-2 pr-2 py-4 text-sm text-left">{data.name}</td>
                      <td className="px-4 py-4 text-sm text-left">{data.duration}</td>
                      <td className="px-4 py-4 text-sm text-left">{data.medium}</td>
                      <td className="px-6 py-4 text-sm text-left">{data.schoolName}</td>

                      {/* Status icon*/}
                      <td className="px-6 py-4 text-sm justify-center">
                        <span
                          className={`w-[68px] block text-center py-0.5 border-2 border-${data.activeStatus ? "green" : "red"
                            }-500 text-${data.activeStatus ? "green" : "red"
                            }-500 font-semibold rounded text-xs`}
                        >
                          {data.activeStatus ? "Active" : "Inactive"}
                        </span>
                      </td>
                      {/* Action icon*/}
                      
                      <td className="pl-5 pr-2 py-4 flex justify-center items-center">
                        <Link to={`/admin/course/update/${data.courseId}/${data.code}`}>
                          <EditButton />
                        </Link>
                        <DeleteButton id={data.courseId} DELETE_URL={DELETE_URL} />
                      </td>

                      {/* Information button */}
                      <td className="px-6 py-4 text-sm text-left">
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
                              <g>
                                <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path>{" "}
                              </g>
                            </g>
                          </svg>
                        </Link>
                      </td>
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


