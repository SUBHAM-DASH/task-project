import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaAngleDoubleUp } from "react-icons/fa";
import { FileUploader } from "react-drag-drop-files";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { importExcelSheet, getClients } from "../service/clientRequest.ts";
import { IoIosCloseCircle } from "react-icons/io";
const fileTypes = ["xlsx", "csv"];

const UploadCsvModal = ({ setClients }) => {
  const token = localStorage.getItem("task-token");
  const [show, setShow] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function fetchClients() {
    getClients(token)
      .then((response) => {
        setClients(response.data?.results);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  const handleChange = (file: any) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setJsonData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleUploadCsv = () => {
    importExcelSheet(token, { jsonData: JSON.stringify(jsonData) })
      .then((response) => {
        toast.success(response?.data?.message, { autoClose: 1000 });
        fetchClients();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message, { autoClose: 1000 });
      });
  };

  return (
    <div>
      <button
        type="button"
        className="btn me-2"
        onClick={handleShow}
        style={{ background: "#0d0c55", color: "white" }}
      >
        <FaAngleDoubleUp /> Export
      </button>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header
          className="bg-dark text-light"
          style={{ color: "white", zIndex: "1000" }}
        >
          <Modal.Title className="text-light">Upload CSV file</Modal.Title>
          <div>
            <IoIosCloseCircle
              size={28}
              style={{ cursor: "pointer" }}
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-sm"
            style={{ color: "white", background: "#0d0c55" }}
            onClick={() => {
              handleClose();
              handleUploadCsv();
            }}
            disabled={!jsonData}
          >
            Upload File
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UploadCsvModal;
