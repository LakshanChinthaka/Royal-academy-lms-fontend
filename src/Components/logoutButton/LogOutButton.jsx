import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConfirmAlert from "../../utils/ConfiramAlert";


function LogOutButton() {
  const { ConfirmMessage } = ConfirmAlert();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = await ConfirmMessage(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      "Yes, logout",
      "Cancel"
    );
    console.log(confirmed);    

    if (confirmed) {

      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("userRole")

      navigate("/");

      window.location.reload();
    } else {

      Swal.fire("Logout Cancelled", "", "info");
    }

  };
  return (
    <div className="mt[-10px]">
      <button
        onClick={handleLogout}
        className="px-3 py-1 text-sm rounded-full font-bold text-white border-2 border-[#ff4e4e] bg-[#ff4e4e] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-red-600 ml-3"
      >
        Logout
      </button>
    </div>
  );
}

export default LogOutButton;
