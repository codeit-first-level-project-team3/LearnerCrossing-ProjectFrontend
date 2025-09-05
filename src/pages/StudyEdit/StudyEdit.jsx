import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import styles from "../StudyCreate/StudyCreate.module.css";
import { useAutoAsync } from "../../hooks/useAsync";

export default function StudyEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // useAutoAsync 훅 사용
  const fetchStudy = async (studyId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/studies/${studyId}`
    );
    return res.data;
  };

  const [loading, error, fetchStudyAsync] = useAutoAsync(fetchStudy);

  useEffect(() => {
    if (!id) return;

    const loadStudy = async () => {
      const study = await fetchStudyAsync(id);
      if (!study) return;

      const mappedBackground =
        imageMap[study.background] || study.background || bg1;

      setFormData({
        nickname: study.nickname || "",
        name: study.name || "",
        description: study.description || "",
        background: mappedBackground,
        password: "",
        confirmPassword: "",
      });
    };

    loadStudy();
  }, [id]);

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

      const apiUrl = `${import.meta.env.VITE_APP_API_URL}/studies/${id}`;
      const res = await axios.patch(apiUrl, payload);
      console.log("스터디 PATCH 응답:", res.data);

      alert("스터디 정보가 수정되었습니다!");
      navigate("/"); // 홈으로 이동
    } catch (err) {
      console.error("스터디 수정 오류:", err.response || err);
      alert(err.response?.data?.message || "수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error)
    return (
      <div>
        스터디 정보를 불러오는 중 오류가 발생했습니다.
        <pre>
          {JSON.stringify(error.response?.data || error.message, null, 2)}
        </pre>
      </div>
    );

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
    </div>
  );
}
