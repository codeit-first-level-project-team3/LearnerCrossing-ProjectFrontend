import GoToBtn from "../../molecules/GotoBtn/GoToBtn";
import styles from "./StudyDescription.module.css";
import DateTag from "../../molecules/DateTag";
import PointTag from "../../molecules/PointTag";

function StudyDescription({
  title = "",
  goToBtn = [],
  description = "",
  isInfoPoint = true,
}) {
  const infoName = isInfoPoint ? "현재까지 획득한 포인트" : "현재 시간";

  const info = {
    true: <PointTag/>,
    false: <DateTag/>,
  };

  return ( 
    <div className={styles.studyDescription}>
      <div className={styles.titleDiv}>
        <p className={styles.title}>{title}</p>
        <div className={styles.buttonDiv}>
          {goToBtn.map((e) => {
            const { to, name } = e;
            return <GoToBtn to={to} name={name} key={goToBtn.indexOf(e)}/>;
          })}
        </div>
      </div>
      {description && (
        <div className={styles.description}>
          <p className={styles.label}>소개</p>
          <p>{description}</p>
        </div>
      )}
      <div className={styles.infoDiv}>
        <p className={styles.label}>{infoName}</p>
        {info[isInfoPoint]}
      </div>
    </div>
  );
}

export default StudyDescription;
