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
            points: -1,
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
            })
        },
        createStudy: async () => {
            const newStudy = await createStudy(data);
            set({
                studyId: id,
                studyData: newStudy,
            })
            return newStudy;
        },
        updateStudy: async(id, data) => {
            const updated = await updateStudy(id, data);
            set({
                studyId: id,
                studyData: updated,
            })
            return updated;
        },
        deleteStudy: (id) => {
            deleteStudy(id);
            get().resetStudy();
        },
        checkPw: async(pw) => {
            const result = await checkStudyPw(get().studyId , pw);
            if(typeof result === 'string'){
                set({token: result}); //비밀번호 일치 시 토큰 반환
                return result;
            }
            return null;
        },
        checkToken: async(_token) => {
            return await checkStudyToken(get().studyId , _token);
        },
        plusPoint: (amount) => {
            updatePoint(get().studyId, amount);
            set((state) => ({ 
                studyData: {
                    ...(state.studyData),
                    points: state.studyData.points + amount 
                }
            }));
        }
      }),
      { name: 'study-storage' }
    )
  )
);

export default useStudy;