import React, { useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const StackedBarChart = () => {
  const defaultColor = "#bab5b5";

  const [dataPoints, setDataPoints] = useState([
    { label: "2012", y: 2, color: defaultColor },
    { label: "2013", y: 4, color: defaultColor },
    { label: "2014", y: 2, color: defaultColor },
    { label: "2015", y: 8, color: defaultColor },
    { label: "2016", y: 6, color: defaultColor },
    { label: "2017", y: 3, color: defaultColor },
    { label: "2018", y: 7, color: defaultColor },
    { label: "2019", y: 5, color: defaultColor },
    { label: "2020", y: 7, color: defaultColor },
    { label: "2021", y: 6, color: defaultColor },
    { label: "2022", y: 4, color: defaultColor },
  ]);

  const options = {
    height: 220,
    title: {
      text: "Database for Customers",
      horizontalAlign: "left",
      fontSize: 16,
      fontWeight: 400,
    },
    axisY: {
      title: "Y-Axis Title",
      viewportMaximum: 10,
    },
    axisX: {
      gridDashType: "dot",
    },
    data: [
      {
        type: "column",
        indexLabel: "{y}",
        indexLabelWrap: true,
        dataPoints: dataPoints,
        toolTipContent: `<div style={{backgroundColor:"red",textAlign:"center"}}>
          <strong>{y}</strong>
        </div>`,
        mouseover: (e: { dataPointIndex?: any }) => {
          const newDataPoints = [...dataPoints];
          newDataPoints[e.dataPointIndex].color = "#111c6e";
          setDataPoints(newDataPoints);
        },
        mouseout: (e: { dataPointIndex?: any }) => {
          const newDataPoints = [...dataPoints];
          newDataPoints[e.dataPointIndex].color = defaultColor;
          setDataPoints(newDataPoints);
        },
      },
    ],
  };

  return (
    <div>
      <div className="dropdown text-end">
        <button
          className="btn btn-light dropdown-toggle btn-sm mx-2 px-3"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Yearly
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" type="button">
              Action
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Another action
            </button>
          </li>
          <li>
            <button className="dropdown-item" type="button">
              Something else here
            </button>
          </li>
        </ul>
      </div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default StackedBarChart;
