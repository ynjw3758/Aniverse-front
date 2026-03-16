// src/api.ts
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const isProduction = process.env.NODE_ENV === "production";

export const PUBGATEWAY_URL = isProduction
  ? process.env.REACT_APP_API_PUBGATEWAY_URL
  : process.env.REACT_APP_API_DEV_PUBGATEWAY_URL;

export const GATEWAY_URL = isProduction
  ? process.env.REACT_APP_API_AUTHGATEWAY_URL
  : process.env.REACT_APP_API_DEV_AUTHGATEWAY_URL;

export const SEARCH_URL = isProduction
  ? process.env.REACT_APP_API_SEARCH_URL
  : process.env.REACT_APP_API_DEV_SEARCH_URL;

export const NOTE_URL = isProduction
  ? process.env.REACT_APP_API_NOTE_URL
  : process.env.REACT_APP_API_DEV_NOTE_URL;

export const REACT_URL = isProduction
  ? process.env.REACT_APP_API_REACT_URL
  : process.env.REACT_APP_API_DEV_REACT_URL;

export const UPLOAD_URL = isProduction
  ? process.env.REACT_APP_API_UPLOAD_URL
  : process.env.REACT_APP_API_DEV_UPLOAD_URL;

export const AI_URL = isProduction
  ? process.env.REACT_APP_API_AI_URL
  : process.env.REACT_APP_API_DEV_AI_URL;

export const WEBCHAT_URL = isProduction
  ? process.env.REACT_APP_API_WEBSOCKET_URL
  : process.env.REACT_APP_API_DEV_WEBSOCKET_URL;

export const COMMON_URL = isProduction
  ? process.env.REACT_APP_API_COMMON_URL
  : process.env.REACT_APP_API_DEV_COMMON_URL;

// =====================================================
// 공통 Axios 인스턴스
// - access token 직접 첨부 안 함
// - SID 쿠키만 자동 포함
// =====================================================
export const api: AxiosInstance = axios.create({
  baseURL: GATEWAY_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 중복 리다이렉트 방지
let isRedirecting = false;

// 로그인/공개 API 여부 판별
const isPublicPath = (url?: string): boolean => {
  if (!url) return false;

  return (
    url.includes("/login") ||
    url.includes("/signup") ||
    url.includes("/auth/login") ||
    url.includes("/health") ||
    url.includes("/public")
  );
};

// =====================================================
// Request Interceptor
// - 토큰 검증은 하지 않음
// - 필요한 공통 옵션만 유지
// =====================================================
/*
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.withCredentials = true;
    console.log("아니 여기는 오는ㄴ거야?")
    // BFF 구조에서는 Authorization 헤더를 프론트에서 넣지 않음
    if (config.headers) {
      delete config.headers.Authorization;
    }
     console.log("아니 여기는 오는ㄴ거야2?")
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
*/

// =====================================================
// Response Interceptor
// - 세션 만료/인증 실패 공통 처리
// - 실제 access/refresh 검증 및 재발급은 게이트웨이에서 수행
// =====================================================
/*
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    console.log("API 에러:", {
      url: requestUrl,
      status,
      data: error.response?.data,
    });

    // 인증 실패 공통 처리
    if ((status === 401 || status === 403) && !isRedirecting && !isPublicPath(requestUrl)) {
      isRedirecting = true;

      console.error("세션 만료 또는 인증 실패");

      // 필요한 최소 사용자 정보만 제거
      localStorage.removeItem("id");

      // 로그인 페이지로 이동
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
*/

export default api;