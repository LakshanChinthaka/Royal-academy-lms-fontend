import { useEffect, useStat} from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useToken } from "../../Context/TokenProvider";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";

function StudentInfo() {

const location = useLocation();
const { studentData } = location.state; // Access the passed state


    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex">
                        <Link to="/admin/students" className="mt-3 ml-5">
                            <BackButton />
                        </Link>
                        <h2 className="text-xl text-[#333] font-bold px-5 py-4 ">
                            Student Information
                        </h2>
                    </div>

                            <Grid container spacing={2} columns={3}>

                                <Grid item xs={1}>

                                    <div class="flex flex-wrap items-center mt-10 ml-5 flex-col cursor-pointer rounded-full">
                                        <img
                                            src={"https://readymadeui.com/team-1.webp"}
                                            class="w-[200px] h-[200px] rounded-full"
                                        />
                                        <h4 class="text-xl text-[#333] font-bold mt-3">{studentData.firstName}</h4>
                                        <p class="text-sm text-gray-500 mt-1">{"data.lastName"}</p>
                                    </div>
                                </Grid>

                                <div>
                                    <Grid item xs={1}>


                                        <div className="pl-[110px]">
                                            <tbody class="whitespace-nowrap">
                                                <tr>
                                                    <td class=" ml-[500px] px-6 py-2 text-sm text-[#333] font-bold">
                                                        Course
                                                    </td>
                                                    <td class="px-6 py-2 text-gray-500 text-text-sm">
                                                        {"data.mobileNo"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        Medium
                                                    </td>
                                                    <td class="px-6 py-2 text-gray-500 text-sm">{"---"}</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        {" "}
                                                        Total credit
                                                    </td>
                                                    <td class="px-6 py-2 text-gray-500 text-sm">{ }</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        Total Hours
                                                    </td>
                                                    <td class="px-6 py-2 text-gray-500 text-text-sm"> { }</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">Fee</td>
                                                    <td class="px-6 py-2 text-gray-500 text-text-sm">
                                                        {" "}
                                                        {"Rs "}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </div>

                                    </Grid>
                                    <Grid item xs={1} className="m-l-[-150px]">
                                        <div className="">
                                            <tbody class="whitespace-nowrap">
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        {" "}
                                                        Create time
                                                    </td>
                                                    <td class="px-6 py-4 text-gray-500 text-text-sm"> { }</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        Create By
                                                    </td>
                                                    <td class="px-6 py-2 text-gray-500 text-sm">{ }</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        Last Modify time
                                                    </td>
                                                    <td class="px-6 py-2 text-gray-500 text-sm]">
                                                        {/* {modifiedDateFormatted} */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                                                        Modify By
                                                    </td>
                                                    <td class="px-6 py-4 text-gray-500 text-sm">
                                                        {" "}
                                                        {/* {modifiedBy} */}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </div>
                                    </Grid>
                                </div>

                            </Grid>

                </Grid>

            </Grid>
        </div>
    );
}

export default StudentInfo;
