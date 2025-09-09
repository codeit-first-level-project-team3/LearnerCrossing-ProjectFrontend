import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getHabitList } from "../../api/habitAPI.js";
import { useAutoAsync } from "../../hooks/useAsync.js";
import useEmojis from "../../hooks/useEmojis.js";

import Toast from "../../components/atoms/Toast.jsx";
import CheerTagGroup from "../../components/molecules/CheerTagGroup/CheerTagGroup.jsx";
import EmojiPickerButton from "../../components/molecules/EmojiPickerButton/EmojiPickerButton.jsx";
import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import AuthPasswordModal from "../../components/organisms/AuthPasswordModal/AuthPasswordModal.jsX";
import WeeklyHabitForm from "../../components/organisms/WeeklyHabitForm/WeeklyHabitForm.jsx";
import TwoButtonModal from "../../components/molecules/TwoButtonModal.jsx";
import OneButtonModal from "../../components/molecules/OneButtonModal.jsx";
import styles from "./StudyDetail.module.css";
import icCopy from "../../assets/ic_copy.png";

import useStudy from "../../contexts/StudyStorage.jsx";

function StudyDetail() {
  const [isModalOpen, setIsOpen] = useState(false); // 모달창 열린 상태
  const [buttonText, setButtonText] = useState(""); // 모달창 버튼 이름
  const [isReconfirmOpen, setReconfirmOpen] = useState(false); // 한 번 더 확인용 모달
  const [deleteSuccess, setDeleteSuccess] = useState(false); // 삭제 성공 여부
  const [share, setShare] = useState(false); // 공유하기 창
  const [password, setPassword] = useState(""); // 비밀번호
  const [warning, setWarning] = useState(false); // 경고창
  const navigate = useNavigate(); // 페이지 이동
  const [habits, setHabits] = useState([]); // habits 상태

  const [isHabitsLoading, habitsLoadingError, getHabitsAsync] =
    useAutoAsync(getHabitList); // 습관 가져오기 로딩,에러처리

  const { studyId, studyData, selectStudy, checkPw, deleteStudy } = useStudy();

  //임시 아이디 1
  // useEffect(()=>{
  //   selectStudy(1);
  // }, []);

  // emojis 훅
  const {
    emojis,
    chosenEmoji,
    setChosenEmoji,
    handleEmojisLoad,
    handleEmojisAdd,
    isEmojisLoading,
    isEmojisAdding,
  } = useEmojis(studyId);

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
      to: "./habits",
      name: "오늘의 습관",
      onClick: (e) => {
        e.preventDefault();
        setNextAction(() => () => navigate("./habits"));
        setIsOpen(true);
        setButtonText("오늘의 습관으로 가기");
      },
    },
    {
      to: "./focus",
      name: "오늘의 집중",
      onClick: (e) => {
        e.preventDefault();
        setNextAction(() => () => navigate("./focus"));
        setIsOpen(true);
        setButtonText("오늘의 집중으로 가기");
      },
    },
  ];
  // 수정하기 클릭
  const handleUpdateClick = () => {
    setNextAction(() => () => navigate("./studyEdit"));
    setIsOpen(true);
    setButtonText("수정하러 가기");
  };
  // 삭제하기 클릭
  const handleDeleteClick = () => {
    setNextAction(() => () => setReconfirmOpen(true)); // 한번 더 확인 모달창 열기
    setIsOpen(true);
    setButtonText("삭제하기");
  };
  // 비밀번호 성공시 미리 저장해둔 nextAction 실행
  const handlePasswordsubmit = async () => {
    if (await checkPw(password)) {
      setWarning(false);
      setIsOpen(false);
      nextAction();
    } else {
      setWarning(true);
    }
  };
  // 삭제 한번 더 확인, 삭제
  const handleReconfirm = async () => {
    await deleteStudy(studyId, password);
    setReconfirmOpen(false);
    setDeleteSuccess(true);
  };
  // 삭제하기 완료
  const handleDeleteSuccess = () => {
    setDeleteSuccess(false);
    navigate("/");
  };

  // 모달창 닫기
  const handleModalClose = () => {
    setIsOpen(false);
    setWarning(false);
  };
  // 한번 더 확인 모달창 닫기
  const handleReconfirmClose = () => {
    setReconfirmOpen(false);
    handleModalClose();
  };
  
  const url = window.location.href;
  // 공유하기 클릭
  const handleShareClick = () => {
    setShare(prev => !prev);
  };
  const [alert, setAlert] = useState(false);
  // 복사 아이콘 클릭
  const handleCopyClick = () => {
    navigator.clipboard.writeText(url);
    setAlert(true);

    setTimeout(() => {
      setAlert(false);
    }, 1000);
  };

  // 스터디 habits 가져오기
  const handleHabitsLoad = async () => {
    try {
      const result = await getHabitsAsync(studyId);
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
      {deleteSuccess && (
        <OneButtonModal
          isOpen={deleteSuccess}
          onClick={handleDeleteSuccess}
          buttonText="홈으로 돌아가기"
        >
          <span>스터디를 삭제했습니다.</span>
        </OneButtonModal>
      )}
      {/* 다시 한번 더 확인 */}
      {isReconfirmOpen && (
        <TwoButtonModal
          isOpen={isReconfirmOpen}
          onClose={handleReconfirmClose}
          onClick={handleReconfirm}
          buttonText="삭제하기"
        >
          <span>정말 해당 스터디를 삭제하시겠습니까?</span>
        </TwoButtonModal>
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
              <span onClick={handleShareClick}>공유하기</span>
              <span>|</span>
              <span onClick={handleUpdateClick}>수정하기</span>
              <span className={styles.delete}>|</span>
              <span className={styles.delete} onClick={handleDeleteClick}>
                스터디삭제하기
              </span>
              {share && <div className={styles.copyBox}>
                <p>스터디 공유하기</p>
                <div className={styles.linkBox}>
                  <input type="text" value={url} disabled />
                  <img src={icCopy} alt=" ic_copy" onClick={handleCopyClick}/>
                </div>
                {alert && <p className={styles.copyAlert}>링크가 복사되었습니다.</p>}
              </div>}
            </div>
          </div>
          <StudyDescription
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
