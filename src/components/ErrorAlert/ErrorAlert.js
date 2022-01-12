import React, { useState } from "react";
import classes from "./ErrorAlert.module.css";

const ErrorAlert = ({ errorMsg }) => {
  const [display, setDisplay] = useState("");

  const handleClose = () => {
    setDisplay("none");
  };

  return (
    <div style={{ display }} className={classes.alert}>
      <span onClick={handleClose} className={classes.closebtn}>
        &times;
      </span>
      {errorMsg}
    </div>
  );
};

export default ErrorAlert;
