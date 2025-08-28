import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./StartButton.module.css";
import playIcon from "../../../assets/start.svg";

export default function StartButton({ text = "Start!", ...props }) {
  return (
    <Button className={styles.startBtn} {...props}>
      <img src={playIcon} alt="play icon" style={{ width: 24, height: 24 }} />
      {text}
    </Button>
  );
}
