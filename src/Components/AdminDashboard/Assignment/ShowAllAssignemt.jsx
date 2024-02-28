import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToken } from "../../Context/TokenProvider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import FileIcon from "../../../assets/file.png";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import Swal from "sweetalert2";


function ShowAllAssignemt() {
    const [submitAssignment, setSubmitAssignment] = useState([]);
    const { token } = useToken();
    const [filterStatus, setFilterStatus] = useState("All");
    const [grade, setGrade] = useState("");


    const ALL_ASSIGNMENT = "http://localhost:8080/api/v1/assigment/find-all";
    const SUBMIT_GRADE = "http://localhost:8080/api/v1/assigment/grade";

    //Pagindation
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const pageSize = 10; // Number of items per page

    //Pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getSubmitAssignmentData();
    }, [currentPage]);

    const getSubmitAssignmentData = async () => {
        try {
            const res = await axios.get(ALL_ASSIGNMENT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,
                    size: pageSize,
                },
            });

            setSubmitAssignment(res.data.data.content);
            setTotalPages(res.data.data.totalPages);
            setTotalElements(res.data.data.totalElements);
            console.log("Data", res.data.data.content)
        } catch (error) {
            console.error("Error fetching Assignment data:", error);
        }
    };



    const tableHeaders = [
        "Assignment code",
        "Batch",
        "Student",
        "File",
        "Grade",
        "Action",
    ];



    const filteredSubmitAssignment = submitAssignment.filter(
        (submission) => filterStatus === "All" || submission.batchCode === filterStatus
    );

    const handleFilterSelect = (selectedOption) => {
        setFilterStatus(selectedOption); // Update filterStatus
    };

    //batch code add into array for pass to dropdwon
    const batch = [];
    submitAssignment.forEach((item) => {
        if (!batch.includes(item.batchCode)) {
            batch.push(item.batchCode);
        }
    });

    //select grade
    const handleGrade = async (assId) => {

        const inputOptions = new Promise((resolve) => {
            resolve({
                "Distinction": "Distinction",
                "Merit": "Merit",
                "Pass": "Pass",
                "Repeat": "Repeat",
            });

        });

        const { value: grade } = await Swal.fire({
            title: "Select Grade",
            input: "radio",
            inputOptions,

            inputValidator: (value) => {

                if (!value) {
                    return "You need to choose something!";
                }
            }

        });

        console.log(grade)
        if (grade) {
            Swal.fire({ html: `You selected: ${grade}` });
            addGeadeToDb(assId, grade);
        }
    }

    //submit grade to db
    const addGeadeToDb = async (assId, grade) => {
        const payload = {

            submitId: assId,
            grade: grade
        };

        try {
            const res = await axios.put(SUBMIT_GRADE, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Data", res.data.data.content)
            getSubmitAssignmentData();
        } catch (error) {
            console.error("Error submit Assignment data:", error);
        }
    };

    return (
        <div>
            <Grid container></Grid>

            <div>
                <Dropdown
                    options={batch}
                    label={`Batch: ${filterStatus}`}
                    onSelect={handleFilterSelect}
                />
            </div>


            <div className="md:inline-block mt-4">

                <h2 class="md:inline-block text-sm md:pr-10 mb-1 pl-3 md:pl-5 font-bold text-gray-700">
                    Total Submission- {totalElements}
                </h2>


                <h2 class="md:inline-block text-xl ml-3 mb-2 justify-items-center md:ml-[200px] lg:ml-[460px]  font-bold text-gray-700">
                    All Assignment
                </h2>

            </div>

            <div class="mb-5 overflow-x-auto p-2">

                <table class="w-[100%] bg-white font-[sans-serif] whitespace-normal">
                    <thead class="bg-gray-800 whitespace-nowrap">
                        {/* Table deader */}
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th
                                    key={index}
                                    class="pr-6 pl-5  py-3 text-left text-sm font-semibold text-white"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table body */}
                    <tbody class="whitespace-normal">
                        {filteredSubmitAssignment.map((data, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                                class="even:bg-blue-50"
                            >
                                <td className="px-6 py-4 text-sm">{data.assiCode}</td>
                                <td className="px-6 py-4 text-sm">{data.batchCode}</td>
                                <td className="px-6 py-4 text-sm">{data.studentName}</td>

                                <td className="px-6 py-4 text-sm">
                                    <a href={data.assiUrl} target="_blank" rel="noopener noreferrer"><img className="w-8" src={FileIcon} /></a>
                                </td>

                                <td className="px-6 py-4 text-sm justify-items-center ">

                                    {data.grade ? (
                                        data.grade === "Distinction" ? (
                                            <div class="px-3 py-1 bg-purple-500 block justify-items-center  w-max text-sm text-white rounded">Distinction</div>
                                        ) : (
                                            data.grade === "Merit" ? (
                                              
                                                <div class="px-3 py-1 bg-blue-500 ml-4  w-max text-sm text-white rounded">Merit</div>
                                           
                                                ) : (data.grade === "Pass" ? (

                                                <div class="px-3 py-1 bg-green-500 ml-4  w-max text-sm font-semibold  text-white rounded">Pass</div>
                                            ) :
                                                <div class="px-3 py-1 bg-red-500 ml-2  w-max text-sm text-white rounded">Repeat</div>
                                            )
                                        )
                                    ) : (
                                        <div class="px-3 py-1 bg-yellow-500 ml-1  w-max text-sm text-white rounded">Pending</div>
                                    )}

                                </td>

                                <td className=" text-sm">

                                    <button
                                        type="button"
                                        onClick={() => handleGrade(data.submitId)}
                                        className="inline-block rounded bg-green-500 px-4 pb-[5px] pt-[6px]  text-sm   text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-green-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
                                    >
                                        Select Grade
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pgination */}
                <div className="md:flex mt-4 px-6">
                    <p className="text-sm  text-gray-400 flex-1">
                        Showing {currentPage * pageSize + 1} to{" "}
                        {Math.min(
                            currentPage * pageSize + pageSize,
                            currentPage * pageSize + submitAssignment.length
                        )}{" "}
                        of {totalPages * pageSize} entries
                    </p>
                    {/* Pagination  */}
                    <div className="flex items-center max-md:mt-5 mb-1">
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
    )
}

export default ShowAllAssignemt