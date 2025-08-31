import React, { useState } from "react";
import Input from "../../components/molecules/Input/Input"; 
import PasswordInput from "../../components/molecules/PasswordInput/PasswordInput";
import TextareaInput from "../../components/molecules/TextareaInput/TextareaInput";
import GNB from "../../components/organisms/GNB/GNB"; 
import SelectIcon from "../../assets/select.svg"; 
import styles from "./StudyCreate.module.css"; 
import TextButton from "../../components/molecules/TextButton/TextButton";

// 배경 이미지
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";


export default function StudyCreate() {
  const [nickname, setNickname] = useState("");
  const [studyName, setStudyName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedBackground, setSelectedBackground] = useState(null);

  const backgrounds = Array(8).fill(0);
  const backgroundImages = [bg1, bg2, bg3, bg4];

  return (
    <div className={styles.pageWrapper}>
      <GNB showCreateStudy={false} />

      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>스터디 만들기</h1>

        {/* 닉네임 Input */}
        <div className={styles.inputGroup}>
          <p className={styles.label}>닉네임</p>
          <Input
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* 스터디 이름 Input */}
        <div className={styles.inputGroup}>
          <p className={styles.label}>스터디 이름</p>
          <Input
            placeholder="스터디 이름을 입력해 주세요"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
          />
        </div>

        {/* 소개 TextareaInput */}
        <div className={styles.inputGroup}>
          <p className={styles.label}>소개</p>
          <TextareaInput
            placeholder="소개 멘트를 작성해 주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* 배경 선택 */}
        <div className={styles.sectionTitle}>배경을 선택해주세요</div>
        <div className={styles.backgroundGrid}>
          {backgrounds.map((_, idx) => (
            <div
              key={idx}
              className={styles.backgroundBox}
              onClick={() => setSelectedBackground(idx)}
              style={{
                background:
                  idx === 0
                    ? "#E1EDDE"
                    : idx === 1
                    ? "#FFF1CC"
                    : idx === 2
                    ? "#FDE0E9"
                    : idx === 3
                    ? "#E0F1F5"
                    : `url(${backgroundImages[idx - 4]}) center/cover no-repeat`,
              }}
            >
              {selectedBackground === idx && (
                <div className={styles.selectIconWrapper}>
                  <img
                    src={SelectIcon}
                    alt="선택됨"
                    className={styles.selectIcon}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 비밀번호 Input */}
        <div className={styles.inputGroup}>
          <p className={styles.label}>비밀번호</p>
          <PasswordInput
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 비밀번호 확인 Input */}
        <div className={styles.inputGroup}>
          <p className={styles.label}>비밀번호 확인</p>
          <PasswordInput
            placeholder="비밀번호를 다시 입력해 주세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* 만들기 버튼 */}
        <div className={styles.buttonWrapper}>
          <TextButton 
            text="만들기" 
            className={styles.createButton} 
            onClick={() => alert("스터디 만들기 클릭")} //테스트 용
          />
        </div>
      </div>
    </div>
  );
}
