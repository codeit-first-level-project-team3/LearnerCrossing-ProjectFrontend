import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./DeleteButton.module.css";
import trashIcon from "../../../assets/trash.svg";

export default function DeleteButton(props) {
  return (
    <Button className={styles.deleteBtn} {...props}>
      <img src={trashIcon} alt="delete icon" className={styles.icon} />
    </Button>
  );
}
