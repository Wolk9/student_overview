import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";
import { useDispatch, useSelector } from "react-redux";
import { setShowAlert } from "../ui/uiSlice";

export const AlertMessage = ({ variant, message }) => {
  const dispatch = useDispatch();
  const showAlert = useSelector((state) => state.ui.showAlert);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      dispatch(setShowAlert(false));
    }, 5000);
  }, []);

  return (
    <Fade appear={true} in={showAlert}>
      <Alert variant={variant} onClose={() => dispatch(setShowAlert(false))}>
        <Alert.Heading>Oh nee! Er gaat iets niet goed!</Alert.Heading>
        <p>{message}</p>
      </Alert>
    </Fade>
  );
};
