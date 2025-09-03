import React, { useState, useEffect } from "react";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import styles from "../StudyCreate/StudyCreate.module.css";

export default function StudyEdit() {
  // 하드코딩된 기존 스터디 정보
  const existingStudyData = {
    nickname: "하드 코딩 테스트",
    name: "React 스터디",
    background: "#E1EDDE", 
    password: "",
    description: "React와 관련된 공부를 함께하는 스터디입니다.",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(existingStudyData);
  const [errors, setErrors] = useState({});
  const backgrounds = Array(8).fill(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];

  const handleSubmit = (data) => {
    // 서버 없이 콘솔 출력으로 확인
    alert("스터디 정보가 수정되었습니다!");
    console.log("수정된 스터디 데이터:", data);
  };

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
