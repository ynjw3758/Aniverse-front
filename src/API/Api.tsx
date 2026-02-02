// src/api.ts
import axios , { InternalAxiosRequestConfig }from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

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

// 기본 Axios 인스턴스
export const api = axios.create({
  baseURL:GATEWAY_URL,
  withCredentials: true, // 쿠키 사용 시 필요
});

const refreshClient = axios.create({
  baseURL: GATEWAY_URL,
  withCredentials: true,
});

// ===============================
// Refresh 상태 관리
// ===============================
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

const subscribeRefresh = (cb: (token: string) => void) => {
  refreshQueue.push(cb);
};

const onRefreshed = (token: string) => {
  refreshQueue.forEach((cb) => cb(token));
  refreshQueue = [];
};

console.log("32323")
// ✅ access_token 자동 갱신 인터셉터

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  console.log("11111 : " , config)
  const url = config.url ?? "";


  // ✅ refresh / login 요청은 인터셉터 로직 제외 (루프 방지)
  if (url.includes("/token/refresh") || url.includes("/login")) {
    return config;
  }

  const accessToken = localStorage.getItem("a_id");
  const expRaw = localStorage.getItem("p_exp");
   console.log("accessToken :"  ,accessToken)
   console.log("expRaw:" ,expRaw)
  // 토큰/exp 없으면 그냥 통과
  if (!accessToken || !expRaw) {
    console.log("통과?")
    return config;
  }

  const exp = Number(expRaw);
  const now = Math.floor(Date.now() / 1000);
  const timeLeft = exp - now;
  console.log("아니 이게 뭐애")
  // ✅ 만료 60초 전 선제 갱신
  if (timeLeft < 60) {
    if (!isRefreshing) {
      isRefreshing = true;
      console.log("2")
      try {
        // refresh 호출은 refreshClient로 (인터셉터 없는 인스턴스)
        console.log("1")
        const res = await refreshClient.post("/token/refresh");
        const newToken = res.data.data.access_token;
        const newExp = res.data.data.exp;

        localStorage.setItem("a_id", newToken);
        localStorage.setItem("p_exp", String(newExp));

        onRefreshed(newToken);
      } catch (e) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    // refresh 끝날 때까지 대기했다가 새 토큰으로 진행
    return await new Promise<InternalAxiosRequestConfig>((resolve) => {
      subscribeRefresh((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(config);
      });
    });
  }

  // 정상 토큰이면 그대로 헤더 세팅
  console.log("3")
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
/*
    const exp = Number(localStorage.getItem("p_exp"));
    const currentTime = Math.floor(Date.now() / 1000); // 초 단위
    const timeLeft = exp - currentTime;
    const context = config.url?.includes("login") ? "login" : "service";
    const isPublic = config.url?.includes(PUBGATEWAY_URL!);
    // ✅ public 요청이면 토큰 로직 생략
  if (isPublic) {
    console.log("🟢 공용 서비스 요청 → 토큰 확인 생략");
    return config;
  }

  if (timeLeft < 60) {
    console.log("🔁 access_token 만료 → refresh_token으로 재발급 시도");

    try {
      const id = localStorage.getItem("id");
      const response = await axios.post(
        `${GATEWAY_URL}/token/refresh`,
        {
          id: id,
          context: context,
        },
        {
          withCredentials: true,
        }
      );

      const newToken = response.data.data.access_token;
      const newExp = response.data.data.exp;

      localStorage.setItem("a_id", newToken);
      localStorage.setItem("p_exp", newExp.toString());

      console.log("✅ access_token 재발급 성공");
    } catch (error) {
        console.log("아니 겨이 오는거야?")
      console.warn("❌ refresh_token도 만료됨. 로그인 필요");
      localStorage.clear();
      window.location.href = "/login";
      //return Promise.reject(error);
    }
  }

  // access_token 존재 시 Authorization 헤더 자동 세팅
  const accessToken = localStorage.getItem("a_id");
  if (accessToken) {
    console.log("만료되지 않음")
    config.headers["Authorization"] = `${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
  */
