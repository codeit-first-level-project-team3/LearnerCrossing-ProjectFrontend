import GoToBtn from '../../molecules/GotoBtn/GoToBtn';
import styles from './StudyMain.module.css'

function StudyMain({
    title = '연우의 개발 공장',
    goToBtn = [],
    description = { name:'', value:''},
    info = { name:'', value:''},
    mainFeature = <></>
}){

    return(
        <div className={styles.studyMain}>
                <div className={styles.headline}>
                    <div className={styles.titleDiv}>
                        <p className={styles.title}>{title}</p>
                        <div className={styles.buttonDiv}>
                            {goToBtn.map((e)=>{
                                const {to, name} = e;
                                return <GoToBtn to={to} name={name}/>;
                            })}
                        </div>
                    </div>
                    {description && 
                        <div className={styles.description}>
                            <p className={styles.label}>{description.name}</p>
                            <p>{description.value}</p>
                        </div>
                    }
                    {info && 
                        <div className={styles.infoDiv}>
                            <p className={styles.label}>{info.name}</p>
                            {info.value}
                        </div>
                    }
                </div>
                <div className={styles.mainFeature}>
                    {mainFeature} 
                </div>
            </div>
    );
}

export default StudyMain;