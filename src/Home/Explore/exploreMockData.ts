import DogThumb from "../../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../../assets/images/landing_generated/pet_thumb_cat.png";
import BirdThumb from "../../assets/images/landing_generated/pet_thumb_bird.png";
import RabbitThumb from "../../assets/images/landing_generated/pet_thumb_rabbit.png";
import FishThumb from "../../assets/images/landing_generated/pet_thumb_fish.png";
import AmphibiaThumb from "../../assets/images/landing_generated/pet_thumb_amphibia.png";
import InsectThumb from "../../assets/images/landing_generated/pet_thumb_arthropod.png";
import BeardedDragonThumb from "../../assets/images/landing_generated/pet_thumb_bearded_dragon.png";
import FinchThumb from "../../assets/images/landing_generated/pet_thumb_finch.png";
import GuppyThumb from "../../assets/images/landing_generated/pet_thumb_guppy.png";
import HamsterThumb from "../../assets/images/landing_generated/pet_thumb_hamster.png";
import LeopardGeckoThumb from "../../assets/images/landing_generated/pet_thumb_leopard_gecko.png";
import PacmanFrogThumb from "../../assets/images/landing_generated/pet_thumb_pacman_frog.png";
import SalamanderThumb from "../../assets/images/landing_generated/pet_thumb_salamander.png";
import TarantulaThumb from "../../assets/images/landing_generated/pet_thumb_tarantula.png";

export type ExploreCategory =
  | "전체"
  | "강아지"
  | "고양이"
  | "파충류"
  | "양서류"
  | "조류"
  | "소동물"
  | "곤충/절지류"
  | "관상어"
  | "기타";

export type CategoryItem = {
  label: ExploreCategory;
  image: string;
  description: string;
};

export type StoryItem = {
  id: number;
  name: string;
  category: ExploreCategory;
  image: string;
  isCreate?: boolean;
};

export type ExplorePost = {
  id: number;
  category: Exclude<ExploreCategory, "전체">;
  title: string;
  content: string;
  author: string;
  handle: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  image: string;
  imageCount: string;
};

export type ExploreCommunity = {
  id: number;
  category: Exclude<ExploreCategory, "전체">;
  name: string;
  description: string;
  members: string;
  tags: string[];
  image: string;
};

export type HashtagItem = {
  id: number;
  category: ExploreCategory;
  tag: string;
  count: string;
};

export type ExploreEvent = {
  id: number;
  category: ExploreCategory;
  title: string;
  description: string;
  date: string;
  place: string;
  image: string;
};

export type NearbyPet = {
  id: number;
  category: Exclude<ExploreCategory, "전체">;
  name: string;
  species: string;
  distance: string;
  intro: string;
  image: string;
  tags: string[];
};

export const categories: CategoryItem[] = [
  { label: "전체", image: DogThumb, description: "모든 피드" },
  { label: "강아지", image: DogThumb, description: "산책과 훈련" },
  { label: "고양이", image: CatThumb, description: "집사 이야기" },
  { label: "파충류", image: LeopardGeckoThumb, description: "사육장과 온도" },
  { label: "양서류", image: AmphibiaThumb, description: "습도와 케어" },
  { label: "조류", image: BirdThumb, description: "교감과 새장" },
  { label: "소동물", image: RabbitThumb, description: "토끼와 햄스터" },
  { label: "곤충/절지류", image: InsectThumb, description: "곤충과 절지류" },
  { label: "관상어", image: FishThumb, description: "수조와 물생활" },
  { label: "기타", image: CatThumb, description: "특별한 가족" },
];

export const stories: StoryItem[] = [
  { id: 1, name: "스토리 만들기", category: "전체", image: DogThumb, isCreate: true },
  { id: 2, name: "루이", category: "강아지", image: DogThumb },
  { id: 3, name: "루나", category: "고양이", image: CatThumb },
  { id: 4, name: "레오", category: "파충류", image: LeopardGeckoThumb },
  { id: 5, name: "아리", category: "양서류", image: AmphibiaThumb },
  { id: 6, name: "파랑", category: "조류", image: BirdThumb },
  { id: 7, name: "토토", category: "소동물", image: RabbitThumb },
  { id: 8, name: "헤라", category: "곤충/절지류", image: InsectThumb },
  { id: 9, name: "구피팸", category: "관상어", image: GuppyThumb },
];

export const posts: ExplorePost[] = [
  { id: 1, category: "강아지", title: "초보 보호자를 위한 산책 루틴", content: "흥분이 많은 강아지도 편하게 걷는 산책 준비와 보상 팁을 정리했어요.", author: "몽이보호자", handle: "@mong_walk", time: "12분 전", likes: 284, comments: 42, shares: 9, tags: ["산책", "훈련", "초보"], image: DogThumb, imageCount: "1/3" },
  { id: 2, category: "강아지", title: "비 오는 날 실내 놀이 추천", content: "터그, 노즈워크, 간단한 명령어 놀이로 에너지를 풀어주는 방법입니다.", author: "두부누나", handle: "@dubu_play", time: "35분 전", likes: 176, comments: 31, shares: 7, tags: ["놀이", "실내", "노즈워크"], image: DogThumb, imageCount: "1/2" },
  { id: 3, category: "고양이", title: "입맛 까다로운 고양이 사료 비교", content: "습식과 건식 조합, 급여 시간, 물 섭취를 함께 본 후기예요.", author: "루나집사", handle: "@luna_cat", time: "48분 전", likes: 231, comments: 54, shares: 11, tags: ["사료", "급여", "건강"], image: CatThumb, imageCount: "1/4" },
  { id: 4, category: "고양이", title: "새 캣타워 적응시키는 법", content: "낯선 구조물을 무서워하는 고양이를 위한 위치와 간식 활용 팁입니다.", author: "치즈아빠", handle: "@cheese_home", time: "1시간 전", likes: 143, comments: 27, shares: 5, tags: ["캣타워", "환경", "놀이"], image: CatThumb, imageCount: "1/2" },
  { id: 5, category: "파충류", title: "레오파드게코 온도 관리 체크", content: "핫존과 쿨존을 나누고 야간 온도 변화를 기록하는 방법을 공유해요.", author: "게코룸", handle: "@gecko_room", time: "1시간 전", likes: 198, comments: 22, shares: 8, tags: ["레오파드게코", "온도", "사육장"], image: LeopardGeckoThumb, imageCount: "1/2" },
  { id: 6, category: "파충류", title: "비어디드래곤 UVB 램프 교체 주기", content: "램프 위치, 거리, 교체 시기를 실제 사육 환경 기준으로 정리했습니다.", author: "테라리움러버", handle: "@beardie_care", time: "2시간 전", likes: 166, comments: 19, shares: 6, tags: ["비어디드래곤", "UVB", "건강"], image: BeardedDragonThumb, imageCount: "1/3" },
  { id: 7, category: "양서류", title: "팩맨 개구리 습도 유지 팁", content: "바닥재 수분과 환기를 균형 있게 맞추는 세팅을 소개합니다.", author: "초록습지", handle: "@frog_humidity", time: "2시간 전", likes: 112, comments: 16, shares: 4, tags: ["개구리", "습도", "바닥재"], image: PacmanFrogThumb, imageCount: "1/2" },
  { id: 8, category: "양서류", title: "도롱뇽 먹이 급여 기록", content: "먹이 크기와 급여 주기를 기록하면서 컨디션을 확인하는 방식입니다.", author: "물가친구", handle: "@salamander_note", time: "3시간 전", likes: 95, comments: 11, shares: 3, tags: ["도롱뇽", "먹이", "기록"], image: SalamanderThumb, imageCount: "1/2" },
  { id: 9, category: "조류", title: "앵무새 손 타기 훈련 첫 단계", content: "겁이 많은 앵무새와 신뢰를 쌓기 위한 짧은 훈련 루틴이에요.", author: "하늘날개", handle: "@parrot_life", time: "3시간 전", likes: 205, comments: 36, shares: 12, tags: ["앵무새", "훈련", "교감"], image: BirdThumb, imageCount: "1/2" },
  { id: 10, category: "조류", title: "핀치 새장 배치와 횃대 선택", content: "비행 동선과 휴식 공간을 함께 고려한 새장 구성 사례입니다.", author: "작은날개", handle: "@finch_room", time: "4시간 전", likes: 121, comments: 18, shares: 5, tags: ["핀치", "새장", "환경"], image: FinchThumb, imageCount: "1/2" },
  { id: 11, category: "소동물", title: "토끼가 좋아하는 간식 리스트", content: "급여량을 지키면서 토끼와 교감하기 좋은 간식들을 모았습니다.", author: "토토집사", handle: "@rabbit_toto", time: "4시간 전", likes: 188, comments: 33, shares: 9, tags: ["토끼", "간식", "건강"], image: RabbitThumb, imageCount: "1/3" },
  { id: 12, category: "소동물", title: "햄스터 케이지 청소 루틴", content: "스트레스를 줄이면서 냄새와 위생을 관리하는 청소 주기입니다.", author: "햄찌맘", handle: "@ham_clean", time: "5시간 전", likes: 139, comments: 21, shares: 6, tags: ["햄스터", "케이지", "위생"], image: HamsterThumb, imageCount: "1/2" },
  { id: 13, category: "곤충/절지류", title: "사슴벌레 산란목 세팅 후기", content: "수분 조절과 산란목 위치를 바꿔본 뒤 관찰한 결과를 공유합니다.", author: "곤충노트", handle: "@beetle_note", time: "5시간 전", likes: 104, comments: 14, shares: 4, tags: ["사슴벌레", "산란목", "사육"], image: InsectThumb, imageCount: "1/2" },
  { id: 14, category: "곤충/절지류", title: "타란튤라 탈피 전후 관리", content: "탈피 기간에 건드리지 않아야 할 것과 습도 체크 포인트를 정리했어요.", author: "절지류덕후", handle: "@tarantula_care", time: "6시간 전", likes: 156, comments: 26, shares: 8, tags: ["타란튤라", "탈피", "습도"], image: TarantulaThumb, imageCount: "1/2" },
  { id: 15, category: "관상어", title: "초보 물생활 여과 사이클 이해", content: "수조 세팅 첫 달에 꼭 알아야 할 물잡이와 테스트 기록입니다.", author: "물멍러", handle: "@aqua_start", time: "6시간 전", likes: 219, comments: 45, shares: 14, tags: ["수조", "여과", "물잡이"], image: FishThumb, imageCount: "1/3" },
  { id: 16, category: "관상어", title: "구피 치어 분리 시점", content: "치어 생존율을 높이기 위한 분리통과 먹이 급여 경험을 공유해요.", author: "구피아빠", handle: "@guppy_family", time: "7시간 전", likes: 132, comments: 20, shares: 5, tags: ["구피", "치어", "먹이"], image: GuppyThumb, imageCount: "1/2" },
  { id: 17, category: "기타", title: "특별한 반려동물 입양 전 체크", content: "희귀 반려동물을 만나기 전 법적 기준과 환경 준비를 먼저 확인해요.", author: "동물친구", handle: "@animal_check", time: "7시간 전", likes: 97, comments: 13, shares: 3, tags: ["입양", "준비", "책임"], image: CatThumb, imageCount: "1/2" },
  { id: 18, category: "기타", title: "여러 동물을 함께 키울 때 주의점", content: "공간 분리, 냄새 관리, 스트레스 신호를 확인하는 기본 원칙입니다.", author: "다둥이보호자", handle: "@multi_pet", time: "8시간 전", likes: 118, comments: 24, shares: 6, tags: ["다종가정", "환경", "케어"], image: DogThumb, imageCount: "1/2" },
];

export const communities: ExploreCommunity[] = [
  { id: 1, category: "강아지", name: "강아지 산책 모임", description: "지역별 산책 코스와 매너 훈련을 공유해요.", members: "12,458명", tags: ["산책", "훈련"], image: DogThumb },
  { id: 2, category: "고양이", name: "고양이 집사들", description: "사료, 화장실, 장난감 정보를 나누는 집사 커뮤니티예요.", members: "9,821명", tags: ["집사", "사료"], image: CatThumb },
  { id: 3, category: "파충류", name: "레오파드게코 정보방", description: "온도, 습도, 먹이 급여 정보를 함께 정리해요.", members: "4,302명", tags: ["게코", "사육장"], image: LeopardGeckoThumb },
  { id: 4, category: "파충류", name: "비어디드래곤 사육방", description: "UVB, 채소 급여, 활동량 관리 노하우를 공유합니다.", members: "3,118명", tags: ["비어디드래곤", "UVB"], image: BeardedDragonThumb },
  { id: 5, category: "양서류", name: "양서류 케어 연구소", description: "습도와 수질 관리에 진심인 보호자들이 모였어요.", members: "1,742명", tags: ["습도", "수질"], image: AmphibiaThumb },
  { id: 6, category: "조류", name: "앵무새 사랑방", description: "교감, 훈련, 새장 세팅을 편하게 질문해보세요.", members: "7,542명", tags: ["앵무새", "교감"], image: BirdThumb },
  { id: 7, category: "소동물", name: "토끼와 햄스터 방", description: "작은 친구들의 먹이, 케이지, 놀이 정보를 나눠요.", members: "5,203명", tags: ["토끼", "햄스터"], image: RabbitThumb },
  { id: 8, category: "곤충/절지류", name: "곤충 덕후 모임", description: "곤충과 절지류 사육 기록을 함께 남기는 공간이에요.", members: "2,064명", tags: ["곤충", "절지류"], image: InsectThumb },
  { id: 9, category: "관상어", name: "물생활 연구소", description: "여과, 수초, 관상어 합사를 차근차근 배워요.", members: "3,112명", tags: ["수조", "관상어"], image: FishThumb },
  { id: 10, category: "기타", name: "특별한 가족 이야기", description: "다양한 반려동물과 살아가는 보호자들의 열린 공간입니다.", members: "1,908명", tags: ["기타", "입양"], image: CatThumb },
];

export const hashtags: HashtagItem[] = [
  { id: 1, category: "전체", tag: "#오늘의반려동물", count: "18.2k 게시물" },
  { id: 2, category: "전체", tag: "#초보보호자", count: "12.3k 게시물" },
  { id: 3, category: "강아지", tag: "#산책스타그램", count: "9.8k 게시물" },
  { id: 4, category: "강아지", tag: "#강아지훈련", count: "6.1k 게시물" },
  { id: 5, category: "고양이", tag: "#고양이집사", count: "11.7k 게시물" },
  { id: 6, category: "고양이", tag: "#냥이장난감", count: "4.4k 게시물" },
  { id: 7, category: "파충류", tag: "#레오파드게코", count: "3.8k 게시물" },
  { id: 8, category: "파충류", tag: "#비어디드래곤", count: "2.9k 게시물" },
  { id: 9, category: "양서류", tag: "#팩맨개구리", count: "1.9k 게시물" },
  { id: 10, category: "양서류", tag: "#도롱뇽케어", count: "1.2k 게시물" },
  { id: 11, category: "조류", tag: "#앵무새교감", count: "4.7k 게시물" },
  { id: 12, category: "소동물", tag: "#토끼간식", count: "3.2k 게시물" },
  { id: 13, category: "곤충/절지류", tag: "#곤충사육", count: "2.1k 게시물" },
  { id: 14, category: "관상어", tag: "#물생활", count: "5.4k 게시물" },
  { id: 15, category: "기타", tag: "#특별한가족", count: "1.5k 게시물" },
];

export const events: ExploreEvent[] = [
  { id: 1, category: "전체", title: "우리집 반려동물 사진전", description: "종에 상관없이 가장 사랑스러운 순간을 공유해보세요.", date: "2026.05.01 - 05.31", place: "온라인", image: DogThumb },
  { id: 2, category: "강아지", title: "봄 산책 챌린지", description: "매일 산책 기록을 남기고 보호자들과 코스를 나눠요.", date: "2026.05.05 - 05.25", place: "온라인", image: DogThumb },
  { id: 3, category: "고양이", title: "냥이 장난감 리뷰전", description: "우리 고양이가 오래 가지고 노는 장난감을 소개해주세요.", date: "2026.05.08 - 05.28", place: "온라인", image: CatThumb },
  { id: 4, category: "파충류", title: "테라리움 세팅 공유회", description: "사육장 레이아웃과 장비 세팅을 사진으로 공유해요.", date: "2026.05.12 - 06.02", place: "온라인", image: BeardedDragonThumb },
  { id: 5, category: "조류", title: "앵무새 교감 클래스", description: "처음 손 타기 훈련을 시작하는 보호자를 위한 클래스입니다.", date: "2026.05.15 - 05.30", place: "온라인", image: BirdThumb },
  { id: 6, category: "관상어", title: "수조 리셋 챌린지", description: "깨끗하고 건강한 수조를 만드는 과정을 함께 기록해요.", date: "2026.05.20 - 06.10", place: "온라인", image: FishThumb },
];

export const nearbyPets: NearbyPet[] = [
  { id: 1, category: "강아지", name: "몽이", species: "말티즈", distance: "0.3km", intro: "산책 친구를 좋아하는 활발한 친구예요.", image: DogThumb, tags: ["산책", "소형견"] },
  { id: 2, category: "고양이", name: "루비", species: "코리안숏헤어", distance: "0.5km", intro: "창가 낮잠과 낚싯대 놀이를 좋아해요.", image: CatThumb, tags: ["실내", "놀이"] },
  { id: 3, category: "파충류", name: "레오", species: "레오파드게코", distance: "0.8km", intro: "조용한 관찰과 따뜻한 핫존을 좋아해요.", image: LeopardGeckoThumb, tags: ["게코", "야행성"] },
  { id: 4, category: "양서류", name: "초록이", species: "팩맨 개구리", distance: "1.0km", intro: "습한 은신처에서 쉬는 시간이 가장 편해요.", image: PacmanFrogThumb, tags: ["개구리", "습도"] },
  { id: 5, category: "조류", name: "파랑", species: "앵무새", distance: "0.7km", intro: "사람 목소리를 따라 하는 것을 좋아해요.", image: BirdThumb, tags: ["앵무새", "교감"] },
  { id: 6, category: "소동물", name: "토토", species: "미니렉스", distance: "0.9km", intro: "당근 간식과 조용한 쓰다듬을 좋아해요.", image: RabbitThumb, tags: ["토끼", "간식"] },
  { id: 7, category: "곤충/절지류", name: "헤라", species: "장수풍뎅이", distance: "1.4km", intro: "젤리와 산란목 세팅을 기록 중이에요.", image: InsectThumb, tags: ["곤충", "사육"] },
  { id: 8, category: "관상어", name: "구피팸", species: "구피", distance: "1.1km", intro: "작은 수조에서 활발하게 헤엄치는 친구들이에요.", image: GuppyThumb, tags: ["구피", "수조"] },
  { id: 9, category: "기타", name: "별이", species: "특별한 반려동물", distance: "1.6km", intro: "새로운 환경에 천천히 적응 중인 친구예요.", image: CatThumb, tags: ["기타", "입양"] },
];
