import DogThumb from "../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../assets/images/landing_generated/pet_thumb_cat.png";
import BirdThumb from "../assets/images/landing_generated/pet_thumb_bird.png";
import RabbitThumb from "../assets/images/landing_generated/pet_thumb_rabbit.png";
import LizardThumb from "../assets/images/landing_generated/pet_thumb_lizard.png";
import FishThumb from "../assets/images/landing_generated/pet_thumb_fish.png";
import CommunityFeedImage from "../assets/images/feature_cards/community_feed.svg";
import PetProfileImage from "../assets/images/feature_cards/pet_profile.svg";
import RecommendImage from "../assets/images/feature_cards/recommend.svg";
import HospitalLocationImage from "../assets/images/feature_cards/hospital_location.svg";
import EventsMeetupsImage from "../assets/images/feature_cards/events_meetups.svg";
import MarketShareImage from "../assets/images/feature_cards/market_share.svg";
import DailyNewsImage from "../assets/images/feature_cards/daily_news.svg";
import SafetyReportImage from "../assets/images/feature_cards/safety_report.svg";
import MultilingualImage from "../assets/images/feature_cards/multilingual.svg";

export type ImageItem = {
  image: string;
};

export type ServiceCategory = ImageItem & {
  title: string;
  desc: string;
};

export type FeatureCard = ImageItem & {
  title: string;
  description: string;
  tone: string;
};

export type PreviewPost = ImageItem & {
  author: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
};

export type LandingEvent = ImageItem & {
  badge: string;
  title: string;
  period: string;
  description: string;
  people: string;
  cta: string;
  tone: string;
};

export type GuideCard = ImageItem & {
  title: string;
  description: string;
};

export type BrowseCategory = ImageItem & {
  label: string;
};

export type PopularPost = ImageItem & {
  rank?: string;
  badge: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
};

export type CommunityItem = ImageItem & {
  title: string;
  members: string;
  desc: string;
};

export type BrowseEvent = ImageItem & {
  title: string;
  period: string;
  action: string;
  tone: string;
};

export type NearbyPet = ImageItem & {
  name: string;
  meta: string;
  bio: string;
  distance: string;
};

export const serviceCategories: ServiceCategory[] = [
  { title: "강아지", desc: "산책, 건강, 행동 교정", image: DogThumb },
  { title: "고양이", desc: "일상 기록, 사료, 케어 정보", image: CatThumb },
  { title: "파충류", desc: "도마뱀, 거북이, 환경 세팅", image: LizardThumb },
  { title: "조류", desc: "앵무새, 핀치, 놀이와 훈련", image: BirdThumb },
  { title: "소동물", desc: "토끼, 햄스터, 소형 반려동물", image: RabbitThumb },
  { title: "관상어", desc: "수조 관리와 물생활 팁", image: FishThumb },
];

export const featureCards: FeatureCard[] = [
  {
    title: "커뮤니티 피드",
    description: "일상 공유, 질문, 정보 교환을 동물별 주제로 나눠 빠르게 찾아볼 수 있어요.",
    tone: "pink",
    image: CommunityFeedImage,
  },
  {
    title: "반려동물 프로필",
    description: "아이의 성격, 건강 기록, 관심사를 한곳에 정리해 보호자들과 연결해요.",
    tone: "green",
    image: PetProfileImage,
  },
  {
    title: "맞춤 추천",
    description: "관심 동물과 활동 기록을 기반으로 게시글, 모임, 가이드를 추천해요.",
    tone: "purple",
    image: RecommendImage,
  },
  {
    title: "병원과 위치 찾기",
    description: "주변 병원, 산책 코스, 반려동물 친화 장소를 지도에서 확인해요.",
    tone: "blue",
    image: HospitalLocationImage,
  },
  {
    title: "이벤트와 모임",
    description: "사진 챌린지, 오프라인 모임, 교육 프로그램을 한눈에 살펴봐요.",
    tone: "yellow",
    image: EventsMeetupsImage,
  },
  {
    title: "마켓과 나눔",
    description: "필요한 물품을 찾고, 사용하지 않는 용품은 이웃 보호자와 나눠요.",
    tone: "orange",
    image: MarketShareImage,
  },
  {
    title: "일상 소식",
    description: "관심 주제의 새 글과 댓글 반응을 빠르게 확인할 수 있어요.",
    tone: "green",
    image: DailyNewsImage,
  },
  {
    title: "안전 신고",
    description: "긴급 상황, 실종 제보, 위험 정보를 커뮤니티와 빠르게 공유해요.",
    tone: "pink",
    image: SafetyReportImage,
  },
  {
    title: "다국어 지원",
    description: "다양한 언어권 보호자도 쉽게 정보를 나누고 소통할 수 있어요.",
    tone: "blue",
    image: MultilingualImage,
  },
];

export const communityPreviewPosts: PreviewPost[] = [
  {
    author: "뭉치보호자",
    time: "30분 전",
    text: "오늘 산책길에서 만난 친구들과 놀이 시간이 정말 좋았어요. 초보 보호자도 갈 만한 코스예요.",
    likes: 124,
    comments: 23,
    image: DogThumb,
  },
  {
    author: "루나집사",
    time: "14분 전",
    text: "고양이 습식 사료를 바꾸려고 하는데 입맛 까다로운 아이에게 추천할 제품이 있을까요?",
    likes: 89,
    comments: 45,
    image: CatThumb,
  },
  {
    author: "레오파드맘",
    time: "2시간 전",
    text: "레오파드게코 온도 관리 팁을 정리해봤어요. 밤낮 온도 차이가 생각보다 중요하네요.",
    likes: 67,
    comments: 12,
    image: LizardThumb,
  },
];

export const communityHashtags = ["오늘의산책", "사료추천", "반려동물일상", "질문답변", "자유수다", "초보집사"];

export const communityRanking = [
  "강아지 여름철 관리법",
  "고양이 장난감 비교",
  "산책 코스 추천",
  "반려동물 보험 체크",
  "초보 집사 가이드",
];

export const landingEvents: LandingEvent[] = [
  {
    badge: "진행 중",
    title: "봄맞이 산책 챌린지",
    period: "2026.04.01 - 2026.05.20",
    description: "매일 산책하고 인증글을 올리면 추첨을 통해 반려동물 용품을 드려요.",
    people: "참여자 1,234명",
    cta: "참여하기",
    image: DogThumb,
    tone: "green",
  },
  {
    badge: "진행 중",
    title: "우리집 냥이 자랑대회",
    period: "2026.05.01 - 2026.05.31",
    description: "사랑스러운 고양이 사진과 이야기를 공유하고 인기 투표에 참여해요.",
    people: "참여자 856명",
    cta: "참여하기",
    image: CatThumb,
    tone: "orange",
  },
  {
    badge: "예약",
    title: "앵무새 행동 교실",
    period: "2026.05.10 - 2026.05.18",
    description: "전문가와 함께 말썽 행동을 이해하고 훈련 루틴을 배워보는 온라인 클래스예요.",
    people: "대기자 120명",
    cta: "알림 신청",
    image: BirdThumb,
    tone: "olive",
  },
  {
    badge: "예정",
    title: "수조 꾸미기 대회",
    period: "2026.05.20 - 2026.06.05",
    description: "멋진 어항 레이아웃을 소개하고 물생활 보호자들과 노하우를 나눠요.",
    people: "관심 320명",
    cta: "알림 신청",
    image: FishThumb,
    tone: "blue",
  },
];

export const guideCards: GuideCard[] = [
  {
    image: RabbitThumb,
    title: "초보 보호자 가이드",
    description: "입양 전 준비물부터 첫 일주일 체크리스트까지 차근차근 안내해요.",
  },
  {
    image: LizardThumb,
    title: "동물별 케어 가이드",
    description: "강아지, 고양이, 조류, 파충류 등 종별 관리 포인트를 정리했어요.",
  },
  {
    image: CatThumb,
    title: "건강과 행동 가이드",
    description: "건강 신호, 생활 습관, 문제 행동을 이해하는 기본 지식을 모았어요.",
  },
  {
    image: DogThumb,
    title: "성장과 훈련 가이드",
    description: "사회화, 산책 예절, 놀이 훈련을 보호자 눈높이에 맞춰 알려줘요.",
  },
  {
    image: BirdThumb,
    title: "자주 묻는 질문",
    description: "처음 만나는 상황에서 보호자들이 가장 많이 묻는 답을 확인해요.",
  },
];

export const browseCategories: BrowseCategory[] = [
  { label: "전체", image: DogThumb },
  { label: "강아지", image: DogThumb },
  { label: "고양이", image: CatThumb },
  { label: "파충류", image: LizardThumb },
  { label: "양서류", image: LizardThumb },
  { label: "조류", image: BirdThumb },
  { label: "소동물", image: RabbitThumb },
  { label: "곤충", image: LizardThumb },
  { label: "관상어", image: FishThumb },
  { label: "기타", image: CatThumb },
];

export const popularPosts: PopularPost[] = [
  { rank: "1", badge: "강아지", title: "우리 동네 산책 코스 추천해요", author: "행복한말티즈", likes: 253, comments: 67, image: DogThumb },
  { rank: "2", badge: "고양이", title: "입맛 까다로운 고양이 사료 비교", author: "루나집사", likes: 198, comments: 45, image: CatThumb },
  { rank: "3", badge: "조류", title: "앵무새 훈련, 이렇게 하니 효과 만점", author: "초록날개", likes: 164, comments: 38, image: BirdThumb },
  { badge: "파충류", title: "비어디드래곤 온도 관리는 어떻게 하세요?", author: "테라리움러버", likes: 121, comments: 29, image: LizardThumb },
  { badge: "소동물", title: "토끼가 좋아하는 간식 추천해주세요", author: "토끼토끼", likes: 98, comments: 23, image: RabbitThumb },
];

export const communities: CommunityItem[] = [
  { title: "강아지 산책 모임", members: "12,458명", desc: "매일 산책 인증과 지역별 코스를 공유해요.", image: DogThumb },
  { title: "고양이 집사방", members: "8,976명", desc: "고양이 생활, 건강, 놀이 정보를 나눠요.", image: CatThumb },
  { title: "앵무새 사랑방", members: "7,542명", desc: "조류 보호자들의 훈련과 교감 이야기를 모아요.", image: BirdThumb },
  { title: "파충류 케어룸", members: "6,381명", desc: "온도, 습도, 먹이 등 사육 정보를 공유해요.", image: LizardThumb },
  { title: "소동물 행복 모임", members: "5,203명", desc: "작고 소중한 친구들의 일상을 나눠요.", image: RabbitThumb },
  { title: "물생활 연구소", members: "3,112명", desc: "수조 관리와 관상어 정보를 함께 정리해요.", image: FishThumb },
];

export const browseEvents: BrowseEvent[] = [
  { title: "우리집 귀염둥이 사진 콘테스트", period: "5.01 - 5.31", action: "참여하기", tone: "rose", image: DogThumb },
  { title: "고양이 장난감 리뷰전", period: "5.05 - 5.25", action: "참여하기", tone: "violet", image: CatThumb },
  { title: "새 가족을 소개합니다", period: "5.10 - 5.30", action: "참여하기", tone: "gold", image: BirdThumb },
  { title: "수조 건강 지키기 챌린지", period: "5.15 - 6.05", action: "참여하기", tone: "mint", image: FishThumb },
];

export const nearbyPets: NearbyPet[] = [
  { name: "몽이", meta: "말티즈 · 2살 · 남아", bio: "산책과 공놀이를 좋아해요.", distance: "0.3km", image: DogThumb },
  { name: "루비", meta: "코리안숏헤어 · 3살 · 여아", bio: "창가 낮잠과 낚싯대를 좋아해요.", distance: "0.5km", image: CatThumb },
  { name: "초록이", meta: "앵무새 · 4살 · 남아", bio: "사람을 좋아하고 말 따라하기를 즐겨요.", distance: "0.7km", image: BirdThumb },
  { name: "토토", meta: "미니렉스 · 1살 · 여아", bio: "당근 간식과 숨바꼭질을 좋아해요.", distance: "0.8km", image: RabbitThumb },
  { name: "거북이", meta: "반수생 거북 · 5살 · 남아", bio: "햇볕 쬐기와 수영을 즐겨요.", distance: "1.1km", image: LizardThumb },
];
