import React from "react";
import { Table } from "react-bootstrap";
import "../css/TableComp.css";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const DailyActivity = [
  { name: "Subham Dash", contactType: "Email" },
  { name: "Rahul Kumar", contactType: "Phone" },
  { name: "Rajat Patidar", contactType: "Phone" },
  { name: "Virat Kohli", contactType: "Phone" },
  { name: "Rohit Sharma", contactType: "Email" },
  { name: "Kl Rahul", contactType: "Email" },
  { name: "Ms Dhoni", contactType: "Phone" },
  { name: "Rohit Sharma", contactType: "Email" },
  { name: "Kl Rahul", contactType: "Email" },
  { name: "Ms Dhoni", contactType: "Phone" },
  { name: "Ms Dhoni", contactType: "Phone" },
  { name: "Ms Dhoni", contactType: "Phone" },
];

const LeadsData = [
  { name: "Subham Dash", activity: "Outward - Email" },
  { name: "Rahul Kumar", activity: "Inbound - Referal" },
  { name: "Rajat Patidar", activity: "Inbound - Referal" },
  { name: "Virat Kohli", activity: "Inbound - Referal" },
  { name: "Rohit Sharma", activity: "Outward - Email" },
  { name: "Kl Rahul", activity: "Outward - Email" },
  { name: "Ms Dhoni", activity: "Inbound - Referal" },
  { name: "Subham Dash", activity: "Outward - Email" },
  { name: "Rahul Kumar", activity: "Inbound - Referal" },
  { name: "Virat Kohli", activity: "Inbound - Referal" },
  { name: "Rajat Patidar", activity: "Inbound - Referal" },
  { name: "Virat Kohli", activity: "Inbound - Referal" },
];

const TableComp = ({ clientDetails }) => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="card border border-light bg-light">
            <div className="p-2 heading">
              <span className="fw-bold" style={{ color: "#0d0c55" }}>
                Followup Daily Activity
              </span>
            </div>
            <table className="table m-0 p-0">
              <thead>
                <tr>
                  <th scope="row">Customer Name</th>
                  <th scope="row">Action</th>
                </tr>
              </thead>
              <tbody>
                {DailyActivity.map((person, index) => {
                  return (
                    <tr key={index}>
                      <td>{person.name}</td>
                      <td>
                        {person.contactType === "Email" ? (
                          <MdOutlineEmail size={20} />
                        ) : (
                          <FaPhone size={20} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-6">
          <div className="card border border-light bg-light">
            <div className="p-2 heading">
              <span className="fw-bold" style={{ color: "#0d0c55" }}>
                New Leads
              </span>
            </div>
            <table className="table m-0 p-0">
              <thead>
                <tr>
                  <th scope="row">New Appointant</th>
                  <th scope="row">Mode Of Lead</th>
                </tr>
              </thead>
              <tbody>
                {LeadsData.map((person, index) => {
                  return (
                    <tr key={index}>
                      <td>{person.name}</td>
                      <td>{person.activity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComp;
