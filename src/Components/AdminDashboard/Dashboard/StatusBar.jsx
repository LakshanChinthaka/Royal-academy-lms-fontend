import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from '../../Context/TokenProvider';

function StatusBar() {
  const HEALTH_URL = " http://localhost:8080/manage/health";
  const UP_TIME = "http://localhost:8080/manage/metrics/process.uptime";
  const CPU_USAGE = "http://localhost:8080/manage/metrics/process.cpu.usage";
  const MEMORY_USAGE = "http://localhost:8080/manage/metrics/jvm.memory.used";


  const [health, setHealth] = useState();
  const [dbName, setDbName] = useState();
  const [dbStatus, sebDbStatus] = useState();
  const [upTime, SetUpTime] = useState();
  const [memoryUsage, setMemaryUsage] = useState();
  const [cpuUsage, setCpuUsage] = useState();



  useEffect(() => {
    getResponseData();
    updateUptime();
    checkCpuUsage();
    ChekcmemoryUsage();
  }, []);


  //STATUS
  function getResponseData() {
    setInterval(async () => {
      try {
        const res = await axios.get(HEALTH_URL);
        setHealth(res.data.status)
        sebDbStatus(res.data.components.db.status)
        sebDbStatus(res.data.components.db.status)
        setDbName(res.data.components.db.details.database)
      } catch (error) {
        console.error("Error fetching uptime data:", error);
      }
    }, 1000);
  }


  //call funtion 1s for live display  data
  //CPU
  function checkCpuUsage() {
    setInterval(async () => {
      try {
        const res = await axios.get(CPU_USAGE);
        const cpuUsageValue = res.data.measurements[0].value;
        const cpuUsagePercentage = (cpuUsageValue * 100).toFixed(2);
        const cpuUsageReadable = `${cpuUsagePercentage}%`;
        setCpuUsage(cpuUsageReadable);
      } catch (error) {
        console.error("Error fetching uptime data:", error);
      }
    }, 1000);
  }

  //MEMORY
  function ChekcmemoryUsage() {
    setInterval(async () => {
      try {
        const res = await axios.get(MEMORY_USAGE);
        const memoeyUsage = res.data.measurements[0].value;
        const memoryUsageMegabytes = (memoeyUsage / 1048576).toFixed(0); // Convert bytes to megabytes and round to 2 decimal places
        const memoryUsageReadable = `${memoryUsageMegabytes} MB`;
        setMemaryUsage(memoryUsageReadable);
      } catch (error) {
        console.error("Error fetching uptime data:", error);
      }
    }, 1000);
  }



  // Update the uptime every second
  function updateUptime() {
    setInterval(async () => {
      try {
        const response = await axios.get(UP_TIME);
        const uptimeInSeconds = response.data.measurements[0].value;
        const formattedUptime = formatUptime(uptimeInSeconds);
        SetUpTime(formattedUptime);
      } catch (error) {
        console.error("Error fetching uptime data:", error);
      }
    }, 1000);
  }

  // Convert uptime in seconds to a readable format (days, hours, minutes, seconds)
  function formatUptime(uptimeInSeconds) {
    const days = Math.floor(uptimeInSeconds / (3600 * 24));
    const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }


  return (
    <div>
      <div class="flex items-center max-md:flex-col bg-gray-300 text-gray-900 px-6 py-2 font-[sans-serif]">
        <p class="text-base font-semibold flex-1">Server Status: {health === "UP" ? <p class="text-base font-semibold  text-green-600 inline-flex">UP</p> : <p class=" inline-flex font-semibold text-base text-red-500 ">DOWN</p>}</p>
        <p class="text-base font-semibold flex-1">DB Status: {dbStatus === "UP" ? <p class="text-base font-semibold  text-green-600 inline-flex">UP</p> : <p class=" inline-flex font-semibold text-base text-red-500 ">DOWN</p>}</p>
        <p class="text-base flex-1  font-semibold">DB: {dbName}</p>
        <p class="text-base  font-semibold flex-1">Uptime:<p class="text-base inline-flex ml-2 font-semibold text-green-600 flex-1">{upTime}</p> </p>
        <p class="text-base  font-semibold flex-1">CPU usage:<p class="text-base inline-flex ml-2 font-semibold text-green-600 flex-1">{cpuUsage}</p> </p>
        <p class="text-base  font-semibold flex-1">Memory usage:<p class="text-base inline-flex ml-2 font-semibold text-green-600 flex-1">{memoryUsage}</p> </p>

      </div>
    </div>
  )
}

export default StatusBar
