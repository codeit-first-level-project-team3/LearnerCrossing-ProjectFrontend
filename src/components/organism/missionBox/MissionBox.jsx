import GoToBtn from '../../mocules/GoToBtn';
import './missionBox.css'

function MissionBox({mainFeature}){
    return(
        <div className="missionBox">
                <div className="headline">
                    <div className="titleDiv">
                        <p className="title">연우의 개발공장</p>
                        <div className="buttonDiv">
                            <GoToBtn to='/' name={'오늘의 집중'}/>
                            <GoToBtn to='/' name={'홈'}/>
                        </div>
                    </div>
                    <div className="infoDiv">
                        <p className="title">현재 시간</p>
                        <div className="infoTag">
                            <p>2024-01-04 오후 03:06</p>
                        </div>
                    </div>
                </div>
                <div className="mainFeature">
                    {mainFeature} 
                </div>
            </div>
    );
}

export default MissionBox;