import { useState } from "react";

export function usePassword(){
  const [password, setPassword] = useState('');

  const checkPw = (pw) => {
    //patch api 구현.
    setPassword('');
  }

  return [password, checkPw];
}