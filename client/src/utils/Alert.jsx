import React from "react";
import Alert from "react-bootstrap/Alert";

export const SuccessAlert = ({ message }) => {
  return <Alert variant="success">{message}</Alert>;
};

export const ErrorAlert = ({ message }) => {
  return <Alert variant="danger">{message}</Alert>;
};
