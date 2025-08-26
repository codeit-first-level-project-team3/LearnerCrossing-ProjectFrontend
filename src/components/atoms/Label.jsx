function Label({labelId, labelName}) {
  const labelStyle = {
    color: "var(--black-414141)",
    fontFamily: "Pretendard",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "normal",
  };

  return <label style={labelStyle} htmlFor={labelId}>{labelName}</label>;
}

export default Label;
