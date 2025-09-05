import { useEffect, useState } from "react";
import { getPoint, updatePoint } from '../api/pointAPI.js'

export function useUserPoint(){
  const [point, setPoint] = useState(0);

  useEffect(()=>{
    const handleLoadPoint = async() => {
      setPoint(await getPoint(1));
    }
    handleLoadPoint();
  }, []);

  const plusPoint = (amount) => {
    //patch api 구현.
    updatePoint(1, amount)
    setPoint(point + amount);
  }

  return [point, plusPoint];
}