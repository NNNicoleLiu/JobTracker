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
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DeleteIcon from "@mui/icons-material/Delete";

import JobEdit from "./JobEdit";
import DeleteModal from "./DeleteModal";
import { Tooltip, Typography } from "@mui/material";

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

  const contentStyle = {
    backgroundColor: "#ebebeb",
    borderRadius: "20px",
    width: "fit-content",
    padding: "6px 12px",
    margin: "8px",
  };
  const [openJob, setOpenJob] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
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
          padding: "24px",
          backgroundColor: "#d9d9d9",
          height: "64px",
          borderTop: BORDER,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            lineHeight: "64px",
            fontWeight: "bolder",
            fontSize: "30px",
          }}
        >
          Application Overview
        </span>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Tooltip title="Add new job applications" placement="top">
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              size="small"
              sx={{
                fontFamily: "Inder, sans-serif",
                fontSize: "15px",
                px: "10px",
                mx: 3,
              }}
              onClick={clickAdd}
            >
              New
            </Button>
          </Tooltip>
          {/* <Tooltip title="Filter" placement="top">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Sort" placement="top">
            <IconButton>
              <SwapVertIcon />
            </IconButton>
          </Tooltip> */}
          <Box
            component="div"
            sx={{
              px: "12px",
              ml: 1,
              display: "flex",
              alignItems: "center",
              width: 420,
              height: "40px",
              borderRadius: "20px",
              bgcolor: "white",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by company or position"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </div>

      <table
        style={{
          width: "85%",
          margin: "0 auto",
          marginBottom: "20px",
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
            <th style={{ width: "50px" }}></th>
            <th style={{ width: "14%", borderRight: BORDER }}>
              <Box sx={{ ...boxStyle, justifyContent: "flex-start" }}>
                <BusinessIcon /> &nbsp;Company
              </Box>
            </th>
            <th style={{ width: "18%", borderRight: BORDER }}>
              <Box sx={boxStyle}>
                <WorkIcon /> &nbsp;Position
              </Box>
            </th>
            <th style={{ width: "10.5%", borderRight: BORDER }}>
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
                <td>
                  {hoveredRow === row[1].id && (
                    <Tooltip title="Delete" placement="left">
                      <IconButton
                        sx={{
                          height: "40px",
                          width: "40x",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(row[1].id);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </td>
                <td style={{ borderRight: BORDER, overflow: "scroll-x" }}>
                  <p style={{ ...contentStyle, marginLeft: 0 }}>
                    {row[1].company}
                  </p>
                </td>
                <td style={{ borderRight: BORDER }}>
                  <p style={contentStyle}>{row[1].position}</p>
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
                  <Link
                    href={row[1].link}
                    target="_blank"
                    underline="hover"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {row[1].link}
                  </Link>
                  <a></a>
                </td>
                <td style={{ padding: "4px" }}> {row[1].comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <Box
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
      </Box> */}
      <JobEdit open={openJob} setOpen={setOpenJob} editData={editData} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} id={deleteId} />
    </>
  );
};

export default Overview;
