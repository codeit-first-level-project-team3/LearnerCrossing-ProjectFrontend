import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudy } from '../../contexts/StudyContext.jsx';

import GNB from '../../components/organisms/GNB/GNB.jsx';
import StudyMain from '../../components/organisms/StudyMain/StudyMain.jsx';
import StudyDescription from '../../components/organisms/StudyDescription/StudyDescription.jsx';
import FocusTimer from '../../components/organisms/FocusTimer/FocusTimer.jsx';

import styles from './TodaysFocus.module.css';

function Focus(){
    return (
        <div className={styles.box}>
            <div className={styles.wrapper}>
                <div className={styles.titleDiv}>
                    <p className={styles.title}>오늘의 집중</p>
                </div>
                <FocusTimer/>
            </div>
        </div>
    )
}

function TodaysFocus(){

    const { selectStudy } = useStudy();
    const navigate = useNavigate();

    const goToBtn = [
        {to: '/habits', name:'오늘의 습관'},
        {to: '/studyDetail', name:'홈'},
    ]

    useEffect(()=>{
        //새로고침 시에 context가 날라가는 이슈 발생. 리액트 고질적 문제. (해결 방법 고민 중)
        window.onload = () => {
            //브라우저에 저장된 스터디 id가 있으면 해당 스터디 정보 보여주기
            //없으면 홈으로 이동.
            const id = parseInt(localStorage.getItem("studyId"));
            if(id) { selectStudy(id); }
            else{ navigate("/"); }
        };    
    }, []);

    return (
        <>
        <GNB/>
        <main>
            <StudyMain>
                <StudyDescription
                    title='연우의 개발 공장'
                    goToBtn={goToBtn}
                    isInfoPoint={true}
                />
                <Focus/>
            </StudyMain>
        </main>
        </>
    );
}

export default TodaysFocus;