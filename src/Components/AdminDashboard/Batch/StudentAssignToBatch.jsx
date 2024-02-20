import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SuccessAlert from "../../../utils/SuccessAlert";
import { useParams } from "react-router-dom";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";


function StudentAssignToBatch() {

    const { id, code } = useParams();
    const { token } = useToken();

    const [SearchData, setSearchData] = useState([]);
    const [studentId, setStudentId] = useState(0);
    const [nic, setNic] = useState("");

    // Message
    const { SuccessMessage } = SuccessAlert();
    const { ConfirmMessage } = ConfirmAlert();

    const SEARCH_URL = "http://localhost:8080/api/v1/student/find-by-nic";
    const STUDENT_ENROLL_URL = "http://localhost:8080/api/v1/enroll/add";

    const [data, setData] = useState({
        batchId: parseInt(id),
        studentId: studentId
    });

    useEffect(() => {
        setData({ ...data, studentId: studentId }); // Update userId in data whenever id changes
    }, [studentId]); // Trigger effect whenever id changes


    //Search
    const handleSearchInputData = (e) => {
        const { name, value } = e.target;
        setNic(value); // Update nic state with the new value
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get(SEARCH_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    nic: nic.trim(),
                    role: "STUDENT",
                },
            });
           
            setSearchData(res.data.data);
            setStudentId(res.data.data.id);
            console.log("Student ID", res.data.data.id);
            console.log("Search Data - ", res.data.data);
            const confirmed = await SuccessMessage(res.data.message, "success");
        } catch (error) {
            setSearchData([""]); 
            setNic([""]);
            const confirmed = await SuccessMessage(error.response.data.data, "error");
        }
    };

    console.log(setSearchData.firstName)

    //Sumbit data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmed = await ConfirmMessage(
            "Submit Confirmation",
            "Are you sure you want to Assign?",
            "Yes, Assign",
            "Cancel"
        );

        if (confirmed) {

            const payload = {
                batchId: parseInt(id),
                studentId: studentId
            };

            try {
                const res = await axios.post(STUDENT_ENROLL_URL, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData([]);

                const confirmed = await SuccessMessage(res.data.data, "success");
            } catch (error) {
                const confirmed = await SuccessMessage(
                    error.response.data.data,
                    "error"
                );
            }
        } else {
            Swal.fire("Process Cancelled", "", "info");
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex">
                        <Link to="/admin/batch" className="mt-3 ml-5">
                            <BackButton />
                        </Link>
                        <h2 className="text-xl text-[#333] font-bold px-5 py-4 ">
                            Student Assign to Batch
                        </h2>
                    </div>
                    <Grid container spacing={2} columns={3}>
                        <Grid item xs={3} className=" ">

                            <div class="bg-white mt-5 mb-5 ml-[200px] flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                                <input
                                    value={nic.nic}
                                    onChange={handleSearchInputData}
                                    required
                                    type="text"
                                    name="nic"
                                    placeholder="Search by NIC no"
                                    class="w-full outline-none bg-white pl-4 text-sm"
                                />
                                <button
                                    onClick={handleSearch}
                                    type="button"
                                    class="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
                                >
                                    Search
                                </button>
                            </div>



                        </Grid>
                        <Grid item xs={1} className=" ">

                            <div className="ml-10 ">
                                <label htmlFor="code" class="mt-4 text-sm mb-2 block text-[#333] font-bold">
                                    Batch code
                                </label>
                                <input
                                    value={code}
                                    // onChange={handleChange}
                                    required
                                    readOnly
                                    name="code"
                                    type="text"
                                    class="bg-yellow-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                    placeholder="Student Nic"
                                />
                            </div>


                        </Grid>

                        <Grid item xs={1} className="m-l-[-150px] ">
                            <div className="ml-5 mr-5">
                                <label htmlFor="code" class="mt-4 text-sm mb-2 block text-[#333] font-bold">
                                    Subject name
                                </label>
                                <input
                                 value={SearchData.firstName ? `${SearchData.firstName} ${SearchData.lastName ? SearchData.lastName : ""}` : ""}

                                    readOnly
                                    required
                                    name="code"
                                    type="text"
                                    class="bg-yellow-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                    placeholder="Student name"
                                />
                            </div>

                            
                        </Grid>

                        <Grid item xs={1} className="m-l-[-150px] ">
                            {/* <form onSubmit={handleSubmit}> */}

                            <div className="ml-5 mr-5">
                                <label htmlFor="code" class="mt-4 text-sm mb-2 block text-[#333] font-bold">
                                    Student Nic
                                </label>
                                <input
                                    value={SearchData.nic ? `${SearchData.nic}`:" "}
                                    // onChange={handleChange}
                                    readOnly
                                    required
                                    name="code"
                                    type="text"
                                    class="bg-yellow-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                    placeholder="Student Nic"
                                />
                            </div>
                            <button
                            onClick={handleSubmit}
                                type="submit"
                                class=" mt-5 max-w-[200px] ml-[70%]  py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                            >
                                Submit
                            </button>
                            {/* </form> */}
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
    )
}

export default StudentAssignToBatch