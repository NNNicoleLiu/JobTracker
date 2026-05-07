import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Summary from "../components/Summary";
import Overview from "../components/Overview";
import api from "../utils/api";

import { Box } from "@mui/material";

const FilterContext = React.createContext();
export const useFilter = () => {
  const ctx = React.useContext(FilterContext);
  return ctx;
};

const Dashboard = () => {
  const [jobs, setJobs] = React.useState([]);
  const navigate = useNavigate();
  const [filters, setFilters] = React.useState({
    status: "All",
    search: "",
    date: false,
  });

  const fetchApplications = async () => {
    try {
      const response = await api.get("/jobs/");
      setJobs(response.data);
      setFilters({
        status: "All",
        search: "",
        date: false,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  React.useEffect(() => {
    fetchApplications();
  }, []);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const filteredData = React.useMemo(() => {
    const { status, search, date } = filters;

    const sorted = (arr) =>
      [...arr].sort((a, b) =>
        date
          ? new Date(a.applied_at) - new Date(b.applied_at)
          : new Date(b.applied_at) - new Date(a.applied_at),
      );
    const matchSearch = (row) => {
      const searchTerm = search.toLowerCase().trim();
      const company = row.company?.toLowerCase() || "";
      const position = row.position?.toLowerCase() || "";
      return company.includes(searchTerm) || position.includes(searchTerm);
    };
    if (!search || search.trim() === "") {
      return sorted(jobs);
    }
    return sorted(
      jobs.filter((row) => {
        const searchTerm = search.toLowerCase().trim();
        const company = row.company?.toLowerCase() || "";
        const position = row.position?.toLowerCase() || "";
        return company.includes(searchTerm) || position.includes(searchTerm);
      }),
    );
  }, [jobs, filters]);

  return (
    <FilterContext.Provider value={{ filters, updateFilter, filteredData }}>
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
    </FilterContext.Provider>
  );
};

export default Dashboard;
