import React from "react";
import styles from "./StudyCreateButton.module.css"; // CSS 모듈 import

export default function StudyCreateButton({ text = "스터디 만들기", ...props }) {
  return (
    <button className={styles.studyCreateBtn} {...props}>
      {text}
    </button>
  );
}
