import { featureCards } from "./landingData";

type LandingFeatureSectionProps = {
  onPrimaryAction: () => void;
};

const LandingFeatureSection = ({ onPrimaryAction }: LandingFeatureSectionProps) => {
  return (
    <section className="LandingFeatureSection">
      <div className="LandingFeatureSection_Intro">
        <h2>
          Aniverse의
          <br />
          <strong>주요 기능</strong>
        </h2>
        <p>
          반려동물과 보호자에게 꼭 필요한 기능을
          <br />
          커뮤니티 흐름 안에서 자연스럽게 연결합니다.
        </p>
        <button type="button" onClick={onPrimaryAction}>
          지금 시작하기
        </button>
      </div>

      <div className="LandingFeatureSection_Grid">
        {featureCards.map((card) => (
          <article key={card.title} className={`LandingFeatureSection_Card ${card.tone}`}>
            <div className="LandingFeatureSection_CardImageWrap">
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

export default LandingFeatureSection;
