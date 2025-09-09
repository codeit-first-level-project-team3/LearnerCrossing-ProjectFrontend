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

/* 비밀번호 방식 */

// POST
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
// PATCH
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
// DELETE
export async function deleteHabit(studyId, habitId, pw){
    const config = {data: { password: pw} };
    const result = api.delete(`/studies/${studyId}/habits/${habitId}`, config) 
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

/* 토큰 방식 */
// // POST
// export async function createHabit(studyId, data, token){
//     const config = { headers: { Authorization: `Bearer ${token}` } };

//     const result = api.post(`/studies/${studyId}/habits`, data, config)
//         .then(res => {
//             if (res.status < 200 || res.status >= 300) {
//                 throw new Error(`습관을 추가하는 데 실패했습니다. (status: ${res.status})`);
//             }
//             return res.data;
//         })
//         .catch(error => {
//             console.error(error);
//         });
//     return result;
// }
// // PATCH
// export async function updateHabit(studyId, habitId, data, token){
//     const config = { headers: { Authorization: `Bearer ${token}` } };
    
//     const result = api.patch(`/studies/${studyId}/habits/${habitId}`, data, config)
//         .then(res => {
//             if (res.status < 200 || res.status >= 300) {
//                 throw new Error(`습관을 수정하는 데 실패했습니다. (status: ${res.status})`);
//             }
//             return res.data;
//         })
//         .catch(error => {
//             console.error(error);
//         });
//     return result;
// }
// // DELETE
// export async function deleteHabit(studyId, habitId, token){
//     const config = { headers: { Authorization: `Bearer ${token}` } };

//     const result = api.delete(`/studies/${studyId}/habits/${habitId}`, config) 
//         .then(res => {
//             if (res.status < 200 || res.status >= 300) {
//                 throw new Error(`습관을 삭제하는 데 실패했습니다. (status: ${res.status})`);
//             }
//             return res.data;
//         })
//         .catch(error => {
//             console.error(error);
//         });
//     return result;
// }

// export async function getLastSaveDate(studyId){
//     const result = api.get(`/studies/${studyId}/habits`)
//         .then(res => {
//             return res.data;
//         })
//         .catch(error => {
//             console.error(error);
//         });

//     return Array.isArray(result)
//         ? Math.min(...result.map(e=>new Date(e.updatedAt))) //ISO 8601 형식의 문자열을 Date로 변환 후 가장 오래된 것 반환
//         : result //에러 메세지
// }