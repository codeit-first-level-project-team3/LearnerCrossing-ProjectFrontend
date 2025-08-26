function Title({ nickName, title, isColorBlack = true, highlightColor = "none"}) {
  const textColor = isColorBlack ? "var(--black-414141)" : "#FFF";
  // span 강조 색상 맵
  const highlightMap = {
    none: textColor,
    green: "var(--green-text-578246)",
    yellow: "var(--yellow-text-C18E1B)", 
  };
  // style
  const h1Style = {
    color: textColor,
    fontFamily: "Pretendard",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
  };
  const spanStyle = {
    color: highlightMap[highlightColor],
  };

  return (
    <h1 style={h1Style}>
      <span style={spanStyle}>{nickName}</span>의 {title}
    </h1>
  );
}

export default Title;
