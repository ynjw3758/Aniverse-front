import { useEffect, useState } from "react";
import moment from "moment";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import PetBuddyLogo from "../assets/images/petbuddy_logo.svg";
import HeroAnimalsImg from "../assets/images/petbuddy_landing_collage.png";
import DogThumb from "../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../assets/images/landing_generated/pet_thumb_cat.png";
import BirdThumb from "../assets/images/landing_generated/pet_thumb_bird.png";
import RabbitThumb from "../assets/images/landing_generated/pet_thumb_rabbit.png";
import LizardThumb from "../assets/images/landing_generated/pet_thumb_lizard.png";
import FishThumb from "../assets/images/landing_generated/pet_thumb_fish.png";
import LandingFeatureSection from "./LandingFeatureSection";
import LandingCommunitySection from "./LandingCommunitySection";
import LandingEventSection from "./LandingEventSection";
import LandingGuideSection from "./LandingGuideSection";
import LandingSharedFooter from "./LandingSharedFooter";

type LandingTab = "service" | "feature" | "community" | "event" | "guide";

const navItems: Array<{ key: LandingTab; label: string }> = [
  { key: "service", label: "서비스 소개" },
  { key: "feature", label: "주요 기능" },
  { key: "community", label: "커뮤니티" },
  { key: "event", label: "이벤트" },
  { key: "guide", label: "가이드" },
];

const serviceCategories = [
  { title: "강아지", desc: "산책, 건강, 행동 교정", image: DogThumb },
  { title: "고양이", desc: "일상 기록, 사료, 케어 정보", image: CatThumb },
  { title: "파충류", desc: "도마뱀, 거북이, 환경 세팅", image: LizardThumb },
  { title: "조류", desc: "앵무새, 핀치, 놀이와 훈련", image: BirdThumb },
  { title: "소동물", desc: "토끼, 햄스터, 소형 반려동물", image: RabbitThumb },
  { title: "관상어", desc: "수조 관리와 물생활 팁", image: FishThumb },
];

const LandingPage: React.FC = () => {
  const [login, setLogin] = useState(false);
  const [acctime, setAcctime] = useState(false);
  const [activeTab, setActiveTab] = useState<LandingTab>("service");
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const allCookies = cookies.getAll();
    Object.entries(allCookies).forEach(([key, value]) => {
      if (key === "p_exp" && value) setAcctime(true);
    });

    const exp = localStorage.getItem("p_exp");
    if (exp && exp !== "null") setAcctime(true);
  }, []);

  useEffect(() => {
    if (!acctime) return;

    const exp = localStorage.getItem("p_exp");
    const expNumber = Number(exp);

    if (!Number.isFinite(expNumber)) {
      setLogin(false);
      return;
    }

    const date = new Date(expNumber * 1000);
    const dates = moment(date).format("YYYY-MM-DD HH:mm");
    setLogin(moment(dates).diff(moment()) > 0);
  }, [acctime]);

  const sign = () => navigate("/sign");
  const goLogin = () => navigate("/login");
  const startHandler = () => navigate("/");

  const primaryAction = login ? startHandler : sign;

  const renderTabContent = () => {
    if (activeTab === "feature") return <LandingFeatureSection onPrimaryAction={primaryAction} />;
    if (activeTab === "community") return <LandingCommunitySection onPrimaryAction={primaryAction} />;
    if (activeTab === "event") return <LandingEventSection onPrimaryAction={primaryAction} />;
    if (activeTab === "guide") return <LandingGuideSection />;

    return (
      <section className="PetLanding_ServiceSection">
        <div className="PetLanding_Hero">
          <div className="PetLanding_HeroCopy">
            <p className="PetLanding_Eyebrow">All animals, one community</p>
            <h1>
              모든 반려동물과
              <br />
              보호자가 함께하는
              <br />
              <strong>Aniverse</strong>
            </h1>
            <p className="PetLanding_Lead">
              강아지, 고양이부터 파충류, 조류, 양서류, 곤충까지
              <br />
              모든 반려동물 보호자들이 정보를 나누고 소통하는 공간입니다.
            </p>

            <div className="PetLanding_Ctas">
              <button type="button" className="primary" onClick={primaryAction}>
                지금 시작하기
              </button>
              <button type="button" className="secondary" onClick={startHandler}>
                둘러보기
              </button>
            </div>

            <div className="PetLanding_Stats">
              <div>
                <strong>20,000+</strong>
                <span>활발한 보호자</span>
              </div>
              <div>
                <strong>15,000+</strong>
                <span>다양한 반려동물</span>
              </div>
              <div>
                <strong>50,000+</strong>
                <span>정보와 게시글</span>
              </div>
              <div>
                <strong>매일 업데이트</strong>
                <span>이벤트와 소식</span>
              </div>
            </div>
          </div>

          <div className="PetLanding_HeroVisual">
            <img
              className="PetLanding_HeroAnimals"
              src={HeroAnimalsImg}
              alt="다양한 반려동물이 함께 있는 Aniverse 소개 이미지"
            />
            <span className="PetLanding_Bubble heart">♥</span>
            <span className="PetLanding_Bubble paw">🐾</span>
          </div>
        </div>

        <section className="PetLanding_Categories">
          <h2>다양한 반려동물 친구들을 만나보세요</h2>
          <div className="PetLanding_CategoryGrid">
            {serviceCategories.map((item) => (
              <article key={item.title} className="PetLanding_Category">
                <div className="PetLanding_CategoryThumb">
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    );
  };

  return (
    <main className="PetLanding">
      <header className="PetLanding_Header">
        <div className="PetLanding_HeaderInner">
          <button type="button" className="PetLanding_Brand" onClick={startHandler}>
            <img src={PetBuddyLogo} alt="Aniverse" />
            <span>Aniverse</span>
          </button>

          <nav className="PetLanding_Nav" aria-label="랜딩 메뉴">
            {navItems.map((item) => (
              <button
                key={item.key}
                className={activeTab === item.key ? "PetLanding_NavButton isActive" : "PetLanding_NavButton"}
                type="button"
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="PetLanding_Auth">
            {!login ? (
              <>
                <button type="button" className="ghost" onClick={goLogin}>
                  로그인
                </button>
                <button type="button" className="solid" onClick={sign}>
                  회원가입
                </button>
              </>
            ) : (
              <button type="button" className="solid" onClick={startHandler}>
                시작하기
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="PetLanding_Content">
        {renderTabContent()}
        <LandingSharedFooter loggedIn={login} onPrimaryAction={primaryAction} onLogin={goLogin} />
      </div>
    </main>
  );
};

export default LandingPage;
