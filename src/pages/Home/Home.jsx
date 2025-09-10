import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/organisms/Card/Card";
import GNB from "../../components/organisms/GNB/GNB";
import Search from "../../components/molecules/Search/Search";
import Sort from "../../components/molecules/Sort/Sort";
import styles from "./Home.module.css";
import { getStudyList } from "../../api/studyAPI";
import { getStudyEmojis } from "../../api/emojiAPI"; 

export default function Home() {
  const navigate = useNavigate();

  const [allStudies, setAllStudies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최근 순");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  // 창 크기 추적
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 스터디 + 이모지 불러오기 (페이지네이션)
  const fetchStudies = async (currentPage) => {
    setLoading(true);
    try {
      const data = await getStudyList({ page: currentPage, pageSize });
      const studiesArray = data?.items ?? [];
      setTotalPages(data?.meta?.totalPages ?? 1);

      const studiesWithEmojis = await Promise.all(
        studiesArray.map(async (study) => {
          try {
            const emojiRes = await getStudyEmojis(study.id);
            const tags = emojiRes?.items ?? [];
            return { ...study, tags };
          } catch {
            return { ...study, tags: [] };
          }
        })
      );

      setAllStudies((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const newOnes = studiesWithEmojis.filter((s) => !existingIds.has(s.id));
        return [...prev, ...newOnes];
      });
    } catch (err) {
      console.error("스터디 불러오기 실패", err);
    } finally {
      setLoading(false);
    }
  };

  // 첫 로딩 시 page=1 데이터 불러오기
  useEffect(() => {
    fetchStudies(1);
  }, []);

  // 최근 조회 스터디 (sessionStorage에서 직접 읽기)
  const recentStudies = useMemo(() => {
    const stored = sessionStorage.getItem("recentStudies");
    const recent = stored ? JSON.parse(stored) : [];

    let maxRecent = 3;
    if (windowWidth <= 744) maxRecent = 1;
    else if (windowWidth <= 1200) maxRecent = 2;

    return recent.slice(0, maxRecent);
  }, [windowWidth]);

  // 카드 클릭
  const handleCardClick = (study) => {
    const stored = sessionStorage.getItem("recentStudies");
    let recent = stored ? JSON.parse(stored) : [];
    recent = recent.filter((s) => s.id !== study.id);
    recent.unshift(study);
    sessionStorage.setItem("recentStudies", JSON.stringify(recent));

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
    <>
      <GNB showCreateStudy={true} />

      <div className={styles.container}>
        {/* 최근 조회 */}
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
              filteredStudies.map((study) => (
                <Card
                  key={study.id}
                  studies={[study]}
                  onClick={() => handleCardClick(study)}
                />
              ))
            )}
          </div>

          {/* 더보기 버튼 */}
          {page < totalPages && (
            <div className={styles.moreBtnContainerAll}>
              <button
                className={styles.moreBtnAll}
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchStudies(nextPage);
                }}
                disabled={loading}
              >
                {loading ? "불러오는 중..." : "더보기"}
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
