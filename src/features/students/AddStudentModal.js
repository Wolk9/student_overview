import React, { useState } from "react";
import {
  Modal,
  Button,
  CloseButton,
  Form,
  Col,
  Row,
  Alert,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openAddStudentModal } from "../ui/uiSlice";
import AddStudentForm from "./AddStudentForm";
import { addStudent } from "./studentSlice";

const AddStudentModal = (props) => {
  const { show } = props;
  const [value, setValue] = useState({
    id: "",
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    email: undefined,
  });
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    console.log("Click on closed");
    dispatch(openAddStudentModal(false));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      value.firstName ||
      value.lastName ||
      value.phone ||
      value.email !== undefined
    ) {
      dispatch(addStudent(value));
    } else {
      setAlert(true);
    }
    dispatch(openAddStudentModal(false));
  };
  return (
    <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Add Student</Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <AddStudentForm
            value={value}
            setValue={setValue}
            onSubmit={onSubmit}
          />
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button onClick={handleClose}>cancel</Button>
            <Button onClick={onSubmit} type="submit">
              save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
