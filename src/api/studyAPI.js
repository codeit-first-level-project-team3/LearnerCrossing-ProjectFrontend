import api from "./example";

// GET studies 
export async function getStudyList(params = {}) {
  const res = await api.get('/studies', {
    params,
  });
  // 상태 코드 확인 (200~299 범위만 성공)
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디를 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.data;
}

// GET studies/{id}
export async function getStudy(id) {
  const res = await api.get(`/studies/${id}`);
  // 상태 코드 확인 (200~299 범위만 성공)
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`습관들을 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.data;
}
