import { useContext } from 'react';
import UserContext from "../../contexts/UserContext";
import Tag from '../atoms/Tag/Tag';
import pointIcon from "../../assets/point_icon.svg";

export default function PointTag(){
    const { point, plusPoint } = useContext(UserContext);

    return (
        <Tag img={pointIcon} text={point + 'P 획득'} onClick={() => plusPoint(1)}/>
    )
}