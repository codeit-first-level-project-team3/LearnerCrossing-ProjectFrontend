import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import pageStyles from "./StudyCreate.module.css"; 
import { useStudy } from "../../contexts/StudyContext";

export default function StudyCreate() {
  const [formData, setFormData] = useState({
    nickname: "",
    name: "",
    background: "",
    password: "",
    description: "",
    confirmPassword: "", // 검증용, API 전송 X
  });

  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const backgrounds = Array(8).fill(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];
  const navigate = useNavigate();

  // Context에서 createStudy 함수 가져오기
  const { createStudy } = useStudy();

  // 제출 시 Context의 createStudy 사용
  const handleSubmit = async (data) => {
    try {
      const newStudy = await createStudy({
        nickname: data.nickname,
        name: data.name,
        background: data.background,
        password: data.password,
        description: data.description,
      });

      // 모달 알람 표시
      setAlertMessage("스터디 생성 완료!");
      setShowAlert(true);

    } catch (error) {
      console.error("스터디 생성 실패:", error);
      setAlertMessage("스터디 생성 중 오류가 발생했습니다.");
      setShowAlert(true);
    }
  };

  return (
    <div className={pageStyles.pageWrapper}>
      <GNB showCreateStudy={false} />
      <div className={pageStyles.contentWrapper}>
        <h1 className={pageStyles.pageTitle}>스터디 만들기</h1>
        <StudyForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          backgrounds={backgrounds}
          backgroundImages={backgroundImages}
          onSubmit={handleSubmit}
          submitText="만들기"
        />
      </div>

      {/* 커스텀 알람 모달 */}
      {showAlert && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "var(--white)",
            padding: "32px 24px",
            borderRadius: "16px",
            textAlign: "center",
            width: "320px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)"
          }}>
            <p style={{
              marginBottom: "24px",
              fontSize: "18px",
              color: "var(--black-414141)",
              fontFamily: "var(--font-family)"
            }}>
              {alertMessage}
            </p>
            <button
              onClick={() => {
                setShowAlert(false);
                // 새로 생성된 스터디 상세 페이지로 이동
                navigate(`/studies/${formData.name ? formData.name : ""}`);
              }}
              style={{
                fontFamily: "var(--font-family-jeju)",
                backgroundColor: "var(--brand-99C08E)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
