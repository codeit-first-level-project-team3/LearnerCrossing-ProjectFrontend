import GoToBtn from '../../mocules/GoToBtn';
import './StudyMain.css'

function StudyMain({
    title = '연우의 개발 공장',
    goToBtn = [],
    description = { name:'', value:''},
    info = { name:'', value:''},
    mainFeature = <></>
}){
    return(
        <div className="missionBox">
                <div className="headline">
                    <div className="titleDiv">
                        <p className="title">{title}</p>
                        <div className="buttonDiv">
                            {goToBtn.map((e)=>{
                                const {to, name} = e;
                                return <GoToBtn to={to} name={name}/>;
                            })}
                        </div>
                    </div>
                    {false && 
                        <div className="description">
                            <p className="label">{description.name}</p>
                            <p>{description.value}</p>
                        </div>
                    }
                    <div className="infoDiv">
                        <p className="label">{info.name}</p>
                        <div className="tag">
                            <p>{info.value}</p>
                        </div>
                    </div>
                </div>
                <div className="mainFeature">
                    {mainFeature} 
                </div>
            </div>
    );
}

export default StudyMain;