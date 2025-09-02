import { useState } from "react";
import Button from "../../atoms/Button/Button";
import styles from "./BumpButton.module.css";

export default function ShadowButton({
  icon,
  alt = '',
  text='',
  colorSwap = false,
  shapeCircle = true,
  onClick=null,
  disabled=false,
  ...props
}) {

  const [isPush, setIsPush] = useState(disabled); //disabled면 눌린 상태로 비활성화

  const handleMouseDown = () => {
    setIsPush(true);
  }

  const handleMouseUp = () => {
    if(onClick){onClick()};  //눌렀다 땠을 때 작동하면 더 재밌을 거 같아서 수정.
    setIsPush(false);
  }

  const handleMouseOut = () => {
    //그냥 마우스가 벗어낫을 때는 작동하지 않는다.
    setIsPush(false);
  }

  return (
    <Button
      className={styles.bumpBtn}
      alt={alt}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      disabled={disabled}
      {...props}
    >
      <div 
        className={[
          styles.btnLayer,
          disabled ? styles.colorDisabled : (colorSwap ? styles.colorSwap : styles.colorDefault),
          shapeCircle ? styles.circle : styles.bar,
          isPush ? styles.bottom : styles.top,
        ].join(' ')}
      >
        {icon && <img src={icon} className={styles.icon} />}
        {text && <span className={styles.text}>{text}</span>}
      </div>
      <div 
        className={[
          styles.shadowLayer,
          colorSwap ? styles.colorDefault : styles.colorSwap,
          shapeCircle ? styles.circle : styles.bar,
          isPush ? styles.under : styles.bottom,
        ].join(' ')}
      ></div>
    </Button>
  );
}
