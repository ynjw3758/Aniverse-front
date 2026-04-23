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

export const AUTH_API_BASE = GATEWAY_URL;
export const PUBLIC_API_BASE = PUBGATEWAY_URL;
export const SEARCH_API_BASE = SEARCH_URL;
export const NOTE_API_BASE = NOTE_URL;
export const REACT_API_BASE = REACT_URL;
export const UPLOAD_API_BASE = UPLOAD_URL;
export const AI_API_BASE = AI_URL;
export const WEBSOCKET_BASE = WEBCHAT_URL;

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

export default api;
