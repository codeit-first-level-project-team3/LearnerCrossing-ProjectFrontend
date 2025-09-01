import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button/Button"; 
import styles from "./StudyCreateButton.module.css"; 

export default function StudyCreateButton({ text = "스터디 만들기", ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/studyCreate"); 
  };

  return (
    <Button
      className={styles.studyCreateBtn}
      onClick={handleClick}
      {...props}
    >
      {text}
    </Button>
  );
}
