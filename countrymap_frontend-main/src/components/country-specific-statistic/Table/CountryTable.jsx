import React from "react";
import MuiTable from "@mui/material/Table";
import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const CountryTable = ({ data }) => { 
  return (
    <div>
      <TableContainer component={Box} sx={{maxHeight:440}}>
        <MuiTable sx={{}} size="small" stickyHeader>
          <TableHead sx={{ bgcolor: "#254060" }}  >
            <TableRow>
              <TableCell sx={{ bgcolor: "#254060" }}>Segment</TableCell>
              <TableCell align="center" sx={{ bgcolor: "#254060" }}>PD</TableCell>
              <TableCell align="center" sx={{ bgcolor: "#254060" }}>Default rate</TableCell>
              <TableCell align="center" sx={{ bgcolor: "#254060" }}>LGD</TableCell>
              <TableCell align="center" sx={{ bgcolor: "#254060" }}>Lost rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, key) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {row.Segment}
                </TableCell>
                <TableCell align="center">{row.PD}%</TableCell>
                <TableCell align="center">{row.Default_Rate}%</TableCell>
                <TableCell align="center">{row.LGD}%</TableCell>
                <TableCell align="center">{row.Loss_Rate}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default CountryTable;
