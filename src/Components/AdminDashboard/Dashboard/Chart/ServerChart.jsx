import BarChart from "./BarChart"
import CpuLineChart from "./CpuLineChart"
import MemoryLineChart from "./MemortLineChart"



function ServerChart({ res200, res400, res404, res500 }) {
  return (
    <div>
          {/* Bar chart */}
          <div className="">
            <BarChart 
                res200={res200} 
                res400={res400} 
                res404={res404} 
                res500={res500} 
            />
            </div>

            {/* Line chart MEMORY */}
            <div className="mt-5">
                <MemoryLineChart/>
            </div>

            
            {/* Line chart CPU */}
            <div className="mt-5">
               <CpuLineChart/>
            </div>
    </div>
  )
}

export default ServerChart
