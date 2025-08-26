import StudyMain from '../components/organism/missionBox/StudyMain';

function TodaysCocentration(){
    return (
        <>
        {/* <header></header> */}
        <main>
            <StudyMain mainFeature={<RoutineList/>}/>
        </main>
        </>
    );
}

export default TodaysCocentration;