import React from "react";
import { Box, Typography } from "@mui/material";
import job from "../assets/Jobhunt.png";
import offer from "../assets/contract.png";
import interview from "../assets/interview.png";

const StatusDiv = ({ bgColor, textColor = "black", status, count }) => {
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
  };
  return (
    <div style={sty}>
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
  const countStatus = (status) => {
    return rows.filter((row) => row.status === status).length;
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={job}
          alt="Job Application"
          style={{
            height: "20%",
            maxHeight: "300px",
            width: "20%",
            maxWidth: "300px",
            margin: "0 40px",
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
            margin: "0 40px",

            // height: "240px", width: "240px", margin: "0 40px"
          }}
        />
        {/* <Box sx={{ mx: "40px" }}>
          <Typography
            variant="h3"
            component="div"
            sx={{ fontFamily: "Inder, sans-serif" }}
          >
            Job Application Tracker
          </Typography>
          <Typography
            sx={{
              my: 1,
              ml: 4,
              fontSize: "22px",
              fontFamily: "Inder, sans-serif",
            }}
          >
            Track and Manage your Job Applications !!
          </Typography>
        </Box> */}
        <img
          src={offer}
          alt="Job Offer"
          style={{
            height: "17%",
            maxHeight: "220px",
            width: "17%",
            maxWidth: "220px",
            margin: "0 40px",
            // height: "220px", width: "220px", margin: "0 40px"
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          overflowY: "scroll",
          alignItems: "center",
          mx: 2,
        }}
      >
        {/* need to update the counts */}
        <StatusDiv
          bgColor="#36454F"
          textColor="white"
          status="All"
          count={rows.length}
        />
        <StatusDiv
          bgColor="#b8d3ff"
          status="Applied"
          count={countStatus("Applied")}
        />
        <StatusDiv
          bgColor="#ffe5a0"
          status="Interview"
          count={countStatus("Interview")}
        />
        <StatusDiv
          bgColor="#93e3a9"
          status="Offer"
          count={countStatus("Offer")}
        />
        <StatusDiv
          bgColor="#ffe3dc"
          status="Rejected"
          count={countStatus("Rejected")}
        />
        <StatusDiv
          bgColor="#c4cad4"
          status="Withdrawn"
          count={countStatus("Withdrawn")}
        />
      </Box>
    </>
  );
};

export default Summary;
