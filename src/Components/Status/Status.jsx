import React, { useEffect, useState } from 'react'
import { useToken } from "../Context/TokenProvider";
import axios from "axios";



function Status() {


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
      const res = await axios.get(APP_DATA_URL)
      setTotalCount(res.data.data);
      setTopCourse(res.data.data.topCourseName)
      console.log(typeof res.data.data.topCourseName);
    } catch (error) {
      console.error("Error fetching  data:", error);
    }

  };


  return (
    <div>
      <div class="bg-gray-50 p-8 min-h-[350px] flex flex-col items-center justify-center font-[sans-serif] text-[#333]">
        <h2 class="text-3xl font-bold mb-14 text-center">Academy Metrics</h2>
        <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 max-lg:gap-12">
          <div class="text-center">
            <h3 class="text-4xl font-extrabold">{totalCount.studentCount}<span class="text-blue-600">+</span></h3>
            <p class="text-base font-bold mt-3">Total Student</p>
            <p class="text-sm text-gray-500 mt-2">The total number of registered student on the platform.</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-extrabold">{totalCount.courseCount}<span class="text-blue-600">+</span></h3>
            <p class="text-base font-bold mt-3">Total Programs</p>
            <p class="text-sm text-gray-500 mt-2">The total revenue generated by the application.</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-extrabold">{totalCount.schoolCount}<span class="text-blue-600">+</span></h3>
            <p class="text-base font-bold mt-3">Totoal School</p>
            <p class="text-sm text-gray-500 mt-2">The level of user engagement with the application's content and features.</p>
          </div>
          <div class="text-center">
            <h3 class="text-4xl font-extrabold">{totalCount.overallPassRate}<span class="text-blue-600">%</span></h3>
            <p class="text-base font-bold mt-3">Pass Rate</p>
            <p class="text-sm text-gray-500 mt-2">The percentage of time the server has been operational and available.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Status