import React from "react";
import styles from "./Card.module.css";
import dpIcon from "../../../../src/assets/point_icon.svg";

export default function Card({ studies = [], onClick }) {
  // 생성일로부터 진행일 계산
  const calculateDays = (createdAt) => {
    const start = new Date(createdAt);
    const today = new Date();
    return Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  // 글자 길이 제한
  const formatText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  return (
    <div className={styles.grid}>
      {studies.map((study) => {
        const {
          id,
          nickname,
          name,
          description,
          background,
          points,
          emojis = [],
          createdAt,
        } = study;

        const isColorBg = background?.startsWith("#");
        const bgStyle = isColorBg
          ? { backgroundColor: background }
          : {
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            };

        const cardClass = `${styles.card} ${!isColorBg ? styles.whiteText : ""}`;

        const nicknameColor = isColorBg
          ? background === "#E1EDDE"
            ? "#578246"
            : background === "#FFF1CC"
            ? "#C18E1B"
            : background === "#FDE0E9"
            ? "#BC3C6A"
            : background === "#E0F1F5"
            ? "#418099"
            : undefined
          : undefined;

        return (
          <div key={id} className={cardClass} style={bgStyle} onClick={onClick}>
            {/* 헤더 */}
            <div className={styles.header}>
              <div className={styles.userInfo}>
                <span className={styles.nickname} style={{ color: nicknameColor }}>
                  {formatText(nickname, 3)}
                </span>
                <span className={styles.separator}>의</span>
                <span className={styles.name}>{formatText(name, 3)}</span>
              </div>

              {/* 포인트: 가로 배치 */}
              <div className={styles.points}>
                <div className={styles.pointsRow}>
                  <img src={dpIcon} alt="Points" className={styles.dpIcon} />
                  <span>{points}P 획득</span>
                </div>
              </div>
            </div>

            {/* 진행일 */}
            <div className={styles.studyName}>{calculateDays(createdAt)}일째 진행 중</div>

            {/* description 최대 20자 */}
            <div className={styles.description}>{formatText(description, 20)}</div>

            {/* 이모지 */}
            <div className={styles.tagList}>
              {emojis.slice(0, 3).map((e, idx) => (
                <div key={idx} className={styles.tag}>
                  <span className={styles.tagEmoji}>{e.emoji}</span>
                  <span className={styles.tagNumber}>{e.count}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
