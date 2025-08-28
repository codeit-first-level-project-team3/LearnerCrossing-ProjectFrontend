import EmojiPicker from "emoji-picker-react";
import Tag from "../../atoms/Tag/Tag";
import styles from "./EmojiPickerButton.module.css";
import smileIcon from "../../../assets/smile.svg";
import { useState } from "react";

function EmojiPickerButton({ setChosenEmoji }) {
  const [showPicker, setShowPicker] = useState(false); // 이모지 선택창 상태

  const handleEmojiClick = (emojiData) => {
    // 이모지 추가 버튼 클릭
    setChosenEmoji(emojiData.emoji);
    setShowPicker(false); // 선택 후 닫기
  };

  return (
    <div className={styles.emojiPicker}>
      <Tag
        img={smileIcon}
        text="추가"
        onClick={() => setShowPicker((prev) => !prev)}
      />
      {/* 이모지 picker창 */}
      {showPicker && (
        <div className={styles.emojiPickerWindow}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerButton;
