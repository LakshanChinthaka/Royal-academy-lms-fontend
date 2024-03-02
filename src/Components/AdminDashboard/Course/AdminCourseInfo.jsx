import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid } from "@mui/material";
import BackButton from "../../../utils/Dropdown/BackButton/BackButton";
import PaginationTable from "../../../utils/Table/PaginationTable";
import { useToken } from "../../Context/TokenProvider";
import Table from "../../../utils/Table/Table";

function AdminCourseInfo() {
  const {
    id,
    code,
    courseType,
    category,
    name,
    duration,
    medium,
    schoolName,
    fees,
    createBy,
    createdDate,
    modifiedBy,
    modifiedData,
    totalCredit,
    totalHours,
  } = useParams();

  const { token } = useToken();
  const BATCH_URL = "http://localhost:8080/api/v1/batch/find-all";
  const SUBJECT_URL = "http://localhost:8080/api/v1/assign/find";

  const createdDateFormatted = new Date(createdDate).toLocaleString();
  const modifiedDateFormatted = new Date(modifiedData).toLocaleString();

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <div className="flex">
            <Link to="/admin/course" className="mt-3 ml-5">
              <BackButton />
            </Link>
            <h2 className="text-xl text-[#333] font-bold px-5 py-4 ">
              Course Information
            </h2>
          </div>

          <div className="flex ml-3">

          <Grid container spacing={2} md:columns={4}>
            <Grid item xs={1}>

              <div className="ml-7">
                <tbody class="whitespace-nowrap">
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] whitespnace-wrap font-bold">
                      Name
                    </td>
                    <td class="px-6 py-4 text-gray-500 text-sm">
                      {" "}
                      {courseType + " " + name}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      Code{" "}
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-sm">
                      {code ? code : "---"}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      {" "}
                      Category
                    </td>
                    <td class="px-6 py-4 text-gray-500 text-sm">
                      {category ? category : "---"}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2   text-sm text-[#333] font-bold">
                      School name
                    </td>
                    <td class="px-6 py-4 text-gray-500 text-sm">
                      {" "}
                      {schoolName ? schoolName : "---"}
                    </td>
                  </tr>
                </tbody>
              </div>
            </Grid>

            <div className="flex sm:ml-[280px]  mt-[210px] sm:mt-3">

     
            <Grid item xs={1}>
              <div className="sm:pl-[110px]">
                <tbody class="whitespace-nowrap">
                  <tr>
                    <td class=" ml-[500px] px-6 py-2 text-sm text-[#333] font-bold">
                      Duration
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-text-sm">
                      {" "}
                      {duration ? duration : "---"}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      Medium
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-sm">
                      {medium ? medium : "---"}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      {" "}
                      Total credit
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-sm">
                      {totalCredit}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      Total Hours
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-text-sm">
                      {" "}
                      {totalHours}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">Fee</td>
                    <td class="px-6 py-2 text-gray-500 text-text-sm">
                      {" "}
                      {"Rs " + fees}
                    </td>
                  </tr>
                </tbody>
              </div>
            </Grid>

            </div>

            <div className="flex sm:ml-[200px] ml-10">

          

            <Grid item xs={1} className="m-l-[-150px] ">
              <div className="">
                <tbody class="whitespace-nowrap">
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      {" "}
                      Create time
                    </td>
                    <td class="px-6 py-4 text-gray-500 text-text-sm">
                      {" "}
                      {createdDateFormatted}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      Create By
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-sm">{createBy}</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      Last Modify time
                    </td>
                    <td class="px-6 py-2 text-gray-500 text-sm]">
                      {modifiedDateFormatted}
                    </td>
                  </tr>
                  <tr>
                    <td class="px-6 py-2 text-sm text-[#333] font-bold">
                      Modify By
                    </td>
                    <td class="px-6 py-4 text-gray-500 text-sm">
                      {" "}
                      {modifiedBy}
                    </td>
                  </tr>
                </tbody>
              </div>
            </Grid>


            </div>

          </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PaginationTable
                itemName={"Batch"}
                tableHeaders={[
                  "Batch Code",
                  "No of Student",
                  "Create by",
                  "Create Data",
                  "Last modify by",
                  "Last modified data",
                  "Status",
                  "Student Assign",
                  "View",
                ]}
                id={id}
                title={"Batch list"}
                URL={BATCH_URL}
                headers={{ Authorization: `Bearer ${token}` }}
              />
            </Grid>
            <Grid item xs={12}>
              <Table
                itemName={"Subject"}
                tableHeaders={[
                  "Subject Code",
                  "Create by",
                  "Assign Data",
                  "Last modify by",
                  "Last modified data",
                  "View",
                ]}
                title={"Subject list"}
                id={id}
                URL={SUBJECT_URL}
                headers={{ Authorization: `Bearer ${token}` }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminCourseInfo;
