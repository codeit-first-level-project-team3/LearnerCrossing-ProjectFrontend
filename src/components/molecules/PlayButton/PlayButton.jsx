import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./PlayButton.module.css";
import playIcon from "../../../assets/play.svg"; 

export default function PlayButton({ text = "Start!", bgColor, ...props }) {
  return (
    <Button
      className={styles.playBtn}
      style={{ background: bgColor || "var(--brand-99C08E)" }}
      {...props}
    >
      <img src={playIcon} alt="play icon" style={{ width: 24, height: 24 }} />
      {text}
    </Button>
  );
}
