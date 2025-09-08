// 닉네임: 5자 미만
export const validateNickname = (value) => {
  if (!value) return "*닉네임을 입력해 주세요.";
  if (value.length < 1 || value.length >= 5) return "*닉네임은 5자 미만이어야 합니다.";
  return "";
};

// 스터디 이름: 8자 미만
export const validateStudyName = (value) => {
  if (!value) return "*스터디 이름을 입력해 주세요.";
  if (value.length < 1 || value.length >= 8) return "*스터디 이름은 8자 미만이어야 합니다.";
  return "";
};

// 소개: 30자 미만
export const validateDescription = (value) => {
  if (!value) return "*설명을 입력해 주세요.";
  if (value.length >= 30) return "*소개는 30자 미만이어야 합니다.";
  return "";
};

// 비밀번호: 4자 이상
export const validatePassword = (value) => {
  if (!value) return "*비밀번호를 입력해 주세요.";
  if (value.length < 4) return "*비밀번호는 4자 이상이어야 합니다.";
  return "";
};

// 비밀번호 확인: 비밀번호와 일치
export const validateConfirmPassword = (value, password) => {
  if (!value) return "*비밀번호 확인을 입력해 주세요.";
  if (value !== password) return "*비밀번호가 일치하지 않습니다.";
  return "";
};
