import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./AddButton.module.css";
import smileIcon from "../../../assets/smile.svg";

export default function AddButton({ text = "추가", ...props }) {
  return (
    <Button className={styles.addBtn} {...props}>
      <img src={smileIcon} alt="smile icon" className={styles.icon} />
      {text}
    </Button>
  );
}
