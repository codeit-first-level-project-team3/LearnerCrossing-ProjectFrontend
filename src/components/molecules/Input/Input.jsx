import styles from "./Input.module.css";

export default function Input({ type = "text", placeholder, ...props }) {
  return <input type={type} placeholder={placeholder} className={styles.input} {...props} />;
}
