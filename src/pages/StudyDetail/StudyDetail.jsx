import Tag from "../../components/atoms/Tag/Tag.jsx";
import HabitWeekly from "../../components/molecules/HabitWeekly/HabitWeekly";
import CheerTagGroup from "../../components/molecules/CheerTagGroup/CheerTagGroup.jsx";
import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import style from "./StudyDetail.module.css";
import { useState } from "react";

function StudyDetail() {
  const gotobtn = [
    { to: "/concentrations", name: "오늘의 집중" },
    { to: "/", name: "홈" },
  ];

  // 임시 이모지 상태
  const [emojis, setEmojis] = useState({
    1: { emoji: "😀", count: 10 },
    2: { emoji: "😎", count: 5 },
    3: { emoji: "🤩", count: 2 },
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

    console.log("id:", id); // 현재 클릭 아이디 확인용
  };

  return (
    <>
      <GNB />
      <main>
        <StudyMain>
          <div className={style.utilityBar}>
            <CheerTagGroup emojis={emojis} onClick={increaseCnt}/> 
            <div className={style.quickLinks}>
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
            stickerNum={2}
            weeklytodo="cheer Tag 만들기"
          />
          <HabitWeekly
            stickerColor="purple"
            stickerNum={2}
            weeklytodo="스프린트 7..."
          />
        </StudyMain>
      </main>
    </>
  );
}

export default StudyDetail;
