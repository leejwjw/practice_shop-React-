const REST_API_KEY = `b276d98b0daa4a9b5f2aafc1f8dd67c0`;

const REDIRECT_URI = `http://localhost:5173/member/`;

const AUTH_CODE_PATH = `https://kauth.kakao.com/oauth/authorize`;

export const getKakaoLoginLink = () => {
  const kakaoURL = `${AUTH_CODE_PATH}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  return kakaoURL;
};
