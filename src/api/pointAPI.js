import api from "./example";

export async function getPoint(studyId){
    const result = api.get(`/studies/${studyId}`)
        .then(res => {
            // 상태 코드 확인 (200~299 범위만 성공)
            if (res.status < 200 || res.status >= 300) {
                throw new Error(`습관들을 불러오는데 실패했습니다. (status: ${res.status})`);
            }
            return res.data.points;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}

export async function updatePoint(studyId, increase){
    const rqBody = {
        increment: increase
    }

    const result = api.patch(`/studies/${studyId}/points`, rqBody)
        .then(res => {
            if (res.status < 200 || res.status >= 300) {
                throw new Error(`포인트를 수정하는 데 실패했습니다. (status: ${res.status})`);
            }
            return res.data;
        })
        .catch(error => {
            console.error(error);
        });
    return result;
}