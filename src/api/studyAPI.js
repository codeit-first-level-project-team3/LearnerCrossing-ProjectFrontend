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
          `스터디를 불러오는데 실패했습니다. (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

// GET studies/{id}
export async function getStudy(id) {
  const result = api
    .get(`/studies/${id}`)
    .then((res) => {
      // 상태 코드 확인 (200~299 범위만 성공)
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `습관들을 불러오는데 실패했습니다. (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}
// POST
export async function createStudy(data) {
  const result = api
    .post(`/studies/${id}`, data)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `스터디를 생성하는 데 실패했습니다. (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}
// PATCH
export async function updateStudy(data) {
  const result = api.patch(`/studies/${id}`, data)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디를 수정하는 데 실패했습니다. (status: ${res.status})`);
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