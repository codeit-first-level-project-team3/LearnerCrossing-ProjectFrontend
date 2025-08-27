import React from "react";
import Button from "../../atoms/Button/Button"; 
import styles from "./HabitButton.module.css";

export default function HabitButton({ text = "오늘의 습관으로 가기", ...props }) {
  return (
    <Button className={styles.habitBtn} {...props}>
      {text}
    </Button>
  );
}
