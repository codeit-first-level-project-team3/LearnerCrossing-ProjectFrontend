import IconButton from '../../molecules/IconButton/IconButton';
import styles from './HabitInput.module.css';

import plusIcon from '../../../assets/plus.svg';
import TextButton from '../../molecules/TextButton/TextButton';
import { useState } from 'react';
import Modal from '../../atoms/modal/modal';

function HabitInput({habit, onChange}){    
    return (
        <input 
            value={habit.name} 
            className={styles.input}
            onChange={onChange}
        />
    )
}

function HabitInputList({habits, handleChange}){

    return (
        <ul className={styles.list}>
            {habits.map(habit=>{
                return(
                    <li key={habit.id}>
                        <HabitInput 
                            habit={habit}
                            onChange={(e)=> handleChange(habit.id, e.target.value)}
                        />
                    </li>
                )
            })}
            <li>
                <IconButton 
                    icon={plusIcon}
                    className = {styles.plusBtn}
                />
            </li>
        </ul>
    );
}

export default function SetHabitModal({isOpen, setIsOpen, habitList, updateHabits}){

    
    const [habits, setHabits] = useState(habitList);

    const handleChange = (habitId, name) => {
        const newHabits = [...habits];
        newHabits[habitId].name = name;

        setHabits(newHabits);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateHabits(habits);
    };

    //실제 db 반영은 '수정 완료' 버튼으로 한다.

    return (
        <Modal isOpen={isOpen}>
                <form className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.wrapper}>
                    <HabitInputList 
                        habits={habits}
                        handleChange={handleChange}
                    />
                </div>
                
                <div className={styles.btnDiv}>
                    <TextButton text='취소' onClick={() => {setIsOpen(false);}}/>
                    <TextButton text='수정 완료' type="submit" onClick={() => {setIsOpen(false);}}/>
                </div>
            </form>
        </Modal>
    );
} 