import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { DefaultizedPieValueType, pieArcLabelClasses } from "@mui/x-charts";
import { getClientDesignationChatDetails } from "../service/clientRequest.ts";

const data = [
  { label: "Group A", value: 400, color: "#0088FE" },
  { label: "Group B", value: 300, color: "#00C49F" },
  { label: "Group C", value: 300, color: "#FFBB28" },
  { label: "Group D", value: 200, color: "#FF8042" },
];

const size = {
  width: 400,
  height: 200,
};

export default function PieChat() {
  const [data, setData] = useState<any>([]);
  const [TOTAL, setTOTAL] = useState(0);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(2)}%`;
  };
  useEffect(() => {
    getClientDesignationChatDetails(localStorage.getItem("task-token"))
      .then((response: any) => {
        setData(response?.data?.results);
        setTOTAL(data.map((item) => item.value).reduce((a, b) => a + b, 0));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <PieChart
      series={[{ data, arcLabel: getArcLabel }]}
      {...size}
      sx={{
        [`&.${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
    ></PieChart>
  );
}
