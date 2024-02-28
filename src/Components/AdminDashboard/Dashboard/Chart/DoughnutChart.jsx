import React from 'react'
import {Chart as ChartJS} from "chart.js/auto"

function DoughnutChart({ res200, res400, res404, res500 }) {

    // Data for the bar chart
  const data = {
    labels: ['200 Response', '400 Response', '404 Response', '500 Response'],
    datasets: [
      {
        label: 'Request Responses',
        data: [res200, res400, res404, res500],
        backgroundColor: [
          'rgb(34,197,94)',
          'rgb(234,179,8)',
          'rgb(249,115,22)',
          'rgb(220,38,38))',
        ],
        borderColor: [
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(255, 205, 86, 1)',
        //   'rgba(54, 162, 235, 1)',
        ],
        hoverOffset: 4
      },
    ],
  };



  return (
    <div>
        <DoughnutChart  data={data}/>
    </div>
  )
}

export default DoughnutChart