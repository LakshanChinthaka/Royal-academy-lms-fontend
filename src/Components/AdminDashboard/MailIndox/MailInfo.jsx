import React from 'react'
import { Grid } from "@mui/material";
import { Link, useParams } from 'react-router-dom'
import BackButton from '../../../utils/Dropdown/BackButton/BackButton';


function MailInfo() {

const {id,sendTo,messageBody,subject,sendFrom,createdDate} = useParams();

  return (
    <div className='mt-5'>
    <Grid container>
        <Grid item xs={12}>
            <div className="flex ml-20">
                <Link to="/admin/mail/indox" className="mt-3 ml-10">
                    <BackButton/>
                </Link>
            </div>
        </Grid>
    </Grid>
    <form >
        <Grid container spacing={2} columns={6}>
            <Grid item xs={3}>

                <div className="ml-[180px] mt-4 mb-3">
                    {/* From */}
                    <div className="inline-flex align-baseline">
                        <h2 className="align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                            From: 
                        </h2>
                        <p className="ml-[-20px] align-baseline">
                            {sendFrom}
                        </p>
                    </div>
                    {/* To */}
                    <div className="align-baseline mt-4">
                        <h2 className="inline-flex align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                            To:
                        </h2>
                        <p className="inline-flex  ">
                            {sendTo}
                        </p>
                    </div>

                    {/* Date */}
                    <div className="inline-flex align-baseline mt-3 mt-2">
                        <h2 className="align-baseline text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                            Date: 
                        </h2>
                        <p className="ml-[-20px] align-baseline">
                            {createdDate}
                        </p>
                    </div>

                </div>
                <div className="inline-flex align-baseline mt5 ml-[180px]">
                    <h2 className="inline-block align-middle  text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                        Subject:
                    </h2>
                    <textarea
                        max={5}
                        value={subject}
                        required
                        maxLength={300}
                        name="subject"
                        type="text"
                        className="bg-gray-100 mt-2 max-h-[100px] min-h-[20px] w-[500px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter subject"
                    />
                </div>

                

            </Grid>
            <Grid item xs={5}>
                <div className="inline-flex align-baseline mt-1 ml-[180px]">
                <h2 className="inline-block align-middle  text-sm pr-10 mb-1 pl-5 font-bold text-gray-700">
                        Message:
                    </h2>
                    <textarea
                        max={5}
                        value={messageBody}
                        // onChange={handleChange}
                        required
                        maxLength={1000}
                        name="messageBody"
                        type="text"
                        className="bg-gray-100 mt-2  max-h-[500px] min-h-[280px] w-[700px] text-sm px-4 py-3.5 rounded-md outline-blue-500"
                        placeholder="Enter address"
                    />
                </div>
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </Grid>
    </form>
</div>
  )
}

export default MailInfo