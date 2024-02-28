import React from 'react'
import AppGrid from './AppGrid'
import StatusBar from './StatusBar'
import { Grid } from "@mui/material";
import ServerGrid from './ServerGrid'
import BarChart from './Chart/BarChart';
import CpuLineChart from './Chart/CpuLineChart';
import MemoryLineChart from './Chart/MemortLineChart';
import PieChartData from './Chart/PieChartData';

function AdminDashboard() {
  return (
    <div>


      <Grid container>

        <Grid item xs={12} >
          <StatusBar />
        </Grid>

        <Grid item xs={6} >
          <div className=''>

            <AppGrid />
            
          </div>
        </Grid>

        <Grid item xs={6} >
          <ServerGrid />


          <div className='ml-[-10px] hidden sm:block p-2 sm:justify-end mx-auto grid xl:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-y-7 gap-x-12'>

            <div className=' block'><BarChart /></div>

            <div className=' block xl:mt-5'> <CpuLineChart /> </div>


            <div className=' block xl:mb-20 xl:mt-5'><MemoryLineChart /></div>


          </div>

        </Grid>
      </Grid>

    </div>
  )
}

export default AdminDashboard