import Button from "../../atoms/Button/Button";
import styles from "./IconButton.module.css";

export default function IconButton({
  icon,
  iconAlt = "icon",
  className = '',
  ...props
}) {
  return (
    <Button className={className || styles.iconBtn} {...props}>
      {icon && <img src={icon} alt={iconAlt} className={className ?  null : styles.icon} />}
    </Button>
  );
}
