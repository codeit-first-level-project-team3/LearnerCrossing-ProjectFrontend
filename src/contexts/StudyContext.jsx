import { createContext, useState, useContext } from "react";
import { getStudy, createStudy as apiCreateStudy, updateStudy as apiUpdateStudy, deleteStudy as apiDeleteStudy } from "../api/studyAPI";

const StudyContext = createContext();

export function StudyProvider({ children }) {
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [studyData, setStudyData] = useState(null);

  // 스터디 선택 + 데이터 fetch
  const selectStudy = async (id) => {
    try {
      const result = await getStudy(id);
      setSelectedStudyId(id);
      setStudyData(result);
    } catch (err) {
      setSelectedStudyId(id);
      setStudyData(null); // 존재하지 않으면 null
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
    if (id === selectedStudyId) setStudyData(updated);
    return updated;
  };

  // 스터디 삭제
  const deleteStudy = async (id) => {
    await apiDeleteStudy(id);
    if (id === selectedStudyId) {
      setSelectedStudyId(null);
      setStudyData(null);
    }
  };

  return (
    <StudyContext.Provider
      value={{
        selectedStudyId,
        studyData,
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
