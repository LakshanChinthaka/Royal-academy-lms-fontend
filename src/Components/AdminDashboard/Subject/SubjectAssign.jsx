import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import AutocompleteComponent from "../../../page/SignInPage/AutocompleteComponent";
import { useToken } from "../../Context/TokenProvider";
import axios from "axios";
import SuccessAlert from "../../../utils/SuccessAlert";


function SubjectAssign() {

  const { token } = useToken();
  const { SuccessMessage } = SuccessAlert();
  const { id, name, code } = useParams();

  const COURSE_URL = "http://localhost:8080/api/v1/course/find-with-name";
  const ASSIGN_SUBJECT = "http://localhost:8080/api/v1/assign/add"

  // string id convert to int
  let subjectId = parseInt(id);

  const [formData, setFormData] = useState({
    courseId: "",
    subjectId: subjectId
  });

  //Handle sourse
  const handleCourseChange = (selectedOption) => {
    if (selectedOption) {
      const courseId = selectedOption.courseId; // Assuming schoolID is the property name
      setFormData({ ...formData, courseId: courseId }); // Update formData with the selected schoolId
    } else {
      setFormData({ ...formData, courseId: null }); // If no option is selected, set schoolId to null
    }
  };


  const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...data, [name]: value });
//   };

// const subjectIds = {
//     addressId: 0,
//     address: formData.address,
//     city: formData.city,
//     district: formData.district,
//   };
  console.log(formData);

  const payload = {
    ...formData,
  };
// const payload = {
//     courseId: formData.courseId,
//     subjectIds: [id] // Initialize subjectIds as an empty array
//   };

  console.log(payload);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(ASSIGN_SUBJECT, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    //   setData({
    //     schoolCode: "",
    //     schoolName: "",
    //   });

      const confirmed = await SuccessMessage(
        res.data.data,
        "success"
      );
      navigate(-1);
      //got to back
      
    } catch (error) {
      const confirmed = await SuccessMessage(error.response.data.data, "error");
    }
  };

  return (
    <div>
    <Grid container>
      <Grid item xs={12}>
        <div className="flex">
          <Link to="/admin/subject" className="mt-3 ml-5">
            <BackButton />
          </Link>
          <h2 className="text-xl text-[#333] font-bold px-5 py-4 ">
            Subject Assign to Course
          </h2>
        </div>
        <Grid container spacing={2} columns={3}>
          <Grid item xs={1}>
           
            <div className="ml-10">
              <label htmlFor="code" class="mt-4 text-sm mb-2 block text-[#333] font-bold">
                Subject code
              </label>
              <input
                value={code}
                // onChange={handleChange}
                required
            readOnly
                name="code"
                type="text"
                class="bg-yellow-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter code"
              />
            </div>

          </Grid>
          <Grid item xs={1}>
            
            <div className="ml-5 mr-5">
              <label htmlFor="code" class="mt-4 text-sm mb-2 block text-[#333] font-bold">
                Subject name
              </label>
              <input
                value={name}
                // onChange={handleChange}
                readOnly
                required
                name="code"
                type="text"
                class="bg-yellow-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                placeholder="Enter code"
              />
            </div>
          </Grid>
          <Grid item xs={1} className="m-l-[-150px]">
            <form onSubmit={handleSubmit}>

          <div className="">
              <label htmlFor="LasttName" class="mt-4 text-sm mb-2 block text-[#333] font-bold">
                Select Course
              </label>
              <AutocompleteComponent
                endpoint={COURSE_URL}
                headers={{ Authorization: `Bearer ${token}` }}
                getOptionLabel={(option) => option.name}
                clearOnEscape={true}
                label=" Select course"
                onChange={handleCourseChange}
              />
            </div>
            <button
            type="submit"
            class=" mt-5 max-w-[200px] ml-[220px]  py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
            </form>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
         
          </Grid>
          <Grid item xs={12}>
           <div>

         
           </div>
          </Grid>

        </Grid>
      </Grid>
    </Grid>
  </div>
  );
}

export default SubjectAssign;
