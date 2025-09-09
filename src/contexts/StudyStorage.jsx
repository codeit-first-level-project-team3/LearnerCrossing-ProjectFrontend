import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { getStudy, createStudy, updateStudy, deleteStudy, checkStudyPw } from "../api/studyAPI";
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
        deleteStudy: async (id, password) => {
            await deleteStudy(id, password);
            get().resetStudy();
        },
        checkPw: async(pw) => {
            if(await checkStudyPw(get().studyId , pw)){
                set({password: pw});
                return true;
            }
            return false;
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