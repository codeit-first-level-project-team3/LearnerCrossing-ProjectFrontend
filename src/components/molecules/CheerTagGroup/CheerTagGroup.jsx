import { useState } from "react";
import CheerTag from "../CheerTag/CheerTag";
import styles from "./CheerTagGroup.module.css";

function CheerTagGroup({ emojis, onClick }) {
  // 이모지 객체를 [key, value] 형태의 배열로 변환
  const emojisEntries = Object.entries(emojis);
  const show = 3;
  // 이모지 객체의 길이가 보여줄 길이보다 큰가?
  const isMore = emojisEntries.length > show;

  const [showEmojiMore, setShowEmojiMore] = useState(false); // 더보기창 상태

  return (
    <div className={styles.cheerTagGroup}>
      {emojisEntries.slice(0, show).map(([id, { emoji, count }]) => (
        <CheerTag
          key={id}
          id={id}
          emoji={emoji}
          count={count}
          onClick={onClick}
        />
      ))}
      {isMore && (
        <CheerTag
          emoji="+  "
          count={`${emojisEntries.length - show} ..`}
          onClick={() => setShowEmojiMore((prev) => !prev)}
        />
      )}
      {showEmojiMore && (
        <div className={styles.emojiMore}>
          {emojisEntries
            .slice(show, emojisEntries.length)
            .map(([id, { emoji, count }]) => (
              <CheerTag
                key={id}
                id={id}
                emoji={emoji}
                count={count}
                onClick={onClick}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default CheerTagGroup;
