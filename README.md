# 🐾 Aniverse Frontend

반려동물(일반 + 특수/희귀 동물) 소셜 플랫폼 **Aniverse**의  
프론트엔드 애플리케이션입니다.

본 프로젝트는 **React 기반 SPA**로 구성되어 있으며,  
백엔드 마이크로서비스 아키텍처와 연동되는 UI 레이어를 담당합니다.

---

## 📌 Project Overview

- 사용자 인증 (일반 로그인 / 소셜 로그인)
- 게시글 작성 및 파일 업로드
- 위치 기반 태그 및 반려동물 정보 등록
- 실시간 채팅 및 알림 UI
- 공통 컴포넌트 재사용을 고려한 구조 설계

---

## 🛠 Tech Stack

- **Framework / Language**
  - React
  - TypeScript
- **State Management**
  - React Context API
- **Styling**
  - SCSS
- **Communication**
  - REST API
  - WebSocket (STOMP)
- **Deploy / Infra**
  - Nginx
  - Docker

---

## 📁 Frontend Directory Structure

```text
src
├─ API            # 서버 API 호출 모듈
├─ Common         # 공통 UI 컴포넌트 (Button, Modal 등)
├─ Context        # 전역 상태 관리 (Auth, Chat 등)
├─ Layout         # 페이지 레이아웃 (Header, Footer)
├─ Navigation     # 네비게이션 관련 컴포넌트
├─ Modal          # 공통 모달 UI
├─ Upload         # 파일/이미지 업로드 기능
├─ Chat           # 실시간 채팅 UI
├─ Notification   # 알림 UI
├─ Main           # 메인 페이지

---

## 🔗 External APIs & Integrations

### Kakao Map API
- 장소 검색 및 위치 선택 UI 구현
- 게시글 작성 시 위치 기반 태그 생성
- 사용자 입력 기반 위치 데이터 시각화

### Social Login APIs (Kakao / Naver)
- OAuth 기반 소셜 로그인 연동
- 프론트엔드는 Authorization Code만 전달
- 토큰 발급 및 사용자 정보 처리는 백엔드 인증 서버에서 일괄 처리

├─ Profile        # 프로필 페이지
└─ Error_Page     # 에러 페이지
