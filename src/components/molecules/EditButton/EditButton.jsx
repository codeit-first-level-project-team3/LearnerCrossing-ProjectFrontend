import React from "react";
import Button from '../../atoms/Button/Button'; 
import styles from "./EditButton.module.css";

export default function EditButton({ text = "수정하기", ...props }) {
  return (
    <Button className={styles.editBtn} {...props}>
      {text}
    </Button>
  );
}
