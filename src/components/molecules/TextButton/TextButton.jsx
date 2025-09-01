import Button from "../../atoms/Button/Button";
import styles from "./TextButton.module.css";

export default function TextButton({ text = "버튼", ...props }) {
  return (
    <Button className={styles.textBtn} {...props}>
      {text}
    </Button>
  );
}
