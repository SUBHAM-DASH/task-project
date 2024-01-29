import React from "react";
import { Table } from "react-bootstrap";

const TableComp = ({ clientDetails }) => {
  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <span className="text-primary fw-bold">
                Client Details and Mobile Number
              </span>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th className="border-end text-center">Client Name</th>
                  <th className="text-center">Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {clientDetails?.map((item: any, index: number) => {
                  return (
                    <tr key={index}>
                      <td className="border-end text-center">
                        {item?.name ?? ""}
                      </td>
                      <td>{item?.phonenumber ?? ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>

        <div className="col-6">
          <div className="card">
            <div className="card-header">
              <span className="text-primary fw-bold">
                Client Details and Designation
              </span>
            </div>
            <Table responsive>
              <thead>
                <tr>
                  <th className="border-end text-center">Client Name</th>
                  <th className="text-center">Designation</th>
                </tr>
              </thead>
              <tbody>
                {clientDetails?.map((item: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td className="border-end text-center">
                        {item?.name ?? ""}
                      </td>
                      <td>{item?.designation ?? ""}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableComp;
