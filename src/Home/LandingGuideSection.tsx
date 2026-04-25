import RabbitThumb from "../assets/images/landing_generated/pet_thumb_rabbit.png";
import LizardThumb from "../assets/images/landing_generated/pet_thumb_lizard.png";
import BirdThumb from "../assets/images/landing_generated/pet_thumb_bird.png";
import DogThumb from "../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../assets/images/landing_generated/pet_thumb_cat.png";
import GuideHeroAnimals from "../assets/images/landing_generated/guide_hero_animals.png";

const guideCards = [
  {
    image: RabbitThumb,
    title: "초보 보호자 가이드",
    description: "반려동물 입문 전 알아야 할 기본 가이드",
  },
  {
    image: LizardThumb,
    title: "동물별 케어 가이드",
    description: "강아지, 고양이, 조류 등 동물별 맞춤 케어 방법",
  },
  {
    image: CatThumb,
    title: "건강 & 행동 가이드",
    description: "건강 관리, 식단, 행동 이해와 문제 해결",
  },
  {
    image: DogThumb,
    title: "성장 & 훈련 가이드",
    description: "사회성, 예절, 훈련 등 반려 생활 핵심 팁",
  },
  {
    image: BirdThumb,
    title: "자주 묻는 질문",
    description: "처음 자주 마주치는 문제와 해결 방법",
  },
];

const LandingGuideSection = () => {
  return (
    <section className="LandingGuideSection">
      <div className="LandingGuideSection_Header">
        <div className="LandingGuideSection_Copy">
          <span>처음이어도 괜찮아요!</span>
          <h2>
            Aniverse
            <br />
            <strong>이용 가이드</strong>
          </h2>
          <p>
            초보 보호자부터 베테랑 보호자까지,
            <br />
            단계별 이용 가이드를 통해 더 편한 Aniverse가 되도록 도와드려요.
          </p>

          <label className="LandingGuideSection_Search" htmlFor="LandingGuideSearch">
            <input id="LandingGuideSearch" type="text" placeholder="가이드 검색하기" readOnly />
            <span>⌕</span>
          </label>
        </div>

        <div className="LandingGuideSection_Visual">
          <div className="LandingGuideSection_VisualGlow pink" />
          <div className="LandingGuideSection_VisualGlow peach" />
          <div className="LandingGuideSection_VisualBadges">
            <span>◎</span>
            <span>♡</span>
            <span>?</span>
          </div>
          <img
            src={GuideHeroAnimals}
            alt="강아지, 고양이, 토끼, 앵무새, 거북이, 금붕어가 함께 있는 가이드 소개 이미지"
            className="LandingGuideSection_HeroImage"
          />
        </div>
      </div>

      <div className="LandingGuideSection_Cards">
        {guideCards.map((card) => (
          <article key={card.title} className="LandingGuideSection_Card">
            <div className="LandingGuideSection_CardImageWrap">
              <img src={card.image} alt={card.title} />
            </div>
            <strong>{card.title}</strong>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LandingGuideSection;
