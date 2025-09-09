import { useState } from "react";

// async 자동 실행 로딩처리 훅
// (ex. 새 페이지로 넘어가면 데이터를 받아와서 새 페이지에 보여줘야한다)
export function useAutoAsync(asyncFunction) {
  const [pending, setPending] = useState(true); // 현재 loading 상태
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
// async 실행 로딩처리 훅
// 사용자가 행동을 했을때 api를 사용하는 경우
export function useActionAsync(asyncFunction) {
  const [pending, setPending] = useState(true); // 현재 loading 상태
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

//위 둘의 용도를 몰라서 따로 만든 Async;;
export function useAsync(asyncFunction) {
  const [isPending, setIsPending] = useState(true); // 현재 loading 상태
  const [error, setError] = useState(null); // 에러 상태

  const wrappedFunction = async (...args) => {
    setIsPending(true);
    setError(null);
    try {
      return await asyncFunction(...args);
    } catch (error) {
      setError(error);
    } finally {
      setIsPending(false);
    }
  };

  return [isPending, error, wrappedFunction];
}