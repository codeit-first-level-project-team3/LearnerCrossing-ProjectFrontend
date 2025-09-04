import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import pageStyles from "./StudyCreate.module.css"; 

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
  const backgrounds = Array(8).fill(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/studies`,
        {
          nickname: data.nickname,
          name: data.name,
          background: data.background,
          password: data.password,
          description: data.description,
        }
      );

      console.log("스터디 생성 응답:", response.data);
      alert("스터디 생성 완료!");

      // 나중에 StudyDetail 페이지 구조 변경 시, 이동 경로 및 파라미터 처리 수정 필요
      navigate(`/studies/${response.data.id}`);

    } catch (error) {
      console.error("스터디 생성 실패:", error);

      if (error.response) {
        alert(error.response.data.message || "스터디 생성 중 오류가 발생했습니다.");
      } else {
        alert("서버에 연결할 수 없습니다.");
      }
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
    </div>
  );
}
