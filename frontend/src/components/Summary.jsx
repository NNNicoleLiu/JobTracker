import React from "react";
import { Box, Typography } from "@mui/material";
import job from "../assets/Jobhunt.png";
import offer from "../assets/contract.png";
import interview from "../assets/interview.png";
import resume from "../assets/Resume.png";
import apply from "../assets/apply.png";
import { useFilter } from "../pages/Dashboard";
import { setStatusColor } from "./StatusColor";

const statusList = [
  "All",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Withdrawn",
];

const Summary = ({ rows }) => {
  const { filters, updateFilter, filteredData } = useFilter();
  const [selected, setSelected] = React.useState("All");
  const [hoverStatus, setHoveredStatus] = React.useState(null);

  // status div style
  const sty = {
    height: "92px",
    width: "13%",
    minWidth: "160px",
    maxWidth: "210px",
    borderRadius: "20px",
    margin: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
  };

  const countStatus = (status) => {
    if (status === "All") {
      return filteredData.length;
    }
    return filteredData.filter((row) => row.status === status).length;
  };

  const clickDiv = (status) => {
    updateFilter("status", status);
    setSelected(status);
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
        {Object.entries(statusList).map((status, index) => {
          return (
            <div
              key={index}
              style={{
                ...sty,
                backgroundColor: setStatusColor(status[1]),
                color: status[1] === "All" ? "white" : "black",
                transform: selected === status[1] ? "scale(1.2)" : "scale(1)",
                border:
                  hoverStatus === status[1]
                    ? "3px solid blue"
                    : "1px solid white",
              }}
              onClick={() => clickDiv(status[1])}
              onMouseEnter={() => setHoveredStatus(status[1])}
              onMouseLeave={() => setHoveredStatus(null)}
            >
              <Typography
                component="div"
                sx={{
                  textAlign: "center",
                  fontSize: "27px",
                  fontFamily: "Inder, sans-serif",
                }}
              >
                {status[1]}
              </Typography>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "24px",
                  mt: 1,
                  fontFamily: "Inder, sans-serif",
                }}
              >
                {countStatus(status[1])}
              </Typography>
            </div>
          );
        })}
      </Box>
    </>
  );
};

export default Summary;
