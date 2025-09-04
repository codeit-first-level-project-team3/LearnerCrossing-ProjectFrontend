import api from "./example";

// GET /studies/${id}/habits
export async function getHabitList(studyId){
    const result = api.get(`/studies/${studyId}/habits`)
        .then(res => {
            // 상태 코드 확인 (200~299 범위만 성공)
            if (res.status < 200 || res.status >= 300) {
                throw new Error(`습관들을 불러오는데 실패했습니다. (status: ${res.status})`);
            }
            return res.data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}

export async function createHabit(studyId, data){
    const result = api.post(`/studies/${studyId}/habits`, data)
        .then(res => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(`습관을 추가하는 데 실패했습니다. (status: ${res.status})`);
            }
            return res.data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}

export async function updateHabit(studyId, habitId, data){
    const result = api.patch(`/studies/${studyId}/habits/${habitId}`, data)
        .then(res => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(`습관을 수정하는 데 실패했습니다. (status: ${res.status})`);
            }
            return res.data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}

export async function deleteHabit(studyId, habitId, data){
    /* 
    delete는 일반적으로 (url, config) 형태기 때문에
    data (body)를 config 안에 넣어주어야 합니다.
    */
    const result = api.delete(`/studies/${studyId}/habits/${habitId}`, {data}) 
        .then(res => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(`습관을 삭제하는 데 실패했습니다. (status: ${res.status})`);
            }
            return res.data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}