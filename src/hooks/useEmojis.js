import { useEffect, useState } from "react";
import { useActionAsync, useAutoAsync } from "./useAsync";
import { addStudyEmoji, getStudyEmojis } from "../api/emojiAPI";

function useEmojis(studyId) {
  const [emojis, setEmojis] = useState([]); // 이모지 상태
  const [chosenEmoji, setChosenEmoji] = useState(null); // 이모지 선택창에서 선택한 이모지

  const [isEmojisLoading, emojisLoadingError, getEmojisAsync] =
    useAutoAsync(getStudyEmojis); // 이모지 불러오기 로딩, 에러처리
  const [isEmojisAdding, emojisAddingError, addEmojisAsync] =
    useActionAsync(addStudyEmoji); // 이모지 추가 로딩, 에러처리

  // 이모지 불러오기
  const handleEmojisLoad = async () => {
    try {
      const result = await getEmojisAsync(studyId);
      setEmojis(result);
    } catch (error) {
      console.error("이모지 불러오기 실패:", error.message);
    }
  };

  // 이모지 추가
  const handleEmojisAdd = async (emojiId) => {
    try {
      const result = await addEmojisAsync(studyId, emojiId);
      handleEmojisLoad();
    } catch (error) {
      console.error("이모지 추가하기 실패:", error.message);
    }
  };

  useEffect(() => {
    handleEmojisAdd(chosenEmoji);
  }, [chosenEmoji]);

  return {
    emojis,
    chosenEmoji,
    setChosenEmoji,
    handleEmojisLoad,
    handleEmojisAdd,
    isEmojisLoading,
    isEmojisAdding,
  };
}

export default useEmojis;
