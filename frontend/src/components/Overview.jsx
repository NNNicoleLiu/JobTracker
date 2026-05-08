import React from "react";

import { Chip, Link, Button, Box, Tooltip, Typography } from "@mui/material";
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
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import JobEdit from "./JobEdit";
import DeleteModal from "./DeleteModal";
import { useFilter } from "../pages/Dashboard";
import { setStatusColor } from "./StatusColor";

const BORDER = "1px solid #8F8C8C";
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

const Overview = ({ rows }) => {
  const { filters, updateFilter, filteredData } = useFilter();

  const [filterRows, setFilterRows] = React.useState([]);
  const [openJob, setOpenJob] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [editData, setEditData] = React.useState(null);
  const [hoveredRow, setHoveredRow] = React.useState(null);

  const filteredApp = (rows, filters) => {
    if (filters.status === "All") {
      return rows;
    }
    return rows.filter((row) => {
      return row.status === filters.status;
    });
  };
  React.useEffect(() => {
    const filtered = filteredApp(filteredData, filters);
    setFilterRows(filtered);
  }, [filters]);

  const clickAdd = () => {
    setEditData(null);
    setOpenJob(true);
  };

  const clickRow = (data) => {
    setEditData(data);
    setOpenJob(true);
  };

  return (
    <div style={{ overflowX: "scroll", margin: "0 32px" }}>
      <div
        style={{
          width: "1300px",
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
                mx: 2,
              }}
              onClick={clickAdd}
            >
              New
            </Button>
          </Tooltip>
          <Box
            component="div"
            sx={{
              px: "12px",
              ml: 2,
              display: "flex",
              alignItems: "center",
              width: 480,
              height: "40px",
              borderRadius: "20px",
              bgcolor: "white",
            }}
          >
            <SearchIcon color="action" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search by company or position"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
            {filters.search.trim().length > 0 && (
              <Tooltip title="Clear" placement="right">
                <IconButton type="button" aria-label="clear" size="small">
                  <CloseIcon onClick={() => updateFilter("search", "")} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </div>

      <table
        style={{
          width: "1300px",
          margin: "0 auto",
          marginBottom: "40px",
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
            <th style={{ width: "128px", borderRight: BORDER }}>
              <Box sx={boxStyle}>
                <FlagIcon /> &nbsp;Status
              </Box>
            </th>
            <th
              style={{
                width: "188px",
                borderRight: BORDER,
              }}
            >
              <Box sx={boxStyle}>
                <TodayIcon sx={{ ml: 1 }} />
                &nbsp;Date Applied
                <IconButton onClick={() => updateFilter("date", !filters.date)}>
                  <SwapVertIcon />
                </IconButton>
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
          {Object.entries(filterRows).map((row, index) => {
            return (
              <tr
                key={row[1].id}
                data-testid={`job-${row[1].id}`}
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
                onClick={() => clickRow(row[1])}
              >
                <td>
                  {hoveredRow === row[1].id && (
                    <Tooltip title="Delete" placement="left">
                      <IconButton
                        aria-label="delete job"
                        data-testid="delete-job-btn"
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
      <JobEdit open={openJob} setOpen={setOpenJob} editData={editData} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} id={deleteId} />
    </div>
  );
};

export default Overview;
