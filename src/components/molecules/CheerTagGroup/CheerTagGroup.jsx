import { useEffect, useRef, useState } from "react";
import CheerTag from "../CheerTag/CheerTag";
import styles from "./CheerTagGroup.module.css";
import useOutsideClick from "../../../hooks/useClickOutside";

function CheerTagGroup({ emojis, onClick, isLoading }) {
  // 이모지: {items: Array(5)} 형태
  const emojisList = emojis.items || [];
  const emojisLength = emojis.items?.length;
  const show = 3;
  // 이모지 종류의 길이가 보여줄 길이보다 큰가?
  const isMore = emojisLength > show;

  const [showEmojiMore, setShowEmojiMore] = useState(false); // 더보기창 상태
  const wrapperRef = useRef(null); // <div> emojiMore
  const btnRef = useRef(null); // more button

  useOutsideClick([wrapperRef, btnRef], () => setShowEmojiMore(false), showEmojiMore);

  return (
    <div className={styles.cheerTagGroup}>
      {emojisList.slice(0, show).map(({ emojiId, emoji, count }) => (
        <CheerTag
          key={emojiId}
          id={emojiId}
          emoji={emoji}
          count={count}
          onClick={onClick}
        />
      ))}
      {isMore && (
        <div ref={btnRef}>
          <CheerTag
            emoji="+  "
            count={`${emojisLength - show} ..`}
            onClick={() => setShowEmojiMore((prev) => !prev)}
          />
        </div>
      )}
      {showEmojiMore && (
        <div className={styles.emojiMore} ref={wrapperRef}>
          {emojisList
            .slice(show, emojisLength)
            .map(({ emojiId, emoji, count }) => (
              <CheerTag
                key={emojiId}
                id={emojiId}
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
