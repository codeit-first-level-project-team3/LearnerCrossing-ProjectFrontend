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
  
  //습관 컬럼을 받아온다.
  //일주일 치 달성 여부가 보인다.
  const handleHabitsLoad = async () => {
    const _habits = await getHabitList(studyId);
    setHabits(_habits || []);
  };

  const handleToggle = (habitId, isClear) => {
    const newHabits = [...habits];
    const habit = newHabits.filter((e) => e.id === habitId)[0];
    const newWeeklyClear = convertToArray(habit.weeklyClear);
    newWeeklyClear[today] = isClear ? 0 : 1;
    habit.weeklyClear = convertToString(newWeeklyClear);

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
