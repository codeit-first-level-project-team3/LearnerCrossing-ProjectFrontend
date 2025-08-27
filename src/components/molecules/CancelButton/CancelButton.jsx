import React from "react";
import Button from '../../atoms/Button/Button'; // Atom Button 경로
import styles from "./CancelButton.module.css";

export default function CancelButton({ text = "취소", ...props }) {
  return (
    <Button className={styles.cancelBtn} {...props}>
      {text}
    </Button>
  );
}
