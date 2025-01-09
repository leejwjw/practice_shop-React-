// 카카오 API 요청 관련

// 내 카카오 REST API 키
const REST_API_KEY = `b278c7e34b9d34c38621612a08be2819`;

// Redirect URI
const REDIRECT_URI = `http://localhost:5173/member/kakao`;

// 카카오 인가 요청 경로
const AUTH_CODE_PATH = `https://kauth.kakao.com/oauth/authorize`;

// 카카오 인가 요청경로(링크) 크리에이터
export const getKakaoLoginLink = () => {
  const kakaoURL = `${AUTH_CODE_PATH}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  return kakaoURL;
};
