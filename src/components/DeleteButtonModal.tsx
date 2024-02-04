import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { deleteMultipleClientDelete } from "../service/clientRequest.ts";
import { toast } from "react-toastify";

const DeleteButtonModal = ({ selectedRows,fetchClients }) => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("task-token");

  const handleClose = () => setShow(false);

  const handleMultipleClientDelete = () => {
    deleteMultipleClientDelete(token, selectedRows)
      .then((response) => {
        toast.success(response?.data?.message, { autoClose: 1000 });
        fetchClients();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message, { autoClose: 1000 });
      });
  };

  return (
    <>
      <button
        className="btn bg-light text-emphasis-success mx-2"
        type="button"
        onClick={() => setShow(true)}
      >
        <FaTrash size="16" /> Delete
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-sm" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger btn-sm"
            onClick={() => {
              handleClose();
              handleMultipleClientDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButtonModal;
