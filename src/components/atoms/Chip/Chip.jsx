import styles from './Chip.module.css';

//일단 toggle은 되지만 수정 필요합니다;;
// isToggleOn, onToggle 함수 => State에 동기화 필요.

function Chip({
    isActive,
    setToggle,
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

    const handleToggle = () => {
        setToggle(!isActive);
    }

    return(
        <button 
            id={id} 
            className={classNames} 
            style={isActive ? toggleStyle.on : toggleStyle.off}
            disabled={disabled}
            onClick={handleToggle}
        >{children}</button>
    )
}
export default Chip;