import React, { useEffect, useState } from 'react';
import { useToken } from "../../../Context/TokenProvider";
import axios from "axios";
import { Pie } from 'react-chartjs-2';

function PieChartData() {
    const { token } = useToken();
    const [totalCount, setTotalCount] = useState({});
    const APP_DATA_URL = "http://localhost:8080/api/v1/admin/static";
  
    useEffect(() => {
      getSchoolData();
    }, [])
  
    const getSchoolData = async () => {
      try {
        const res = await axios.get(APP_DATA_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalCount(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    // Extracting labels and values from the response data
    const labels = totalCount.obj ? totalCount.obj.map(item => item[0]) : [];
    const values = totalCount.obj ? totalCount.obj.map(item => item[1]) : [];

    const data = {
        labels: labels,
        datasets: [{
          label: 'Count',
          data: values,
          backgroundColor: [
            '#faca1b',
            '#fc1c1c',
            '#02ad38',
            '#0299ad',
            '#9a58fc',
            // Add more colors if needed
          ],
          hoverOffset: 7
        }]
      };

    return (
        <div className="w-[300px]">
          <Pie data={data}/>
        </div>
    )
}

export default PieChartData;
