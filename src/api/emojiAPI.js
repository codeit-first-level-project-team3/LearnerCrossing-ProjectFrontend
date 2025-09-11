import api from "./example";

// GET emojis
export async function getStudyEmojis(id) {
  const result = api
    .get(`/studies/${id}/emojis`)
    .then((res) => {
      // 상태 코드 확인 (200~299 범위만 성공)
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `이모지를 불러오는데 실패했습니다. (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

// POST emoji
export async function addStudyEmoji(id, emoji) {
  const result = api
    .post(`/studies/${id}`, {
        unified: emoji,
    })
    .then((res) => {
      if (res.status < 200 || res.status >= 300) {
        throw new Error(
          `이모지를 추가하는 데 실패했습니다. (status: ${res.status})`
        );
      }
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}
