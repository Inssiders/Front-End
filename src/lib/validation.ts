/**
 * 폼 검증 유틸리티 함수들
 */

/**
 * 정교한 이메일 유효성 검증 함수
 * @param email - 검증할 이메일 주소
 * @returns 이메일이 유효한지 여부
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;

  // 기본 이메일 형식 검증 (@ 포함, 기본 구조)
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailRegex.test(email)) return false;

  const [localPart, domainPart] = email.split("@");

  // 로컬 파트 검증
  if (!localPart || localPart.length === 0) return false;
  if (localPart.startsWith(".") || localPart.endsWith(".")) return false;
  if (localPart.includes("..")) return false;

  // 로컬 파트 허용 문자: 영문, 숫자, 특정 특수문자만
  const localPartRegex = /^[a-zA-Z0-9._-]+$/;
  if (!localPartRegex.test(localPart)) return false;

  // 도메인 파트 검증
  if (!domainPart || domainPart.length === 0) return false;
  if (domainPart.startsWith("-") || domainPart.endsWith("-")) return false;
  if (domainPart.startsWith(".") || domainPart.endsWith(".")) return false;

  // 도메인에는 밑줄(_) 허용하지 않음
  if (domainPart.includes("_")) return false;

  // 도메인 세그먼트 검증 (점으로 구분된 각 부분)
  const domainSegments = domainPart.split(".");
  if (domainSegments.length < 2) return false; // 최소 domain.tld 형태

  for (const segment of domainSegments) {
    if (segment.length < 2) return false; // 각 세그먼트는 최소 2자
    if (segment.startsWith("-") || segment.endsWith("-")) return false;

    // 도메인 세그먼트 허용 문자: 영문, 숫자, 하이픈만
    const segmentRegex = /^[a-zA-Z0-9-]+$/;
    if (!segmentRegex.test(segment)) return false;
  }

  return true;
};

/**
 * KISA 안전한 패스워드 기준에 따른 패스워드 유효성 검증 함수
 * - 최소 8자 이상, 최대 64자 이하
 * - 영문 대문자(A–Z) 최소 1자 포함
 * - 영문 소문자(a–z) 최소 1자 포함
 * - 숫자(0–9) 최소 1자 포함
 * - 특수 문자 중 하나 이상 포함
 * - 공백 문자는 허용하지 않음
 *
 * @param password - 검증할 패스워드
 * @returns 패스워드가 유효한지 여부와 오류 메시지
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password || typeof password !== "string") {
    return { isValid: false, message: "비밀번호를 입력해주세요." };
  }

  // KISA 안전한 패스워드 기준 정규식
  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,64}$
  const kisaPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,64}$/;

  if (!kisaPasswordRegex.test(password)) {
    // 세부적인 검증으로 구체적인 오류 메시지 제공
    if (password.length < 8) {
      return { isValid: false, message: "비밀번호는 최소 8자 이상이어야 합니다." };
    }

    if (password.length > 64) {
      return { isValid: false, message: "비밀번호는 최대 64자 이하여야 합니다." };
    }

    if (/\s/.test(password)) {
      return { isValid: false, message: "비밀번호에는 공백 문자를 사용할 수 없습니다." };
    }

    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: "비밀번호는 영문 소문자를 최소 1자 포함해야 합니다." };
    }

    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: "비밀번호는 영문 대문자를 최소 1자 포함해야 합니다." };
    }

    if (!/\d/.test(password)) {
      return { isValid: false, message: "비밀번호는 숫자를 최소 1자 포함해야 합니다." };
    }

    if (!/[^\w\s]/.test(password)) {
      return { isValid: false, message: "비밀번호는 특수문자를 최소 1자 포함해야 합니다." };
    }
  }

  return { isValid: true };
};

/**
 * 패스워드 확인 검증 함수
 * @param password - 원본 패스워드
 * @param passwordConfirm - 확인 패스워드
 * @returns 패스워드가 일치하는지 여부와 오류 메시지
 */
export const validatePasswordConfirm = (
  password: string,
  passwordConfirm: string
): { isValid: boolean; message?: string } => {
  if (!passwordConfirm) {
    return { isValid: false, message: "비밀번호 확인을 입력해주세요." };
  }

  if (password !== passwordConfirm) {
    return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
  }

  return { isValid: true };
};

/**
 * 이메일 형식의 실시간 피드백 메시지 생성
 * @param email - 검증할 이메일
 * @returns 피드백 메시지 또는 null
 */
export const getEmailValidationMessage = (email: string): string | null => {
  if (!email) return null;

  if (!email.includes("@")) {
    return "@ 기호가 필요합니다.";
  }

  const [localPart, domainPart] = email.split("@");

  if (!localPart) {
    return "이메일 주소의 로컬 부분을 입력해주세요.";
  }

  if (!domainPart) {
    return "도메인을 입력해주세요.";
  }

  if (localPart.startsWith(".") || localPart.endsWith(".")) {
    return "이메일 주소는 점(.)으로 시작하거나 끝날 수 없습니다.";
  }

  if (localPart.includes("..")) {
    return "연속된 점(..)은 허용되지 않습니다.";
  }

  if (!domainPart.includes(".")) {
    return "유효한 도메인을 입력해주세요. (예: example.com)";
  }

  if (domainPart.includes("_")) {
    return "도메인에는 밑줄(_)을 사용할 수 없습니다.";
  }

  const domainSegments = domainPart.split(".");
  if (domainSegments.some((segment) => segment.length < 2)) {
    return "도메인의 각 부분은 최소 2자 이상이어야 합니다.";
  }

  if (!validateEmail(email)) {
    return "유효한 이메일 주소를 입력해주세요.";
  }

  return null;
};

/**
 * KISA 기준 패스워드 강도 검증 및 피드백
 * @param password - 검증할 패스워드
 * @returns 강도 점수(0-5)와 피드백 메시지
 */
export const getPasswordStrength = (password: string): { score: number; feedback: string } => {
  if (!password) {
    return { score: 0, feedback: "비밀번호를 입력해주세요." };
  }

  let score = 0;
  const requirements = [];
  const missing = [];

  // 1. 길이 검증 (8-64자)
  if (password.length >= 8 && password.length <= 64) {
    score++;
    requirements.push("적절한 길이");
  } else if (password.length < 8) {
    missing.push("최소 8자 이상");
  } else {
    missing.push("최대 64자 이하");
  }

  // 2. 영문 소문자 검증
  if (/[a-z]/.test(password)) {
    score++;
    requirements.push("소문자");
  } else {
    missing.push("영문 소문자");
  }

  // 3. 영문 대문자 검증
  if (/[A-Z]/.test(password)) {
    score++;
    requirements.push("대문자");
  } else {
    missing.push("영문 대문자");
  }

  // 4. 숫자 검증
  if (/\d/.test(password)) {
    score++;
    requirements.push("숫자");
  } else {
    missing.push("숫자");
  }

  // 5. 특수문자 검증
  if (/[^\w\s]/.test(password)) {
    score++;
    requirements.push("특수문자");
  } else {
    missing.push("특수문자");
  }

  // 6. 공백 검증 (공백이 없어야 함)
  const hasNoSpaces = !/\s/.test(password);
  if (!hasNoSpaces) {
    missing.push("공백 제거");
  }

  // 피드백 메시지 생성
  let feedback = "";

  if (score === 5 && hasNoSpaces) {
    feedback = "🔒 KISA 기준 안전한 비밀번호입니다! 💪";
  } else if (score >= 4 && hasNoSpaces) {
    feedback = `거의 완성! 추가 필요: ${missing.join(", ")}`;
  } else if (score >= 2) {
    feedback = `보통 강도. 추가 필요: ${missing.join(", ")}`;
  } else {
    feedback = `약한 비밀번호. 필요: ${missing.join(", ")}`;
  }

  return { score: hasNoSpaces ? score : Math.max(0, score - 1), feedback };
};

/**
 * 패스워드 요구사항 체크리스트 생성
 * @param password - 검증할 패스워드
 * @returns 각 요구사항별 충족 여부
 */
export const getPasswordRequirements = (password: string) => {
  return {
    length: password.length >= 8 && password.length <= 64,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^\w\s]/.test(password),
    noSpaces: !/\s/.test(password),
  };
};
