import api from "./example"; 

// GET studies
export async function getStudyList(params = {}) {
  const result = api
    .get("/studies", {
      params,
    })
    .then((res) => {
      // 상태 코드 확인 (200~299 범위만 성공)
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `스터디 목록 조회 실패 (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

// 특정 스터디를 가져옵니다 (GET /studies/:id)
export async function getStudy(id) {
  const result = api
    .get(`/studies/${id}`)
    .then((res) => {
      // 상태 코드 확인 (200~299 범위만 성공)
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `스터디 조회 실패 (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

// 새 스터디를 생성합니다 (POST /studies)
export async function createStudy(data) {
  const result = api
    .post("/studies", data)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `스터디 생성 실패 (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

// 스터디 정보를 수정합니다 (PATCH /studies/:id)
export async function updateStudy(id, data) {
  const result = api.patch(`/studies/${id}`, data)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디 수정 실패 (status: ${res.status})`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
}

// DELETE
export async function deleteStudy(id, pwd) {
  const result = api
    .delete(`/studies/${id}`, {
      data: {
        password: pwd,
      },
    })
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `스터디를 삭제하는 데 실패했습니다. (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}