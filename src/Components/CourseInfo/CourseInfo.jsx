import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToken } from '../Context/TokenProvider';
import axios from "axios";
import Loading from '../../utils/Loading/Loading';

function CourseInfo() {

  const { id, name, courseType, description,imageUrl } = useParams()

  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);

console.log("Image Url", imageUrl)

  useEffect(() => {
    getCourseData();
  }, []);


  const getCourseData = async () => {
    console.log("Start get data")
    setLoading(true);
    console.log(token)
    try {

      const URL = `http://localhost:8080/api/v1/assign/find?id=${id}`;
      const res = await axios.get(URL);

      setCourseData(res.data.data);
      console.log("Data", res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching school data:", error);
    }
  };
  console.log("first", courseData)

  if (loading) {
    console.log("Loading....")
    return (
      <Loading/>
    );
  }
  
  return (
    <div>
      <div class="font-[sans-serif] text-gray-800  bg-gray-50 px-6 py-12 ">
        <div class="grid lg:grid-cols-2 gap-8 max-lg:max-w-2xl mx-auto">
          <div class="text-left">
            <h2 class="text-4xl font-extrabold mb-6">{courseType}.{name}</h2>
            <p class="mb-4 text-sm">{description}</p>

            {courseData.map((data, index) => (
              <div class="grid xl:grid-cols-3 sm:grid-cols-2 gap-8 mt-12">

                <div>

                  <div key={index} class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" class="fill-green-500 shrink-0" viewBox="0 0 24 24">
                      <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000"></path>
                    </svg>
                    <h6 class="text-base text-black font-semibold ml-4">{data.subject}</h6>
                  </div>


                </div>
              </div>
            ))}
          </div>

          {/* Image */}
          <div class="flex justify-center items-center">
            <img src={imageUrl} alt="course Image" class="rounded-lg object-cover w-full h-full" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default CourseInfo