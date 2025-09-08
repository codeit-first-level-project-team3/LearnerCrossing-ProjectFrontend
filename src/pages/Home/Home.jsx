import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../../components/organisms/Card/Card";
import GNB from "../../components/organisms/GNB/GNB";
import Search from "../../components/molecules/Search/Search";
import Sort from "../../components/molecules/Sort/Sort";
import styles from "./Home.module.css";
import useStudy from "../../contexts/StudyStorage";
import { getStudyList } from "../../api/studyAPI";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetStudy, selectStudy } = useStudy();

  const [allStudies, setAllStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [visibleCount, setVisibleCount] = useState(6);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 최근 조회한 스터디 ID만 관리
  const [recentStudiesIds, setRecentStudiesIds] = useState([]);

  // 윈도우 크기 추적
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 전체 스터디 불러오기
  useEffect(() => {
    //스터디 정보 리셋
    resetStudy();
    
    const fetchStudies = async () => {
      try {
        const data = await getStudyList();
        const studiesArray = data?.items ?? [];

        const studiesWithEmojis = studiesArray.map(study => ({
          ...study,
          tags: [], // 이모지는 나중에 처리
        }));

        setAllStudies(studiesWithEmojis);
      } catch (err) {
        console.error("스터디 불러오기 실패", err);
        setAllStudies([]);
      }
    };

    fetchStudies();
  }, []);

  // 페이지 진입 또는 URL 변경 시 최근 조회한 스터디 ID 로드
  useEffect(() => {
    const stored = sessionStorage.getItem("recentStudies");
    const ids = stored ? JSON.parse(stored).map(s => s.id) : [];
    setRecentStudiesIds(ids);
  }, [location]);

  // 실제 화면에 표시할 최근 조회한 스터디
  const recentStudies = useMemo(() => {
    const maxRecent = windowWidth <= 744 ? 1 : windowWidth <= 1200 ? 2 : 3;
    const studies = recentStudiesIds
      .map(id => allStudies.find(s => s.id === id))
      .filter(Boolean); // allStudies에 없는 ID 제거
    return studies.slice(0, maxRecent);
  }, [recentStudiesIds, allStudies, windowWidth]);

  // 카드 클릭
  const handleCardClick = (study) => {
    const stored = sessionStorage.getItem("recentStudies");
    let recent = stored ? JSON.parse(stored) : [];

    // 중복 제거 후 앞쪽에 추가
    recent = recent.filter((s) => s.id !== study.id);
    recent.unshift(study);

    sessionStorage.setItem("recentStudies", JSON.stringify(recent));
    setRecentStudiesIds(recent.map(s => s.id)); // 상태도 갱신

    selectStudy(study.id);
    navigate(`/studyDetail`);
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
