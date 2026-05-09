import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaCalendarDays,
  FaCartShopping,
  FaChevronRight,
  FaCircleQuestion,
  FaClipboardList,
  FaCommentDots,
  FaGlobe,
  FaHeart,
  FaHouse,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPaw,
  FaRegBookmark,
  FaRegComment,
  FaShieldHalved,
  FaStar,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import "./ExplorePage.scss";
import AniverseLogo from "../../assets/images/petbuddy_logo.svg";
import LoginRequiredModal from "./components/LoginRequiredModal";
import DogThumb from "../../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../../assets/images/landing_generated/pet_thumb_cat.png";
import BirdThumb from "../../assets/images/landing_generated/pet_thumb_bird.png";
import RabbitThumb from "../../assets/images/landing_generated/pet_thumb_rabbit.png";
import BeardedDragonThumb from "../../assets/images/landing_generated/pet_thumb_bearded_dragon.png";
import HamsterThumb from "../../assets/images/landing_generated/pet_thumb_hamster.png";
import InsectThumb from "../../assets/images/landing_generated/pet_thumb_arthropod.png";
import ReptileThumb from "../../assets/images/landing_generated/pet_thumb_leopard_gecko.png";
import PremiumPets from "../../assets/images/explore_premium_pets.png";
import HeroPets from "../../assets/images/explore_hero_pets.png";

const quickLinks = [
  { label: "커뮤니티 피드", icon: <FaCommentDots aria-hidden="true" />, tone: "pink" },
  { label: "반려동물 프로필", icon: <FaClipboardList aria-hidden="true" />, tone: "green" },
  { label: "맞춤 추천", icon: <FaStar aria-hidden="true" />, tone: "purple" },
  { label: "병원 찾기", icon: <FaLocationDot aria-hidden="true" />, tone: "blue" },
  { label: "이벤트 & 모임", icon: <FaCalendarDays aria-hidden="true" />, tone: "yellow" },
  { label: "마켓 & 나눔", icon: <FaCartShopping aria-hidden="true" />, tone: "orange" },
];

const sidebarItems = [
  { label: "홈", icon: <FaHouse aria-hidden="true" />, active: true },
  { label: "커뮤니티 피드", icon: <FaCommentDots aria-hidden="true" /> },
  { label: "반려동물 프로필", icon: <FaClipboardList aria-hidden="true" /> },
  { label: "맞춤 추천", icon: <FaStar aria-hidden="true" /> },
  { label: "병원과 위치 찾기", icon: <FaLocationDot aria-hidden="true" /> },
  { label: "이벤트와 모임", icon: <FaCalendarDays aria-hidden="true" /> },
  { label: "마켓과 나눔", icon: <FaCartShopping aria-hidden="true" /> },
  { label: "일상 소식", icon: <FaWandMagicSparkles aria-hidden="true" /> },
  { label: "안전 신고", icon: <FaShieldHalved aria-hidden="true" /> },
  { label: "다국어 지원", icon: <FaGlobe aria-hidden="true" /> },
];

const spotlightPets = [
  { name: "행복이", kind: "강아지", detail: "5살 · 골든 리트리버", image: DogThumb },
  { name: "냥냥이", kind: "고양이", detail: "3살 · 코리안 숏헤어", image: CatThumb },
  { name: "초코", kind: "토끼", detail: "2살 · 네덜란드 드워프", image: RabbitThumb },
  { name: "로이", kind: "조류", detail: "1살 · 코뉴어", image: BirdThumb },
  { name: "레오", kind: "파충류", detail: "2살 · 비어디드 드래곤", image: BeardedDragonThumb },
  { name: "톰", kind: "소동물", detail: "1살 · 골든 햄스터", image: HamsterThumb },
  { name: "장수", kind: "곤충", detail: "성체 · 넓적사슴벌레", image: InsectThumb },
];

const communityCards = [
  {
    author: "랩타일러버",
    badge: "파충류",
    time: "1시간 전",
    text: "도마뱀 테라리움 환경을 새로 맞췄어요. 온도와 습도도 안정적이고 친구도 편안해 보여요.",
    images: [ReptileThumb, BeardedDragonThumb, ReptileThumb],
  },
];

const eventItems = [
  { title: "이색 반려동물 정보 교류 모임", date: "2026.05.30 14:00", place: "서울 마포구", image: HamsterThumb },
  { title: "조류 입양 & 케어 세미나", date: "2026.06.02 10:00", place: "온라인 진행", image: BirdThumb },
  { title: "곤충 사육자 네트워크 모임", date: "2026.06.08 13:00", place: "부산 해운대", image: InsectThumb },
];

const recommendationItems = [
  { title: "모든 동물을 위한 영양 가이드", category: "건강 정보", image: HamsterThumb },
  { title: "파충류 사육 환경 완벽 가이드", category: "훈련 가이드", image: ReptileThumb },
  { title: "조류의 언어와 행동 이해하기", category: "케어 노하우", image: BirdThumb },
];

const ExplorePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openLoginModal = () => setModalOpen(true);

  return (
    <main className="ExplorePreview">
      <header className="ExploreTopBar">
        <button type="button" className="ExploreTopBar_Brand" onClick={() => navigate("/")}>
          <img src={AniverseLogo} alt="Aniverse" />
          <span>Aniverse</span>
        </button>

        <label className="ExploreTopBar_Search" htmlFor="ExploreSearch">
          <FaMagnifyingGlass aria-hidden="true" />
          <input id="ExploreSearch" placeholder="통합 검색 (커뮤니티, 반려동물, 이벤트 등)" />
        </label>

        <div className="ExploreTopBar_Actions">
          <button type="button" aria-label="알림" onClick={openLoginModal}>
            <FaBell aria-hidden="true" />
          </button>
          <button type="button" aria-label="메시지" onClick={openLoginModal}>
            <FaRegComment aria-hidden="true" />
          </button>
          <button type="button" className="profile" onClick={openLoginModal}>
            <img src={DogThumb} alt="" />
            <strong>둘러보기</strong>
          </button>
        </div>
      </header>

      <div className="ExplorePreview_Shell">
        <aside className="ExploreSidebar">
          <nav className="ExploreSidebar_Menu" aria-label="둘러보기 메뉴">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={item.active ? "selected" : ""}
                onClick={item.active ? undefined : openLoginModal}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ExploreSidebar_Premium">
            <div>
              <strong>Aniverse 프리미엄</strong>
              <p>더 많은 기능과 혜택을 경험해보세요!</p>
              <button type="button" onClick={openLoginModal}>자세히 보기</button>
            </div>
            <span aria-hidden="true">
              <img src={PremiumPets} alt="" />
            </span>
          </div>

          <button type="button" className="ExploreSidebar_Help" onClick={openLoginModal}>
            <FaCircleQuestion aria-hidden="true" />
            <span>
              <strong>도움이 필요하신가요?</strong>
              고객센터 바로가기
            </span>
          </button>
        </aside>

        <section className="ExplorePreview_Content">
          <div className="ExploreWelcome">
            <div>
              <h1>반려동물과 함께하는 생활 플랫폼</h1>
              <p>건강 기록, 커뮤니티, 이벤트와 맞춤 추천까지 한 곳에서 둘러보세요.</p>
            </div>
            <button type="button" onClick={openLoginModal}>+ 반려동물 추가</button>
          </div>

          <section className="ExploreHero">
            <div className="ExploreHero_Copy">
              <h2>모든 생명이 소중한 우리,</h2>
              <strong>다양한 반려동물의 건강과 행복을 함께 지켜요</strong>
              <p>정기적인 건강 기록 관리와 알림 설정으로 모든 반려동물의 일상을 더 세심하게 챙겨보세요.</p>
              <button type="button" onClick={openLoginModal}>건강 기록 관리하기</button>
            </div>
            <div className="ExploreHero_Pets" aria-hidden="true">
              <img src={HeroPets} alt="" />
            </div>
          </section>

          <section className="ExploreQuick">
            <h2>주요 기능 바로가기</h2>
            <div className="ExploreQuick_Grid">
              {quickLinks.map((item) => (
                <button type="button" key={item.label} className={`tone-${item.tone}`} onClick={openLoginModal}>
                  <span>{item.icon}</span>
                  <strong>{item.label}</strong>
                </button>
              ))}
            </div>
          </section>

          <div className="ExploreMainGrid">
            <section className="ExploreCard ExploreCommunity">
              <div className="ExploreCard_Title">
                <h2>커뮤니티 피드</h2>
                <button type="button" onClick={openLoginModal}>더보기 <FaChevronRight aria-hidden="true" /></button>
              </div>
              {communityCards.map((post) => (
                <article key={post.author} className="ExploreCommunity_Post">
                  <div className="ExploreCommunity_Header">
                    <img src={post.images[0]} alt="" />
                    <div>
                      <strong>{post.author}</strong>
                      <span>{post.time}</span>
                    </div>
                    <em>{post.badge}</em>
                  </div>
                  <p>{post.text}</p>
                  <div className="ExploreCommunity_Images">
                    {post.images.map((image, index) => (
                      <img src={image} alt="" key={`${post.author}-${index}`} />
                    ))}
                  </div>
                  <div className="ExploreCommunity_Actions">
                    <button type="button" onClick={openLoginModal}><FaHeart aria-hidden="true" />32</button>
                    <button type="button" onClick={openLoginModal}><FaRegComment aria-hidden="true" />6</button>
                    <button type="button" onClick={openLoginModal}><FaRegBookmark aria-hidden="true" /></button>
                  </div>
                </article>
              ))}
            </section>

            <section className="ExploreCard ExploreEvents">
              <div className="ExploreCard_Title">
                <h2>이벤트 & 모임</h2>
                <button type="button" onClick={openLoginModal}>더보기 <FaChevronRight aria-hidden="true" /></button>
              </div>
              <div className="ExploreEvent_List">
                {eventItems.map((event) => (
                  <button type="button" className="ExploreEvent_Item" key={event.title} onClick={openLoginModal}>
                    <img src={event.image} alt="" />
                    <span>
                      <strong>{event.title}</strong>
                      <small>{event.date}</small>
                      <em>{event.place}</em>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <section className="ExploreCareBanner">
            <FaClipboardList aria-hidden="true" />
            <span>
              <strong>정기 건강 체크를 잊지 마세요</strong>
              반려동물의 건강 기록을 관리하고 예방접종 일정을 확인해보세요.
            </span>
            <button type="button" onClick={openLoginModal}>건강 기록 관리</button>
          </section>
        </section>

        <aside className="ExploreRightPanel">
          <section className="ExploreRightPanel_Card">
            <div className="ExploreRightPanel_Title">
              <h3>다양한 아이들</h3>
              <button type="button" onClick={openLoginModal}>전체보기 <FaChevronRight aria-hidden="true" /></button>
            </div>
            <div className="ExplorePet_List">
              {spotlightPets.map((pet) => (
                <button type="button" className="ExplorePet_Item" key={pet.name} onClick={openLoginModal}>
                  <img src={pet.image} alt="" />
                  <span>
                    <strong>{pet.name}</strong>
                    <small>{pet.detail}</small>
                  </span>
                  <em>{pet.kind}</em>
                  <FaChevronRight aria-hidden="true" />
                </button>
              ))}
            </div>
            <button type="button" className="ExploreMorePets" onClick={openLoginModal}>+ 더 많은 아이 보기</button>
          </section>

          <section className="ExploreRightPanel_Card">
            <div className="ExploreRightPanel_Title">
              <h3>맞춤 추천 콘텐츠</h3>
              <button type="button" onClick={openLoginModal}>더보기 <FaChevronRight aria-hidden="true" /></button>
            </div>
            <div className="ExploreRecommendation_List">
              {recommendationItems.map((item) => (
                <button type="button" className="ExploreRecommendation_Item" key={item.title} onClick={openLoginModal}>
                  <img src={item.image} alt="" />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.category}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <LoginRequiredModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={() => navigate("/login")}
        onSign={() => navigate("/sign")}
      />
    </main>
  );
};

export default ExplorePage;
