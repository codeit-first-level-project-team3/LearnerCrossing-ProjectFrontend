import React from "react";
import Button from "../../atoms/Button/Button"; 
import styles from "./RestartButton.module.css";
import restartIcon from "../../../assets/restart.svg";

export default function RestartButton(props) {
  return (
    <Button className={styles.restartBtn} {...props}>
      <img src={restartIcon} alt="restart icon" className={styles.icon} />
    </Button>
  );
}
