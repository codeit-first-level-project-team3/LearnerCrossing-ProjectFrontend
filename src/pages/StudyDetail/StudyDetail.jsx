import Toast from "../../components/atoms/Toast.jsx";
import CheerTagGroup from "../../components/molecules/CheerTagGroup/CheerTagGroup.jsx";
import EmojiPickerButton from "../../components/molecules/EmojiPickerButton/EmojiPickerButton.jsx";
import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import AuthPasswordModal from "../../components/organisms/AuthPasswordModal/AuthPasswordModal.jsX";
import WeeklyHabitForm from "../../components/organisms/WeeklyHabitForm/WeeklyHabitForm.jsx";
import styles from "./StudyDetail.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudyDetail() {
  const gotobtn = [
    { to: "/habits", name: "오늘의 습관" },
    { to: "/focus", name: "오늘의 집중" },
  ];

  // 이모지 선택창에서 선택한 이모지
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // 모달창 열린 상태
  const [password, setPassword] = useState(""); // 비밀번호

  const title = "연우의 개발 공장"; //임시 타이틀
  const pwd = "12390"; // 임시 비밀번호

  // 임시 이모지 상태
  const [emojis, setEmojis] = useState({
    1: { emoji: "🏝️", count: 10 },
    // 2: { emoji: "👽", count: 78 },
  });

  // 이모지 카운트 증가 함수
  function increaseCnt(id) {
    setEmojis((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        count: prev[id].count + 1,
      },
    }));
    // console.log(chosenEmoji) // 이모지 픽커 이모지 확인
    // console.log("id:", id); // 현재 클릭 아이디 확인용
  }
  // 이모지 추가 함수
  function addEmoji(newEmoji) {
    setEmojis((prev) => {
      // 동일한 이모지 있는지 확인. 있으면 그 key 반환
      const existEmojiKey = Object.keys(prev).find(
        (key) => prev[key].emoji === newEmoji
      );
      // 있는 경우
      if (existEmojiKey) {
        return {
          ...prev,
          [existEmojiKey]: {
            ...prev[existEmojiKey],
            count: prev[existEmojiKey].count + 1,
          },
        };
      }
      // 일단은 있는 아이디 중 제일 큰 수 + 1 로 새 아이디 생성
      const newId = Math.max(...Object.keys(prev).map(Number)) + 1;
      return {
        ...prev,
        [newId]: { emoji: newEmoji, count: 1 },
      };
    });
  }

  // 이모지 추가
  useEffect(() => {
    if (!chosenEmoji) return;
    addEmoji(chosenEmoji);
    console.log("이모지 추가: " + chosenEmoji); // 이모지 추가 확인용 코드
  }, [chosenEmoji]);

  // input 변경 시 password 변경
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    console.log(password);
  };

  const [warning, setWarning] = useState(false); // 경고창
  const navigate = useNavigate(); // 페이지 이동

  // 비밀번호 성공시 스터디 생성으로 페이지 이동(임시 함수)
  const handlePasswordsubmit = () => {
    if (password === pwd) {
      setWarning(false);
      console.log("일치합니다.");
      navigate("/studyCreate");
    } else {
      setWarning(true);
    }
  };

  const [buttonText, setButtonText] = useState("");
  const handleUpdateClick = () => {
    setIsOpen(true);
    setButtonText("수정하러 가기");
  };

  const handlDeleteClick = () => {
    setIsOpen(true);
    setButtonText("삭제하기");
  };

  // 임시 일주일 습관 상태
  const habits = {
    1: {
      name: "미라클 모닝 6시 기상",
      weeklyClear: "0|0|0|0|0|0|0",
    },
    2: {
      name: "아침 챙겨 먹기",
      weeklyClear: "1|0|1|1|0|1|0"
    },
    3: {
      name: "스트레칭",
      weeklyClear: "1|1|1|0|1|0|0"
    },
    4: {
      name: "물 1L 마시기",
      weeklyClear: "0|1|1|1|0|1|0"
    },
  };

  return (
    <>
      {warning && (
        <Toast
          text="비밀번호가 일치하지 않습니다. 다시 입력해주세요."
          type="warning"
        />
      )}
      {isOpen && (
        <AuthPasswordModal
          isOpen={isOpen}
          onClick={handlePasswordsubmit}
          onClose={() => setIsOpen(false)}
          buttonText={buttonText}
          title={title}
          value={password}
          onChange={handlePasswordChange}
        />
      )}
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
              <span>|</span>
              <span onClick={() => handleUpdateClick()}>수정하기</span>
              <span className={styles.delete}>|</span>
              <span
                className={styles.delete}
                onClick={() => handlDeleteClick()}
              >
                스터디삭제하기
              </span>
            </div>
          </div>
          <StudyDescription
            title={title}
            goToBtn={gotobtn}
            description="Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
          />
          <WeeklyHabitForm habits={habits} color="purple" colorNum={2}/>
        </StudyMain>
      </main>
    </>
  );
}

export default StudyDetail;
