import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Button,
  Box,
} from "@mui/material";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)({
  "&.MuiTableCell-head": {
    background: "#00796b",
    color: "#fff",
    fontWeight: "bold",
  },
});

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": { background: "rgba(0,0,0,0.04)" },
  "&:last-child td, &:last-child th": { border: 0 },
  cursor: "pointer",
});

const CommonTable = ({
  columns = [],
  data = [],
  rowKey = "id",
  rowsPerPageOptions = [5, 10, 25],
  initialRowsPerPage = 10,
  onRowClick,
  onActionClick, // <-- new prop
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const paginated = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ mt: 2 }}>
      <TableContainer sx={{ borderRadius: "10px" }}>
        <Table stickyHeader >
          <TableHead>
            <TableRow>
              {columns.map(({ id, label, align = "left" }) => (
                <StyledTableCell key={id} align={align}>
                  {label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginated.map((row, rowIndex) => (
              <StyledTableRow
                key={row[rowKey] ?? rowIndex}
                hover={!!onRowClick}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align || "left"}>
                    {column.type === "actions" ? (
                      <Box display="flex" gap={1}>
                        {column.actions.map((action) => (
                          // <Button
                          //   key={action.key}
                          //   size="small"
                          //   variant="outlined"
                          //   color={action.color || "primary"}
                          //   onClick={(e) => {
                          //     e.stopPropagation(); // Avoid triggering row click
                          //     onActionClick?.(action.key, row);
                          //   }}
                          // >
                          //   {action.label}
                          // </Button>

                          <Button
                            key={action.key}
                            size="small"
                            variant="outlined"
                            color={action.color || "primary"}
                            disabled={typeof action.getDisabled === "function" ? action.getDisabled(row) : false}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (typeof action.getDisabled === "function" && action.getDisabled(row)) return;
                              onActionClick?.(action.key, row);
                            }}
                          >
                            {action.label}
                          </Button>
                        ))}
                      </Box>
                    ) : column.id === "status" || column.id === "project_status" ? (
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            display: "inline-block",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            color: "#fff",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            textTransform: "capitalize",
                            backgroundColor:
                              row[column.id] === "Waiting for Manager Approval" || row[column.id] === "Ask for Manager Approval"
                                ? "#000000ff" :
                                row[column.id] === "Completed" || row[column.id] === "Approved"
                                  ? "#4caf50"
                                  : row[column.id] === "Yet to Start" || row[column.id] === "Not Started" || row[column.id] === "On Hold"
                                    ? "#ff9800"
                                    : row[column.id] === "In Progress" || row[column.id] === "In Review"
                                      ? "#2196f3"
                                      : row[column.id] === "Overdue" || row[column.id] === "Incomplete" || row[column.id] === "Needs Changes" ? "red" : "#9e9e9e", // default gray
                          }}
                        >
                          <Box>{row[column.id] ?? "-"}</Box>
                        </Box>
                        {row.overdue_days > 0 && (
                          <Box
                            sx={{
                              fontSize: "0.65rem",
                              mt: 0.5,
                              backgroundColor: "#d32f2f",
                              color: "#fff",
                              px: 1,
                              py: 0.3,
                              borderRadius: 1,
                              textAlign: "center",
                            }}
                          >
                            {row.overdue_days} days overdue
                          </Box>
                        )}
                      </Box>
                    ) : (
                      row[column.id] ?? "-"
                    )}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CommonTable;
