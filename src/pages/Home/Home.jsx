import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/organisms/Card/Card";
import GNB from "../../components/organisms/GNB/GNB";
import Search from "../../components/molecules/Search/Search";
import Sort from "../../components/molecules/Sort/Sort";
import bg1 from "../../assets/backgrounds/bg1.svg";
import bg2 from "../../assets/backgrounds/bg2.svg";
import bg3 from "../../assets/backgrounds/bg3.svg";
import bg4 from "../../assets/backgrounds/bg4.svg";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const recentStudies = [
    { id: 1, nickname: "채환", name: "의 공부", description: "React 공부중", background: bg1, points: 120, createdAt: "2025-09-01T00:00:00Z", tags: [{ emoji: "🔥", count: 5 }, { emoji: "💡", count: 3 }, { emoji: "📚", count: 2 }] },
    { id: 2, nickname: "하드", name: "의 학습", description: "Node.js 실습중", background: "#E1EDDE", points: 90, createdAt: "2025-08-28T00:00:00Z", tags: [{ emoji: "⚡", count: 4 }, { emoji: "📝", count: 2 }] },
    { id: 3, nickname: "민준", name: "공부방", description: "Python 공부중", background: "#FFF1CC", points: 75, createdAt: "2025-08-25T00:00:00Z", tags: [{ emoji: "🐍", count: 3 }, { emoji: "💻", count: 2 }] },
  ];

  const allStudies = [
    ...recentStudies,
    { id: 4, nickname: "소연", name: "스터디", description: "Django 프로젝트", background: "#FDE0E9", points: 50, createdAt: "2025-08-20T00:00:00Z", tags: [{ emoji: "🌐", count: 2 }, { emoji: "💡", count: 1 }] },
    { id: 5, nickname: "지훈", name: "공부 싫어", description: "Frontend 연습중", background: "#FDE0E9", points: 60, createdAt: "2025-08-22T00:00:00Z", tags: [{ emoji: "🎨", count: 3 }, { emoji: "🔥", count: 2 }] },
    { id: 6, nickname: "현수", name: "숙제", description: "React Native 앱 개발", background: "#E0F1F5", points: 80, createdAt: "2025-08-18T00:00:00Z", tags: [{ emoji: "📱", count: 4 }, { emoji: "⚡", count: 2 }] },
    { id: 7, nickname: "은지", name: "시험", description: "AI 스터디", background: "#E0F1F5", points: 110, createdAt: "2025-08-10T00:00:00Z", tags: [{ emoji: "🤖", count: 3 }, { emoji: "📚", count: 2 }] },
    { id: 8, nickname: "태현", name: "연습", description: "알고리즘 연습", background: "#E1EDDE", points: 95, createdAt: "2025-08-12T00:00:00Z", tags: [{ emoji: "🧩", count: 4 }, { emoji: "🔥", count: 2 }] },
    { id: 9, nickname: "소연", name: "일기", description: "Django 프로젝트", background: bg2, points: 50, createdAt: "2025-08-20T00:00:00Z", tags: [{ emoji: "🌐", count: 2 }, { emoji: "💡", count: 1 }] },
    { id: 10, nickname: "소연", name: "복습", description: "Django 프로젝트", background: bg3, points: 50, createdAt: "2025-08-20T00:00:00Z", tags: [{ emoji: "🌐", count: 2 }, { emoji: "💡", count: 1 }] },
    { id: 11, nickname: "소연", name: "스터디", description: "Django 프로젝트", background: bg4, points: 50, createdAt: "2025-08-20T00:00:00Z", tags: [{ emoji: "🌐", count: 2 }, { emoji: "💡", count: 1 }] },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredStudies = useMemo(() => {
    let filtered = allStudies.filter(
      (study) =>
        study.nickname.includes(searchTerm) ||
        study.description.includes(searchTerm)
    );

    switch (sortOption) {
      case "최근 순":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "오래된 순":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "많은 포인트 순":
        filtered.sort((a, b) => b.points - a.points);
        break;
      case "적은 포인트 순":
        filtered.sort((a, b) => a.points - b.points);
        break;
      default:
        break;
    }
    return filtered;
  }, [searchTerm, sortOption]);

  return (
    <div className={styles.container}>
      <GNB showCreateStudy={true} />

      {/* 최근 조회한 스터디 */}
      <section className={styles.recentStudies}>
        <h2>최근 조회한 스터디</h2>
        <div className={`${styles.cardGridRecent} ${recentStudies.length === 0 ? styles.emptyGrid : ""}`}>
          {recentStudies.length === 0 ? (
            <p className={styles.emptyMessage}>아직 조회한 스터디가 없어요</p>
          ) : (
            recentStudies.map((study) => (
              <Card
                key={study.id}
                studies={[study]}
                onClick={() => navigate("/studyDetail")} // ✅ 모든 카드 클릭 시 /studyDetail 이동
              />
            ))
          )}
        </div>
      </section>

      {/* 스터디 둘러보기 */}
      <section className={styles.allStudies}>
        <h2>스터디 둘러보기</h2>
        <div className={styles.controlsAll}>
          <Search placeholder="스터디 검색" onChange={(e) => setSearchTerm(e.target.value)} />
          <Sort label={sortOption} onChange={(option) => setSortOption(option)} />
        </div>

        <div className={`${styles.cardGridAll} ${filteredStudies.length === 0 ? styles.emptyGrid : ""}`}>
          {filteredStudies.length === 0 ? (
            <p className={styles.emptyMessage}>아직 둘러볼 스터디가 없어요</p>
          ) : (
            filteredStudies.slice(0, visibleCount).map((study) => (
              <Card
                key={study.id}
                studies={[study]}
                onClick={() => navigate("/studyDetail")} // ✅ 하드코드 이동
              />
            ))
          )}
        </div>

        {filteredStudies.length > visibleCount && (
          <div className={styles.moreBtnContainerAll}>
            <button
              className={styles.moreBtnAll}
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              더보기
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
