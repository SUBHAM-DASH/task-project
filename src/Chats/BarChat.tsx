import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getClientsMonthWise } from "../service/clientRequest.ts";

export default function StackedBarChart({ title }) {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fetchMonthWiseData = (token) => {
    getClientsMonthWise(token)
      .then((response) => {
        console.log(response?.data?.results);
        const chatData = response?.data?.results;
        const newData = chatData?.map((item: any) => {
          return item?.client_count;
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };

  useEffect(() => {
    fetchMonthWiseData(localStorage.getItem("task-token"));
  }, []);
  return (
    <>
      <span>{title}</span>
      <BarChart
        width={850}
        height={220}
        series={[
          {
            data: data,
            label: "Client Count",
            id: "pvId",
            stack: "total",
          },
        ]}
        xAxis={[{ data: labels, scaleType: "band" }]}
      />
    </>
  );
}
