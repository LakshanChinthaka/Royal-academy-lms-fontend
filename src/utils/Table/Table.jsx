import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/Button";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Border from "../Border/Border";
import EditButton from "../../Components/AdminDashboard/ActionButton/EditButton";

function Table({ id, title, URL, headers, tableHeaders, itemName }) {
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const response = await axios.get(URL, {
                headers: headers,
                params: {
                    id: id,
                },
            });

            //set data
            setTableData(response.data.data);
            console.log(response.data.data);

            //   const count = response.data.data.length
            setCount(response.data.data.length);
            //   console.log(count)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <Grid container></Grid>

                <Border/>

                <div className="inline-block">

                    <h2 class="inline-block text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                        Total {itemName} - {count}
                    </h2>

                    <h2 class="inline-block text-xl ml-[350px] mt-2  font-bold text-gray-700">
                        {title}
                    </h2>

                </div>

                <div class="mb-5">
                    <table class="min-w-full bg-white font-[sans-serif]">
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
                        <tbody class="whitespace-nowrap">
                            {tableData.map((data, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "even:bg-blue-50" : ""}
                                    class="even:bg-blue-50"
                                >
                                    <td class="pr-2 pl-4 py-4 text-sm text-left">{data.code}</td>
                                    <td class="pr-2 pl-4 py-1 text-sm text-left">
                                        {data.subject}
                                    </td>
                                    <td class="pr-2 pl-4 py-1 text-sm text-left">
                                        {" "}
                                        {new Date(data.createdDate).toLocaleString()}
                                    </td>
                                    <td class="pr-2 pl-4 py-1 text-sm text-left">
                                        {data.modifiedBy}
                                    </td>
                                    <td class="pr-2 pl-4 py-1 text-sm text-left">
                                        {" "}
                                        {new Date(data.modifiedData).toLocaleString()}
                                    </td>

                                    {/* Info icon */}
                                    <td class="pr-2 pl-4 py-1 text-sm text-left ">
                                      <Link to="/admin/subject">
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
                            ))}
                        </tbody>
                    </table>
                </div>
                <Border/>
            </div>
        </>
    );
}

export default Table;
