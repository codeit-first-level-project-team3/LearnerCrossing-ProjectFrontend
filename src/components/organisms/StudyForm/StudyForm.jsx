import React, { useState } from "react";
import LabeledInput from "../../molecules/LabeledInput/LabeledInput"; 
import LabeledPasswordInput from "../../molecules/LabeledPasswordInput/LabeledPasswordInput";
import LabeledTextareaInput from "../../molecules/LabeledTextareaInput/LabeledTextareaInput";
import TextButton from "../../molecules/TextButton/TextButton";
import styles from "./StudyForm.module.css";
import selectIcon from "../../../assets/select.svg";

import {
  validateNickname,
  validateStudyName,
  validateDescription,
  validatePassword,
  validateConfirmPassword,
} from "../../../hooks/validation";

export default function StudyForm({
  onSubmit,
  formData,
  setFormData,
  errors,
  setErrors,
  backgrounds,
  backgroundImages,
  submitText,
}) {
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    let errorMsg = "";
    switch (field) {
      case "nickname":
        errorMsg = validateNickname(value);
        break;
      case "name":
        errorMsg = validateStudyName(value);
        break;
      case "description":
        errorMsg = validateDescription(value);
        break;
      case "password":
        errorMsg = validatePassword(value);
        setErrors((prev) => ({
          ...prev,
          confirmPassword: validateConfirmPassword(formData.confirmPassword, value),
        }));
        break;
      case "confirmPassword":
        errorMsg = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const newErrors = {
      nickname: validateNickname(formData.nickname),
      name: validateStudyName(formData.name),
      description: validateDescription(formData.description),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
      background: !formData.background ? "*배경을 선택해 주세요." : "",
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((err) => err);
    if (!hasError && onSubmit) {
      onSubmit(formData);
      setSubmitted(false);
    }
  };

  const getBackgroundValue = (idx) => {
    return idx === 0
      ? "#E1EDDE"
      : idx === 1
      ? "#FFF1CC"
      : idx === 2
      ? "#FDE0E9"
      : idx === 3
      ? "#E0F1F5"
      : backgroundImages[idx - 4];
  };

  return (
    <form id="studyForm" onSubmit={handleSubmit}>
      {/* 닉네임 */}
      <div className={styles.inputGroup}>
        <LabeledInput
          labelText="닉네임"
          id="nickname"
          name="nickname"
          placeholder="닉네임을 입력해 주세요"
          errorId="nicknameError"
          errorMessage={errors.nickname}
          value={formData.nickname}
          onChange={(e) => handleChange("nickname", e.target.value)}
          onFocus={() =>
            setErrors((prev) => ({ ...prev, nickname: validateNickname(formData.nickname) }))
          }
        />
      </div>

      {/* 스터디 이름 */}
      <div className={styles.inputGroup}>
        <LabeledInput
          labelText="스터디 이름"
          id="name"
          name="name"
          placeholder="스터디 이름을 입력해 주세요"
          errorId="nameError"
          errorMessage={errors.name}
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onFocus={() =>
            setErrors((prev) => ({ ...prev, name: validateStudyName(formData.name) }))
          }
        />
      </div>

      {/* 소개 */}
      <div className={styles.inputGroup}>
        <LabeledTextareaInput
          labelText="소개"
          id="description"
          name="description"
          placeholder="소개 멘트를 작성해 주세요"
          errorId="descriptionError"
          errorMessage={errors.description}
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          onFocus={() =>
            setErrors((prev) => ({ ...prev, description: validateDescription(formData.description) }))
          }
        />
      </div>

      {/* 배경 선택 */}
      <div className={styles.sectionTitle}>배경을 선택해 주세요</div>
      {submitted && !formData.background && (
        <div className={styles.errorText} style={{ color: "red" }}>
          *배경을 선택해 주세요.
        </div>
      )}
      <div className={styles.backgroundGrid}>
        {backgrounds.map((_, idx) => {
          const bgValue = getBackgroundValue(idx);
          const isSelected = formData.background === bgValue;
          return (
            <div
              key={idx}
              className={`${styles.backgroundBox} ${
                submitted && !formData.background && !isSelected ? styles.errorBorder : ""
              }`}
              onClick={() => setFormData({ ...formData, background: bgValue })}
              style={{
                background:
                  idx < 4 ? bgValue : `url(${bgValue}) center/cover no-repeat`,
              }}
            >
              {isSelected && (
                <div className={styles.selectIconWrapper}>
                  <img src={selectIcon} alt="선택됨" className={styles.selectIcon} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 비밀번호 */}
      <div className={styles.inputGroup}>
        <LabeledPasswordInput
          labelText="비밀번호"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          errorId="passwordError"
          errorMessage={errors.password}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onFocus={() =>
            setErrors((prev) => ({ ...prev, password: validatePassword(formData.password) }))
          }
        />
      </div>

      {/* 비밀번호 확인 */}
      <div className={styles.inputGroup}>
        <LabeledPasswordInput
          labelText="비밀번호 확인"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력해 주세요"
          errorId="confirmPasswordError"
          errorMessage={errors.confirmPassword}
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          onFocus={() =>
            setErrors((prev) => ({
              ...prev,
              confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
            }))
          }
        />
      </div>

      {/* 버튼 */}
      <div className={styles.buttonWrapper}>
        <TextButton text={submitText} className={styles.createButton} type="submit" />
      </div>
    </form>
  );
}
