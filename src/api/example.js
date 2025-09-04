import axios from 'axios';

//예시 리퀘스트입니다. 
//api 리퀘스트 기술 스택은 "axois"를 사용합니다.
// axios.get('https://api.example.com/data')
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// 리스폰스 확인 겸 데이터 받아와보기 위해서 임시로 작성하는 api입니다!
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, //주소는 환경변수에서 가져옵니다
});

export default api; 