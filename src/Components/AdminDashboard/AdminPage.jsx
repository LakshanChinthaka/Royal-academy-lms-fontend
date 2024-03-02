import { Grid } from "@mui/material";

function AdminPage({ children }) {
  return (
    <div>

      <Grid container>
        {/* Admin navigation bar */}
        <Grid item xs={12} >
          {/* <AdminMobileNavBar /> */}
          {/* <AdminNavbar/> */}
        </Grid>

        {/* Main content area */}
        <Grid item xs={12}>
        <Grid item xs={12} >
          <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
            <Grid item xs={12}>
              {children}
            </Grid>
          </div>
          </Grid>

              {/* <Footer />   */}
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminPage;

