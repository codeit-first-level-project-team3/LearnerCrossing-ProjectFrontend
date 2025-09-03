import { useEffect, useState } from 'react';

import plusIcon from '../../../assets/plus.svg';
import TextButton from '../../molecules/TextButton/TextButton';
import IconButton from '../../molecules/IconButton/IconButton';
import Modal from '../../atoms/modal/modal';

import styles from './HabitInput.module.css';

import trashIcon from '../../../assets/trash.svg';

function HabitInput({habit, onChange}){    
    return (
        <input 
            type = "text"
            value={habit.name} 
            className={styles.input}
            onChange={onChange}
        />
    )
}

function HabitInputList({habits, handleChange, handleAdd, handelDelete}){

    return (
        <ul className={styles.list}>
            {habits.map(habit=>{
                return(
                    <li key={habit.id} className={styles.habitDiv}>
                        <HabitInput 
                            habit={habit}
                            onChange={(e)=> handleChange(habit.id, e.target.value)}
                        />
                        <IconButton 
                            icon={trashIcon} 
                            className={styles.trashBtn}
                            onClick={() => handelDelete(habit.id)}
                        />
                    </li>
                )
            })}
            <li className={styles.plusBtnDiv}>
                <IconButton 
                    icon={plusIcon}
                    className = {styles.plusBtn}
                    onClick={handleAdd}
                />
            </li>
        </ul>
    );
}

export default function SetHabitModal({isOpen, setIsOpen, habitList, updateHabits}){

    const [habits, setHabits] = useState(habitList.map(e=> { return {...e}}));

    useEffect(() => {
        isOpen && setHabits(habitList.map(e=> { return {...e}}));
    }, [isOpen]);

    const handleChange = (habitId, name) => {
        const newHabits = [...habits];
        newHabits[habitId].name = name;

        setHabits(newHabits);
    }

    const handelAdd = () => {
        const newHabits = [...habits];
        const _habit = {
            id: newHabits.length > 0 ? Math.max(...newHabits.map(e=>e.id)) + 1 : 0,
            name: "",
            weekly_clear: "0|0|0|0|0|0|0"
        }
        newHabits.push(_habit);
        
        //id를 어떻게 처리해야 할지...
        setHabits(newHabits);

        console.log(newHabits);
    }

    const handelDelete = (habitId) => {
        const newHabits = [...habits];
        setHabits(newHabits.filter((e)=>e.id !== habitId));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        updateHabits(habits);
        setIsOpen(false); //수정 후 모달을 닫아야 한다..
    };

    //실제 db 반영은 '수정 완료' 버튼으로 한다.
    return (
        <Modal isOpen={isOpen}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <p className={styles.title}>습관 목록</p>
                <div className={styles.wrapper}>
                    <HabitInputList 
                        habits={habits}
                        handleChange={handleChange}
                        handleAdd={handelAdd}
                        handelDelete={handelDelete}
                    />
                </div>
                
                <div className={styles.btnDiv}>
                    <TextButton text='취소' isGreen={false} onClick={() => {setIsOpen(false);}}/>
                    <TextButton text='수정 완료' type="submit"/>
                </div>
            </form>
        </Modal>
    );
} 