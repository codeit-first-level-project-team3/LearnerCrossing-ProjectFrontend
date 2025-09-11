import Tag from '../atoms/Tag/Tag';
import pointIcon from "../../assets/point_icon.svg";
import useStudy from '../../contexts/StudyStorage'; 

export default function PointTag(){
    const { studyData } = useStudy();

    return (
        <Tag img={pointIcon} text={studyData.points + 'P 획득'}/>
    )
}