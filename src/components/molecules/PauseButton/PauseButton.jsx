import React from "react";
import styles from "./PauseButton.module.css";
import pauseIcon from "../../../assets/pause.svg";

export default function PauseButton(props) {
  return (
    <button className={styles.pauseBtn} {...props}>
      <img src={pauseIcon} alt="pause icon" className={styles.icon} />
    </button>
  );
}
