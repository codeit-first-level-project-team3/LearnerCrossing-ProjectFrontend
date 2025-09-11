import Tag from "../../atoms/Tag/Tag";
import styles from "./CheerTag.module.css";

export default function CheerTag({emoji="", count="", id, onClick}) {
  return (
    <Tag
      className={styles.cheerTag}
      emoji={emoji}
      text={count}
      onClick={() => onClick(id)}
    />
  );
}
