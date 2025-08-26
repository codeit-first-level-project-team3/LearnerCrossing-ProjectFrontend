function Toast({ text, type, witdth }) {
  const toastType = {
    warning: {
      textColor: "var(--red-F50E0E)",
      backgroundColor: "var(--pink-FDE0E9)",
      icon: "🚨",
    },
    point: {
      textColor: "var(--green-text-578246)",
      backgroundColor: "var(--green-E1EDDE)",
      icon: "🎉",
    },
  };

  const { textColor, backgroundColor, icon } = toastType[type];

  const toastStyle = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "14px 28px",
    borderRadius: "12px",
    height: "47px",

    fontFamily: "Pretendard",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
    color: textColor,
    backgroundColor: backgroundColor,
  };

  return <div style={toastStyle}>{icon} {text}</div>;
}

export default Toast;
