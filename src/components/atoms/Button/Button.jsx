import styles from './Button.module.css';

function Button({id=null, className='', disabled=false, children}){
    //.button 클래스 공유
    //disabled 스타일 공유 (포인터 안됨, 클릭 안됨.)
    const classNames = [styles.button, className].join(' ');
    return(
        <button id={id} className={classNames} disabled={disabled}>{children}</button>
    )
}
export default Button;