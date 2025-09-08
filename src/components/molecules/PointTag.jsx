import Tag from '../atoms/Tag/Tag';
import pointIcon from "../../assets/point_icon.svg";
import { useStudy } from '../../contexts/StudyContext';

export default function PointTag(){
    const { point, plusPoint } = useStudy();

    return (
        <Tag img={pointIcon} text={point + 'P 획득'} onClick={() => plusPoint(1)}/>
    )
}