import CheerTag from "../CheerTag/CheerTag";
import styles from "./CheerTagGroup.module.css";

function CheerTagGroup({emojis, onClick}) {
  return (
    <div className={styles.cheerTagGroup}>
      {Object.entries(emojis).map(([id, { emoji, count }]) => (
        <CheerTag
          key={id}
          id={id}
          emoji={emoji}
          count={count}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

export default CheerTagGroup;