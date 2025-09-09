import { createContext, useState, useEffect, useContext } from "react";
import { getStudy, createStudy as apiCreateStudy, updateStudy as apiUpdateStudy, deleteStudy as apiDeleteStudy } from "../api/studyAPI";
import { checkStudyPw } from "../api/studyAPI";
import { updatePoint } from "../api/pointAPI";

const StudyContext = createContext();

export function StudyProvider({ children }) {
  
  const [studyId, setStudyId] = useState(1);
  const [studyData, setStudyData] = useState({
    id: null,
    nickname: "",
    name: "",
    description: "",
    points: 0,
  });
  const [password, setPassword] = useState('');
  const [point, setPoint] = useState(0);

  // useEffect(()=>{
  //   //selectStudy(1); //임시로 넣었습니다 스터디 id 1 테스트용
  // }, []);

  const resetStudy = () => {
    //홈 page로 이동 시 스터디 정보 초기화
    setStudyId(-1);
    setStudyData({});
    setPassword('');
    setPoint(0);
  }

  // 스터디 선택 + 데이터 fetch
  const selectStudy = async (id) => {
    try {
      const result = await getStudy(id);
      setStudyId(id);
      localStorage.setItem('studyId', id);
      setStudyData(result);
      setPoint(result.points);
    } catch (err) {
      setStudyId(id);
      setStudyData(null); // 존재하지 않으면 null
      setPoint(-1);
      throw err;
    }
  };
  
  // 스터디 생성
  const createStudy = async (data) => {
    const newStudy = await apiCreateStudy(data);
    await selectStudy(newStudy.id);
    return newStudy;
  };

  // 스터디 수정
  const updateStudy = async (id, data) => {
    const updated = await apiUpdateStudy(id, data);
    if (id === id) setStudyData(updated);
    return updated;
  };

  // 스터디 삭제
  const deleteStudy = async (id) => {
    await apiDeleteStudy(id);
    if (id === id) {
      setStudyId(null);
      setStudyData(null);
    }
  };

  /* === 비밀번호 === */
  const checkPw = async(pw) => {    
    if(await checkStudyPw(studyId, pw)){
      setPassword(pw);
      return true;
    }
    return false;
  }

  /* === 포인트 === */
  const plusPoint = (amount) => {
    //patch api 구현.
    updatePoint(studyId, amount);
    setPoint(point + amount); 
    /*
    굳이 포인트 State를 따로 만들어준 이유는 
    서버 반영과 함께 화면 반영을 위해서
    */
  }

  return (
    <StudyContext.Provider
      value={{
        studyId,
        studyData,
        password,
        point,
        resetStudy,
        selectStudy,
        createStudy,
        updateStudy,
        deleteStudy, 
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  return useContext(StudyContext);
}
