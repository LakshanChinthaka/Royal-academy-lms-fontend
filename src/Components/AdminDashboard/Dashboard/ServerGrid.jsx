import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from '../../Context/TokenProvider';
import Ok200Icon from '../../../assets/ok200Icon.png'
import TotalReqIcon from '../../../assets/totalReq.png'
import InfoIcon from '../../../assets/infoIcon.png'
import Warning from '../../../assets/warning.png'
import ErrorIcon from '../../../assets/error.png'
import BarChart from "./Chart/BarChart";
import MemoryLineChart from "./Chart/MemortLineChart";
import CpuLineChart from "./Chart/CpuLineChart";
import ServerChart from "./Chart/ServerChart";
// import DoughnutChart from "./Chart/DoughnutChart";

function ServerGrid() {
    const { token } = useToken();
    const [res200, setRes200] = useState();
    const [res400, setRes400] = useState();
    const [res404, setRes404] = useState();
    const [res500, setRes500] = useState();
    const [allRes, setAllRes] = useState();

    const RES200_URL = "http://localhost:8080/manage/metrics/http.status.200";
    const RES400_URL = "http://localhost:8080/manage/metrics/http.status.400";
    const RES404_URL = "http://localhost:8080/manage/metrics/http.status.404";
    const RES500_URL = "http://localhost:8080/manage/metrics/http.status.500";
    const ALL_RES_URL = "http://localhost:8080/manage/metrics/api.requests";
    const HEALTH_URL = " http://localhost:8080/manage/health";



    useEffect(() => {
        get200Data();
    }, []);


    const get200Data = async () => {
        setInterval(async () => {

            try {
                const [res200, res400, res404, res500, resAllRes] = await Promise.all([
                    axios.get(RES200_URL),
                    axios.get(RES400_URL),
                    axios.get(RES404_URL),
                    axios.get(RES500_URL),
                    axios.get(ALL_RES_URL),
                ]);

                // Access count values for each response
                const count200 = res200.data.measurements[0].value;
                const count400 = res400.data.measurements[0].value;
                const count404 = res404.data.measurements[0].value;
                const count500 = res500.data.measurements[0].value;
                const countAllRes = resAllRes.data.measurements[0].value; // Decrease by 5

                // Set state or perform actions with the count values
                setRes200(count200);
                setRes400(count400);
                setRes404(count404);
                setRes500(count500);
                setAllRes(countAllRes);


                localStorage.setItem("200res", count200);
                localStorage.setItem("400res", count400);
                localStorage.setItem("404res", count404);
                localStorage.setItem("500res", count500);

            } catch (error) {
                console.error("Error fetching Metrics data:", error);
            }
        }, 1000);
    };



    return (
        <div class=" px-5 py-2 font-[sans-serif] text-white">
            <div class="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-x-2 md:gap-y-2 sm:gap-x-2 sm:gap-y-2 max-w-6xl mx-auto ">

                {/* <div class="text-center border-2 p-4 border-gray-600 bg-gradient-to-r from-blue-500 to-indigo-500  rounded-md">
                    <img src={TotalReqIcon} className='w-7' />
                    <h3 class="text-4xl font-extrabold sm:ml-[-7px] mt-2">{allRes}</h3>
                    <p class="text-gray-800  font-semibold mt-3">Total Rquest</p>
                </div> */}

                <div class="text-center border-2 border-gray-600 p-4  rounded-md bg-[#4dca34]">
                    <img src={Ok200Icon} className='w-7' />
                    <h3 class="text-3xl font-extrabold mt-2">{res200}</h3>
                    <p class="text-gray-800  font-semibold mt-3">200 Response</p>
                </div>

                <div class="text-center border-2 border-gray-600 p-4 rounded-md bg-[#f0e32e]">
                    <img src={InfoIcon} className='w-7' />
                    <h3 class="text-3xl font-extrabold mt-2">{res400}</h3>
                    <p class="text-gray-800  font-semibold mt-3">400 Response</p>
                </div>


                <div class="text-center border-2 border-gray-600 p-4 rounded-md bg-orange-500">
                    <img src={Warning} className='w-7' />
                    <h3 class="text-3xl font-extrabold mt-2">{res404}</h3>
                    <p class="text-gray-800  font-semibold mt-3">404 Response</p>
                </div>

                <div class="text-center border-2 border-gray-600 p-4 rounded-md bg-red-600">
                    <img src={ErrorIcon} className='w-7' />
                    <h3 class="text-3xl font-extrabold mt-2">{res500}</h3>
                    <p class="text-gray-800  font-semibold mt-3">500 Response</p>
                </div>
            </div>


            {/* Mobile viwe */}
            <div className="sm:hidden ml-[-180px] w-[330px] sm:justify-end mx-auto grid xl:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-y-7 gap-x-12">
                {/* Bar chart */}
                <div className="mt-[900px]">
                    <BarChart
                        res200={res200}
                        res400={res400}
                        res404={res404}
                        res500={res500}
                    />
                </div>

                {/* Line chart MEMORY */}
                <div className="">
                    <MemoryLineChart />
                </div>

                {/* Line chart CPU */}
                <div className="mb-5">
                    <CpuLineChart />
                </div>
            </div>


        </div>


    )
}

export default ServerGrid