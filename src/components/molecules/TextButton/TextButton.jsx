import Button from "../../atoms/Button/Button";
import styles from "./TextButton.module.css";

export default function TextButton({ text = "버튼", isGreen=true, disabled=false, ...props }) {
  const bagckground = isGreen ? styles.green : styles.gray; 
  return (
    <Button className={`${styles.textBtn} ${disabled ? styles.disabled : bagckground}`}  disabled={disabled} {...props}>
      {text}
    </Button>
  );
}
