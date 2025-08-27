import React from "react";
import styles from "./RestartButton.module.css";
import restartIcon from "../../../assets/restart.svg";

export default function RestartButton(props) {
  return (
    <button className={styles.restartBtn} {...props}>
      <img src={restartIcon} alt="restart icon" className={styles.icon} />
    </button>
  );
}
