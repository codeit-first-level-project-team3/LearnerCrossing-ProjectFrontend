import styles from "./TextareaInput.module.css";

export default function TextareaInput({ placeholder, ...props }) {
  return <textarea placeholder={placeholder} className={styles.textarea} {...props} />;
}