import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useToken } from "../Context/TokenProvider";
import Filter from "../../utils/Filter/Filter";


function Courses() {
  const { token } = useToken();
  const [courseData, setCourseData] = useState([]);
  const [subject, setSubject] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 9; // Number of items per page

  // URLs
  const URL = "http://localhost:8080/api/v1/course/find-all";
  const MEDIUM_URL = "http://localhost:8080/api/v1/enum/medium";
  const TYPE_URL = "http://localhost:8080/api/v1/enum/type";
  const CATEGORY_URL = "http://localhost:8080/api/v1/enum/category";

  //Filter
  const [selectType, setSelectType] = useState(null);
  const [selectedMedium, setSelectedMedium] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCourseData();
    console.log("Subject list-", subject);
  }, [currentPage]);

  //get data from backend
  const getCourseData = async () => {
    try {
      const response = await axios.get(URL, {

        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setCourseData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
      console.log("Image",response.data.data.content[0].imageUrl);

    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };


  const filteredCourseDetails = courseData.filter((course) => {
    if (selectedMedium !== null && course.medium !== selectedMedium) {

      return false; // Ignore selectType filter if selectedMedium is not empty and doesn't match
    }
    else if (selectType !== null && course.courseType !== selectType) {

      return false; // Ignore selectedMedium filter if selectType is not empty and doesn't match

    } else if (selectedCategory !== null && course.category !== selectedCategory) {

      return false;
    }
    return true; // Return true if the course passes all filters
  });



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      <div class="font-[sans-serif] mb-1">
        <div class="p-4 mx-auto lg:max-w-6xl md:max-w-4xl sm:max-w-full">
          <h2 class="text-4xl font-extrabold text-gray-800 mt-2 mb-2">Available Programs</h2>

          <div className="mb-[50px] sm:ml-[110px]">
            <Grid container>
              <div></div>
              {/* Your grid items */}
              <Grid item xs={1} className="mb-2 mr-2">

              </Grid>


              <Grid item xs={2}>

                <div className="mt-3 ml-5">
                  <Filter
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

                <div className="ml-[100px] mt-3">
                  <Filter
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

                <div className="ml-[200px] mt-3">
                  <Filter
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
            </Grid>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourseDetails.map((data, index) => (
              <div key={index} class="bg-white rounded-md overflow-hidden shadow-md cursor-pointer hover:scale-[1.02] transition-all">


                <Link to={`/course/${data.courseId}/${data.name}/${data.description}/${data.courseType}/${encodeURIComponent(data.imageUrl)}`}>
                  <div class="w-full aspect-w-16 aspect-h-8  lg:h-80">
                    <img src={data.imageUrl} alt="Product 1" class="h-full w-full object-cover object-top" />
                  </div>
                  <div class="p-6">
                    <h3 class="text-lg font-bold text-gray-800">{data.courseType}.{data.name}</h3>
                    <p class="text-sm mt-1 text-gray-700">{data.category}</p>
                    <p class="text-sm mt-1 text-gray-700">{data.courseType}</p>
                    <div class="mt-1 flex items-center flex-wrap gap-2">
                      <p class="text-base text-gray-700">Rs.{data.fees}</p>
                    </div>
                  </div>
                </Link>


              </div>
            ))}



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
        </div>
      </div>
    </div>
  )
}

export default Courses