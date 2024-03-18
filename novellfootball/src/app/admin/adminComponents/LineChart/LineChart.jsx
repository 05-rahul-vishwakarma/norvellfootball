"use client";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-adapter-date-fns";

const LineChart = (prop) => {
  console.log(prop);
  const [conf, updateConf] = useState({});
  // useEffect(() => {
  //   console.log(dataSet);
  //   let newConf = {
  //     labels: dataSet?.map(
  //       (ele) => new Date(ele?._id?.split("/").reverse().join("/"))
  //     ),
  //     datasets: [
  //       {
  //         label: "success",
  //         data: dataSet?.map((ele) => ele?.total / 100),
  //         fill: false,
  //         borderColor: type === "deposit" ? "lime" : "#00FFF5",
  //         tension: 0.1,
  //       },
  //     ],
  //   };
  //   updateConf(newConf);
  // }, [dataSet]);

  return (
    <Line
      data={conf}
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
            type: "time",
            time: {
              unit: "day",
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
