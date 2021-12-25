import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Chart = ({data}) => {
  const [hover, setHover] = useState({ value: "", dataKey: "", color: "" });

  const showToolTip = (e, d) => {
    console.log(d);
    setHover({
      value: d.payload[d.dataKey],
      dataKey: d.dataKey,
      color: d.fill,
    });
  };

  const hideToolTip = () => {
    setHover({});
  };

  const CustomTooltip = () => {
    if (hover.dataKey) {
      return (
        <Paper sx={{ bgcolor: "#fff", p: 1, border: "solid 1px #d9d9d9" }}>
          <Box textAlign="center">
            <Typography variant="subtitle2" color={hover.color}>
              {hover.dataKey}
            </Typography>
            <Typography color="#000">{hover.value}%</Typography>
          </Box>
        </Paper>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 8,
          right: 8,
          left: -30,
          bottom: 4,
        }}
      >
        <CartesianGrid fill="#fff" />
        <XAxis dataKey="Year" style={{ fontSize: "12px" }} stroke="#fff" dy={5} />
        <YAxis  style={{ fontSize: "12px" }} stroke="#fff" dx={-5} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          activeDot={{
            onMouseOver: showToolTip,
            onMouseLeave: hideToolTip,
            opacity: hover.dataKey === "    Corporates - Of Which: Specialised Lending" ? 1 : 0,
          }}
          strokeWidth={3}
          dot={false}
          dataKey="Value"
          stroke="#5a32a8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
