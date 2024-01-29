import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteClient } from "../service/clientRequest.ts";

const DeleteDialog = ({client,fetchClients}) => {
  const token = localStorage.getItem("task-token");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (param) => {
    deleteClient(token, param)
      .then((response) => {
        toast.success(response?.data?.message);
        handleClose();
        fetchClients();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        handleClose();
      });
  };

  return (
    <div>
      <div onClick={handleShow}>
        <FaTrash className="cursor-pointer text-danger" size={18} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>Are you sure to delete?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-sm" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger btn-sm"
            onClick={() => {
              handleClose();
              handleDelete(client?.id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteDialog;
