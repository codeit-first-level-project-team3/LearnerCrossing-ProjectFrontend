import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, //주소는 환경변수에서 가져옵니다
});

export default api; 