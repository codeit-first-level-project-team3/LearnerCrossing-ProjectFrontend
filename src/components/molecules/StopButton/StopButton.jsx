import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./StopButton.module.css";
import stopIcon from "../../../assets/stop.svg";

export default function StopButton({ text = "Stop!", ...props }) {
  return (
    <Button className={styles.stopBtn} {...props}>
      <img src={stopIcon} alt="stop icon" />
      {text}
    </Button>
  );
}
