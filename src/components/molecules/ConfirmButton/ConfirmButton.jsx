import React from "react";
import Button from '../../atoms/Button/Button'; 
import styles from "./ConfirmButton.module.css";

export default function ConfirmButton({ text = "확인", ...props }) {
  return (
    <Button className={styles.confirmBtn} {...props}>
      {text}
    </Button>
  );
}
