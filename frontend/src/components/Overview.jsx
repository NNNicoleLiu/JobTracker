import React from "react";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import FlagIcon from "@mui/icons-material/Flag";
import TodayIcon from "@mui/icons-material/Today";
import LinkIcon from "@mui/icons-material/Link";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import JobEdit from "./JobEdit";

function createData(id, company, position, status, date, link, comment) {
  return { id, company, position, status, date, link, comment };
}

const setStatusColor = (status) => {
  const colors = {
    Applied: "#b8d3ff",
    Interview: "#ffe5a0",
    Offer: "#93e3a9",
    Rejected: "#ffe3dc",
    Withdrawn: "#c4cad4",
  };
  return colors[status];
};

const BORDER = "1px solid #8F8C8C";

const Overview = ({ rows }) => {
  const boxStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const [openJob, setOpenJob] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [hoveredRow, setHoveredRow] = React.useState(null);

  const clickAdd = () => {
    setEditData(null);
    setOpenJob(true);
  };

  const handleClick = (data) => {
    setEditData(data);
    setOpenJob(true);
  };

  return (
    <>
      <div
        style={{
          width: "85%",
          margin: "0 auto",
          marginTop: "20px",
          backgroundColor: "#d9d9d9",
          height: "64px",
          borderTop: BORDER,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <span
          style={{
            paddingLeft: "30px",
            lineHeight: "64px",
            fontWeight: "bolder",
            fontSize: "30px",
          }}
        >
          Application Overview
        </span>
        <input
          type="text"
          id="search"
          placeholder="Search"
          style={{
            width: "68%",
            height: "40px",
            display: "inline-block",
            border: "1px solid #ccc",
            borderRadius: "20px",
            margin: "0 30px",
            padding: "0 20px",
          }}
        ></input>
      </div>

      <table
        style={{
          width: "85%",
          margin: "0 auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#edecec",
              border: BORDER,
              borderLeft: "none",
              borderRight: "none",
              height: "50px",
              textAlign: "center",
              fontSize: "18px",
              alignItems: "center",
            }}
          >
            <th style={{ width: "13%", borderRight: BORDER }}>
              <Box sx={boxStyle}>
                <BusinessIcon /> &nbsp;Company
              </Box>
            </th>
            <th style={{ width: "18%", borderRight: BORDER }}>
              <Box sx={boxStyle}>
                <WorkIcon /> &nbsp;Position
              </Box>
            </th>
            <th style={{ width: "11.5%", borderRight: BORDER }}>
              <Box sx={boxStyle}>
                <FlagIcon /> &nbsp;Status
              </Box>
            </th>
            <th
              style={{
                width: "12.5%",
                borderRight: BORDER,
              }}
            >
              <Box sx={boxStyle}>
                <TodayIcon />
                &nbsp;Date Applied
              </Box>
            </th>
            <th style={{ width: "20%", borderRight: BORDER }}>
              <Box sx={boxStyle}>
                <LinkIcon />
                &nbsp;Link
              </Box>
            </th>
            <th>
              <Box sx={boxStyle}>
                <CommentIcon />
                &nbsp;Comment
              </Box>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rows).map((row, index) => {
            console.log(row);
            return (
              <tr
                key={row[1].id}
                style={{
                  borderBottom: BORDER,
                  height: "48px",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor:
                    hoveredRow === row[1].id ? "#F0F8FF" : "white",
                }}
                onMouseEnter={() => setHoveredRow(row[1].id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleClick(row[1])}
              >
                <td style={{ borderRight: BORDER }}>
                  <Chip
                    label={row[1].company}
                    sx={{
                      fontFamily: "Inder, sans-serif",
                      fontSize: "15px",
                      px: "4px",
                    }}
                  />
                </td>
                <td style={{ borderRight: BORDER }}>
                  <Chip
                    label={row[1].position}
                    sx={{
                      fontFamily: "Inder, sans-serif",
                      fontSize: "15px",
                      px: "4px",
                    }}
                  />
                </td>
                <td style={{ borderRight: BORDER }}>
                  <Chip
                    label={row[1].status}
                    sx={{
                      fontFamily: "Inder, sans-serif",
                      fontSize: "15px",
                      bgcolor: setStatusColor(row[1].status),
                      px: "4px",
                    }}
                  />
                </td>
                <td style={{ borderRight: BORDER }}>
                  <Chip
                    label={row[1].applied_at.toString().split("T")[0]}
                    sx={{ fontFamily: "Inder, sans-serif", fontSize: "15px" }}
                  />
                </td>
                <td style={{ borderRight: BORDER }}>
                  <Link href="#" underline="hover">
                    {row[1].link}
                  </Link>
                  <a></a>
                </td>
                <td>{row[1].comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Box
        sx={{
          width: "85%",
          m: "0 auto",
          mb: 2,
          height: "48px",
          borderBottom: BORDER,
          display: "flex",
          alignItems: "center",
          pl: 3,
        }}
      >
        <Chip
          icon={<AddCircleOutlineIcon />}
          label="Add Job"
          color="primary"
          sx={{ fontFamily: "Inder, sans-serif", fontSize: "15px", px: 1 }}
          onClick={clickAdd}
        />
      </Box>
      <JobEdit open={openJob} setOpen={setOpenJob} editData={editData} />
    </>
  );
};

export default Overview;
