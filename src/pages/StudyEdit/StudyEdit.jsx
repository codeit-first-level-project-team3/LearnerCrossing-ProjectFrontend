import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import { IMAGE_BACKGROUNDS, COLOR_BACKGROUNDS } from "../../constants/backgrounds";
import styles from "../StudyCreate/StudyCreate.module.css";
import useStudy from "../../contexts/StudyStorage";

export default function StudyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { studyData, selectStudy, updateStudy } = useStudy();

  const backgroundImages = IMAGE_BACKGROUNDS;
  const backgrounds = [...Object.keys(COLOR_BACKGROUNDS), ...Object.keys(IMAGE_BACKGROUNDS)];

  const [formData, setFormData] = useState({
    nickname: "",
    name: "",
    description: "",
    background: "BG1",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // ✅ 페이지 진입 시 스크롤 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!id) return;
    const loadStudy = async () => {
      setLoading(true);
      setError(null);
      try {
        await selectStudy(id);
      } catch (err) {
        setError("존재하지 않는 스터디입니다.");
      } finally {
        setLoading(false);
      }
    };
    loadStudy();
  }, [id, selectStudy]);

  useEffect(() => {
    if (!studyData) return;
    setFormData({
      nickname: studyData.nickname || "",
      name: studyData.name || "",
      description: studyData.description || "",
      background: studyData.background || "BG1",
      password: "",
      confirmPassword: "",
    });
  }, [studyData]);

  const handleSubmit = async (data) => {
    try {
      const payload = {
        nickname: data.nickname,
        name: data.name,
        description: data.description,
        background: data.background,
        password: data.password,
      };

      const updated = await updateStudy(id, payload);

      const stored = sessionStorage.getItem("recentStudies");
      let recent = stored ? JSON.parse(stored) : [];
      recent = recent.filter((s) => s.id !== updated.id);
      recent.unshift(updated);
      sessionStorage.setItem("recentStudies", JSON.stringify(recent));

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
                navigate(`/studyDetail/${id}`);
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
