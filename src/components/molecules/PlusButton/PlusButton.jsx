import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./PlusButton.module.css";
import plusIcon from "../../../assets/plus.svg";

export default function PlusButton(props) {
  return (
    <Button className={styles.plusBtn} {...props}>
      <img src={plusIcon} alt="plus icon" className={styles.icon} />
    </Button>
  );
}
