import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

function createData(id, company, position, status, date, link, comment) {
  return { id, company, position, status, date, link, comment };
}

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
    "Applied",
    "2025-09-24",
    "",
    ""
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
    // <Box sx={{ p: 2, width: "80%", alignContent: "center" }}>
    <>
      <div
        style={{
          width: "83%",
          margin: "0 auto",
          marginTop: "20px",
          backgroundColor: "#d9d9d9",
          height: "64px",
          borderTop: "1px solid #8F8C8C",
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
      </div>

      <table
        style={{
          width: "83%",
          margin: "0 auto",
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
          <th style={{ width: "12%", borderRight: "1px solid #8F8C8C" }}>
            Company
          </th>
          <th style={{ width: "18%", borderRight: "1px solid #8F8C8C" }}>
            Position
          </th>
          <th style={{ width: "10%", borderRight: "1px solid #8F8C8C" }}>
            Status
          </th>
          <th style={{ width: "12%", borderRight: "1px solid #8F8C8C" }}>
            Date Applied
          </th>
          <th style={{ width: "18%", borderRight: "1px solid #8F8C8C" }}>
            Link
          </th>
          <th>Comment</th>
        </tr>

        {rows.map((row) => (
          <tr
            key={row.id}
            style={{
              borderBottom: "1px solid #8F8C8C",
              height: "50px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <td style={{ borderRight: "1px solid #8F8C8C" }}>{row.company}</td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>{row.position}</td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>{row.status}</td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>{row.date}</td>
            <td style={{ borderRight: "1px solid #8F8C8C" }}>{row.link}</td>
            <td>{row.comment}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Overview;
