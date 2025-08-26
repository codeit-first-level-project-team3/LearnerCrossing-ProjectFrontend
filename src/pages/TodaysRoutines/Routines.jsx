import StudyMain from '../../components/organism/StudyMain/StudyMain.jsx';
import Button from '../../components/atoms/Button/Button.jsx';
import Tag from '../../components/atoms/Tag/Tag.jsx';
import styles from './Routines.module.css';

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

    const chipStyle = {
        backgroundColor: "var(--gray-gray_EEEEEE, #EEE)",
        color: "var(--gray-818181)",
        font: "var(--font-16-bold)",
    }

    //Key를 지금은 인덱스로 넣고 있어서 차후 수정 필요.
    return(
        <div className={styles.routineWrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 습관</p>
                <Button>목록수정</Button>
            </div>
            <ul className={styles.routineList}>
                {routineList.map((e) => {
                    return(
                        <li key={routineList.indexOf(e)}>
                            <button className={styles.routineChip} style={chipStyle}>{e}</button>
                        </li>
                    );  
                })}
            </ul>
        </div>
    )
}

function TodaysRoutine(){
    const goToBtn = [
        {to: '/concentrations', name:'오늘의 집중'},
        {to: '/', name:'홈'},
    ]

    const description = {
        name: '소개',
        value: 'Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)'
    }

    const info = {
        name: '현재 시간',
        value: <Tag value='2024-01-04 오후 03:04'/>
    }

    return (
        <>
        {/* <header></header> */}
        <main>
            <StudyMain 
                title='연우의 개발 공장'
                goToBtn= {goToBtn}
                description={null}
                info={info}
                mainFeature={<RoutineList/>}
            />
        </main>
        </>
    );
}

export default TodaysRoutine;