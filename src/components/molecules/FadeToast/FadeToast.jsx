import Toast from "../../atoms/Toast"
import styles from "./FadeToast.module.css"

export default function FadeToast({text, type}){
    return(
        <Toast text={text} type={type} className={styles.fadeToast} />
    )
}