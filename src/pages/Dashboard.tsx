import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { BiFile } from "react-icons/bi";
import { IoIosConstruct } from "react-icons/io";
import { FaFlag, FaPhone } from "react-icons/fa";
import PieChat from "../Chats/PieChat.tsx";
import PieChatMain from "../Chats/PieChatMain.tsx";
import TableComp from "../components/TableComp.tsx";
import { getAllClients } from "../service/clientRequest.ts";
import StackedBarChart from "../Chats/StackedBarChart.tsx";
import DonutChart from "../Chats/DonutChart.tsx";

const Dashboard = () => {
  const token = localStorage.getItem("task-token");
  const [clientDetails, setClientDetails] = useState([]);
  const fetchAllClients = (token: any) => {
    getAllClients(token)
      .then((response) => {
        setClientDetails(response?.data?.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchAllClients(token);
  }, []);

  return (
    <>
      <div className="row m-2">
        <div className="col-4 mb-3">
          <div className="card">
            <div className="card-body h-300px">
              <div className="row">
                <div className="col-6 mb-3">
                  <div className="card bg-primary-subtle text-emphasis-primary">
                    <div className="card-body">
                      <Stack direction="row" spacing={1}>
                        <BiFile size={25} />
                        <span className="fw-bold">No. of Client</span>
                      </Stack>
                      <span className="fs-5 fw-bold">
                        {clientDetails?.length ?? 0}
                      </span>
                      <div>Last Update</div>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="card bg-secondary-subtle text-emphasis-secondary">
                    <div className="card-body">
                      <Stack direction="row" spacing={1}>
                        <IoIosConstruct size={25} />
                        <span className="fw-bold">Designation</span>
                      </Stack>
                      <span className="fs-5 fw-bold">
                        {clientDetails?.length ?? 0}
                      </span>
                      <div>Last Update</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-warning-subtle text-emphasis-warning">
                    <div className="card-body">
                      <Stack direction="row" spacing={1}>
                        <FaFlag size={25} />
                        <span className="fw-bold">Country</span>
                      </Stack>
                      <span className="fs-5 fw-bold">
                        {clientDetails?.length ?? 0}
                      </span>
                      <div>Last Update</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card bg-dark-subtle text-emphasis-dark">
                    <div className="card-body">
                      <Stack direction="row" spacing={1}>
                        <FaPhone size={25} />
                        <span className="fw-bold">Mob Number</span>
                      </Stack>
                      <span className="fs-5 fw-bold">
                        {clientDetails?.length ?? 0}
                      </span>
                      <div>Last Update</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-body">
              <div style={{ width: "100%",height:"240px" }}>
                <StackedBarChart/>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-3">
            <div className="card-body">
              <DonutChart/>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <PieChatMain />
            </div>
          </div>
        </div>
        <div className="col-8">
          <TableComp clientDetails={clientDetails} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
