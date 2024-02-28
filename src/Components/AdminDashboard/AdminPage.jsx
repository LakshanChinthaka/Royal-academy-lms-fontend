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


// import SideBar from "./AdminSideBar/AdminSideBar";
// import { Grid } from "@mui/material";

// function AdminPage({ children }) {
//   return (
//     <div className="">
//       <Grid container>
//         {/* Sidebar */}
//         <Grid item xs={2}>
//           <SideBar />
//         </Grid>
//         {/* Main content area */}
//         <Grid item xs={10}>
//           <Grid container>
//             <Grid item xs={12}>
//               {children}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default AdminPage;


// import AdminNavBar from "./AdminNavBar/AdminNavBar";
// import { Grid } from "@mui/material";

// function AdminPage({ children }) {
//   return (
//     <div>
//       <Grid container>
//         {/* Admin navigation bar */}
//         <Grid item xs={12}>
//           <AdminNavBar />
//         </Grid>

//         {/* Main content area */}
//         <Grid item xs={12}>
//           <Grid container>
//             <Grid item xs={12}>
//               {children}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default AdminPage;
