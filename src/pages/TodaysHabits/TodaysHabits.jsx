import { useEffect, useState } from 'react';

import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import HabitChip from '../../components/molecules/HabitChip/HabitChip.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';
import SetHabitModal from '../../components/organisms/SetHabitModal/SetHabitModal.jsx';

import { getHabits, updateHabit } from '../../api/habit.js';

import styles from './TodaysHabits.module.css';


function convertToString(weeklyClear){
    if(Array.isArray(weeklyClear)){return weeklyClear.join('|')}
    return [];
}

function convertToArray(weeklyClear){
    if(typeof weeklyClear === 'string'){return weeklyClear.split('|').map(v=>v=='0'?0:1)}
    return '';
}

function HabitList({ habits, handleToggle, setIsModalOpen }){

    return(
        <div className={styles.box}>
        <div className={styles.routineWrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 습관</p>
                <Button onClick={() => setIsModalOpen(true)}>목록수정</Button>
            </div>
            <ul className={styles.routineList}>
                {habits.map((habit) => {
                    const today = 0;
                    const isClear = convertToArray(habit.weeklyClear)[today];
                    return(
                        <li key={habit.id}>
                            <HabitChip
                                name={habit.name}
                                isClear={isClear}
                                onToggle={()=> {handleToggle(habit.id, isClear)}}
                            />
                        </li>
                    );  
                })}
            </ul>
        </div>
        </div>
    )
}

function TodaysHabits(){
    const goToBtn = [
        {to: '/focus', name:'오늘의 집중'},
        {to: '/studyDetail', name:'홈'},
    ]

    //습관 컬럼을 받아온다.
    //일주일 치 달성 여부가 보인다.
    
    const handleHabitsLoad = async () => {
        try {
            const result = await getHabits(3);
            setHabits(result || []);
        } catch (error) {
            console.error("습관 불러오기 실패:", error.message);
        }
    };
    
    const [habits, setHabits] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggle = (habitId, isClear) => {
        //실제로는 리퀘스트를 보내야 한다. (PATCH)
        const today = 0;
        const newHabits = [...habits];
        const habit = newHabits.filter(e=>e.id === habitId)[0];
        const newWeeklyClear = convertToArray(habit.weeklyClear);
        newWeeklyClear[today] = isClear?0:1;
        habit.weeklyClear = convertToString(newWeeklyClear);

        const body = {
            password: "1234",
            name: habit.name,
            weeklyClear: habit.weeklyClear
        }

        updateHabit(3, habitId, body);
        setHabits(newHabits);
    }

    const updateHabits = (_habits) => {
        setHabits(_habits);
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
                    title='연우의 개발 공장'
                    goToBtn={goToBtn}
                    isInfoPoint={false}
                />
                <HabitList 
                    habits={habits} 
                    handleToggle={handleToggle}
                    setIsModalOpen={setIsModalOpen}
                />
                <SetHabitModal 
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    habitList={habits} 
                    updateHabits={updateHabits}
                />
            </StudyMain>
        </main>
        </>
    );
}

export default TodaysHabits;