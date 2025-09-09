import { useEffect } from "react";

function useOutsideClick(refs, handler, state = true) {
  useEffect(() => {
    if (!state) return;

    function handleClickOutside(e) {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      );
      // 해당 컨텐츠가 아니라 다른 곳을 클릭하면 state(false)
      if (isOutside) {
        handler(); // handler에 ()=>setSatate(false) 넣기
      }
    }
    // click할때 handleClickOutside 호출
    document.addEventListener("mousedown", handleClickOutside);
    // 사이드 이펙트 정리
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler, state]);
}

export default useOutsideClick;
