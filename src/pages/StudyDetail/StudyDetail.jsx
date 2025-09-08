import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAutoAsync, useActionAsync } from "../../hooks/useAsync.js";
import { getHabitList } from "../../api/habitAPI.js";
import { addStudyEmoji, getStudyEmojis } from "../../api/emojiAPI.js";

import Toast from "../../components/atoms/Toast.jsx";
import CheerTagGroup from "../../components/molecules/CheerTagGroup/CheerTagGroup.jsx";
import EmojiPickerButton from "../../components/molecules/EmojiPickerButton/EmojiPickerButton.jsx";
import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription";
import AuthPasswordModal from "../../components/organisms/AuthPasswordModal/AuthPasswordModal.jsX";
import WeeklyHabitForm from "../../components/organisms/WeeklyHabitForm/WeeklyHabitForm.jsx";
import styles from "./StudyDetail.module.css";
import { useStudy } from "../../contexts/StudyContext.jsx";

function StudyDetail() {
  const [chosenEmoji, setChosenEmoji] = useState(null); // 이모지 선택창에서 선택한 이모지
  const [isModalOpen, setIsOpen] = useState(false); // 모달창 열린 상태
  const [buttonText, setButtonText] = useState(""); // 모달창 버튼 이름
  const [password, setPassword] = useState(""); // 비밀번호
  const [warning, setWarning] = useState(false); // 경고창
  const navigate = useNavigate(); // 페이지 이동
  const [habits, setHabits] = useState([]); // habits 상태
  const [emojis, setEmojis] = useState([]);

  const [isHabitsLoading, habitsLoadingError, getHabitsAsync] =
    useAutoAsync(getHabitList); // 습관 가져오기 로딩,에러처리
  const [isEmojisLoading, EmojisLoadingError, getEmojisAsync] =
    useAutoAsync(getStudyEmojis); // 이모지 가져오기 로딩, 에러처리
  const [addEmojiLoading, addEmojiLodingError, addEmojisAsync] =
    useActionAsync(addStudyEmoji); // 이모지 추가 로딩, 에러처리

  const { studyId, studyData, checkPw } = useStudy();
  //const studyId = 3; // 임시 스터디 아이디
  const pwd = "1234"; // 임시 비밀번호

  // 유니코드 -> 이모지
  const unifiedToEmoji = (unified) => {
    return String.fromCodePoint(
      ...unified.split("-").map((u) => parseInt(u, 16))
    );
  };

  const handleEmojisLoad = async () => {
    try {
      const result = await getEmojisAsync(studyId);
      setEmojis(result);
    } catch (error) {
      console.error("습관 불러오기 실패:", error.message);
    }
  };

  // 이모지 카운트 증가 함수
  async function increaseCnt(id) {
    // setEmojis((prev) => ({
    //   ...prev,
    //   [id]: {
    //     ...prev[id],
    //     count: prev[id].count + 1,
    //   },
    // }));
    // console.log(chosenEmoji) // 이모지 픽커 이모지 확인
    console.log("id:", id); // 현재 클릭 아이디 확인용
     try {
      const result = await addEmojisAsync(studyId, id);
      setEmojis(result);
    } catch (error) {
      console.error("습관 불러오기 실패:", error.message);
    }
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
    setNextAction(() => () => navigate(`/studyEdit/${studyId}`));
    setIsOpen(true);
    setButtonText("수정하러 가기");
  };
  // 삭제하기 클릭
  const handleDeleteClick = () => {
    setNextAction(() => () => deleteStudy(18, pwd));
    setIsOpen(true);
    setButtonText("삭제하기");
  };
  // 비밀번호 성공시 미리 저장해둔 nextAction 실행
  const handlePasswordsubmit = async() => {
    if (await checkPw(password)) {
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

  // const [studyData, setStudyData] = useState({
  //   id: null,
  //   nickname: "",
  //   name: "",
  //   description: "",
  //   points: 0,
  // });
  // // 스터디 data 가져오기(임시) <-- context로 받아온거 사용
  // const handleStudyLoad = async () => {
  //   try {
  //     const result = await getStudy(studyId);
  //     setStudyData((prev) => ({
  //       ...prev,
  //       ...result,
  //     }));
  //     // console.log("api 결과 : " + result.nickname);
  //   } catch (error) {
  //     console.error("해당 스터디 불러오기 실패:", error.message);
  //   }
  // };

  // 로드 된 데이터 값 확인용도
  useEffect(() => {
    console.log("studyData가 업데이트됨:", emojis.items?.length);
  }, [emojis]);

  // 스터디(id:3)의 habits 가져오기
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
    //handleStudyLoad();
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
              <CheerTagGroup emojis={emojis} onClick={increaseCnt} isLoading={isEmojisLoading}/>
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
