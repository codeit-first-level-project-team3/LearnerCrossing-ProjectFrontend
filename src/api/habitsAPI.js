import api  from "./example";

// GET /studies/${id}/habits
export async function getHabitsList(id) {
  const res = await api.get(`/studies/${id}/habits`);
  // 상태 코드 확인 (200~299 범위만 성공)
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`습관들을 불러오는데 실패했습니다. (status: ${res.status})`);
  }
  return res.data;
}
