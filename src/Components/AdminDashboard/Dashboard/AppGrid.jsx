import React, { useEffect, useState } from 'react'
import { useToken } from "../../Context/TokenProvider";
import axios from "axios";
import PieChart from './Chart/PieChartData';


function AppGrid() {
  const { token } = useToken();
  const [totalCount, setTotalCount] = useState({});
  const [topCourse, setTopCourse] = useState([]);
  const APP_DATA_URL = "http://localhost:8080/api/v1/admin/static";

  useEffect(() => {
    getSchoolData();
  }, [])

  const getSchoolData = async () => {
    console.log("Start get data")

    try {
      const res = await axios.get(APP_DATA_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalCount(res.data.data);
      setTopCourse(res.data.data.topCourseName)
      console.log(typeof res.data.data.topCourseName);
    } catch (error) {
      console.error("Error fetching  data:", error);
    }

  };

  console.log(totalCount.passRate);


  const tableHeaders = [
    "Rank",
    "Course",
  ];

  return (
    <div class=" py-3 px-3 font-[sans-serif] text-white  ">


      <div class="flex  flex-col gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-x-2 sm:gap-y-1 sm:max-w-7xl mx-auto">

        <div class="text-center bg-blue-600 p-2 sm:p-4 rounded-md  border-2 border-gray-600">


          <h3 class="text-4xl  font-extrabold gap-2 sm:mt-2">{totalCount.studentCount}</h3>
          <p class="text-gray-800 text-base font-semibold sm:mt-3">Total Student</p>
        </div>

        <div class="text-center bg-blue-600 p-2 sm:p-4 rounded-md  border-2 border-gray-600">
          <h3 class="text-4xl font-extrabold sm:mt-2">{totalCount.employeeCount}</h3>
          <p class="text-gray-800 text-base font-semibold sm:mt-3">Submit Assigment</p>
        </div>

        <div class="text-center bg-blue-600 p-2 sm:p-4 rounded-md  border-2 border-gray-600">
          <h3 class="text-4xl font-extrabold sm:mt-2">{totalCount.courseCount}</h3>
          <p class="text-gray-800 text-base font-semibold sm:mt-3">Total Course</p>
        </div>

        <div class="text-center bg-blue-600 p-2 sm:p-4 rounded-md  border-2 border-gray-600 ">


          <h3 class="text-4xl font-extrabold sm:mt-2">{totalCount.subjectCount}</h3>
          <p class="text-gray-800 text-base font-semibold sm:mt-3">Total Subject</p>
        </div>

        <div class="text-center bg-blue-600 p-2 sm:p-4 rounded-md  border-2 border-gray-600">



          <h3 class="text-4xl font-extrabold sm:mt-2">{totalCount.schoolCount}</h3>
          <p class="text-gray-800 text-base font-semibold sm:mt-3">Total School</p>
        </div>

      </div>

      {/* Pie Chart */}
      <div className='xl:inline-flex '>

        <div className='sm:w-[300px] md:ml-[50px] sm:mt-10 mt-[350px] ml-5'>
          <PieChart />
        </div>

        <div>

          <div class="text-center mt-5 sm:mr-[500px] ml-[150px] bg-gray-50 xl:ml-20 xl:mt-[90px] xl:p-4 rounded-md">
            <h3 class="text-5xl text-[#9a58fc] font-extrabold sm:mt-2">{totalCount.assignmentCount}</h3>
            <p class="text-gray-700 text-center font-semibold sm:mt-3">Total Assignemnt</p>
          </div>

          <div class="text-center sm:mr-[500px] md:mr-[500px] bg-gray-50 xl:ml-20 sm:p-4 rounded-md ml-[130px] mt-3">
            <h3 class="text-5xl text-[#9a58fc] font-extrabold sm:mt-2">{totalCount.overallPassRate}%</h3>
            <p class="text-gray-700 text-base  text-center font-semibold sm:mt-3">Overall Pass Rate</p>
          </div>


        </div>
      </div>

      <div className='xl:inline-flex lg:grid-cols-3 md:grid-cols-2  grid grid-cols-3 sm:grid-cols-2 text-center xl:mt-0  mt-20 '>

        <div class="text-center bg-gray-50 p-2 sm:p-4 rounded-md">
          <h3 class="text-2xl text-blue-500 font-extrabold sm:mt-2">{totalCount.distinctionRate}%</h3>
          <p class="text-gray-700 text-base font-semibold sm:mt-3">Distinction Rate</p>
        </div>
        <div class="text-center bg-gray-50 sm:ml-1 p-2 ml-[70px] sm:p-4 rounded-md">
          <h3 class="text-2xl text-blue-500 font-extrabold sm:mt-2">{totalCount.meritRate}%</h3>
          <p class="text-gray-700 text-base font-semibold sm:mt-3">Merit Rate</p>
        </div>
        <div class="text-center bg-gray-50  sm:ml-1 p-2 ml-[130px] sm:p-4 rounded-md">
          <h3 class="text-2xl text-blue-500 font-extrabold sm:mt-2">{totalCount.passRate}%</h3>
          <p class="text-gray-700 text-base font-semibold sm:mt-3">Pass Rate</p>
        </div>
        <div class="text-center bg-gray-50  sm:ml-1 p-2 sm:p-4 sm:mt-0 mt-3 rounded-md">
          <h3 class="text-2xl text-yellow-500 font-extrabold sm:mt-2">{totalCount.pendingRate}%</h3>
          <p class="text-gray-700 text-center text-base font-semibold sm:mt-3">Pending Rate</p>
        </div>
        <div class="text-center bg-gray-50  sm:ml-1 p-2 ml-20 mt-3 sm:mt-0  sm:p-4 rounded-md">
          <h3 class="text-2xl text-red-500 font-extrabold sm:mt-2">{totalCount.repeatRate}%</h3>
          <p class="text-gray-700 text-base font-semibold sm:mt-3">Repeat Rate</p>
        </div>
      </div>

      {/* Table */}

      <div class="mb-5 mt-3 p-5 hidden md:block">

        <h2 class="inline-block md:ml-[200px] lg:ml-[300px] text-xl justify-items-center ml-[300px] mt-2 mb-2 font-bold text-gray-700">
          Top Course
        </h2>
        <table class="min-w-full bg-white font-[sans-serif] p-2 overflow-x-auto  ">
          <thead class="bg-gray-800 whitespace-nowrap">
            {/* Table deader */}
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  class="pr-6 pl-5 py-3 text-center text-sm font-semibold text-white"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table body */}
          <tbody class="whitespace-normal">
            {topCourse.map((data, index) => (
              <tr
                className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                class="even:bg-bl
                ue-50"
              >
                <span class="w-[40px] mt-2 block text-center md:ml-[100px] py-0.5 border-2 border-yellow-500 text-yellow-500 font-semibold rounded text-xs">
                  {index + 1}
                </span>
                {/* <td class="pr-2 text-gray-900 pl-4 font-bold  py-4 text-sm text-center"></td> */}
                <td class="pr-2 text-gray-900 pl-4 font-bold py-4 text-sm text-center">{data}</td>
              </tr>
            ))}
          </tbody>
        </table>





      </div>
    </div>

  )
}

export default AppGrid