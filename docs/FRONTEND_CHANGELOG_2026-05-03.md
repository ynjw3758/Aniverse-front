# Aniverse Frontend 작업 변경 기록

작성일: 2026-05-03  
대상 프로젝트: `Aniverse_Front-dev`  
작업 범위: Explore 페이지 최종 플랫폼형 UI 적용, Main 페이지 적용 방향 정리

## 1. 작업 배경

기존 `/explore`와 `/main` 화면은 피드, 스토리, 좋아요, 댓글 중심 구조라 SNS 플랫폼 인상이 강했다.

최종 방향은 SNS가 아니라 반려동물 생활 플랫폼이다. 따라서 화면 첫인상에서 커뮤니티 피드보다 아래 기능들이 먼저 보여야 한다.

- 반려동물 프로필
- 건강 기록 및 케어 관리
- 커뮤니티 피드
- 이벤트와 모임
- 병원 및 위치 찾기
- 맞춤 추천 콘텐츠
- 마켓과 나눔

## 2. Explore 페이지 변경 내용

`/explore`는 비로그인 사용자가 서비스 전체 분위기를 둘러보는 페이지로 재구성했다.

수정 파일:

- `src/Home/Explore/ExplorePage.tsx`
- `src/Home/Explore/ExplorePage.scss`

새 구조:

```text
ExplorePage
├─ 상단 헤더
│  ├─ Aniverse 로고
│  ├─ 통합 검색
│  └─ 알림 / 메시지 / 프로필 액션
├─ 좌측 사이드 메뉴
│  ├─ 홈
│  ├─ 커뮤니티 피드
│  ├─ 반려동물 프로필
│  ├─ 맞춤 추천
│  ├─ 병원과 위치 찾기
│  ├─ 이벤트와 모임
│  ├─ 마켓과 나눔
│  ├─ 일상 소식
│  ├─ 안전 신고
│  └─ 다국어 지원
├─ 중앙 콘텐츠
│  ├─ 환영/소개 영역
│  ├─ 반려동물 플랫폼 히어로
│  ├─ 주요 기능 바로가기
│  ├─ 커뮤니티 피드 요약
│  ├─ 이벤트 & 모임 요약
│  └─ 건강 체크 배너
└─ 우측 패널
   ├─ 다양한 아이들
   └─ 맞춤 추천 콘텐츠
```

## 3. Explore 이미지 에셋 추가

기존에는 여러 동물 이미지를 각각 배치해서 사각 배경이 따로 보이는 문제가 있었다.

최종 디자인과 맞추기 위해 동물 이미지를 한 장의 투명 PNG로 생성해서 적용했다.

추가 파일:

- `src/assets/images/explore_premium_pets.png`
- `src/assets/images/explore_hero_pets.png`

적용 위치:

- `explore_premium_pets.png`
  - 좌측 `Aniverse 프리미엄` 카드 하단 장식 이미지
  - 햄스터, 앵무새, 토끼 묶음 이미지

- `explore_hero_pets.png`
  - 중앙 히어로 영역 동물 묶음 이미지
  - 강아지, 고양이, 앵무새, 토끼, 파충류, 곤충을 한 이미지로 구성

## 4. Explore 상호작용 정책

`/explore`는 비로그인 둘러보기 페이지이므로 실제 기능 실행은 하지 않는다.

아래 액션은 모두 로그인 유도 모달을 띄운다.

- 반려동물 추가
- 건강 기록 관리
- 주요 기능 바로가기
- 커뮤니티 피드 더보기
- 이벤트 더보기
- 다양한 아이들 상세 보기
- 맞춤 추천 콘텐츠 상세 보기
- 알림 / 메시지 / 프로필 클릭

## 5. Main 페이지 적용 방향

`/main`은 실제 로그인 후 사용하는 페이지라 `/explore`처럼 단순 정적 UI로 교체하면 안 된다.

기존 Main 페이지에는 다음 실제 기능이 이미 연결되어 있다.

- 메인 데이터 API 요청
- Mongo 기반 게시물 렌더링
- 게시물 이미지/비디오 슬라이드
- 좋아요 / 댓글
- 업로드 모달
- 채팅 이동
- 알림 패널
- 프로필 이동
- 로그인 만료 처리

따라서 Main 페이지는 폴더를 완전히 새로 만들기보다 기존 `src/Main` 안에서 새 UI 컴포넌트를 분리해 점진적으로 적용하는 방향이 좋다.

추천 구조:

```text
src/Main/
├─ MainPage.tsx
├─ MainPage.scss
├─ components/
│  ├─ MainTopBar.tsx
│  ├─ MainSidebar.tsx
│  ├─ MainHero.tsx
│  ├─ MainQuickLinks.tsx
│  ├─ MainCommunityFeed.tsx
│  ├─ MainPetPanel.tsx
│  ├─ MainRecommendationPanel.tsx
│  ├─ MainEventPanel.tsx
│  └─ MainCareBanner.tsx
└─ Contents/
   └─ 기존 게시물 컴포넌트 유지
```

## 6. Main 페이지에서 유지해야 할 부분

기존 게시물 기능은 삭제하지 않는다.

대신 새 플랫폼형 UI 안에서 `커뮤니티 피드` 영역으로 이동시킨다.

유지 대상:

- `src/Main/Contents/MainContents.tsx`
- `src/Main/Contents/Contents.tsx`
- `src/Main/Contents/ContentItem.tsx`
- 게시물 이미지/비디오 슬라이드 로직
- 댓글 입력 및 댓글 보기 로직
- 좋아요 로직
- 업로드 모달 연결

## 7. Main 페이지에서 비활성화한 부분

게시글 작성자 프로필 hover 시 작은 프로필을 불러오는 기능은 현재 사용하지 않는다.

백엔드에서 해당 엔드포인트가 제거되어 에러가 발생했기 때문에 일단 비활성화했다.

대상:

- `profile/Smallprofile`
- 게시글 작성자 프로필 hover 호출
- 작은 프로필 미리보기 모달

수정 파일:

- `src/Main/Contents/ContentItem.tsx`

## 8. Main 페이지 슬라이드 수정 내용

게시물 이미지/비디오 슬라이드는 유지한다.

수정한 이유:

- 새 레이아웃 적용 과정에서 여러 이미지가 세로로 펼쳐지는 문제가 있었다.
- 마지막 슬라이드에서 오른쪽 버튼을 눌렀을 때 인덱스가 범위를 벗어나며 비디오 source 에러가 발생했다.

수정 내용:

- 슬라이드 페이지 값을 `1 ~ total` 범위로 제한
- 이미지 페이지에서는 비디오 재생을 시도하지 않도록 수정
- 비디오 페이지일 때만 정확한 비디오 ref를 계산해서 재생
- 화살표를 실제 슬라이드 영역 양끝 기준으로 배치

수정 파일:

- `src/Main/Slide/Slide.tsx`
- `src/Main/Contents/ContentItem.tsx`
- `src/Main/Contents/ContentItem.scss`

## 9. Main 페이지 향후 적용 순서

Main 페이지는 아래 순서로 적용하는 것이 안전하다.

1. `src/Main/components` 폴더 생성
2. Explore 최종 UI를 Main 전용 컴포넌트로 분리
3. `MainPage.tsx`는 API와 핸들러를 유지하는 컨테이너로 정리
4. 기존 `MainContentsx`를 새 `MainCommunityFeed` 안에 배치
5. 좌측 메뉴를 새 플랫폼 메뉴로 교체하되 클릭 함수는 기존 라우팅/핸들러에 연결
6. 우측 `우리 아이들` 패널은 실제 반려동물 API 연결 전까지 placeholder 또는 mock 데이터 사용
7. 건강 기록, 병원 찾기, 이벤트, 마켓 기능은 일단 버튼/함수만 연결
8. 전체 레이아웃 확인 후 Main 실제 API 응답과 연결 범위 확장

## 10. 검증

아래 명령으로 TypeScript 검사를 진행했다.

```bash
npx tsc --noEmit --skipLibCheck
```

결과:

- 통과

참고:

- `--skipLibCheck`를 사용한 이유는 기존 프로젝트에 `react-router-dom` v6와 `@types/react-router-dom` v5 타입 충돌이 있기 때문이다.
- 해당 타입 충돌은 이번 UI 작업과 별개다.

