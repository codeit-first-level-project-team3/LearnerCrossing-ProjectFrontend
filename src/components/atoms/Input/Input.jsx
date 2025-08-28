import styles from "./TextInput.module.css";

export default function TextInput({ type = "text", placeholder, ...props }) {
  return <input type={type} placeholder={placeholder} className={styles.input} {...props} />;
}
