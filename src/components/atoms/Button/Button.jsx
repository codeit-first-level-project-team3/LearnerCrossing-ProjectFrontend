import styles from './Button.module.css';

function Button({id=null, className='', disabled=false, onClick=null, children, ...props}){
    //.button 클래스 공유
    //disabled 스타일 공유 (포인터 안됨, 클릭 안됨.)
    const classNames = [styles.button, className].join(' ');

    //기본값이 submit이 아닌, button (form 전송을 막기 위함)

    return(
        <button 
            type="button"
            id={id} 
            className={classNames} 
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
export default Button;