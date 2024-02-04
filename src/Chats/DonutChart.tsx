import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { getClientDesignationChatDetails } from "../service/clientRequest.ts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = () => {
  const [dataPoints,setDataPoints] = useState([]);
  const data = [
    {
      type: "doughnut",
      dataPoints: dataPoints,
    },
  ];

  useEffect(() => {
    getClientDesignationChatDetails(localStorage.getItem("task-token"))
      .then((response) => {
        setDataPoints(response?.data?.results)        
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "Client Details",
      fontSize: 16,
    },
    data: data,
    subtitles: [
      {
        text: "Overall",
        verticalAlign: "center",
        dockInsidePlotArea: true,
        fontSize: 20,
      },
    ],
    height: 240,
  };

  return (
    <div style={{ height: "240px" }}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default DonutChart;
