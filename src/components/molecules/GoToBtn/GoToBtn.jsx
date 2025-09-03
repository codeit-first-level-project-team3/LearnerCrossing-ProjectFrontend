import { Link } from 'react-router-dom';
import arrowRight from '../../../assets/ic_arrow_right.svg';
import styles from './GoToBtn.module.css'

function GoToBtn({to, name, onClick}){
    return (
        <Link to={to} className={styles.goToBtn} onClick={onClick}>
                <span>{name} </span>                          
                <img src={arrowRight}/>
        </Link>
    )
}

export default GoToBtn; 