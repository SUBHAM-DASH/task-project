import React,{useEffect,useState} from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { getClientDesignationChatDetails } from "../service/clientRequest.ts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChatMain = () => {
  const [dataPoints,setDataPoints] = useState([]);
  const data = [
    {
      type: "pie",
      dataPoints: dataPoints
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
      text: "Pie Chart",
      fontSize: 16,
    },
    data: data,
    height: 240,
  };

  return (
    <div style={{height:"240px"}}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default PieChatMain;
