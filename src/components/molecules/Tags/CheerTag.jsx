import { useState } from "react";
import Tag from "../../atoms/Tag/Tag";
import styles from './CheerTag.module.css';

export default function CheerTag({}){
    //리퀘스트 구현 외/내부에 별도 필요
    const [cnt, setCnt] = useState(1);
    return (
        <Tag 
            className={styles.cheerTag}
            text={'🤩' + cnt }
            onClick={() => setCnt(cnt + 1)} //클릭 시 카운트 증가 
        />
    )
}