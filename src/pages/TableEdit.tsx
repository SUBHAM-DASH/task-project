import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ClientForms from "../components/ClientForms.tsx";
import { FaEdit } from "react-icons/fa";

const TableEdit = ({ client }) => {
  const [show, setShow] = useState(false);  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div onClick={handleShow}>
        <FaEdit className="cursor-pointer text-dark" size={20} />
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientForms isEdit={true} clientInfo={client} handleClose={handleClose}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-sm" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableEdit;
