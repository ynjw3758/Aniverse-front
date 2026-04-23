import { useEffect, useState } from "react";
import moment from "moment";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import PetBuddyLogo from "../assets/images/petbuddy_logo.svg";
import HeroAnimalsImg from "../assets/images/petbuddy_landing_collage.png";

const animalCategories = [
  { title: "포유류", desc: "개, 고양이, 토끼 등", tone: "pink", icon: "🐕" },
  { title: "파충류", desc: "도마뱀, 뱀, 거북이 등", tone: "orange", icon: "🦎" },
  { title: "양서류", desc: "개구리, 도롱뇽 등", tone: "green", icon: "🐸" },
  { title: "조류", desc: "앵무새, 참새, 닭 등", tone: "blue", icon: "🦜" },
  { title: "곤충 / 절지류", desc: "사슴벌레, 전갈 등", tone: "purple", icon: "🪲" },
  { title: "소동물 / 기타", desc: "햄스터, 고슴도치 등", tone: "yellow", icon: "🐹" },
  { title: "기타 특수종", desc: "희귀종, 특수동물", tone: "gray", icon: "•••" },
];

const featureCards = [
  { title: "내 주변 친구 찾기", desc: "내 주변 반려동물 보호자와 쉽게 연결해 보세요.", icon: "📍" },
  { title: "같은 펫 보호자 찾기", desc: "같은 종을 키우는 보호자와 정보를 나누고 소통해요.", icon: "👥" },
  { title: "사육 정보 공유", desc: "사육 팁, 건강 관리 등 유용한 정보를 공유해요.", icon: "📖" },
  { title: "커뮤니티 & 게시판", desc: "다양한 주제의 게시판에서 자유롭게 이야기 나눠요.", icon: "💬" },
  { title: "이벤트 & 모임", desc: "온오프라인 이벤트와 모임에 참여해 보세요.", icon: "🎁" },
  { title: "용품 & 현장 정보", desc: "필요한 용품 정보와 반려동물 소식을 확인해요.", icon: "🏪" },
];

const LandingPage: React.FC = () => {
  const [login, setLogin] = useState(false);
  const [acctime, setAcctime] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const allCookies = cookies.getAll();

    Object.entries(allCookies).forEach(([key, value]) => {
      if (key === "p_exp" && value) {
        setAcctime(true);
      }
    });

    const exp = localStorage.getItem("p_exp");
    if (exp && exp !== "null") {
      setAcctime(true);
    }
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

  const sign = () => {
    navigate("/sign");
  };

  const goLogin = () => {
    navigate("/login");
  };

  const startHandler = () => {
    navigate("/");
  };

  return (
    <main className="PetLanding">
      <header className="PetLanding_Header">
        <button type="button" className="PetLanding_Brand" onClick={startHandler}>
          <img src={PetBuddyLogo} alt="PetBuddy" />
          <span>PetBuddy</span>
        </button>

        <nav className="PetLanding_Nav" aria-label="랜딩 메뉴">
          <button className="active" type="button">홈</button>
          <button type="button">서비스 소개</button>
          <button type="button">주요 기능</button>
          <button type="button">커뮤니티</button>
          <button type="button">이벤트</button>
          <button type="button">가이드</button>
        </nav>

        <div className="PetLanding_Auth">
          {!login && (
            <>
              <button type="button" className="ghost" onClick={goLogin}>로그인</button>
              <button type="button" className="solid" onClick={sign}>회원가입</button>
            </>
          )}
          {login && <button type="button" className="solid" onClick={startHandler}>시작하기</button>}
        </div>
      </header>

      <section className="PetLanding_Hero">
        <div className="PetLanding_HeroCopy">
          <p className="PetLanding_Eyebrow">모든 반려동물을 위한 소통 플랫폼</p>
          <h1>
            다양한 반려동물과
            <br />
            <strong>특별한 일상을 함께해요</strong>
          </h1>
          <p className="PetLanding_Lead">
            강아지, 고양이부터 파충류, 조류, 양서류, 곤충까지
            <br />
            모든 반려동물 보호자들이 모여 정보를 나누고 소통하는 공간입니다.
          </p>

          <div className="PetLanding_Ctas">
            <button type="button" className="primary" onClick={login ? startHandler : sign}>
              지금 시작하기
            </button>
            <button type="button" className="secondary" onClick={startHandler}>
              둘러보기
            </button>
          </div>

          <div className="PetLanding_Stats">
            <div><strong>20,000+</strong><span>함께한 보호자</span></div>
            <div><strong>15,000+</strong><span>다양한 반려동물</span></div>
            <div><strong>50,000+</strong><span>활발한 소통</span></div>
            <div><strong>매월 새로</strong><span>이벤트 진행</span></div>
          </div>
        </div>

        <div className="PetLanding_HeroVisual" aria-label="다양한 반려동물 이미지 모음">
          <img
            className="PetLanding_HeroAnimals"
            src={HeroAnimalsImg}
            alt="강아지, 고양이, 파충류, 조류, 양서류, 곤충, 토끼가 함께 있는 PetBuddy 소개 이미지"
          />
          <span className="PetLanding_Bubble heart">♡</span>
          <span className="PetLanding_Bubble chat">···</span>
          <span className="PetLanding_Bubble paw">🐾</span>
        </div>
      </section>

      <section className="PetLanding_Categories">
        <h2>다양한 반려동물 친구들을 만나보세요</h2>
        <div className="PetLanding_CategoryGrid">
          {animalCategories.map((item) => (
            <article key={item.title} className={`PetLanding_Category ${item.tone}`}>
              <span>{item.icon}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="PetLanding_Features">
        <h2>PetBuddy에서 할 수 있는 것들</h2>
        <div className="PetLanding_FeatureGrid">
          {featureCards.map((item) => (
            <article key={item.title} className="PetLanding_FeatureCard">
              <span>{item.icon}</span>
              <strong>{item.title}</strong>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="PetLanding_BottomCta">
        <div>
          <h2>
            당신의 <strong>특별한</strong> 반려동물 이야기를 들려주세요
          </h2>
          <p>PetBuddy는 모든 반려동물과 보호자의 행복한 일상을 응원합니다. 지금 함께 시작해요!</p>
        </div>
        <div className="PetLanding_BottomStats">
          <span><strong>20,000+</strong>함께한 보호자</span>
          <span><strong>15,000+</strong>다양한 반려동물</span>
          <span><strong>50,000+</strong>활발한 소통</span>
          <button type="button" onClick={login ? startHandler : sign}>무료로 시작하기</button>
          {!login && (
            <small>
              이미 계정이 있으신가요?
              <button type="button" onClick={goLogin}>로그인</button>
            </small>
          )}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
