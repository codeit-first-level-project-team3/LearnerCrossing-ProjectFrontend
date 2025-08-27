import React from "react";
import Button from '../../atoms/Button/Button';
import styles from "./EditCompleteButton.module.css";

export default function EditCompleteButton({ text = "수정 완료", ...props }) {
  return (
    <Button className={styles.editCompleteBtn} {...props}>
      {text}
    </Button>
  );
}
