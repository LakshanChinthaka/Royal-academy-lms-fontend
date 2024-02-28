import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from "chart.js/auto"

function BarChart() {

  const res200 =localStorage.getItem("200res");
  const res400 =localStorage.getItem("400res");
  const res404 =localStorage.getItem("404res");
  const res500 =localStorage.getItem("500res");

  // Data for the bar chart
  const data = {
    labels: ['200 Response', '400 Response', '404 Response', '500 Response'],
    datasets: [
      {
        label: 'Request Responses',
        data: [res200, res400, res404, res500],
        backgroundColor: [
          'rgb(34,197,94)',
          'rgb(252, 196, 25)',
          'rgb(249,115,22)',
          'rgb(220,38,38))',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <div className='mt-5 mr-5'>
      <Bar data={data}  />
    </div>
  );
}

export default BarChart;
