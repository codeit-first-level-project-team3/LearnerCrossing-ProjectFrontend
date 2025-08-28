import { Link } from 'react-router-dom';
import arrowRight from '../../../assets/ic_arrow_right.svg';
import styles from './GoToBtn.module.css'
import Button from '../../atoms/Button/Button.jsx';

function GoToBtn({to, name}){
    return (
        <Link to={to}>
            <Button className={styles.goToBtn}>
                <span>{name} </span>                          
                <img src={arrowRight}/>
            </Button>
        </Link>
    )
}

export default GoToBtn;