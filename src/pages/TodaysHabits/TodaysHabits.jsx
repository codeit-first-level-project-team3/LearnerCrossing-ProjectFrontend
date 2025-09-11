import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStudy from '../../contexts/StudyStorage.jsx';
import { getHabitList, updateHabit } from '../../api/habitAPI.js';

import GNB from "../../components/organisms/GNB/GNB.jsx";
import StudyMain from "../../components/organisms/StudyMain/StudyMain.jsx";
import Button from "../../components/atoms/Button/Button.jsx";
import HabitChip from "../../components/molecules/HabitChip/HabitChip.jsx";
import StudyDescription from "../../components/organisms/StudyDescription/StudyDescription.jsx";
import SetHabitModal from "../../components/organisms/SetHabitModal/SetHabitModal.jsx";

import styles from "./TodaysHabits.module.css";

function convertToString(weeklyClear){
    if(Array.isArray(weeklyClear)){return weeklyClear.join('|')}
    return [];
}

function convertToArray(weeklyClear) {
  if (typeof weeklyClear === "string") {
    return weeklyClear.split("|").map((v) => (v == "0" ? 0 : 1));
  }
  return "";
}

function HabitList({ today, habits, handleToggle, setIsModalOpen }) {
  const isAllClear = habits.length > 0 ? habits.every(habit=>convertToArray(habit.weeklyClear)[today]) : false;
  return (
    <div className={`${styles.box} ${isAllClear && styles.allClear}`}>
      <div className={styles.routineWrapper}>
        <div className={styles.titleDiv}>
          <p className={styles.title}>오늘의 습관</p>
          <Button onClick={() => setIsModalOpen(true)}>목록수정</Button>
        </div>
        <ul className={styles.routineList}>
          {
          habits.length > 0 ? habits.map((habit) => {
            const isClear = convertToArray(habit.weeklyClear)[today];
            return (
              <li key={habit.id}>
                <HabitChip
                  name={habit.name}
                  isClear={isClear}
                  onToggle={() => {
                    handleToggle(habit.id, isClear);
                  }}
                />
              </li>
            );
          })
          : <div className={styles.none}><p>진행 중인 습관이 없습니다.<br/>습관을 만들어 보세요!</p></div> 
          }
        </ul>
      </div>
    </div>
  );
}

function TodaysHabits() {
  const { id: studyId } = useParams();
  const { password, token } = useStudy();
  const [today, setToday] = useState((new Date().getDay() + 6) % 7);
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToBtn = [
    { to: "../focus", name: "오늘의 집중" },
    { to: "../", name: "홈" },
  ];

  /* 
    <크리티컬 에러>
    일주일 넘어가기 전에 습관 페이지에 접속한 후에,
    다음 주가 되어서 토글을 건드리면 분명 에러가 생긴다.
    */
  // const WeeklyReload = (habits) => {
  //     if(!habits){return []}
  //     const monday = new Date().getDate() - today;
  //     const lastSaveDate = Math.min(...habits.map(e=>new Date(e.updatedAt)));//가장 오래된 수정 날짜 확인
  //     if(lastSaveDate < monday){ //이번 주 월요일보다 이전 날짜면 모든 습관 달성도를 리셋.
  //         habits.forEach(habit=>{
  //             const body = {
  //                 password: "1234",
  //                 name: habit.name,
  //                 weeklyClear: '0|0|0|0|0|0|0'
  //             }
  //             updateHabit(studyId, habitId, body);
  //             habit.weeklyClear = '0|0|0|0|0|0|0';
  //         });
  //     }
  //     return habits;
  // }

  //습관 컬럼을 받아온다.
  //일주일 치 달성 여부가 보인다.
  const handleHabitsLoad = async () => {
    try {
      const _habits = await getHabitList(studyId);
      // const _habits = WeeklyReload(result); // 매주 리셋 함수
      setHabits(_habits || []);
    } catch (error) {
      console.error("습관 불러오기 실패:", error.message);
    }
  };

  const handleToggle = (habitId, isClear) => {
    const newHabits = [...habits];
    const habit = newHabits.filter((e) => e.id === habitId)[0];
    const newWeeklyClear = convertToArray(habit.weeklyClear);
    newWeeklyClear[today] = isClear ? 0 : 1;
    habit.weeklyClear = convertToString(newWeeklyClear);

    //console.log("토글 비밀번호: " + password);

    /* 비밀번호 방식 */
    // const body = {
    //     name: habit.name,
    //     weeklyClear: habit.weeklyClear,
    //     password: password
    // }

    // updateHabit(studyId, habitId, body);

    /* 토큰 방식 */
    const body = {
        name: habit.name,
        weeklyClear: habit.weeklyClear
    }

    updateHabit(studyId, habitId, body, token);
    setHabits(newHabits);
  }

  useEffect(() => {
      handleHabitsLoad();
  }, []);

  return (
      <>
      <GNB/>
      <main>
          <StudyMain>
              <StudyDescription
                  goToBtn={goToBtn}
                  isInfoPoint={false}
              />
              <HabitList 
                  today={today}
                  habits={habits} 
                  handleToggle={handleToggle}
                  setIsModalOpen={setIsModalOpen}
              />
              <SetHabitModal 
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  habitList={habits} 
                  updateHabits={setHabits}
              />
          </StudyMain>
      </main>
      </>
  );
}

export default TodaysHabits;
