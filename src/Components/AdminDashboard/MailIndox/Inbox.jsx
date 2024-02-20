import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import Dropdown from "../../../utils/Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { useToken } from '../../Context/TokenProvider';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InfoButton from "../../../utils/InfoButton";

function Inbox() {
  const { token } = useToken();
  const [filterStatus, setFilterStatus] = useState("Inbox");

  const [mailData, setMailData] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Number of items per page

  const ALL_MAIL_URL = "http://localhost:8080/api/v1/mail/all";
  


  useEffect(() => {
    getMail();
    console.log("Mail list-", mailData);
  }, [currentPage]);

  //get data from backend
  const getMail = async () => {
    try {
      const response = await axios.get(ALL_MAIL_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          size: pageSize,
        },
      });

      setMailData(response.data.data.content);
      setTotalPages(response.data.data.totalPages);

      console.log("Response", response.data.data);

    } catch (error) {
      console.error("Error fetching school data:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  //filter data
  const filteredMailDetails = mailData.filter(
    (mail) =>
      (filterStatus === "Sendbox" ? mail.sendFrom === "royalacadmey@mail.com" : mail.sendFrom !== "royalacadmey@mail.com")
  );

  const handleFilterSelect = (selectedOption) => {
    setFilterStatus(selectedOption); // Update filterStatus
  };


  return (
    <div>
      <Grid container>
        <Grid item xs={4} className="mb-2">
          <Dropdown
            options={["Inbox", "Sendbox"]}
            label={filterStatus}
            onSelect={handleFilterSelect}
          />
        </Grid>
        <Grid item xs={6}>
          {/* Filter option */}
        </Grid>
        <Grid item xs={2}>
          <Link to="/admin/mail/send">
            <button
              type="button"
              class="px-6 flex justify-items-end mt-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                fill="#fff"
                class="inline mr-3"
                viewBox="0 0 512 512"
              >
                <path
                  d="M467 211H301V45c0-24.853-20.147-45-45-45s-45 20.147-45 45v166H45c-24.853 0-45 20.147-45 45s20.147 45 45 45h166v166c0 24.853 20.147 45 45 45s45-20.147 45-45V301h166c24.853 0 45-20.147 45-45s-20.147-45-45-45z"
                  data-original="#000000"
                />
              </svg>
              Send new Mail
            </button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white font-[sans-serif]">
              <thead class="bg-gray-300 whitespace-nowrap">
                <tr>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>

                  <th class="pr-2 pl-3  py-3 text-left text-sm font-semibold text-gray-700">
                    Sender
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Receiver
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Subject
                  </th>
                  <th class="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Message
                  </th>

                  <th class="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                    Show mail
                  </th>
                </tr>
              </thead>
              <tbody className="whitespace-normal">

                {filteredMailDetails && filteredMailDetails.length > 0 ? (

                  filteredMailDetails.map((data, index) => (

                    <tr key={index} className="even:bg-blue-50">

                      <td className="pr-2 pl-4 py-4 text-sm">{data.createdDate}</td>
                      <td className="pr-1 pl-4 py-4 text-sm">{data.sendFrom}</td>
                      <td className="pl-1 py-4 text-sm">{data.sendTo}</td>
                      <td className="py-4 text-sm truncate">{data.subject}</td>
                      <td className="max-w-20 py-4 text-sm truncate">{data.messageBody}</td>
                      <td className="pr-4 pl-py-1 text-sm text-right">
                      <Link to={`/admin/mail/info/${data.mailId}/${data.sendTo}/${data.messageBody}/${data.subject}/${data.sendFrom}/${data.createdDate}`}>
                          <svg
                            fill="#0071e1"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 416.979 416.979"
                            xml:space="preserve"
                            stroke="#0071e1"
                            className="w-6 h-6 items-right ml-10"
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
                  ))
                ) : (
                  <tr>
                    <td className="py-4 text-center" colSpan="6">
                      No data
                    </td>
                  </tr>
                )}
              </tbody>

            </table>


            {/* Pagination */}
            <div className="md:flex mt-4 px-6">
              <p className="text-sm text-gray-400 flex-1">
                Showing {currentPage * pageSize + 1} to{" "}
                {Math.min(
                  currentPage * pageSize + pageSize,
                  currentPage * pageSize + mailData.length
                )}{" "}
                of {totalPages * pageSize} entries
              </p>
              {/* Pagination  */}
              <div className="flex items-center max-md:mt-5 mb-5">
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
        </Grid>
      </Grid>
    </div>
  );
}

export default Inbox;
