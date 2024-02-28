import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const MemoryLineChart = () => {
  const MEMORY_USAGE = "http://localhost:8080/manage/metrics/jvm.memory.used";
  const [memoryUsageData, setMemoryUsageData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(MEMORY_USAGE);
        const memoryUsageBytes = res.data.measurements[0].value;
        const memoryUsageMegabytes = (memoryUsageBytes / 1048576).toFixed(0);
        
        setMemoryUsageData(prevData => {
          const newLabels = [...prevData.labels, memoryUsageMegabytes];
          const newValues = [...prevData.values, memoryUsageMegabytes];

          // Ensure data length does not exceed certain limit, e.g., keep last 10 data points
          const maxDataPoints = 10;
          if (newLabels.length > maxDataPoints) {
            newLabels.shift(); // Remove the oldest label left
            newValues.shift(); // Remove the corresponding value bottom
          }
          return { labels: newLabels, values: newValues };
        });
      } catch (error) {
        console.error("Error fetching memory usage data:", error);
      }
    };

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: memoryUsageData.labels,
    datasets: [
      {
        label: 'Memory Usage (MB)',
        data: memoryUsageData.values,
        fill: true,
        borderColor: 'rgb(189, 192, 192)',
        tension: 0.5,
        // pointRadius: 0,
        borderColor: "rgba(25, 212, 322)",
        backgroundColor: "rgba(8, 127, 91,0.5)",
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
        min: 100,
        max: 300,
        ticks: {
          stepSize: 20 // adjust the step size as needed
        }
      }
    }
  };
  
  return <Line data={data} options={options} />;
  
};

export default MemoryLineChart;

