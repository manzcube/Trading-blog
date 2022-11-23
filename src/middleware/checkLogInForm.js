import React from "react";

const checkLogInForm = ({ email, password }) => {
  if (
    email === process.env.REACT_APP_USER1_EMAIL ||
    email === process.env.REACT_APP_USER2_EMAIL
  ) {
    return true;
  } else if (
    password === process.env.REACT_APP_USER1_PASSWORD ||
    password === process.env.REACT_APP_USER2_PASSWORD
  ) {
    return true;
  }
  return false;
};

export default checkLogInForm;
