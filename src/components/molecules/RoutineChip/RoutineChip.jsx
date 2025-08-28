import { useState } from "react";
import Chip from "../../atoms/Chip/Chip.jsx";
import styles from './RoutineChip.module.css';

export default function RoutineChip({name='', isClear=false, onToggle=null}){
    
    //임시로 여기에 State 구현
    const [toggle, setToggle] = useState(false);
    
    const toggleStyle = {
        on: {
            backgroundColor: "var(--brand-99C08E)",
            color: "var(--white-FFFFFF)",
            font: "var(--font-16-bold)",    
        },
        off: {
            backgroundColor: "var(--gray-EEEEEE)",
            color: "var(--gray-818181)",
            font: "var(--font-16-bold)",
        }
    }

    return (
        <Chip
            className={styles.routineChip}
            toggleStyle={toggleStyle}
            isActive={toggle}
            setToggle={setToggle}
        >
            {name}
        </Chip>
    )
}