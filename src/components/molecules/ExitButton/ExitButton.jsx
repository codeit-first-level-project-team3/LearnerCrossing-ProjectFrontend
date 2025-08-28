import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./ExitButton.module.css";

export default function ExitButton({ text = "나가기", ...props }) {
  return (
    <Button className={styles.exitBtn} {...props}>
      <span className={styles.text}>{text}</span>
    </Button>
  );
}
