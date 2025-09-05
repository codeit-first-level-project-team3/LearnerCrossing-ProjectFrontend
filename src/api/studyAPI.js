import api from "./example"; 

// 스터디 목록을 가져옵니다 (GET /studies)
export async function getStudyList(params = {}) {
  const res = await api.get("/studies", { params });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디 목록 조회 실패 (status: ${res.status})`);
  }
  return res.data;
}

// 특정 스터디를 가져옵니다 (GET /studies/:id)
export async function getStudy(id) {
  const res = await api.get(`/studies/${id}`);
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디 조회 실패 (status: ${res.status})`);
  }
  return res.data;
}

// 새 스터디를 생성합니다 (POST /studies)
export async function createStudy(data) {
  const res = await api.post("/studies", data);
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디 생성 실패 (status: ${res.status})`);
  }
  return res.data;
}

// 스터디 정보를 수정합니다 (PATCH /studies/:id)
export async function updateStudy(id, data) {
  const res = await api.patch(`/studies/${id}`, data);
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디 수정 실패 (status: ${res.status})`);
  }
  return res.data;
}

// 스터디를 삭제합니다 (DELETE /studies/:id)
export async function deleteStudy(id, data = {}) {
  const res = await api.delete(`/studies/${id}`, { data });
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디 삭제 실패 (status: ${res.status})`);
  }
  return res.data;
}

// 특정 스터디의 이모지를 가져옵니다 (GET /studies/:studyId/emojis)
export async function getStudyEmojis(studyId) {
  const res = await api.get(`/studies/${studyId}/emojis`);
  if (res.status < 200 || res.status >= 300) {
    throw new Error(`스터디 이모지 조회 실패 (status: ${res.status})`);
  }
  return res.data;
}
