import { useState } from 'react';
import styles from './TestToggle.module.css';

export default function TestToggle({isTestMode=false, onToggle}){

    return (
        <div onClick={() => onToggle(!isTestMode)} className={styles.box}>
            <p className={styles.name}>시연 모드</p>
            <div className={styles.toggle}>
                <div className={isTestMode ? styles.test : styles.default}>
                    <p>{isTestMode ? "on" : "off"}</p>
                </div>
            </div>
        </div>
    )
}