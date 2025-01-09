// 카카오 API 요청 관련

import axios from 'axios';
import { API_SERVER_HOST } from './todoApi';

// 내 카카오 REST API 키
const REST_API_KEY = `60ed3117ce4d8eb9a93a7fb381f9421c`;

// Redirect URI
const REDIRECT_URI = `http://localhost:5173/member/kakao`;

// 카카오 인가 요청 경로
const AUTH_CODE_PATH = `https://kauth.kakao.com/oauth/authorize`;

// 카카오 Access Token 요청 경로
const ACCESS_TOKEN_URL = `https://kauth.kakao.com/oauth/token`;

// 카카오 인가 요청경로(링크) 크리에이터
export const getKakaoLoginLink = () => {
  const kakaoURL = `${AUTH_CODE_PATH}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  return kakaoURL;
};

// 카카오 Access Token 요청 : 카카오 로그인 > 보안 > Client Secret 활성화 사용안함으로 변경!
export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  };
  const params = {
    grant_type: 'authorization_code',
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: authCode,
  };

  const result = await axios.post(ACCESS_TOKEN_URL, params, header);
  console.log(result.data);
  const accessToken = result.data.access_token;
  return accessToken;
};

// 카카오 AccessToken과 함께 API 서버 호출
export const getMemberWithAccessToken = async (accessToken) => {
  const result = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`
  );
  return result.data;
};
