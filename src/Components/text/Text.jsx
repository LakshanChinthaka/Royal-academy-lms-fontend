import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToken } from "../Context/TokenProvider";

function AdminComponent() {
  // const [adminMessage, setAdminMessage] = useState("");
  // const GET_STUDENT_URL = "http://localhost:8080/api/v1/student/find";
  // const { token } = useToken();
  // const [data,setData] =useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(GET_STUDENT_URL, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         params: {
  //           id: 29,
  //         },
  //       });

  //       setData(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching admin message:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    // <div>
    //   {data?.map((data,index)=> {

    //     <div key={index}>
    //       <h1>Admin Component</h1>
    //     <h1>{data.firstName}</h1>
    //     </div>
    //   })}
    // </div>
    <></>
  );
}

export default AdminComponent;
