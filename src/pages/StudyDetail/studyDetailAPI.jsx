// 데이터 타입을 확인하기 위해 받아오는 임시 api 입니다!

import api from "../../api/example";

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

export async function getHabitsList(id) {
  const res = await api.get(`/studies/${id}/habits`);
  // 상태 코드 확인 (200~299 범위만 성공)
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`습관들을 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  console.log(res.data);
  return res.data;
}