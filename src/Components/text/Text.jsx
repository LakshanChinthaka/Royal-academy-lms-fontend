import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminComponent() {
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your_username' and 'your_password' with actual credentials
        const response = await axios.get("http://localhost:8080/admin/not-secured",
          {
            // auth: {
            //   username: "admin@gmail.com",
            //   password: "21022",
            // },
          }
        );

        setAdminMessage(response.data);
      } catch (error) {
        console.error("Error fetching admin message:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Admin Component</h1>
      <p>Message-----: {adminMessage}</p>
    </div>
  );
}

export default AdminComponent;
