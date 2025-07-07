# 1단계: 빌드
FROM node:18 AS build
WORKDIR /app

# 소스 복사
COPY . .

# 디버깅용: 현재 폴더 구조, package.json 출력
RUN echo "=== 📂 현재 폴더 구조 ===" && ls -al
RUN echo "=== 📄 package.json 내용 ===" && cat package.json

# 의존성 설치 및 빌드
RUN npm install
RUN npm run build

# ✅ 빌드 결과 확인 - dist 내부까지
RUN echo "✅ 빌드 완료 후 dist 폴더 확인 ===" \
  && ls -al \
  && echo "📁 dist 디렉토리:" && ls -al dist \
  && echo "📄 index.html (앞 10줄):" && head -n 10 dist/index.html || echo "❌ index.html 없음"

# 2단계: 배포용 Nginx
FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
