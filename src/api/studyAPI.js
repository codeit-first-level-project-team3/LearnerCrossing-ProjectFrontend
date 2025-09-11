import useStudy from "../contexts/StudyStorage";
import api from "./example"; 

// GET /studies
export async function getStudyList(params = {}) {
  const result = await api
    .get("/studies", { params })
    .then((res) => {
      // 상태 코드 확인 (200~299 범위만 성공)
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디 목록 조회 실패 (status: ${res.status})`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return result;
}

// 특정 스터디를 가져옵니다 (GET /studies/:id)
export async function getStudy(id) {
  const result = await api
    .get(`/studies/${id}`)
    .then((res) => {
      // 상태 코드 확인 (200~299 범위만 성공)
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디 조회 실패 (status: ${res.status})`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return result;
}

// 새 스터디를 생성합니다 (POST /studies)
export async function createStudy(data) {
  const result = await api
    .post("/studies", data)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디 생성 실패 (status: ${res.status})`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return result;
}

// 스터디 정보를 수정합니다 (PATCH /studies/:id)
export async function updateStudy(id, data, token) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const result = await api
    .patch(`/studies/${id}`, data, config)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디 수정 실패 (status: ${res.status})`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return result;
}

// DELETE /studies/:id
export async function deleteStudy(id, token) {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  const result = await api
    .delete(`/studies/${id}`, config)
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`스터디를 삭제하는 데 실패했습니다. (status: ${res.status})`);
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return result;
}

/* 비밀번호 버전 */
// export async function checkStudyPw(id, pw) {
//   const getRes = await getStudy(id);

//   const RqBody = {
//     nickName: getRes.nickName,
//     name: getRes.name,
//     description: getRes.description,
//     background: getRes.background,
//     password: pw.toString()
//   }

//   // patch 리퀘스트를 한번 보내서 통과하는 지 검사. (비밀번호 검사 api를 백엔드에 따로 만드는 게 더 귀찮아요 ㅜ)
//   const result = await api.patch(`/studies/${id}`, RqBody)
//     .then((res) => { return res.data })
//     .catch((error) => { console.error(error); return null });
//   return result;
// }

/* 토큰 버전, 토큰 받아오기 */
export async function checkStudyPw(id, pw) {
  const body = { studyId: id, password: pw };
  const result = await api
    .post("/auth", body)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return null;
    });
  return result;
}

// 토큰 검증용
export async function checkStudyToken(id, token) {
  const getRes = await getStudy(id);
  if (!getRes) return false;

  const RqBody = {
    nickName: getRes.nickName,
    name: getRes.name,
    description: getRes.description,
    background: getRes.background,
  };

  const config = { headers: { Authorization: `Bearer ${token}` } };






  // Pactch 리퀘스트를 한번 보내서 통과하는지 검사. (비밀번호 검사 api를 백엔드에 따로 만드는 게 더 귀찮아요 ㅜ)

  const result = await api
    .patch(`/studies/${id}`, RqBody, config)
    .then((res) => res.status >= 200 && res.status < 300)
    .catch((error) => {
      console.error(error);
      return false;
    });

  console.log("토큰 결과: " + (result ? "통과" : "실패"));
  return result;
}
