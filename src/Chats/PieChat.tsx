import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { getClientDesignationChatDetails } from "../service/clientRequest.ts";

const size = {
  width: 400,
  height: 220,
};

const StyledText: any = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getClientDesignationChatDetails(localStorage.getItem("task-token"))
      .then((response: any) => {
        setData(response?.data?.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <PieChart series={[{ data, innerRadius: 70 }]} {...size}>
      <PieCenterLabel>Designation</PieCenterLabel>
    </PieChart>
  );
}
