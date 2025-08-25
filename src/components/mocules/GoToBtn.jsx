import { Link } from 'react-router-dom';
import arrowRight from '../assets/ic_arrow_right.svg';

function GoToBtn({to, name}){
    return (
        <Link to='/'>
            <button className="button goToBtn">
                {name}                           
                <img src={arrowRight}/>
            </button>
        </Link>
    )
}

export default GoToBtn;