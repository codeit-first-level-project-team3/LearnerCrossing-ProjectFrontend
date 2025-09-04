import { useEffect, useState } from 'react';
import { createHabit, updateHabit, deleteHabit } from '../../../api/habit';

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

/* 작동하게만 만들어서 리펙토링이 필요합니다 */
export default function SetHabitModal({isOpen, setIsOpen, habitList, updateHabits}){

    const [habits, setHabits] = useState([...habitList].map(habit=>{return {...habit}}));
    const [rqQueue, setRqQueue] = useState([]);
    const [studyId, setStudyId] = useState(1);

    useEffect(() => {
        if(isOpen){
            //handleHabitsLoad();
            setHabits([...habitList].map(habit=>{return {...habit}}));  
            setRqQueue([]);
        }
    }, [isOpen]);

    useEffect(() => {
        console.log(rqQueue);
    }, [rqQueue]);

    const handleChange = (habitId, name) => {
        const newHabits = [...habits];
        console.log(habitId);
        newHabits.find(e=>e.id===habitId).name = name;

        setHabits(newHabits);
    }

    const handelAdd = () => {
        const newHabits = [...habits];
        const queue = [...rqQueue];
        //const tempId = newHabits.length > 0 ? Math.max(...newHabits.map(e=>e.id)) + 1 : 0;
        const postQueue = queue.filter(e=>e.requset === "post");
        const tempId = postQueue.length > 0 ? Math.min(...postQueue.map(e=>e.tempId)) - 1 : -1;

        queue.push(
            {
                requset: "post",
                tempId: tempId,
                realId: 0
            }
        )
        setRqQueue(queue);
        
        
        const _habit = {
            id: tempId,
            name: "",
            weeklyClear: "0|0|0|0|0|0|0"
        }
        newHabits.push(_habit);
        setHabits(newHabits);

        console.log(newHabits);
    }

    const handelDelete = (habitId) => {
        const queue = [...rqQueue]
        queue.push(
            {
                requset: "delete",
                id: habitId,
            }
        )
        setRqQueue(queue);
        const newHabits = [...habits];
        setHabits(newHabits.filter((e)=>e.id !== habitId));
    }

    /*delete는 post가 기다려주지 않아도 된다.*/
    const rqDelete = () => {
        const deletePost = [];
        const queue = [...rqQueue];
        queue.forEach(async(e)=> {
            if(e.requset === 'delete'){
                const rqBody = {
                    password: "1234"
                }
                if(e.id > -1){
                    const res = await deleteHabit(studyId, e.id, rqBody);
                    console.log(res); 
                }else{
                    deletePost.push(e.id)
                    console.log("delete: " + deletePost);
                }
            }
        });

        return queue.filter(e=>!deletePost.includes(e.tempId) && e.requset === 'post');
    }

    /*path 전에 post를 해주어야 해서 Promise.all */
    const rqPost = async (queue) => {
        const newHabits = [...habits];
        
        //모든 post리퀘스트가 병렬 실행 되지만 모두 pending이 끝날 때까지 기다려준다.
        await Promise.all(queue.map(async(post) => {
            const habit = newHabits.find(habit=>habit.id === post.tempId);
            const rqBody = {
                password: "1234",
                name: habit.name
            }
            const res = await createHabit(studyId, rqBody);
            post.realId = res.id;
            habit.id = res.id;
        })) 
        setHabits(newHabits);
        console.log("postResult:" + newHabits); 
        return newHabits;
    }

    /*post가 끝나면 patch*/
    const rqPatch = async (newHabits) => {
        await Promise.all((newHabits||[]).map(async(habit) => {
            const rqBody = {
                password: "1234",
                name: habit.name
            }
            const res = await updateHabit(studyId, habit.id, rqBody);
            console.log(res); 
        })) 
    }

    const runRqQueue = async (studyId) => {
        const postQueue = rqDelete(); //삭제 큐를 먼저 진행. 추가했다가 바로 삭제한 것은 추가 큐에서 제외.
        const newHabits = await rqPost(postQueue); //추가 큐를 실행. post는 기다려준다.
        await rqPatch(newHabits); //수정 - 모든 습관의 이름을 최신화
    }

    const handleSubmit = async(e) => {
        e.preventDefault();     
        runRqQueue(studyId);    
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