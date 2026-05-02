# Aniverse Frontend 작업 변경 기록

작성일: 2026-05-02  
대상 프로젝트: `Aniverse_Front-dev`  
작업 범위: 로그인 전 랜딩 페이지, 둘러보기/탐색 페이지, 라우팅, 목데이터 기반 UI

## 1. 작업 배경

Aniverse 프론트의 로그인 전 사용자 흐름을 정리하기 위해 랜딩 페이지와 서비스 미리보기 화면을 개편했다.

기존에는 랜딩의 "둘러보기" 기능이 `/community/browse`로 연결되어 있었고, 해당 페이지는 단일 페이지 중심의 커뮤니티 미리보기 화면이었다. 이후 요구사항이 구체화되면서 로그인 전 사용자도 검색과 카테고리 필터를 통해 서비스를 탐색할 수 있는 별도 `/explore` 페이지 구조가 필요해졌다.

이번 작업에서는 기존 `/community/browse`는 보존하고, 새 요구사항에 맞춰 `src/Home/Explore/` 기반의 독립적인 탐색 페이지를 구축했다.

## 2. 주요 변경 사항

### 랜딩 페이지

- 랜딩 페이지 기준 파일은 `src/Home/LandingPage.tsx`이다.
- 랜딩 상단/히어로/섹션 UI의 깨진 한글 문구와 일부 JSX 오류를 정상화했다.
- 랜딩의 "둘러보기" 버튼 이동 경로를 기존 `/community/browse`에서 새 `/explore`로 변경했다.
- 로그인/회원가입/시작하기 기본 라우팅은 유지했다.
  - 로그인: `/login`
  - 회원가입: `/sign`
  - 랜딩: `/`
  - 새 둘러보기: `/explore`

### 기존 커뮤니티 둘러보기 페이지

- 기존 파일은 유지했다.
  - `src/Home/CommunityBrowsePage.tsx`
  - `src/Home/CommunityBrowsePage.scss`
- 기존 라우트 `/community/browse`도 유지했다.
- 단, 랜딩의 주요 "둘러보기" 진입점은 새 `/explore`로 변경했다.

### 새 Explore 페이지

새 구조를 아래처럼 추가했다.

```text
src/Home/Explore/
  ExplorePage.tsx
  ExplorePage.scss
  exploreMockData.ts
  components/
    ExploreHeader.tsx
    AnimalCategoryTabs.tsx
    TrendingPosts.tsx
    ActiveCommunities.tsx
    EventPreview.tsx
    NearbyPetsPreview.tsx
    ExploreCTA.tsx
```

`/explore`는 로그인 전 사용자도 접근 가능한 서비스 미리보기/탐색 페이지다. 백엔드 API는 연결하지 않았고, `exploreMockData.ts`의 목데이터를 기준으로 동작한다.

## 3. Explore 기능 상세

### 검색 기능

- `ExplorePage.tsx`에서 `searchTerm` state로 검색어를 관리한다.
- 검색어 입력 시 아래 데이터가 실시간 필터링된다.
  - 인기 게시글
  - 활발한 커뮤니티
  - 진행중인 이벤트
  - 내 주변 펫 친구들
- 검색 기준은 제목, 내용/설명, 카테고리, 태그다.

### 카테고리 필터

카테고리는 `exploreMockData.ts`의 `categories`에 정의했다.

- 전체
- 강아지
- 고양이
- 파충류
- 양서류
- 조류
- 소동물
- 곤충/절지류
- 관상어
- 기타

선택된 카테고리는 분홍색 강조 스타일로 표시된다. 카테고리 선택 시 게시글, 커뮤니티, 이벤트, 주변 펫 목록이 함께 변경된다.

### 인기 게시글

- 컴포넌트: `TrendingPosts.tsx`
- 카드형 UI로 렌더링한다.
- 표시 정보:
  - 이미지
  - 카테고리 배지
  - 제목
  - 작성자
  - 내용 요약
  - 좋아요 수
  - 댓글 수
- 카드 클릭 시 상세 페이지로 이동하지 않고 로그인 유도 모달을 띄운다.

### 활발한 커뮤니티

- 컴포넌트: `ActiveCommunities.tsx`
- 목데이터 기반 커뮤니티 카드를 렌더링한다.
- 예시 커뮤니티:
  - 강아지 산책 모임
  - 고양이 집사들
  - 레오파드게코 정보방
  - 비어디드래곤 사육방
  - 앵무새 사랑방
  - 곤충 덕후 모임
- 카드 클릭 시 로그인 유도 모달을 띄운다.

### 진행중인 이벤트

- 컴포넌트: `EventPreview.tsx`
- 전체/카테고리별 이벤트 목데이터를 표시한다.
- 이벤트 클릭 시 로그인 유도 모달을 띄운다.

### 내 주변 펫 친구들 미리보기

- 컴포넌트: `NearbyPetsPreview.tsx`
- 실제 위치 API는 연결하지 않았다.
- 목데이터로 위치 기반 미리보기처럼 표시한다.
- 위치 변경 버튼은 UI만 존재하며 클릭 시 로그인 유도 모달을 띄운다.
- 펫 카드 정보:
  - 이미지
  - 이름
  - 종
  - 거리
  - 짧은 소개

### 하단 CTA

- 컴포넌트: `ExploreCTA.tsx`
- 문구: "더 많은 이야기와 기능을 경험해보세요!"
- 회원가입 버튼은 `/sign`으로 이동한다.
- 로그인 버튼은 `/login`으로 이동한다.

## 4. 라우팅 변경

`src/routes/AppRout.tsx`에 아래 라우트를 추가했다.

```tsx
{
  path: "/explore",
  element: <ExplorePage />,
  errorElement: <Not_found />,
}
```

`ExplorePage` import도 추가했다.

```tsx
import ExplorePage from "../Home/Explore/ExplorePage";
```

기존 `/community/browse` 라우트는 삭제하지 않고 유지했다.

## 5. 데이터 구조

`src/Home/Explore/exploreMockData.ts`에 목데이터를 분리했다.

분리된 데이터:

- `categories`
- `explorePosts`
- `communities`
- `events`
- `nearbyPets`

각 데이터는 검색/카테고리 필터가 가능하도록 `category` 필드를 가진다. 게시글은 각 카테고리별 최소 2개 이상 들어가도록 구성했다.

데이터와 UI를 분리했기 때문에 추후 API 연결 시 `exploreMockData.ts`를 API 응답으로 교체하거나, `ExplorePage.tsx`에서 fetch 로직으로 대체하기 쉽다.

## 6. UI/스타일 방향

스타일 파일:

- `src/Home/Explore/ExplorePage.scss`

적용한 UI 방향:

- 기존 Aniverse 랜딩과 유사한 화이트/연핑크 톤
- 둥근 카드
- 부드러운 그림자
- 넓은 여백
- 강아지/고양이 중심이 아닌 모든 반려동물 플랫폼 느낌
- 기본 반응형 지원

모바일에서 완전한 상세 최적화까지는 아니지만, 그리드가 1열 또는 2열로 자연스럽게 줄어들도록 구성했다.

## 7. 로그인 전 액션 처리

로그인 전 미리보기 페이지이므로 실제 액션은 수행하지 않는다.

아래 액션은 모두 로그인 유도 모달을 띄운다.

- 게시글 카드 클릭
- 커뮤니티 카드 클릭
- 이벤트 카드 클릭
- 위치 변경 버튼 클릭
- 펫 상세보기 클릭

모달 문구:

```text
로그인 후 이용할 수 있어요
게시글 상세, 커뮤니티 참여, 이벤트 신청, 펫 친구 상세보기는 로그인 후 사용할 수 있습니다.
```

## 8. 빌드 확인

PowerShell에서 `npm run build`는 실행 정책 문제로 막힐 수 있어 아래 명령으로 확인했다.

```bash
cmd.exe /c npm.cmd run build
```

확인 결과 webpack production build가 성공했다.

## 9. 변경 파일 요약

새로 추가한 파일:

- `src/Home/Explore/ExplorePage.tsx`
- `src/Home/Explore/ExplorePage.scss`
- `src/Home/Explore/exploreMockData.ts`
- `src/Home/Explore/components/ExploreHeader.tsx`
- `src/Home/Explore/components/AnimalCategoryTabs.tsx`
- `src/Home/Explore/components/TrendingPosts.tsx`
- `src/Home/Explore/components/ActiveCommunities.tsx`
- `src/Home/Explore/components/EventPreview.tsx`
- `src/Home/Explore/components/NearbyPetsPreview.tsx`
- `src/Home/Explore/components/ExploreCTA.tsx`

수정한 주요 파일:

- `src/Home/LandingPage.tsx`
- `src/routes/AppRout.tsx`
- `src/Home/LandingPage.scss`
- `src/Home/LandingFeatureSection.tsx`
- `src/Home/LandingCommunitySection.tsx`
- `src/Home/LandingEventSection.tsx`
- `src/Home/LandingGuideSection.tsx`
- `src/Home/LandingSharedFooter.tsx`

기존 유지 파일:

- `src/Home/CommunityBrowsePage.tsx`
- `src/Home/CommunityBrowsePage.scss`

## 10. 접속 방법

개발 서버 실행 후 아래 주소로 접속한다.

```text
http://localhost:3000/explore
```

랜딩 페이지에서 "둘러보기" 버튼을 클릭해도 `/explore`로 이동한다.

## 11. 추후 작업 메모

- `/community/browse`를 계속 유지할지, `/explore`로 통합할지 결정 필요
- Explore 목데이터를 실제 API로 교체하는 작업 필요
- 검색/카테고리 상태를 URL query string으로 유지할지 검토 가능
- 로그인 유도 모달을 공통 컴포넌트로 분리할 수 있음
- 카드 클릭 시 상세 페이지 라우팅은 백엔드/API 준비 이후 연결 예정

## 12. 이미지 매칭 수정 기록

Explore 게시글 카드에서 카테고리 대표 이미지를 반복 사용하면서 제목과 이미지가 맞지 않는 문제가 있었다. 예를 들어 비어디드래곤 게시글에 일반 도마뱀 이미지가 보이거나, 햄스터 게시글에 토끼 이미지가 보이는 식이었다.

아래 실사형 썸네일 asset을 추가하고 `exploreMockData.ts`에서 제목별로 개별 이미지를 연결했다.

- `pet_thumb_leopard_gecko.png`
- `pet_thumb_bearded_dragon.png`
- `pet_thumb_pacman_frog.png`
- `pet_thumb_salamander.png`
- `pet_thumb_hamster.png`
- `pet_thumb_tarantula.png`
- `pet_thumb_finch.png`
- `pet_thumb_guppy.png`

또한 양서류와 곤충/절지류 카테고리 대표 이미지도 아이콘/3D 느낌이 강해 실사형 이미지로 교체했다.

## 13. Explore 메인 피드 미리보기 개편

기존 `/explore`는 랜딩/카드형 탐색 페이지에 가까웠다. 이후 요구사항에 맞춰 로그인 후 `MainPage`와 유사한 "로그인 전 메인 피드 미리보기" 형태로 구조를 변경했다.

핵심 변경:

- `/explore`를 3단 레이아웃으로 재구성했다.
  - 좌측 사이드바
  - 중앙 피드
  - 우측 패널
- 기존 `MainPage.scss`의 레이아웃 톤을 참고하되, `MainPage` 코드는 수정하지 않았다.
- 브랜드 노출 텍스트는 `Aniverse` 기준으로 맞췄다.
- 기존 카드형 컴포넌트를 제거하고 Explore 전용 피드 컴포넌트로 교체했다.

현재 Explore 컴포넌트 구조:

```text
src/Home/Explore/
  ExplorePage.tsx
  ExplorePage.scss
  exploreMockData.ts
  components/
    ExploreSidebar.tsx
    ExploreTopBar.tsx
    ExploreStoryBar.tsx
    ExploreCategoryTabs.tsx
    ExploreFeed.tsx
    ExplorePostCard.tsx
    ExploreRightPanel.tsx
    LoginRequiredModal.tsx
    ExploreCTA.tsx
```

데이터 구조도 메인 피드 미리보기 목적에 맞게 재정리했다.

- `categories`
- `stories`
- `posts`
- `communities`
- `hashtags`
- `events`
- `nearbyPets`

검색/필터 동작:

- 초기 상태는 `category = "전체"`, `searchKeyword = ""`이다.
- 검색어가 있으면 중앙 피드와 우측 패널 데이터가 같은 화면에서 필터링된다.
- 검색 기준은 게시글의 `title`, `content`, `tags`, `author`, `category`와 커뮤니티/이벤트/주변 펫의 주요 텍스트 필드다.
- 카테고리와 검색어가 동시에 있을 경우 AND 조건으로 필터링한다.
- 결과가 없으면 중앙 피드에 빈 상태 UI를 표시한다.

로그인 유도 모달이 뜨는 액션:

- 좋아요
- 댓글
- 공유
- 저장
- 채팅
- 알림
- 게시글 작성
- 스토리 만들기
- 게시글 상세 클릭
- 이벤트 참여
- 커뮤니티 클릭
- 근처 펫 상세보기

모달 문구:

```text
로그인 후 모든 기능을 이용할 수 있어요!
좋아요, 댓글, 채팅 등 모든 기능은 로그인 후 자유롭게 이용할 수 있어요.
```

검증:

- `cmd.exe /c npm.cmd run build`로 production build 성공 확인.
- `MainPage` 파일은 수정하지 않아 로그인 후 메인 페이지 기능에는 직접 영향이 없도록 했다.
