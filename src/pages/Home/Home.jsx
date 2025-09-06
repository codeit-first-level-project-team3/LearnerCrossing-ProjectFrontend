import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/organisms/Card/Card";
import GNB from "../../components/organisms/GNB/GNB";
import Search from "../../components/molecules/Search/Search";
import Sort from "../../components/molecules/Sort/Sort";
import styles from "./Home.module.css";
import { useStudy } from "../../contexts/StudyContext";
// import { getStudyList, getStudyEmojis } from "../../api/studyAPI"; hook처리 예정
import { getStudyList } from "../../api/studyAPI";

export default function Home() {
  const navigate = useNavigate();
  const { selectStudy } = useStudy();

  const [allStudies, setAllStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [visibleCount, setVisibleCount] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 윈도우 크기 추적
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 전체 스터디 + 이모지 불러오기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const data = await getStudyList();
        const studiesArray = data?.items ?? [];

        const studiesWithEmojis = await Promise.all(
          studiesArray.map(async (study) => {
            try {
              const emojiData = await getStudyEmojis(study.id);
              return {
                ...study,
                tags: (emojiData.items || []).map((item) => ({
                  emoji: item.emoji,
                  count: item.count,
                })),
              };
            } catch {
              return { ...study, tags: [] };
            }
          })
        );

        setAllStudies(studiesWithEmojis);
      } catch (err) {
        console.error("스터디 불러오기 실패", err);
        setAllStudies([]);
      }
    };

    fetchStudies();
  }, []);

  // 카드 클릭
  const handleCardClick = async (study) => {
    try {
      await selectStudy(study.id);

      const stored = sessionStorage.getItem("recentStudies");
      let recent = stored ? JSON.parse(stored) : [];

      // 중복 제거
      recent = recent.filter((s) => s.id !== study.id);
      recent.unshift(study);

      const maxRecent = windowWidth <= 744 ? 1 : windowWidth <= 1200 ? 2 : 3;
      if (recent.length > maxRecent) recent = recent.slice(0, maxRecent);

      sessionStorage.setItem("recentStudies", JSON.stringify(recent));

      navigate(`/studyDetail/${study.id}`);
    } catch (err) {
      console.error("스터디 선택 실패", err);
      navigate("/studyDetail");
    }
  };

  // 최근 조회한 스터디
  const recentStudies = useMemo(() => {
    const stored = sessionStorage.getItem("recentStudies");
    let items = stored ? JSON.parse(stored) : [];

    const maxRecent = windowWidth <= 744 ? 1 : windowWidth <= 1200 ? 2 : 3;
    if (items.length > maxRecent) items = items.slice(0, maxRecent);

    return items;
  }, [windowWidth]);

  // 검색 + 정렬
  const filteredStudies = useMemo(() => {
    if (!Array.isArray(allStudies)) return [];

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
  }, [allStudies, searchTerm, sortOption]);

  return (
    <div className={styles.container}>
      <GNB showCreateStudy={true} />

      {/* 최근 조회한 스터디 */}
      <section className={styles.recentStudies}>
        <h2 className={styles.sectionTitle}>최근 조회한 스터디</h2>
        <div
          className={`${styles.cardGridRecent} ${
            recentStudies.length === 0 ? styles.emptyGrid : ""
          }`}
        >
          {recentStudies.length === 0 ? (
            <p className={styles.emptyMessage}>아직 조회한 스터디가 없어요</p>
          ) : (
            recentStudies.map((study) => (
              <Card
                key={study.id}
                studies={[study]}
                onClick={() => handleCardClick(study)}
              />
            ))
          )}
        </div>
      </section>

      {/* 스터디 둘러보기 */}
      <section className={styles.allStudies}>
        <h2 className={styles.sectionTitle}>스터디 둘러보기</h2>
        <div className={styles.controlsAll}>
          <div className={styles.searchWrapper}>
            <Search
              placeholder="스터디 검색"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.sortWrapper}>
            <Sort
              label={sortOption}
              onChange={(option) => setSortOption(option)}
            />
          </div>
        </div>

        <div
          className={`${styles.cardGridAll} ${
            filteredStudies.length === 0 ? styles.emptyGrid : ""
          }`}
        >
          {filteredStudies.length === 0 ? (
            <p className={styles.emptyMessage}>아직 둘러볼 스터디가 없어요</p>
          ) : (
            filteredStudies.slice(0, visibleCount).map((study) => (
              <Card
                key={study.id}
                studies={[study]}
                onClick={() => handleCardClick(study)}
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
