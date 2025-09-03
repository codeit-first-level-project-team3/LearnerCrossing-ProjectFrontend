import { useState } from "react";

// async 자동 실행 훅. (ex. 새 페이지로 넘어가면 데이터를 받아와서 새 페이지에 보여줘야한다)
function useAutoAsync(asyncFunction) {
  const [pending, setPending] = useState(true); // 현재 async 상태
  const [error, setError] = useState(null); // 에러 상태

  const wrappedFunction = async (...args) => {
    setPending(true);
    setError(null);
    try {
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
    } finally {
      setPending(false);
    }
  };

  return [pending, error, wrappedFunction];
}

export default useAutoAsync;