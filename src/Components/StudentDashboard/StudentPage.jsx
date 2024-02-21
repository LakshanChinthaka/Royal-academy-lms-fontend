import { Grid } from "@mui/material";
import StudentNavBar from "./StudentNavBar/StudentNavBar";


function StudentPage({children}) {

  return (
    <div>

      <Grid container>
        {/* Admin navigation bar */}
        <Grid item xs={12} >
          {/* <AdminNavBar  /> */}
          {/* <StudentNavBar/> */}
        </Grid>

        {/* Main content area */}
        <Grid item xs={12}>
        <Grid item xs={12} >
          {/* <Grid container> */}
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
            <Grid item xs={12}>
              {children}
            </Grid>
          </div>
          </Grid>

        </Grid>
      </Grid>
    </div>
  );
}

export default StudentPage;
