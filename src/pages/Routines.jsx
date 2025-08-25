import MissionBox from '../components/missionBox/MissionBox';

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
        <div className="routineWrapper">
            <div className="titleDiv">
                <p className="title">오늘의 습관</p>
                <button>목록수정</button>
            </div>
            <ul className="routineList">
                {routineList.map((e) => {
                    return(
                        <li key={routineList.indexOf(e)}>
                            <button className="routineChip" style={chipStyle}>{e}</button>
                        </li>
                    );  
                })}
            </ul>
        </div>
    )
}

function TodaysRoutine(){
    return (
        <>
        {/* <header></header> */}
        <main>
            <MissionBox mainFeature={<RoutineList/>}/>
        </main>
        </>
    );
}

export default TodaysRoutine;