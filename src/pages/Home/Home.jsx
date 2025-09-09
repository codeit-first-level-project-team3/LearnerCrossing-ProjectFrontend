import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/organisms/Card/Card";
import GNB from "../../components/organisms/GNB/GNB";
import Search from "../../components/molecules/Search/Search";
import Sort from "../../components/molecules/Sort/Sort";
import styles from "./Home.module.css";
import useStudy from "../../contexts/StudyStorage"; 
import { getStudyList } from "../../api/studyAPI";
import { getStudyEmojis } from "../../api/emojiAPI"; 

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectStudy } = useStudy();

  const [allStudies, setAllStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [visibleCount, setVisibleCount] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [recentStudiesIds, setRecentStudiesIds] = useState([]);

  // 윈도우 크기 추적
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 전체 스터디 불러오기 + 이모지까지 붙이기
  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const data = await getStudyList();
        const studiesArray = data?.items ?? [];

        const studiesWithEmojis = await Promise.all(
          studiesArray.map(async (study) => {
            try {
              const emojiRes = await getStudyEmojis(study.id);
              const tags = emojiRes?.items ?? []; 
              return { ...study, tags };
            } catch (err) {
              console.error(`이모지 불러오기 실패: ${study.id}`, err);
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

  // 최근 조회한 스터디 ID 로드
  useEffect(() => {
    const stored = sessionStorage.getItem("recentStudies");
    const ids = stored ? JSON.parse(stored).map((s) => s.id) : [];
    setRecentStudiesIds(ids);
  }, [location]);

  // 화면에 표시할 최근 조회 스터디
  const recentStudies = useMemo(() => {
    const maxRecent = windowWidth <= 744 ? 1 : windowWidth <= 1200 ? 2 : 3;
    const studies = recentStudiesIds
      .map((id) => allStudies.find((s) => s.id === id))
      .filter(Boolean);
    return studies.slice(0, maxRecent);
  }, [recentStudiesIds, allStudies, windowWidth]);

  // 카드 클릭
  const handleCardClick = async (study) => {
    // 최근 조회 리스트 업데이트
    let stored = sessionStorage.getItem("recentStudies");
    let recent = stored ? JSON.parse(stored) : [];
    recent = recent.filter((s) => s.id !== study.id);
    recent.unshift(study);
    sessionStorage.setItem("recentStudies", JSON.stringify(recent));
    setRecentStudiesIds(recent.map((s) => s.id));

    // studyStorage 상태에 선택
    await selectStudy(study.id);

    navigate(`/studyDetail/${study.id}`);
  };

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

      {/* 최근 조회 스터디 */}
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

      {/* 전체 스터디 */}
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
