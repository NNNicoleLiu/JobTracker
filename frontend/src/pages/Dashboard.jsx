import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import Overview from "../components/Overview";
import api from "../utils/api";

const Dashboard = () => {
  const [jobs, setJobs] = React.useState([]);
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const response = await api.get("/jobs/");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  React.useEffect(() => {
    fetchApplications();
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
      {/* need to implement filter by status in summary */}
      <Summary rows={jobs} />
      <Overview rows={jobs} />
    </Box>
  );
};

export default Dashboard;
