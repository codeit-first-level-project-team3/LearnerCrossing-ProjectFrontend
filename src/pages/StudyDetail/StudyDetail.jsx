import HabitWeekly from "../../components/molecules/HabitWeekly/HabitWeekly";
import CheerTagGroup from "../../components/molecules/CheerTagGroup/CheerTagGroup.jsx";
import EmojiPickerButton from "../../components/molecules/EmojiPickerButton/EmojiPickerButton.jsx";
import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import styles from "./StudyDetail.module.css";
import { useState } from "react";

function StudyDetail() {
  const gotobtn = [
    { to: "/focus", name: "오늘의 집중" },
    { to: "/", name: "홈" },
  ];

  // 이모지 선택창에서 선택한 이모지
  const [chosenEmoji, setChosenEmoji] = useState(null);

  // 임시 이모지 상태
  const [emojis, setEmojis] = useState({
    1: { emoji: "😀", count: 10 },
    2: { emoji: "😎", count: 5 },
    3: { emoji: "🤩", count: 2 },
    4: { emoji: "❤️‍🔥", count: 2 },
    5: { emoji: "❤️", count: 2 },
    6: { emoji: "🍇", count: 53 },
    7: { emoji: "🥰", count: 2 },
    8: { emoji: "🏝️", count: 9 },
    9: { emoji: "🍉", count: 4 },
    10: { emoji: "👽", count: 78 },
  });

  // 이모지 카운트 증가 함수
  const increaseCnt = (id) => {
    setEmojis((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: prev[id].count + 1,
      },
    }));

    // console.log(chosenEmoji) // 이모지 픽커 이모지 확인
    console.log("id:", id); // 현재 클릭 아이디 확인용
  };

  return (
    <>
      <GNB />
      <main>
        <StudyMain>
          <div className={styles.utilityBar}>
            <div className={styles.emojiBox}>
              <CheerTagGroup emojis={emojis} onClick={increaseCnt} />
              <EmojiPickerButton setChosenEmoji={setChosenEmoji} />
            </div>
            <div className={styles.quickLinks}>
              <span>공유하기</span>
              <span>수정하기</span>
              <span>스터디삭제하기</span>
            </div>
          </div>
          <StudyDescription
            goToBtn={gotobtn}
            description="Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
          />
          {/* 임시로 올려본 일주일 습관 */}
          <HabitWeekly
            isTop={true}
            stickerColor="pink"
            stickerNum={2}
            weeklytodo="미라클 모닝 6시 기상"
          />
          <HabitWeekly
            stickerColor="green"
            stickerNum={2}
            weeklytodo="아침 챙겨 먹기"
          />
          <HabitWeekly
            stickerColor="blue"
            stickerNum={1}
            weeklytodo="cheer Tag 만들기"
          />
          <HabitWeekly
            stickerColor="purple"
            stickerNum={0}
            weeklytodo="스프린트 7..."
          />
        </StudyMain>
      </main>
    </>
  );
}

export default StudyDetail;
