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
import { MDBContainer } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { openEditStudentModal } from "../ui/uiSlice";
import AddStudentForm from "./AddStudentForm";
import { editStudent } from "./studentSlice";

const EditStudentModal = (props) => {
  const { showeditmodal } = props;
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const value = undefined;

  const handleClose = () => {
    console.log("Click on closed");
    dispatch(openEditStudentModal(false));
  };
  const setValue2 = (value2) => {
    dispatch(editStudent(value2));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    // if (
    //   value2.firstName ||
    //   value2.lastName ||
    //   value2.phone ||
    //   value2.email !== undefined
    // ) {
    //   dispatch(addStudent(value2));
    // } else {
    //   setAlert(true);
    // }
    dispatch(openEditStudentModal(false));

    //TODO: redux result reflect into JSON server
    //TODO: format phone and email check and alert
    //TODO: overall layout
  };
  return (
    <div>
      <Modal
        {...props}
        show={showeditmodal}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title>
            Add{" "}
            {/* {value.firstName !== undefined
              ? `${value2.firstName} ${value2.lastName}`
              : "Student"} */}
          </Modal.Title>
          <CloseButton onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <MDBContainer>
            {/* <AddStudentForm
              value={value2}
              setValue={setValue2}
              onSubmit={onSubmit}
            /> */}
          </MDBContainer>
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

export default EditStudentModal;
