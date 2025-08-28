import { useState } from "react";
import Chip from "../../atoms/Chip/Chip.jsx";
import styles from './HabitChip.module.css';

export default function RoutineChip({isClear, onToggle, name=''}){
    
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
            isOn={isClear}
            onToggle={onToggle}
        >
            {name}
        </Chip>
    )
}