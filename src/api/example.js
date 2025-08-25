import axios from 'axios';

//예시 리퀘스트입니다. 
//api 리퀘스트 기술 스택은 "axois"를 사용합니다.
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

