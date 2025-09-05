function Toast({ text, type, className='' }) {
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

    font: "var(--font-16-medium)",
    color: textColor,
    backgroundColor: backgroundColor,
    position: "fixed",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 7,
  };

  return (
    <div style={toastStyle} className={className}>
      {icon} {text}
    </div>
  );
}

export default Toast;
