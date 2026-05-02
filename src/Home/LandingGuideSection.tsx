import GuideHeroAnimals from "../assets/images/landing_generated/guide_hero_animals.png";
import { guideCards } from "./landingData";

const LandingGuideSection = () => {
  return (
    <section className="LandingGuideSection">
      <div className="LandingGuideSection_Header">
        <div className="LandingGuideSection_Copy">
          <span>처음이어도 괜찮아요</span>
          <h2>
            Aniverse
            <br />
            <strong>이용 가이드</strong>
          </h2>
          <p>
            초보 보호자부터 경험 많은 보호자까지,
            <br />
            단계별 가이드를 통해 더 편하게 Aniverse를 이용할 수 있어요.
          </p>

          <label className="LandingGuideSection_Search" htmlFor="LandingGuideSearch">
            <input id="LandingGuideSearch" type="text" placeholder="가이드 검색하기" readOnly />
            <span>검색</span>
          </label>
        </div>

        <div className="LandingGuideSection_Visual">
          <div className="LandingGuideSection_VisualGlow pink" />
          <div className="LandingGuideSection_VisualGlow peach" />
          <div className="LandingGuideSection_VisualBadges">
            <span>팁</span>
            <span>케어</span>
            <span>Q</span>
          </div>
          <img
            src={GuideHeroAnimals}
            alt="다양한 반려동물이 함께 있는 Aniverse 가이드 소개 이미지"
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
