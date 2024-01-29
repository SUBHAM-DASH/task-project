import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import ClientForms from "./ClientForms.tsx";
import { useParams } from "react-router-dom";

const EditClientModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();

  return (
    <div>
      <button
        type="button"
        className="btn bg-success-subtle text-emphasis-success mx-2 btn-sm"
        onClick={handleShow}
      >
        <FaPen /> Edit
      </button>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientForms
            isEdit={true}
            clientInfo={{ name: "subham", designation: "full" }}
          />
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

export default EditClientModal;
