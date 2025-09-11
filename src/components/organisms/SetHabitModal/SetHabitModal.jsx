import { useEffect, useState } from 'react';
import { createHabit, updateHabit, deleteHabit } from '../../../api/habitAPI.js';

import plusIcon from '../../../assets/plus.svg';
import TextButton from '../../molecules/TextButton/TextButton';
import IconButton from '../../molecules/IconButton/IconButton';
import Modal from '../../atoms/Modal/Modal';

import styles from './SetHebitModal.module.css';

import trashIcon from '../../../assets/trash.svg';
import useStudy from '../../../contexts/StudyStorage.jsx';
import { useParams } from 'react-router-dom';

function HabitInput({habit, error, onChange}){    
    return (
        <input 
            type = "text"
            value={habit.name} 
            className={`${styles.input} ${error && styles.inputErr}`}
            onChange={onChange}
        />
    )
}

function HabitInputList({habits, error, handleChange, handleAdd, handelDelete}){

    return (
        <ul className={styles.list}>
            {habits.map(habit=>{
                const err = error.find((e)=>e.id === habit.id)?.err??false;
                return(
                    <li key={habit.id}>
                        <div className={styles.habitDiv}>
                            <HabitInput 
                            habit={habit}
                            error={err}
                            onChange={(e)=> handleChange(habit.id, e.target.value)}
                            />
                            <IconButton 
                                icon={trashIcon} 
                                className={styles.trashBtn}
                                onClick={() => handelDelete(habit.id)}
                            />
                        </div>
                        {err && <p className={styles.errMsg}>습관 이름은 10자 이하로 작성해주세요!</p>}
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

    const { id: studyId } = useParams();
    const { password, token } = useStudy();
    const [habits, setHabits] = useState([...habitList].map(habit=>({...habit})));
    const [error, setError] = useState([]); //글자 길이 제한용 에러 여부
    const [rqQueue, setRqQueue] = useState([]);
    
    useEffect(() => {
        if(isOpen){
            //handleHabitsLoad();
            setHabits([...habitList].map(habit=>({...habit})));  
            setError([...habitList].map(habit=> ({ 
                id: habit.id,
                err: (habit.name||[]).length > 11 ? true : false
            })));
            setRqQueue([]);
        }
    }, [isOpen]);

    useEffect(() => {
        setError(habits.map(habit=> ({ 
            id: habit.id,
            err: (habit.name||[]).length > 11 ? true : false
        })));
        
    }, [habits]);

    // useEffect(() => {
    //     console.log(rqQueue);
    // }, [rqQueue]);

    const handleChange = (habitId, name) => {
        const newHabits = [...habits];
        //console.log(habitId);
        newHabits.find(e=>e.id===habitId).name = name;

        setHabits(newHabits);
    }

    const handelAdd = () => {
        const newHabits = [...habits];
        const queue = [...rqQueue];
        const postQueue = queue.filter(e=>e.requset === "post");
        const tempId = postQueue.length > 0 ? Math.min(...postQueue.map(e=>e.tempId)) - 1 : -1;

        queue.push(
            {
                requset: "post",
                tempId: tempId,
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

    /*추가, 삭제 되지않은 항목에 대해서 patch를 먼저 실행*/
    const rqPatch = async () => {
        const prev = [...habitList].map(habit=>({...habit}));

        //console.log("모달 비밀번호: " + password);
        (habits||[]).map(async(habit) => {

            if(habit.id < 0){return;} //추가된 항목(임시 id)이면 수정  x 
            if(prev.find(e=>e.id===habit.id).name === habit.name){return;} //기존과 변동이 없으면 수정 x

            /* 비밀번호 방식 */
            // const rqBody = {
            //     name: habit.name,
            //     weeklyClear: habit.weeklyClear,
            //     password: password
            // }
            // const res = await updateHabit(studyId, habit.id, rqBody);

            /* 토큰 방식 */
            const rqBody = {
                name: habit.name,
                weeklyClear: habit.weeklyClear
            }
            const res = await updateHabit(studyId, habit.id, rqBody, token);
        })
    }

    /*delete는 post가 기다려주지 않아도 된다.*/
    const rqDelete = () => {
        const deletePost = [];
        const queue = [...rqQueue];
        queue.forEach(async(e)=> {
            if(e.requset === 'delete'){
                if(e.id > -1){
                    const res = await deleteHabit(studyId, e.id, token);
                    //console.log(res); 
                }else{
                    deletePost.push(e.id)
                    //console.log("delete: " + deletePost);
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

            /* 비밀번호 방식 */
            // const rqBody = {
            //     name: habit.name,
            //     password: password
            // }
            // const res = await createHabit(studyId, rqBody);

            /* 토큰 방식 */
            const rqBody = {
                name: habit.name
            }
            const res = await createHabit(studyId, rqBody, token);
            habit.id = res.id;
        })) 
        setHabits(newHabits);
        //console.log("postResult:" + newHabits); 
    }

    const runRqQueue = async () => {
        rqPatch(); //수정 - 추가 or 삭제 되지않은 습관의 이름을 최신화
        const postQueue = rqDelete(); //삭제 - 삭제 큐가 끝나고 남은 추가 큐를 반환.
        await rqPost(postQueue); //추가 - 실제 id를 State에 반영
    }

    const handleSubmit = async(e) => {
        e.preventDefault();     
        runRqQueue();    
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
                        error={error}
                        handleChange={handleChange}
                        handleAdd={handelAdd}
                        handelDelete={handelDelete}
                    />
                </div>
                
                <div className={styles.btnDiv}>
                    <TextButton text='취소' isGreen={false} onClick={() => {setIsOpen(false);}}/>
                    <TextButton text='수정 완료' type="submit" disabled={!error.every(e=>!e.err)}/>
                </div>
            </form>
        </Modal>
    );
} 