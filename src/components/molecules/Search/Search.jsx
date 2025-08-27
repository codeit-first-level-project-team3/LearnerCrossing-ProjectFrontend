import React from "react";
import styles from "./Search.module.css";
import searchIcon from "../../../assets/search.svg";

export default function Search({ placeholder = "검색" }) {
  return (
    <div className={styles.searchBox}>
      <img src={searchIcon} alt="검색 아이콘" className={styles.searchIcon} />
      <input type="text" placeholder={placeholder} />
    </div>
  );
}
