

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

function CpuLineChart() {
  const CPU_USAGE = "http://localhost:8080/manage/metrics/process.cpu.usage";
  const [cpu, setCpu] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(CPU_USAGE);
        const cpuUsageValue = res.data.measurements[0].value;
        const cpuUsagePercentage = (cpuUsageValue * 100).toFixed(2);
        
        setCpu(prevData => {
          const newLabels = [...prevData.labels, cpuUsagePercentage];
          const newValues = [...prevData.values, cpuUsagePercentage];

          // Ensure data length does not exceed certain limit, e.g., keep last 10 data points
          const maxDataPoints = 10;
          if (newLabels.length > maxDataPoints) {
            newLabels.shift(); // Remove the oldest label
            newValues.shift(); // Remove the corresponding value
          }
          return { labels: newLabels, values: newValues };
        });
      } catch (error) {
        console.error("Error fetching CPU usage data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: cpu.labels,
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: cpu.values,
        fill: true,
        borderColor: "rgba(62, 12, 255, 0.4)",
        tension: 0.5,
        backgroundColor:  'rgba(62, 12, 255, 0.4)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 30,
        ticks: {
          stepSize: 5 // adjust the step size as needed
        }
      }
    }
  };

  return <Line data={data} options={options} />;
}

export default CpuLineChart;

