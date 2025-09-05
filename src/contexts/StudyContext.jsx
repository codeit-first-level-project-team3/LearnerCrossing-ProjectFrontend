import { createContext, useState, useContext } from "react";
import { getStudy, createStudy, updateStudy, deleteStudy } from "../api/studyAPI";

// 선택된 스터디를 전역에서 관리하는 Context
const StudyContext = createContext();

export function StudyProvider({ children }) {
  // 선택된 스터디 ID와 데이터
  const [selectedStudyId, setSelectedStudyId] = useState(null);
  const [studyData, setStudyData] = useState(null);

  // 스터디를 선택하고 데이터를 가져옵니다 (GET)
  const selectStudy = async (id) => {
    const result = await getStudy(id);
    setSelectedStudyId(id);
    setStudyData(result);
  };

  // 현재 선택된 스터디를 다시 불러옵니다 (GET)
  const refreshStudy = async () => {
    if (!selectedStudyId) return;
    return selectStudy(selectedStudyId);
  };

  // 선택된 스터디를 초기화합니다
  const clearStudy = () => {
    setSelectedStudyId(null);
    setStudyData(null);
  };

  // 새 스터디를 생성하고 선택된 스터디로 설정합니다 (POST)
  const handleCreateStudy = async (data) => {
    const newStudy = await createStudy(data);
    await selectStudy(newStudy.id);
    return newStudy;
  };

  // 선택된 스터디를 수정하고 Context를 업데이트합니다 (PATCH)
  const handleUpdateStudy = async (id, data) => {
    const updated = await updateStudy(id, data);
    if (id === selectedStudyId) {
      setStudyData(updated);
    }
    return updated;
  };

  // 스터디를 삭제하고, 삭제된 스터디가 선택된 경우 Context를 초기화합니다 (DELETE)
  const handleDeleteStudy = async (id, data) => {
    await deleteStudy(id, data);
    if (id === selectedStudyId) {
      clearStudy();
    }
  };

  return (
    <StudyContext.Provider
      value={{
        selectedStudyId,           // 현재 선택된 스터디 ID
        studyData,                 // 선택된 스터디 데이터
        selectStudy,               // 스터디 선택
        refreshStudy,              // 선택된 스터디 재조회
        clearStudy,                // 선택된 스터디 초기화
        createStudy: handleCreateStudy, // 스터디 생성
        updateStudy: handleUpdateStudy, // 스터디 수정
        deleteStudy: handleDeleteStudy, // 스터디 삭제
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

// Context 사용을 위한 훅
export function useStudy() {
  return useContext(StudyContext);
}
