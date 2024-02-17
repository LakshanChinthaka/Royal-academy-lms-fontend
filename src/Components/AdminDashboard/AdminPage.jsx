import SideBar from "./AdminSideBar/AdminSideBar";
import { Grid } from "@mui/material";


function AdminPage({children}) {

  return (
    <div className="">
      <Grid container>
        <Grid className="min-h-screen "item xs={2}>
          <SideBar />
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
            {children}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminPage;
