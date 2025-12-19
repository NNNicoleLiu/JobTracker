import { CssBaseline, Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import Overview from "../components/Overview";

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <Navbar />
      <Summary />
      <Overview />
    </Box>
  );
};

export default Dashboard;
