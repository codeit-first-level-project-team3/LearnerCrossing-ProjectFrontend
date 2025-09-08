import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useStudy } from "../../contexts/StudyContext.jsx";
import { deleteStudy } from "../../api/studyAPI.js";
import { getHabitList } from "../../api/habitAPI.js";
import { useAutoAsync, useActionAsync } from "../../hooks/useAsync.js";
import useEmojis from "../../hooks/useEmojis.js";

import Toast from "../../components/atoms/Toast.jsx";
import CheerTagGroup from "../../components/molecules/CheerTagGroup/CheerTagGroup.jsx";
import EmojiPickerButton from "../../components/molecules/EmojiPickerButton/EmojiPickerButton.jsx";
import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import AuthPasswordModal from "../../components/organisms/AuthPasswordModal/AuthPasswordModal.jsX";
import WeeklyHabitForm from "../../components/organisms/WeeklyHabitForm/WeeklyHabitForm.jsx";
import styles from "./StudyDetail.module.css";

function StudyDetail() {
  const { selectedStudyId, studyData } = useStudy();
  const [isModalOpen, setIsOpen] = useState(false); // 모달창 열린 상태
  const [buttonText, setButtonText] = useState(""); // 모달창 버튼 이름
  const [password, setPassword] = useState(""); // 비밀번호
  const [warning, setWarning] = useState(false); // 경고창
  const navigate = useNavigate(); // 페이지 이동
  const [habits, setHabits] = useState([]); // habits 상태

  const [isHabitsLoading, habitsLoadingError, getHabitsAsync] =
    useAutoAsync(getHabitList); // 습관 가져오기 로딩,에러처리

  // emojis 훅
  const {
    emojis,
    chosenEmoji,
    setChosenEmoji,
    handleEmojisLoad,
    handleEmojisAdd,
    isEmojisLoading,
    isEmojisAdding,
  } = useEmojis(selectedStudyId);

  // const selectedStudyId = 1; // 임시 스터디 아이디
  const pwd = "1234"; // 임시 비밀번호

  // input 변경 시 password 변경
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  // 각 버튼마다 이동 위치 분리...
  // 함수를 상태에 저장해서 그걸 모달로 넘기기
  const [nextAction, setNextAction] = useState(null); // 다음에 일어날 함수

  const gotobtn = [
    {
      to: "/habits",
      name: "오늘의 습관",
      onClick: (e) => {
        e.preventDefault();
        setNextAction(() => () => navigate("/habits"));
        setIsOpen(true);
        setButtonText("오늘의 습관으로 가기");
      },
    },
    {
      to: "/focus",
      name: "오늘의 집중",
      onClick: (e) => {
        e.preventDefault();
        setNextAction(() => () => navigate("/focus"));
        setIsOpen(true);
        setButtonText("오늘의 집중으로 가기");
      },
    },
  ];
  // 수정하기 클릭
  const handleUpdateClick = () => {
    setNextAction(() => () => navigate(`/studyEdit/${selectedStudyId}`));
    setIsOpen(true);
    setButtonText("수정하러 가기");
  };
  // 삭제하기 클릭 
  const handleDeleteClick = () => {
    setNextAction(() => () => deleteStudy(selectedStudyId, pwd));
    setIsOpen(true);
    setButtonText("삭제하기");
  };
  // 비밀번호 성공시 미리 저장해둔 nextAction 실행 
  const handlePasswordsubmit = () => {
    if (password === pwd) {
      setWarning(false);
      nextAction();
    } else {
      setWarning(true);
    }
  };

  // 모달창 닫기
  const handleModalClose = () => {
    setIsOpen(false);
    setWarning(false);
  };

  // 로드 된 데이터 값 확인용도
  useEffect(() => {
    console.log("emojis:", emojis.items);
  }, [emojis]);

  // 스터디 habits 가져오기
  const handleHabitsLoad = async () => {
    try {
      const result = await getHabitsAsync(selectedStudyId);
      setHabits(result || []);
    } catch (error) {
      console.error("습관 불러오기 실패:", error.message);
    }
  };

  useEffect(() => {
    // 데이터 불러오기
    handleHabitsLoad();
    handleEmojisLoad();
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
      {isModalOpen && (
        <AuthPasswordModal
          isOpen={isModalOpen}
          onClick={handlePasswordsubmit}
          onClose={handleModalClose}
          buttonText={buttonText}
          title={studyData.name}
          value={password}
          onChange={handlePasswordChange}
        />
      )}
      <GNB />
      <main>
        <StudyMain>
          <div className={styles.utilityBar}>
            <div className={styles.emojiBox}>
              <CheerTagGroup
                emojis={emojis}
                onClick={handleEmojisAdd}
                isLoading={isEmojisLoading}
              />
              <EmojiPickerButton setChosenEmoji={setChosenEmoji} />
            </div>
            <div className={styles.quickLinks}>
              <span>공유하기</span>
              <span>|</span>
              <span onClick={handleUpdateClick}>수정하기</span>
              <span className={styles.delete}>|</span>
              <span className={styles.delete} onClick={handleDeleteClick}>
                스터디삭제하기
              </span>
            </div>
          </div>
          <StudyDescription
            nickName={studyData.nickname}
            name={studyData.name}
            goToBtn={gotobtn}
            description={studyData.description}
          />
          <div className={styles.habitsContainer}>
            <h1>습관 기록표</h1>
            <WeeklyHabitForm
              habits={habits}
              isLoading={isHabitsLoading}
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
