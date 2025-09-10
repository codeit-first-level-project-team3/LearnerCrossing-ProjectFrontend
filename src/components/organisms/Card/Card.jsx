import React from "react";
import styles from "./Card.module.css";
import dpIcon from "../../../../src/assets/point_icon.svg"; 

export default function Card({ studies = [], onClick }) { 
  const calculateDays = (createdAt) => {
    const start = new Date(createdAt);
    const today = new Date();
    const diffTime = today - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // nickname, name 글자 제한
  const formatNickname = (nickname) =>
    nickname.length >= 5 ? nickname.slice(0, 3) + "…" : nickname;

  const formatName = (name) =>
    name.length >= 3 ? name.slice(0, 3) + "…" : name;

  // description 20자 제한
  const formatDescription = (desc) =>
    desc.length > 20 ? desc.slice(0, 20) + "…" : desc;

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
          tags = [],
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

        const days = calculateDays(createdAt);

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
          <div
            key={id}
            className={cardClass}
            style={bgStyle}
            onClick={onClick} 
          >
            <div className={styles.header}>
              <div className={styles.userInfo}>
                <span className={styles.nickname} style={{ color: nicknameColor }}>
                  {formatNickname(nickname)}
                </span>
                <span className={styles.separator}>의</span>
                <span className={styles.name}>{formatName(name)}</span>
              </div>
              <div className={styles.points}>
                <div className={styles.pointsRow}>
                  <img src={dpIcon} alt="Points" className={styles.dpIcon} />
                  <span>{points}P 획득</span>
                </div>
              </div>
            </div>

            <div className={styles.studyName}>{days}일째 진행 중</div>

            {/* description 최대 20자, 한 줄 */}
            <div className={styles.description}>
              {formatDescription(description)}
            </div>

            <div className={styles.tagList}>
              {tags.slice(0, 3).map((tag, idx) => (
                <div key={idx} className={styles.tag}>
                  <span className={styles.tagEmoji}>{tag.emoji}</span>
                  <span className={styles.tagNumber}>{tag.count}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
