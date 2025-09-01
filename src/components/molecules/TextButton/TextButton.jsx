import Button from "../../atoms/Button/Button";
import styles from "./TextButton.module.css";

export default function TextButton({ text = "버튼", isGreen=true, ...props }) {
  const bagckground = isGreen ? styles.green : styles.gray; 
  return (
    <Button className={`${styles.textBtn} ${bagckground}`} {...props}>
      {text}
    </Button>
  );
}
