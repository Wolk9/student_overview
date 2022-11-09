import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { useDispatch } from "react-redux";
import { setShowAlert } from "../ui/uiSlice";

export const AlertMessage = ({ variant, header, message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowAlert(false));
    }, 5000);
  }, []);

  return (
    <Alert variant={variant} onClose={() => dispatch(setShowAlert(false))}>
      <Alert.Heading>{header}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};
