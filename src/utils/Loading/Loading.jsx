import { Grid, CircularProgress } from "@mui/material";

function Loading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <CircularProgress />
    </Grid>
  );
}

export default Loading;
