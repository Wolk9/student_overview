import React, { useState } from "react";
import { Modal, Button, CloseButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";
import { addStudent } from "./studentSlice";

const AddStudentModal = (props) => {
  const { show } = props;
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("Click on closed");
    dispatch(openAddStudentModal(false));
  };

  const addStudent = () => {
    console.log("Click on addStudent");
    dispatch(addStudent());
  };
  return (
    <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add Student</Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>Edit user</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={addStudent}>save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
