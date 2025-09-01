import React, { useState } from "react";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import { validateNickname, validateStudyName, validateDescription, validatePassword, validateConfirmPassword } from "../../hooks/validation.js";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import styles from "../../components/organisms/StudyForm/StudyForm.module.css";

export default function StudyCreate() {
  const [formData, setFormData] = useState({
    nickname: "",
    studyName: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [selectedBackground, setSelectedBackground] = useState(null);
  const backgrounds = Array(8).fill(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];

  const handleSubmit = (e) => {
    e.preventDefault();

    // 각 필드 검증
    const newErrors = {
      nickname: validateNickname(formData.nickname),
      studyName: validateStudyName(formData.studyName),
      description: validateDescription(formData.description),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    };
    setErrors(newErrors);

    // 에러 없으면 제출
    const hasError = Object.values(newErrors).some((err) => err);
    if (!hasError) {
      alert("스터디 생성 완료!");
      // axios 
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <GNB showCreateStudy={false} />
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>스터디 만들기</h1>
        <StudyForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          backgrounds={backgrounds}
          backgroundImages={backgroundImages}
          selectedBackground={selectedBackground}
          setSelectedBackground={setSelectedBackground}
          onSubmit={handleSubmit}
          submitText="만들기"
        />
      </div>
    </div>
  );
}
