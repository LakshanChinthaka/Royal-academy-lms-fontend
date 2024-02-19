// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import SuccessAlert from "../../../utils/SuccessAlert";
// import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
// import { useToken } from "../../Context/TokenProvider";
// import Swal from "sweetalert2";
// import ConfirmAlert from "../../../utils/ConfiramAlert";

// function MailSend() {
//     const { token } = useToken();

//     const [searchData, setSearchData] = useState("");
//     const [nic, setNic] = useState("");
//     const [id, setId] = useState(0);

//     // Message
//     const { SuccessMessage } = SuccessAlert();
//     const { ConfirmMessage } = ConfirmAlert();

//     const SEARCH_URL = "http://localhost:8080/api/v1/student/find-by-email";
//     const SEND_MAIL_URL = "";

//     const [data, setData] = useState({
//         sendFrom: "royalacadmey@mail.com",
//         sendTo: "",
//         subject: "",
//         messageBody: "",
//         userId: "",
//     });

//     useEffect(() => {
//         setData({ ...data, sendTo: id }); // Update userId in data whenever id changes
//     }, [id]); // Trigger effect whenever id changes

//     //Search
//     const handleSearchInputData = (e) => {
//         const { name, value } = e.target;
//         setNic(value); // Update nic state with the new value
//     };
//     console.log("Nic", nic);
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         try {
//             const res = await axios.get(SEARCH_URL, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 params: {
//                     nic: nic.trim(),
//                 },
//             });

//             setSearchData(res.data.data);
//             setId(res.data.data.userId);
//             console.log("UserID", res.data.data.username);
//             console.log("Student Details", res.data.data);
//         } catch (error) {
//             setSearchData([""]);
//             setNic([""]);
//             const confirmed = await SuccessMessage(error.response.data.data, "error");
//         }
//     };

//     console.log(setSearchData.firstName);

//     //Sumbit data
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const confirmed = await ConfirmMessage(
//             "Submit Confirmation",
//             "Are you sure you want to Create?",
//             "Yes, Create",
//             "Cancel"
//         );

//         if (confirmed) {
//             try {
//                 const res = await axios.post(SEND_MAIL_URL, payload, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 setData([]);

//                 const confirmed = await SuccessMessage(res.data.data, "success");
//             } catch (error) {
//                 const confirmed = await SuccessMessage(
//                     error.response.data.data,
//                     "error"
//                 );
//             }
//         } else {
//             Swal.fire("Account creation Cancelled", "", "info");
//         }
//     };

//     return (
//         <div>
//             <Grid container>
//                 <Grid item xs={12}>
//                     <div className="flex">
//                         <Link to="/admin/inbox" className="mt-3 ml-5">
//                             <BackButton />
//                         </Link>
//                         <h2 className="text-xl text-[#333] font-bold px-5 py-4 ">
//                             Mail Send
//                         </h2>
//                     </div>
//                     <Grid container spacing={2} columns={6}>
//                     <form onSubmit={handleSubmit}>
                                
//                                 </form>
//                         <Grid item xs={3} className=" ">
//                             <div class="bg-white mt-5 mb-5 ml-[200px] flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
//                                 <input
//                                     value={nic.nic}
//                                     onChange={handleSearchInputData}
//                                     required
//                                     type="text"
//                                     name="nic"
//                                     placeholder="Search by NIC no"
//                                     class="w-full outline-none bg-white pl-4 text-sm"
//                                 />
//                                 <button
//                                     onClick={handleSearch}
//                                     type="button"
//                                     class="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
//                                 >
//                                     Search
//                                 </button>
//                             </div>
//                             {/* from */}
//                             <div className="ml-[180px] mt-4 mb-3">
//                                 <div className="inline-flex align-baseline">
//                                     <h2 class="align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
//                                         From:
//                                     </h2>
//                                     <p className="ml-[-20px] align-baseline">
//                                         {" "}
//                                         royalacadmey@mail.com
//                                     </p>
//                                 </div>
//                                 {/* to */}
//                                 <div className="align-baseline mt-4">
//                                     <h2 class="inline-flex align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
//                                         To:
//                                     </h2>
//                                     <p className="inline-flex  ">
//                                         {" "}
//                                         {searchData.username ? `${searchData.username}` : "-"}
//                                     </p>
//                                 </div>
//                             </div>
//                             {/* subject */}
                           


//                             <div className="inline-flex align-baseline mt-1 ml-[180px]">
//                                 <h2 class="inline-block align-middle  text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
//                                     Subject:
//                                 </h2>
//                                 <textarea
//                                     max={5}
//                                     value={data.subject}
//                                     onChange={handleChange}
//                                     required
//                                     maxLength={300}
//                                     name="description"
//                                     type="text"
//                                     class="bg-gray-100 mt-2 max-h-[100px] min-h-[20px] w-[500px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
//                                     placeholder="Enter subject"
//                                 />
                            
//                             </div>
//                         </Grid>
//                         <Grid item xs={5} className="">
//                             <div>
//                                 <label
//                                     htmlFor="description"
//                                     class="ml-[180px] text-sm pr-10  pl-5 font-bold text-gray-700"
//                                 >
//                                     Message
//                                 </label>
//                                 <textarea
//                                     max={5}
//                                     value={data.messageBody}
//                                     onChange={handleChange}
//                                     required
//                                     maxLength={300}
//                                     name="description"
//                                     type="text"
//                                     class="bg-gray-100 mt-2 ml-[200px]  max-h-[500px] min-h-[280px] w-[700px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
//                                     placeholder="Enter address"
//                                 />
//                             </div>
//                         </Grid>
//                     </Grid>
//                     </form>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <button
//                                 type="submit"
//                                 class=" mt-5 max-w-[200px] ml-[200px]  py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
//                             >
//                                 Send
//                             </button>
//                         </Grid>
//                     </Grid>
//                 </Grid>
               
//             </Grid>
//         </div>
//     );
// }

// export default MailSend;




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
        sendFrom: "royalacadmey@mail.com",
        sendTo: "",
        subject: "",
        messageBody: "",
        userId: "",
    });

    useEffect(() => {
        setData({ ...data, userId: id, sendTo: email });
    }, [id,email]);

    console.log("final data",data)

    const handleSearchInputData = (e) => {
        const { name, value } = e.target;
        setNic(value);
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
                },
            });

            setSearchData(res.data.data);
            setId(res.data.data.userId);
            setEmali(res.data.data.username)
            console.log("UserID", res.data.data.username);
            console.log("Student Details", res.data.data);
        } catch (error) {
            setSearchData("");
            setNic("");
            const confirmed = await SuccessMessage(error.response.data.data, "error");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const confirmed = await ConfirmMessage(
            "Submit Confirmation",
            "Are you sure you want to Create?",
            "Yes, Create",
            "Cancel"
        );

        if (confirmed) {
            try {
                const res = await axios.post(SEND_MAIL_URL, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData({
                    sendFrom: "royalacadmey@mail.com",
                    sendTo: "",
                    subject: "",
                    messageBody: "",
                    userId: "",
                });

                const confirmed = await SuccessMessage(res.data.data, "success");
            } catch (error) {
                const confirmed = await SuccessMessage(error.response.data.data, "error");
            }
        } else {
            Swal.fire("Account creation Cancelled", "", "info");
        }
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <div className="flex">
                        <Link to="/admin/inbox" className="mt-3 ml-5">
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
                        <div className="bg-white mt-5 mb-5 ml-[200px] flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
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
                        <div className="ml-[180px] mt-4 mb-3">
                            <div className="inline-flex align-baseline">
                                <h2 className="align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                                    From:
                                </h2>
                                <p className="ml-[-20px] align-baseline">
                                    royalacadmey@mail.com
                                </p>
                            </div>
                            <div className="align-baseline mt-4">
                                <h2 className="inline-flex align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                                    To:
                                </h2>
                                <p className="inline-flex  ">
                                    {searchData.username ? searchData.username : "-"}
                                </p>
                            </div>
                        </div>
                        <div className="inline-flex align-baseline mt-1 ml-[180px]">
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
                                className="bg-gray-100 mt-2 max-h-[100px] min-h-[20px] w-[500px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
                                placeholder="Enter subject"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div>
                            <label
                                htmlFor="description"
                                className="ml-[180px] text-sm pr-10  pl-5 font-bold text-gray-700"
                            >
                                Message
                            </label>
                            <textarea
                                max={5}
                                value={data.messageBody}
                                onChange={handleChange}
                                required
                                maxLength={300}
                                name="messageBody"
                                type="text"
                                className="bg-gray-100 mt-2 ml-[200px]  max-h-[500px] min-h-[280px] w-[700px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
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

