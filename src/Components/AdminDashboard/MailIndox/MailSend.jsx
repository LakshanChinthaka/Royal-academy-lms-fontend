
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import SuccessAlert from "../../../utils/SuccessAlert";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import { useToken } from "../../Context/TokenProvider";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";

function MailSend() {
    const { token } = useToken();

    const [searchData, setSearchData] = useState("");
    const [nic, setNic] = useState("");
    const [email, setEmali] = useState("");
    const [id, setId] = useState(0);

    // Message
    const { SuccessMessage } = SuccessAlert();
    const { ConfirmMessage } = ConfirmAlert();

    const SEARCH_URL = "http://localhost:8080/api/v1/student/find-by-email";
    const SEND_MAIL_URL = "http://localhost:8080/api/v1/mail/send";

    const [data, setData] = useState({
        sendFrom: email,
        sendTo: "",
        subject: "",
        messageBody: "",
        userId: "",
    });

    useEffect(() => {
        setData({ ...data, userId: id, sendTo: email });
    }, [id, email]);

    console.log("final data", data)

    const handleSearchInputData = (e) => {
        const { name, value } = e.target;
        setNic(value);
    };

    // Search
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get(SEARCH_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    nic: nic.trim(),
                },
            });

            setSearchData(res.data.data);
            setId(res.data.data.userId);
            setEmali(res.data.data.username)

            // if(res.data.)
            const confirmed = await SuccessMessage(res.data.message, "success");

        } catch (error) {
            setSearchData("");
            setNic("");
            setEmali("")
            const confirmed = await SuccessMessage(error.response.data.data, "error");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Send mail
    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmed = await ConfirmMessage(
            "Send Confirmation",
            "Are you sure you want to send?",
            "Yes, send",
            "Cancel"
        );

        if (confirmed) {
            console.log(data)
            try {
                const res = await axios.post(SEND_MAIL_URL, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData({
                    // sendFrom: "royalacadmey@mail.com",
                    sendTo: "",
                    subject: "",
                    messageBody: "",
                    userId: "",
                });
                setEmali("");
                setNic(""); // Clear search bar
                setSearchData(""); // Clear search data

                const confirmed = await SuccessMessage(res.data.data, "success");
            } catch (error) {
                const confirmed = await SuccessMessage(error.response.data.data, "error");
            }
        } else {
            Swal.fire("Mail send Cancelled", "", "info");
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex">
                        <Link to="/admin/mail/indox" className="mt-3 ml-5">
                            <BackButton />
                        </Link>
                        <h2 className="text-xl text-[#333] font-bold px-5 py-4 ">
                            Mail Send
                        </h2>
                    </div>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} columns={6}>
                    <Grid item xs={3}>
                        <div className="bg-white ml-10 mt-5 w-[350px] sm:mt-5 sm:mb-5 sm:ml-[200px] flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                            <input
                                value={nic}
                                onChange={handleSearchInputData}
                                required
                                type="text"
                                name="nic"
                                placeholder="Search by NIC no"
                                className="w-full outline-none bg-white pl-4 text-sm"
                            />
                            <button
                                onClick={handleSearch}
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
                            >
                                Search
                            </button>
                        </div>
                        <div className="sm:ml-[180px] ml-5 mt-4 mb-3">
                            {/* From */}
                            {/* <div className="inline-flex align-baseline">
                                <h2 className="align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                                    From:
                                </h2>
                                <p className="ml-[-20px] align-baseline">
                                    royalacadmey@mail.com
                                </p>
                            </div> */}
                            {/* To */}
                            <div className="align-baseline mt-4">
                                <h2 className="inline-flex align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                                    To:
                                </h2>
                                <p className="inline-flex  ">
                                    {searchData.username ? searchData.username : "-"}
                                </p>

                                {/* Ok icon */}
                                <div class="inline-flex  ml-3 ">
                                    {searchData.username ? <>

                                        <input id="checkbox1" type="checkbox" class="hidden peer" checked />
                                        <label for="checkbox1"
                                            class="relative inline-flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6  bg-green-500 border rounded-full overflow-hidden">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-full fill-white" viewBox="0 0 520 520">
                                                <path
                                                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                                                    data-name="7-Check" data-original="#000000" />
                                            </svg>
                                        </label>
                                    </> : ""}

                                </div>

                            </div>

                        </div>
                        <div className="sm:inline-flex align-baseline ml-5 mt-1 sm:ml-[180px]">
                            <h2 className="inline-block align-middle  text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                                Subject:
                            </h2>
                            <textarea
                                max={5}
                                value={data.subject}
                                onChange={handleChange}
                                required
                                maxLength={300}
                                name="subject"
                                type="text"
                                className="bg-gray-100 mt-2 max-h-[100px] ml-5 min-h-[20px] w-[400px] sm:w-[500px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="Enter subject"
                            />
                        </div>

                    </Grid>
                    <Grid item xs={5}>
                        <div className="sm:inline-flex align-baseline ml-5 mt-1 sm:ml-[7px]">
                            <label
                                htmlFor="description"
                                className="sm:ml-[180px] lg:ml-[180px]  ml-1 text-sm pr-10  pl-5 font-bold text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                max={5}
                                value={data.messageBody}
                                onChange={handleChange}
                                required
                                maxLength={1000}
                                name="messageBody"
                                type="text"
                                className="bg-gray-100 mt-2 sm:ml-[10px] ml-5 max-h-[500px] min-h-[280px] w-[700px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="Enter address"
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <button
                                type="submit"
                                className="mt-5 mb-5 max-w-[200px] ml-[200px]  py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                            >
                                Send
                            </button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default MailSend;

