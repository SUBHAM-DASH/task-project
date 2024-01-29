// @ts-ignore
import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaAngleDoubleUp } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { FaFilter } from "react-icons/fa";
import DatePikerComponent from "../components/DatePikerComponent.tsx";
import DeleteButtonModal from "../components/DeleteButtonModal.tsx";
import { useNavigate } from "react-router-dom";
import {
  getClients,
  importExcelSheet,
  filterByDesignation,
} from "../service/clientRequest.ts";
import TableEdit from "./TableEdit.tsx";
import DeleteDialog from "../components/DeleteDialog.tsx";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import * as FileSaver from "file-saver";

const ListClient = ({ clients, setClients }) => {
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const token = localStorage.getItem("task-token");
  const navigate = useNavigate();
  const fileInputRef = useRef<any>(null);

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelectedRows: any) => {
      if (prevSelectedRows.includes(rowId)) {
        return prevSelectedRows.filter((id: number) => id !== rowId);
      } else {
        return [...prevSelectedRows, rowId];
      }
    });
  };

  useEffect(() => {
    fetchClients();
  }, [selectedRows, setSelectedRows]);

  function fetchClients() {
    getClients(token)
      .then((response) => {
        setClients(response.data?.results);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      importExcelSheet(token, { jsonData: JSON.stringify(jsonData) })
        .then((response) => {
          toast.success(response?.data?.message, { autoClose: 1000 });
          fetchClients();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message, { autoClose: 1000 });
        });
    };
    reader.readAsBinaryString(file);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleExportClick = () => {
    const columns = [
      "name",
      "designation",
      "country",
      "industry",
      "emailid",
      "phonenumber",
      "website",
      "linkedin",
    ];

    const data = clients.map((client) =>
      columns.map((column) => client[column])
    );    
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Client Data");

    // Use XLSX.writeFile instead of XLSX.write.xlsx
    XLSX.writeFile(workbook, "client_data.xlsx");
  };

  const handleFilter = (filterType: string) => {
    filterByDesignation(token, filterType)
      .then((response) => {
        setClients(response?.data?.results);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message, { autoClose: 1000 });
      });
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
        />
        <button
          type="button"
          className="btn btn-primary me-2"
          onClick={handleFileUpload}
        >
          <FaArrowCircleDown /> Import
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleExportClick}
        >
          <FaAngleDoubleUp /> Export
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <Dropdown>
          <Dropdown.Toggle
            className="rounded-0 px-3 bg-success-subtle text-emphasis-success border-0 text-dark"
            id="dropdown-basic"
          >
            <FaFilter /> Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleFilter("fullstack developer")}>
              Fullstack Developer
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter("frontend developer")}>
              Frontend Developer
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilter("backend developer")}>
              Backend Developer
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <div className="text-end d-flex">
          <DatePikerComponent setClients={setClients} />
          <div>
            <DeleteButtonModal
              selectedRows={selectedRows}
              fetchClients={fetchClients}
            />
          </div>
        </div>
      </div>
      <Table responsive>
        <thead className="table-primary">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Designation</th>
            <th>Country</th>
            <th>Industry</th>
            <th>Email Id</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 &&
            clients.map((client, index) => {
              return (
                <tr
                  key={index}
                  onDoubleClick={() =>
                    navigate(`/pages/client-list/${client?.id}`)
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(client.id)}
                      onChange={() => handleCheckboxChange(client.id)}
                      name={"name" + index}
                    />
                  </td>
                  <td>{client?.name ?? ""}</td>
                  <td>{client?.designation ?? ""}</td>
                  <td>{client?.country ?? ""}</td>
                  <td>{client?.industry ?? ""}</td>
                  <td>{client?.emailid ?? ""}</td>
                  <td>{client?.phonenumber ?? ""}</td>
                  <td className="d-flex gap-4">
                    <div>
                      <TableEdit client={client} />
                    </div>
                    <div>
                      <DeleteDialog
                        client={client}
                        fetchClients={fetchClients}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListClient;
