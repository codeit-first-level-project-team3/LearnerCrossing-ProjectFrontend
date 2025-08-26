import StudyMain from '../../components/organism/StudyMain/StudyMain.jsx';
import styles from './Routines.module.css';

function Timer(){

    //Key를 지금은 인덱스로 넣고 있어서 차후 수정 필요.
    return(
        <div className={styles.routineWrapper}>
            <div className={styles.titleDiv}>
                <p className={styles.title}>오늘의 집중</p>
            </div>
            
        </div>
    )
}

function TodaysConcentration(){
    const goToBtn = [
        {to: '/', name:'오늘의 습관'},
        {to: '/', name:'홈'},
    ]

    const info = {
        name: '현재까지 획득한 포인트',
        value: '310P 획득'
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
                mainFeature={<Timer/>}
            />
        </main>
        </>
    );
}

export default TodaysConcentration;