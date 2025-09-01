export const validateNickname = (value) => {
  if (!value) return "*닉네임을 입력해 주세요.";
  return "";
};

export const validateStudyName = (value) => {
  if (!value) return "*스터디 이름을 입력해 주세요.";
  return "";
};

export const validateDescription = (value) => {
  if (!value) return "*설명을 입력해 주세요.";
  return "";
};

export const validatePassword = (value) => {
  if (!value) return "*비밀번호를 입력해 주세요.";
  return "";
};

export const validateConfirmPassword = (value, password) => {
  if (!value) return "*비밀번호 확인을 입력해 주세요.";
  if (value !== password) return "*비밀번호가 일치하지 않습니다.";
  return "";
};
