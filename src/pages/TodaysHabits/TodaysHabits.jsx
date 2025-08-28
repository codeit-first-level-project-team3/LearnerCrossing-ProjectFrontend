import { useState } from 'react';

import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import HabitChip from '../../components/molecules/HabitChip/HabitChip.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';

import styles from './TodaysHabits.module.css';

function HabitList(){

    //습관 컬럼을 받아온다.
    //일주일 치 달성 여부가 보인다.

    const habitList = [
        {
            id: 0,
            name: "미라클 모닝 6시 기상",
            weekly_clear: "0|0|0|0|0|0|1"
        },
        {
            id: 1,
            name: "아침 챙겨 먹기",
            weekly_clear: "0|0|0|0|0|0|1"
        },
        {
            id: 2,
            name: "React 스터디 책 1챕터 읽기",
            weekly_clear: "0|0|0|0|0|0|1"
        },
        {
            id: 3,
            name: "스트레칭",
            weekly_clear: "0|0|0|0|0|0|1"
        },
        {
            id: 4,
            name: "영양제 챙겨 먹기",
            weekly_clear: "0|0|0|0|0|0|1"
        },
        {
            id: 5,
            name: "사이드 프로젝트",
            weekly_clear: "0|0|0|0|0|0|1"
        },
        {
            id: 6,
            name: "물 2리터 먹기",
            weekly_clear: "0|0|0|0|0|0|1"
        },
    ]
    
    const [habits, setHabits] = useState(habitList);

    const handleToggle = (habitId, isClear) => {
        //실제로는 리퀘스트를 보내야 한다. (PATCH)
        const today = 0;
        const newHabits = [...habits];
        const newWeeklyClear = convertToArray(newHabits[habitId].weekly_clear);
        newWeeklyClear[today] = isClear?0:1;
        newHabits[habitId].weekly_clear = convertToString(newWeeklyClear);

        setHabits(newHabits);
    }

    const convertToString = (weeklyClear) => {
        if(Array.isArray(weeklyClear)){return weeklyClear.join('|')}
        return [];
    }

    const convertToArray = (weeklyClear) => {
        if(typeof weeklyClear === 'string'){return weeklyClear.split('|').map(v=>v=='0'?0:1)}
        return '';
    }

    //Key를 지금은 인덱스로 넣고 있어서 차후 수정 필요.
    return(
        <div className={styles.box}>
        <div className={styles.routineWrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 습관</p>
                <Button>목록수정</Button>
            </div>
            <ul className={styles.routineList}>
                {habits.map((habit) => {
                    const today = 0;
                    const isClear = convertToArray(habit.weekly_clear)[today];
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
        {to: '/concentrations', name:'오늘의 집중'},
        {to: '/', name:'홈'},
    ]

    return (
        <>
        <GNB/>
        <main>
            <StudyMain>
                <StudyDescription
                    goToBtn={goToBtn}
                    isInfoPoint={false}
                />
                <HabitList/>
            </StudyMain>
        </main>
        </>
    );
}

export default TodaysHabits;