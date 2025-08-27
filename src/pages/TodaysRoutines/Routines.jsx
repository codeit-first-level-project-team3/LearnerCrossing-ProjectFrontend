import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import RoutineChip from '../../components/molecules/RoutineChip/RoutineChip.jsx';

import styles from './Routines.module.css';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';


function RoutineList(){

    const routineList = [
        "미라클 모닝 6시 기상",
        "아침 챙겨 먹기",
        'React 스터디 책 1챕터 읽기',
        "스트레칭",
        "영양제 챙겨 먹기",
        "사이드 프로젝트",
        "물 2리터 먹기"
    ];

    //Key를 지금은 인덱스로 넣고 있어서 차후 수정 필요.
    return(
        <div className={styles.box}>
        <div className={styles.routineWrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 습관</p>
                <Button>목록수정</Button>
            </div>
            <ul className={styles.routineList}>
                {routineList.map((e) => {
                    return(
                        <li key={routineList.indexOf(e)}>
                            <RoutineChip
                                name={e}
                            />
                        </li>
                    );  
                })}
            </ul>
        </div>
        </div>
    )
}

function TodaysRoutine(){
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
                <RoutineList/>
            </StudyMain>
        </main>
        </>
    );
}

export default TodaysRoutine;