import React from "react";
import Button from "../../atoms/Button/Button";
import styles from "./EditGoButton.module.css";

export default function EditGoButton({ text = "수정하러 가기", ...props }) {
  return (
    <Button className={styles.editGoBtn} {...props}>
      <span className={styles.text}>{text}</span>
    </Button>
  );
}
