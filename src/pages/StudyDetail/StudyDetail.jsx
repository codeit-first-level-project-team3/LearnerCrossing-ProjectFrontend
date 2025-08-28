import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import HabitWeekly from "../../components/molecules/HabitWeekly/HabitWeekly";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import style from "./StudyDetail.module.css";

function StudyDetail() {
  const gotobtn = [
    { to: "/concentrations", name: "오늘의 집중" },
    { to: "/", name: "홈" },
  ];
  return (
    <>
      <GNB />
      <main>
        <StudyMain>
          <div className={style.utilityBar}>
            <div>응원 이모지 태그</div>
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
