import React from "react";
import Button from "../../atoms/Button/Button"; 
import styles from "./PauseButton.module.css";
import pauseIcon from "../../../assets/pause.svg";

export default function PauseButton(props) {
  return (
    <Button className={styles.pauseBtn} {...props}>
      <img src={pauseIcon} alt="pause icon" className={styles.icon} />
    </Button>
  );
}
