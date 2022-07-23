import React, { useState } from "react";
import {
  Modal,
  Button,
  CloseButton,
  Form,
  Col,
  Row,
  Alert,
  Container,
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

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
    //TODO: overall layout
  };
  return (
    <div>
      <Modal
        {...props}
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title>
            Add{" "}
            {value.firstName !== undefined
              ? `${value.firstName} ${value.lastName}`
              : "Student"}
          </Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Container>
            <AddStudentForm
              value={value}
              setValue={setValue}
              onSubmit={onSubmit}
            />
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            cancel
          </Button>

          <Button variant="primary" onClick={onSubmit} type="submit">
            save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddStudentModal;
