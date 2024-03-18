"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const LineChart = ({ dataSet }) => {
  return (
    <Line
      data={dataSet}
      options={{
        plugins: {
          legend: {
            labels: {
              // Change the color of the text
              color: "white",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#F4EEE0",
            },
            grid: {
              color: "#6D5D6E",
            },
          },
          y: {
            ticks: { color: "#F4EEE0", maxTicksLimit: 10 },
            grid: { color: "#6D5D6E" },
          },
        },
      }}
    />
  );
};

export default LineChart;
