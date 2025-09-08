import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { getStudy, createStudy, updateStudy, deleteStudy, checkStudyPw } from "../api/studyAPI";
import { updatePoint } from "../api/pointAPI";

const useStudy = create(
  devtools(
    persist(
      (set, get) => ({
        studyId: 1,
        studyData: {
            id: null,   
            nickname: "",
            name: "",
            description: "",
            points: 0,
        },
        password: '',
        point: -1,
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
            point: -1,
        }),
        selectStudy: async (id) => {
            const result = await getStudy(id);
            set({
                studyId: id,
                studyData: result,
                point: result.points,
            })
        },
        createStudy: async () => {
            const newStudy = await createStudy(data);
            set({
                studyId: id,
                studyData: newStudy,
                point: newStudy.points,
            })
            return newStudy;
        },
        updateStudy: async(id, data) => {
            const updated = await updateStudy(id, data);
            set({
                studyId: id,
                studyData: updated,
                point: updated.points,
            })
            return updated;
        },
        deleteStudy: (id) => {
            deleteStudy(id);
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
            set((state) => ({ point: state.point + amount }));
        }
      }),
      { name: 'study-storage' }
    )
  )
);

export default useStudy;