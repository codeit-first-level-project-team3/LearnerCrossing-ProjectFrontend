import React, { useState } from "react";
import StudyForm from "../../components/organisms/StudyForm/StudyForm";
import GNB from "../../components/organisms/GNB/GNB";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import styles from "../../components/organisms/StudyForm/StudyForm.module.css";

export default function StudyCreate() {
const [formData, setFormData] = useState({
  nickname: "",
  name: "",
  background: "",
  password: "",
  description: "",
  confirmPassword: "", // 검증용
});

  const [errors, setErrors] = useState({});
  const backgrounds = Array(8).fill(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];

  const handleSubmit = (data) => {
    // StudyForm에서 검증 후 onSubmit으로 넘어온 데이터(data) 사용
    alert("스터디 생성 완료!");
    console.log(data);
    // axios 등으로 서버 전송
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
          onSubmit={handleSubmit}
          submitText="만들기"
        />
      </div>
    </div>
  );
}
