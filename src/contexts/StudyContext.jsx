import { createContext, useState } from "react";
import { getStudy } from "../api/studiesAPI";

const StudyContext = createContext();

// 스터디/id Context
export function StudyProvider({ children }) {
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [studyData, setStudyData] = useState(null);

  // 스터디 선택
  const selectStudy = async (id) => {
    setSelectedStudyId(id);
    // 해당 스터디 가져오는 api 함수
    const result = await getStudy(id);
    setStudyData(result); // 받아온 데이터 stydyData 로 관리
  };

  return (
    <StudyContext.Provider value={{ selectedStudyId, studyData, selectStudy }}>
      {children}
    </StudyContext.Provider>
  );
}

// 훅으로 꺼내쓰기
export function useStudy() {
  return useContext(StudyContext);
  // import { useStudy } from ...
  // const { studyData } = useStudy(); 
  // useStudy로 데이터 받아와서 사용 < 일부 데이터만 필요한 경우들을 위해 이 훅도 더 상세히 하기..?
}
