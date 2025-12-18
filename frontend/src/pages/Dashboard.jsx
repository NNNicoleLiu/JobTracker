import { CssBaseline, Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Summary from "../components/Summary";

const Dashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Summary />
    </Box>
  );
};

export default Dashboard;
