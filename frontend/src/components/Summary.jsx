import React from "react";
import { Box, Typography } from "@mui/material";
import job from "../assets/Jobhunt.png";
import offer from "../assets/contract.png";
import interview from "../assets/interview.png";
import resume from "../assets/Resume.png";
import apply from "../assets/apply.png";
import { useFilter } from "../pages/Dashboard";

const StatusDiv = ({
  bgColor,
  textColor = "black",
  status,
  count,
  updateFilter,
}) => {
  const sty = {
    height: "94px",
    width: "13.5%",
    minWidth: "150px",
    maxWidth: "210px",
    backgroundColor: bgColor,
    borderRadius: "20px",
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: textColor,
    cursor: "pointer",
  };
  return (
    <div style={sty} onClick={() => updateFilter("status", status)}>
      <Typography
        component="div"
        sx={{
          textAlign: "center",
          fontSize: "27px",
          fontFamily: "Inder, sans-serif",
        }}
      >
        {status}
      </Typography>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "24px",
          mt: 1,
          fontFamily: "Inder, sans-serif",
        }}
      >
        {count}
      </Typography>
    </div>
  );
};

const Summary = ({ rows }) => {
  const { filters, updateFilter, filteredData } = useFilter();
  const countStatus = (status) => {
    return filteredData.filter((row) => row.status === status).length;
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          display: "flex",
          flexWrap: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 40px",
          margin: "0 auto",
        }}
      >
        <img
          src={resume}
          alt="Resume"
          style={{
            height: "18%",
            maxHeight: "240px",
            width: "18%",
            maxWidth: "240px",
          }}
        />
        <img
          src={job}
          alt="Job Application"
          style={{
            height: "20%",
            maxHeight: "300px",
            width: "20%",
            maxWidth: "300px",
          }}
        />
        <img
          src={apply}
          alt="Apply"
          style={{
            height: "18%",
            maxHeight: "240px",
            width: "18%",
            maxWidth: "240px",
          }}
        />
        <img
          src={interview}
          alt="Job interview"
          style={{
            height: "18%",
            maxHeight: "240px",
            width: "18%",
            maxWidth: "240px",
          }}
        />
        <img
          src={offer}
          alt="Job Offer"
          style={{
            height: "17%",
            maxHeight: "220px",
            width: "17%",
            maxWidth: "220px",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1500px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflowY: "scroll",
          alignItems: "center",
          m: "0 auto",
        }}
      >
        <StatusDiv
          bgColor="#36454F"
          textColor="white"
          status="All"
          count={filteredData.length}
          updateFilter={updateFilter}
        />
        <StatusDiv
          bgColor="#b8d3ff"
          status="Applied"
          count={countStatus("Applied")}
          updateFilter={updateFilter}
        />
        <StatusDiv
          bgColor="#ffe5a0"
          status="Interview"
          count={countStatus("Interview")}
          updateFilter={updateFilter}
        />
        <StatusDiv
          bgColor="#93e3a9"
          status="Offer"
          count={countStatus("Offer")}
          updateFilter={updateFilter}
        />
        <StatusDiv
          bgColor="#ffe3dc"
          status="Rejected"
          count={countStatus("Rejected")}
          updateFilter={updateFilter}
        />
        <StatusDiv
          bgColor="#c4cad4"
          status="Withdrawn"
          count={countStatus("Withdrawn")}
          updateFilter={updateFilter}
        />
      </Box>
    </>
  );
};

export default Summary;
