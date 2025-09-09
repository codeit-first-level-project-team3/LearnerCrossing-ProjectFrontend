import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import styles from "../StudyCreate/StudyCreate.module.css";
import useStudy from "../../contexts/StudyStorage";

export default function StudyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { studyData, selectStudy, updateStudy } = useStudy();

  const backgroundImages = [bg1, bg2, bg3, bg4];
  const imageMap = {
    "/src/assets/backgrounds/bg1.svg": bg1,
    "/src/assets/backgrounds/bg2.svg": bg2,
    "/src/assets/backgrounds/bg3.svg": bg3,
    "/src/assets/backgrounds/bg4.svg": bg4,
  };

  const [formData, setFormData] = useState({
    nickname: "",
    name: "",
    description: "",
    background: bg1,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const backgrounds = Array(8).fill(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 알람 모달 관련 상태
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // 스터디 데이터 로드
  useEffect(() => {
    if (!id) return;
    const loadStudy = async () => {
      setLoading(true);
      setError(null);
      try {
        await selectStudy(id); // 최신 데이터 불러오기
      } catch (err) {
        setError("존재하지 않는 스터디입니다.");
      } finally {
        setLoading(false);
      }
    };
    loadStudy();
  }, [id, selectStudy]);

  // 스터디 데이터를 폼 데이터로 매핑
  useEffect(() => {
    if (!studyData) return;
    const mappedBackground = imageMap[studyData.background] || studyData.background || bg1;
    setFormData({
      nickname: studyData.nickname || "",
      name: studyData.name || "",
      description: studyData.description || "",
      background: mappedBackground,
      password: "",
      confirmPassword: "",
    });
  }, [studyData]);

  // 제출 처리
  const handleSubmit = async (data) => {
    try {
      const backgroundForServer =
        Object.keys(imageMap).find(
          (key) => imageMap[key] === data.background
        ) || data.background;

      const payload = {
        nickname: data.nickname,
        name: data.name,
        description: data.description,
        background: backgroundForServer,
        password: data.password,
      };

      await updateStudy(id, payload); // 수정 API 호출

      // 알람 모달 표시
      setAlertMessage("스터디 정보가 수정되었습니다!");
      setShowAlert(true);

    } catch (err) {
      console.error("스터디 수정 오류:", err);
      setAlertMessage(err.message || "수정 중 오류가 발생했습니다.");
      setShowAlert(true);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.pageWrapper}>
      <GNB showCreateStudy={false} />
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>스터디 수정</h1>
        <StudyForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          backgrounds={backgrounds}
          backgroundImages={backgroundImages}
          onSubmit={handleSubmit}
          submitText="수정하기"
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
                navigate(`/studyDetail/${id}`); // 수정 후 Detail 페이지로 이동
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
