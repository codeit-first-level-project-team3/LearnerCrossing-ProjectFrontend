import { useState } from 'react';
import styles from './TestToggle.module.css';

export default function TestToggle({isTestMode=false, onToggle}){

    return (
        <>
        <div onClick={() => onToggle(!isTestMode)} className={styles.box}>
            <p className={styles.name}>시연 모드</p>
            <div className={styles.toggle}>
                <div className={isTestMode ? styles.test : styles.default}>
                </div>
            </div>
        </div>
        {isTestMode ? <p>포인트를 분 단위로 지급</p> : <p>포인트를 초 단위로 지급</p>}
        </>
        
    )
}