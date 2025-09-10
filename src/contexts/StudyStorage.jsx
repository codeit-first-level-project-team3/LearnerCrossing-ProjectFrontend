import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { getStudy, createStudy, updateStudy, deleteStudy, checkStudyPw, checkStudyToken } from "../api/studyAPI";
import { updatePoint } from "../api/pointAPI";

const useStudy = create(
  devtools(
    persist(
      (set, get) => ({
        studyId: -1,
        studyData: {
          id: null,   
          nickname: "",
          name: "",
          description: "",
          points: 0,
        },
        password: '',
        token: '',
        resetStudy: () => set({
            studyId: -1,
            studyData: {
                id: null,
                nickname: "",
                name: "",
                description: "",
                points: 0,
            },
            password: '',
            token: '',
        }),
        selectStudy: async (id) => {
          const result = await getStudy(id);
          set({
            studyId: id,
            studyData: result,
          });
        },
        createStudy: async (data) => {
          const newStudy = await createStudy(data); // API 호출
          set({
            studyId: newStudy.id,
            studyData: newStudy,
          });
          return newStudy; // 생성된 스터디 반환
        },
        updateStudy: async (id, data) => {
          const updated = await updateStudy(id, data);
          set({
            studyId: id,
            studyData: updated,
          });
          return updated;
        },
        deleteStudy: async (id) => {
            const _token = get().token;
            await deleteStudy(id, _token);
            get().resetStudy();
        },
        /* 비밀번호 버전 */
        // checkPw: async(pw) => {
        //     const result = await checkStudyPw(get().studyId , pw);
        //     if(result){
        //         set({password: pw}); //비밀번호 일치 시 토큰 반환
        //         return true;
        //     }
        //     return false;
        // },
        /* 토큰 버전 */
        checkPw: async(pw) => {
            const result = await checkStudyPw(get().studyId , pw);
            console.log("결과: " + result);
            if(result){
                set({token: result.token}); //비밀번호 일치 시 토큰 설정
                return true;
            }
            return false;
        },
        checkToken: async(_token = get().token) => {
          return await checkStudyToken(get().studyId , _token);
        },
        plusPoint: (amount) => {
          updatePoint(get().studyId, amount);
          set((state) => ({ 
            studyData: {
              ...state.studyData,
              points: state.studyData.points + amount,
            }
          }));
        }
      }),
      { name: 'study-storage' }
    )
  )
);

export default useStudy;