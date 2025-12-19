import React from "react";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
const rows = [
  createData(
    "1",
    "Google",
    "Software Engineer",
    "Applied",
    "2025-08-24",
    "",
    ""
  ),
  createData(
    "2",
    "Meta",
    "Full-stack Engineer",
    "Rejected",
    "2025-09-24",
    "",
    ""
  ),
  createData(
    "3",
    "Amazon",
    "Full-stack Engineer",
    "Interview",
    "2025-09-24",
    "Http://123456789.com",
    "aaaaaa"
  ),
  createData(
    "3",
    "Spotify",
    "Full-stack Engineer",
    "Withdrawn",
    "2025-09-24",
    "Http://123456789.com",
    "aaaaaa"
  ),
  createData(
    "4",
    "Miya Studio",
    "Frontend Engineer",
    "Offer",
    "2025-09-24",
    "Http://123456789.com",
    "aaaaaa"
  ),
];

const Overview = () => {
  const tableHeadStyle = {
    fontSize: "18px",
    border: "1px solid #8F8C8C",
    borderLeft: "none",
    maxWidth: "150px",
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
          borderTop: "1px solid #8F8C8C",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "35%",
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
          marginBottom: "20px",
          borderCollapse: "collapse",
        }}
      >
        <tr
          style={{
            backgroundColor: "#edecec",
            border: "1px solid #8F8C8C",
            borderLeft: "none",
            borderRight: "none",
            height: "50px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          <th style={{ width: "13%", borderRight: "1px solid #8F8C8C" }}>
            Company
          </th>
          <th style={{ width: "18%", borderRight: "1px solid #8F8C8C" }}>
            Position
          </th>
          <th style={{ width: "12%", borderRight: "1px solid #8F8C8C" }}>
            Status
          </th>
          <th style={{ width: "12%", borderRight: "1px solid #8F8C8C" }}>
            Date Applied
          </th>
          <th style={{ width: "20%", borderRight: "1px solid #8F8C8C" }}>
            Link
          </th>
          <th>Comment</th>
        </tr>

        {rows.map((row) => (
          <tr
            key={row.id}
            style={{
              borderBottom: "1px solid #8F8C8C",
              height: "48px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <td style={{ borderRight: "1px solid #8F8C8C" }}>
              <Chip
                label={row.company}
                sx={{ fontFamily: "Inder, sans-serif", fontSize: "15px" }}
              />
            </td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>
              <Chip
                label={row.position}
                sx={{ fontFamily: "Inder, sans-serif", fontSize: "15px" }}
              />
            </td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>
              <Chip
                label={row.status}
                sx={{
                  fontFamily: "Inder, sans-serif",
                  fontSize: "15px",
                  bgcolor: setStatusColor(row.status),
                }}
                onClick={() => {}}
                onDelete={() => {}}
                deleteIcon={<KeyboardArrowDownIcon fontSize="small" />}
              />
            </td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>
              <Chip
                label={row.date}
                sx={{ fontFamily: "Inder, sans-serif", fontSize: "15px" }}
              />
            </td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>
              <Link href="#" underline="hover">
                {row.link}
              </Link>
              <a></a>
            </td>
            <td>{row.comment}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Overview;
