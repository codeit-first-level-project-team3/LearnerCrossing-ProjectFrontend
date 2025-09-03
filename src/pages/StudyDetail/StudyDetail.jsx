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
import { getHabitsList } from "./studyDetailAPI.jsx";
import useAsync from "../../hooks/useAutoAsync.js";

function StudyDetail() {
  const gotobtn = [
    { to: "/habits", name: "오늘의 습관" },
    { to: "/focus", name: "오늘의 집중" },
  ];

  const [chosenEmoji, setChosenEmoji] = useState(null); // 이모지 선택창에서 선택한 이모지
  const [isOpen, setIsOpen] = useState(false); // 모달창 열린 상태
  const [password, setPassword] = useState(""); // 비밀번호
  const [warning, setWarning] = useState(false); // 경고창
  const navigate = useNavigate(); // 페이지 이동
  const [habits, setHabits] = useState([]); // habits 상태
  const [isLoading, loadingError, getHabitsAsync] = useAsync(getHabitsList); // 습관 가져오기 로딩,에러처리

  const title = "연우의 개발 공장"; //임시 타이틀
  const pwd = "1234"; // 임시 비밀번호

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
  };

  // 비밀번호 성공시 스터디 생성으로 페이지 이동(임시 함수)
  //  각 버튼마다 이동 위치 분리... 
  // 1. 상태를 통해 무슨 액션인지 관리해서 분기 2. 함수를 상태에 저장해서 그걸 모달로 넘기기
  const handlePasswordsubmit = () => {
    if (password === pwd) {
      setWarning(false);
      navigate("/studyEdit");
    } else {
      setWarning(true);
    }
  };

  const [buttonText, setButtonText] = useState("");
  // 모달창 열기
  const handleModalOpen = (btnText) => {
    setIsOpen(true);
    setButtonText(btnText);
  };
  // 모달창 닫기
  const handleModalClose = () => {
    setIsOpen(false);
    setWarning(false);
  };
  // gotobtn click
  const gotoclick = (e) => {
    e.preventDefault(); // Link 이동 막기
    setIsOpen(true);
    setButtonText("이동하기");
  }

  // 스터디(id:3)의 habits 가져오기
  const handleHabitsLoad = async () => {
    try {
      const result = await getHabitsAsync(3);
      setHabits(result || []);
    } catch (error) {
      console.error("습관 불러오기 실패:", error.message);
    }
  };

  useEffect(() => {
    // 데이터 불러오기
    handleHabitsLoad();
  }, []);

  return (
    <>
      {/* 경고창 */}
      {warning && (
        <Toast
          text="비밀번호가 일치하지 않습니다. 다시 입력해주세요."
          type="warning"
        />
      )}
      {/* 모달창 */}
      {isOpen && (
        <AuthPasswordModal
          isOpen={isOpen}
          onClick={handlePasswordsubmit}
          onClose={handleModalClose}
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
              <span onClick={() => handleModalOpen("수정하기")}>수정하기</span>
              <span className={styles.delete}>|</span>
              <span
                className={styles.delete}
                onClick={() => handleModalOpen("삭제하기")}
              >
                스터디삭제하기
              </span>
            </div>
          </div>
          <StudyDescription
            title={title}
            goToBtn={gotobtn}
            description="Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)"
            onClick={gotoclick}
          />
          <div className={styles.habitsContainer}>
            <h1>습관 기록표</h1>
            <WeeklyHabitForm
              habits={habits}
              isLoading={isLoading}
              color="purple"
              colorNum={2}
            />
          </div>
        </StudyMain>
      </main>
    </>
  );
}

export default StudyDetail;
