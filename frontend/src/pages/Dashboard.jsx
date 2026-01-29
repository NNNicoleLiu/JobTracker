import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import Overview from "../components/Overview";

const Dashboard = () => {
  const [jobs, setJobs] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = "Token " + localStorage.getItem("token");
      console.log(token);
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
    } else {
      console.log("no token");
      navigate("/login");
    }
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
