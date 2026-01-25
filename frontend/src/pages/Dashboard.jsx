import React from "react";
import axios from "axios";

import { CssBaseline, Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import Overview from "../components/Overview";

const Dashboard = () => {
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    const token = "Token " + localStorage.getItem("token");
    axios
      .get("http://localhost:8000/jobs/", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setJobs(response.data);
      });
  }, []);

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
      <Summary rows={jobs} />
      <Overview rows={jobs} />
    </Box>
  );
};

export default Dashboard;
