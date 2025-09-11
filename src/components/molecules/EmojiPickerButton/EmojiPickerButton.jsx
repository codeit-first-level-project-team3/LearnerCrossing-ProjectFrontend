import EmojiPicker from "emoji-picker-react";
import Tag from "../../atoms/Tag/Tag";
import styles from "./EmojiPickerButton.module.css";
import smileIcon from "../../../assets/smile.svg";
import { useRef, useState } from "react";
import useOutsideClick from "../../../hooks/useClickOutside";

function EmojiPickerButton({ setChosenEmoji }) {
  const [showPicker, setShowPicker] = useState(false); // 이모지 선택창 상태

  const handleEmojiClick = (emojiData) => {
    // 이모지 추가 버튼 클릭
    const emojiId = emojiData.unified.toUpperCase(); // 유니코드 대문자로 변환
    setChosenEmoji(emojiId);
    setShowPicker(false); // 선택 후 닫기
  };

  const wrapperPickerRef = useRef(null); // <div> emojiMore
  const pickerBtnRef = useRef(null); // more button
  useOutsideClick(
    [wrapperPickerRef, pickerBtnRef],
    () => setShowPicker(false),
    showPicker
  );
  return (
    <>
      <div ref={pickerBtnRef}>
        <Tag
          className={styles.emojiPickerBtn}
          img={smileIcon}
          text="추가"
          onClick={() => setShowPicker((prev) => !prev)}
        />
      </div>
      {/* 이모지 picker창 */}
      {showPicker && (
        <div className={styles.emojiPickerWindow} ref={wrapperPickerRef}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </>
  );
}

export default EmojiPickerButton;
