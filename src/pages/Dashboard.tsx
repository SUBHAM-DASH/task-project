import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { BiFile } from "react-icons/bi";
import { IoIosConstruct } from "react-icons/io";
import { FaFlag, FaPhone } from "react-icons/fa";
import StackedBarChart from "../Chats/BarChat.tsx";
import PieChat from "../Chats/PieChat.tsx";
import PieChatMain from "../Chats/PieChatMain.tsx";
import TableComp from "../components/TableComp.tsx";
import { getAllClients } from "../service/clientRequest.ts";

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
      <div className="row">
        <div className="col-4 mb-3">
          <div className="card">
            <div className="card-body">
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
              <div style={{ width: "100%" }}>
                <StackedBarChart title={"Database for Clients"} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-3">
            <div className="card-body">
              <PieChat />
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
