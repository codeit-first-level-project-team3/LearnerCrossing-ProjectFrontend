import React from "react";
import Button from "../../atoms/Button/Button"; 
import styles from "./StudyCreateButton.module.css"; 

export default function StudyCreateButton({ text = "스터디 만들기", ...props }) {
  return (
    <Button className={styles.studyCreateBtn} {...props}>
      {text}
    </Button>
  );
}
