import { useState } from "react";

export function useUserPoint(){
  const getUserPoint = () => {
    /* DB에서 유저 포인트 받아오기 */
    //get api 구현.
    return 340
  }

  const [point, setPoint] = useState(getUserPoint());

  const plusPoint = (amount) => {
    //patch api 구현.
    setPoint(point + amount);
  }

  return [point, plusPoint];
}