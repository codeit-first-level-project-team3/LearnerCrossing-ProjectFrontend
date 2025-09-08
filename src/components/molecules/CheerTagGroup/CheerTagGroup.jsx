import { useEffect, useRef, useState } from "react";
import CheerTag from "../CheerTag/CheerTag";
import styles from "./CheerTagGroup.module.css";

function CheerTagGroup({ emojis, onClick, isLoading }) {
  // 이모지: {items: Array(5)} 형태
  const emojisList = emojis.items;
  const emojisLength = emojis.items?.length;
  const show = 3;
  // 이모지 종류의 길이가 보여줄 길이보다 큰가?
  const isMore = emojisLength > show;

  const [showEmojiMore, setShowEmojiMore] = useState(false); // 더보기창 상태
  const wrapperRef = useRef(null); // <div> emojiMore

  useEffect(() => { 
    if (!showEmojiMore) return;
    
    function handleClickOutside(e) {
      // 해당 컨텐츠가 아니라 다른 곳을 클릭하면 setShowEmojiMore(false)
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowEmojiMore(false);
      }
    }
    // click할때 handleClickOutside 호출 
    document.addEventListener("mousedown", handleClickOutside);
    // 사이드 이펙트 정리
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiMore]); // showEmojiMore가 바뀌때만 실행되면 됨

  return (
    <div className={styles.cheerTagGroup}>
      {!isLoading && emojisList.slice(0, show).map(({ emojiId, emoji, count }) => (
        <CheerTag
          key={emojiId}
          id={emojiId}
          emoji={emoji}
          count={count}
          onClick={onClick}
        />
      ))}
      {!isLoading && isMore && (
        <CheerTag
          emoji="+  "
          count={`${emojisLength - show} ..`}
          onClick={() => setShowEmojiMore((prev) => !prev)}
        />
      )}
      {!isLoading && showEmojiMore && (
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
