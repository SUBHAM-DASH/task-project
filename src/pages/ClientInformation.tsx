import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { FaStickyNote, FaMailBulk } from "react-icons/fa";
import TabsComp from "../components/TabsComp.tsx";
import EditClientModal from "../components/EditClientModal.tsx";
import { useNavigate } from "react-router-dom";

const ClientInformation = () => {
  const navigate = useNavigate();
  const staticData = [
    {
      date: new Date(),
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...",
    },
    {
      date: new Date(),
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...",
    },
    {
      date: new Date(),
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...",
    },
    {
      date: new Date(),
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...",
    },
    {
      date: new Date(),
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...",
    },
    {
      date: new Date(),
      text: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown ...",
    },
  ];

  return (
    <div>
      <div className="fw-bold cursor-pointer mb-4">
        <div onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-primary fw-bold">Contact</span>
                <EditClientModal />
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card bg-light-subtle text-emphasis-light mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-center">
                <Avatar
                  alt="Subham Dash"
                  sx={{ width: 56, height: 56, background: "purple" }}
                  src="/static/images/avatar/1.jpg"
                />
              </div>
              <div className="d-flex flex-column align-items-center mt-2">
                <strong className="d-inline-block">Subham Dash</strong>
                <div className="d-inline-block fw-semi-bold">Director</div>
                <div className="d-flex">
                  <div className="hstack gap-2 my-3">
                    <button className="btn btn-outline rounded-circle bg-body-secondary">
                      <FaStickyNote />
                    </button>
                    <button className="btn btn-outline rounded-circle bg-body-secondary">
                      <FaMailBulk />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-light-subtle text-emphasis-light">
            <div className="card-body">
              <strong>About This Contact</strong>
              <div className="mb-3 mt-2">
                <label className="fw-bold"> First Name: </label>
                <span>Subham</span>
              </div>
              <div className="mb-3">
                <label className="fw-bold"> Last Name: </label>
                <span>Dash</span>
              </div>
              <div className="mb-3">
                <label className="fw-bold"> Email Id: </label>
                <span>dash@gmail.com</span>
              </div>
              <div className="mb-3">
                <label className="fw-bold"> Phone Number: </label>
                <span>7978904202</span>
              </div>
              <div className="mb-3">
                <label className="fw-bold"> Linkedin: </label>
                <span>http://linkedin.com</span>
              </div>
              <div className="mb-3 d-flex flex-column">
                <label className="fw-bold"> Client Details: </label>
                <span>Last Connected</span>
                <span>09/2/2023 4:30pm</span>
              </div>
              <div className="mb-3 d-flex flex-column">
                <label className="fw-bold"> Designation: </label>
                <span>Director</span>
              </div>
              <div className="mb-3 d-flex flex-column">
                <label className="fw-bold"> Industry: </label>
                <span>Health & Hospital</span>
              </div>
              <div className="mb-3 d-flex flex-column">
                <label className="fw-bold"> Country: </label>
                <span>USA</span>
              </div>
              <div className="mb-3 d-flex flex-column">
                <label className="fw-bold"> Website: </label>
                <span>www.dash.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card mb-3">
            <div className="card-header">
              <TabsComp staticData={staticData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInformation;
