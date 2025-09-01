import TwoButtonModal from "../../molecules/TwoButtonModal";

function HabitAddModal({isOpen, onClose, onClick}) {
  // onClose : 취소 버튼 이벤트 핸들러 
  // onClick : 수정 완료 버튼 이벤트 핸들러
  return (
    <TwoButtonModal isOpen={isOpen} onClose={onClose} onClick={onclick} buttonText="수정 완료">
      {/* 여기에 습관 추가 창 작성하시면 됩니다! */}
    </TwoButtonModal>
  );
}

export default HabitAddModal;