import React from "react";
import styles from "./Card.module.css";
import dpIcon from "../../../../src/assets/point_icon.svg";
import { IMAGE_BACKGROUNDS, COLOR_BACKGROUNDS } from "../../../../src/constants/backgrounds";

export default function Card({ studies = [], onClick }) {
  const calculateDays = (createdAt) => {
    const start = new Date(createdAt);
    const today = new Date();
    return Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const formatText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

  return (
    <div className={styles.grid}>
      {studies.map((study) => {
        const { id, nickname, name, description, background, points, emojis = [], createdAt } = study;

        const isColorBg = COLOR_BACKGROUNDS[background] !== undefined;
        const bgStyle = isColorBg
          ? { backgroundColor: COLOR_BACKGROUNDS[background] }
          : { backgroundImage: `url(${IMAGE_BACKGROUNDS[background]})`, backgroundSize: "cover", backgroundPosition: "center" };

        const cardClass = `${styles.card} ${!isColorBg ? styles.whiteText : ""}`;

        const nicknameColor = isColorBg
          ? background === "GREEN"
            ? "#578246"
            : background === "YELLOW"
            ? "#C18E1B"
            : background === "PINK"
            ? "#BC3C6A"
            : background === "BLUE"
            ? "#418099"
            : undefined
          : undefined;

        return (
          <div key={id} className={cardClass} style={bgStyle} onClick={onClick}>
            <div className={styles.header}>
              <div className={styles.userInfo}>
                <span className={styles.nickname} style={{ color: nicknameColor }}>
                  {formatText(nickname, 6)}
                </span>
                <span className={styles.separator}>의</span>
                <span className={styles.name}>{formatText(name, 6)}</span>
              </div>
              <div className={styles.points}>
                <div className={styles.pointsRow}>
                  <img src={dpIcon} alt="Points" className={styles.dpIcon} />
                  <span>{points}P 획득</span>
                </div>
              </div>
            </div>
            <div className={styles.studyName}>{calculateDays(createdAt)}일째 진행 중</div>
            <div className={styles.description}>{formatText(description, 20)}</div>
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
