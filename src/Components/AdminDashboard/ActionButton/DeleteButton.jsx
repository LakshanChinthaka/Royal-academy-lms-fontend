import React, { useEffect } from "react";
import Swal from "sweetalert2";
import ConfirmAlert from "../../../utils/ConfiramAlert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteButton({ schoolId }) {
  const { ConfirmMessage } = ConfirmAlert();

  const navigete = useNavigate();

  const handleDelete = async () => {
    const confirmed = await ConfirmMessage(
      "Delete Confirmation",
      "Are you sure you want to Delete record?",
      "Yes, Delete",
      "Cancel"
    );
    console.log(confirmed);
    console.log("School id -" + schoolId);

    const username = "laki@gmail.com";
    const password = "21022";

    if (confirmed) {
      try {
        console.log("Axios");
        const URL = "http://localhost:8080/api/v1/school/delete?id=" + schoolId;
        const response = await axios.delete(URL, {
          auth: {
            username: username,
            password: password,
          },
        });
      } catch (error) {
        console.error("Error deleting record:", error);
        Swal.fire("Error", "Failed to delete record", "error");
      }

      Swal.fire("Delete Successful", "", "success");
    //   navigete(-1)
    } else {
      Swal.fire("Delete Cancelled", "", "info");
    }

  };

  

  return (
    <div>
      <button class="mr-4" title="Delete" onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 fill-red-500 hover:fill-red-700"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
            data-original="#000000"
          />
          <path
            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
            data-original="#000000"
          />
        </svg>
      </button>
    </div>
  );
}

export default DeleteButton;
