import styles from './Chip.module.css';

//일단 toggle은 되지만 수정 필요합니다;;
// isToggleOn, onToggle 함수 => State에 동기화 필요.

function Chip({
    isOn,
    onToggle,
    id=null, 
    className='', 
    disabled=false, 
    toggleStyle={
        on: {},
        off: {}
    },
    children
}){

    //.chip 클래스 공유
    //disabled 스타일 공유 (포인터 안됨, 클릭 안됨.)
    const classNames = [styles.chip, className].join(' ');

    return(
        <button 
            id={id} 
            className={classNames} 
            style={isOn ? toggleStyle.on : toggleStyle.off}
            disabled={disabled}
            onClick={onToggle}
        >{children}</button>
    )
}
export default Chip;