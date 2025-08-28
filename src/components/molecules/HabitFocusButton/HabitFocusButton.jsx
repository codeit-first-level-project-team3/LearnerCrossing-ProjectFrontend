import React from "react";
import Button from '../../atoms/Button/Button';
import styles from "./HabitFocusButton.module.css";

export default function HabitFocusButton({ text = "오늘의 집중으로 가기", ...props }) {
  return (
    <Button className={styles.habitFocusBtn} {...props}>
      {text}
    </Button>
  );
}
