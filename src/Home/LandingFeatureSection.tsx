import DogThumb from "../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../assets/images/landing_generated/pet_thumb_cat.png";
import RabbitThumb from "../assets/images/landing_generated/pet_thumb_rabbit.png";
import LizardThumb from "../assets/images/landing_generated/pet_thumb_lizard.png";
import BirdThumb from "../assets/images/landing_generated/pet_thumb_bird.png";
import FishThumb from "../assets/images/landing_generated/pet_thumb_fish.png";

type LandingFeatureSectionProps = {
  onPrimaryAction: () => void;
};

const featureCards = [
  {
    title: "커뮤니티 & 피드",
    description: "일상 공유, 질문, 정보 교환 등 다양한 주제로 소통해요",
    tone: "pink",
    images: [DogThumb, CatThumb],
  },
  {
    title: "반려동물 정보 관리",
    description: "프로필, 건강, 기록을 한 곳에서 체계적으로 관리해요",
    tone: "green",
    images: [RabbitThumb, LizardThumb],
  },
  {
    title: "맞춤 추천",
    description: "관심사와 정보 기반으로 맞춤 콘텐츠를 추천해드려요",
    tone: "purple",
    images: [CatThumb, LizardThumb],
  },
  {
    title: "병원 & 위치 찾기",
    description: "내 주변 병원, 산책로, 펫 프렌들리 장소를 찾아요",
    tone: "blue",
    images: [DogThumb, BirdThumb],
  },
  {
    title: "이벤트 & 모임",
    description: "다양한 이벤트와 모임에 참여하고 즐겨요",
    tone: "yellow",
    images: [BirdThumb, RabbitThumb],
  },
  {
    title: "마켓 & 나눔",
    description: "필요한 물품을 사고팔고 나눔으로 연결돼요",
    tone: "orange",
    images: [FishThumb, LizardThumb],
  },
];

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
          반려동물과 보호자의 삶을 더 편리하고
          <br />
          풍요롭게 만들어주는 다양한 기능을 제공합니다.
        </p>
        <button type="button" onClick={onPrimaryAction}>
          지금 시작하기
        </button>
      </div>

      <div className="LandingFeatureSection_Grid">
        {featureCards.map((card) => (
          <article key={card.title} className={`LandingFeatureSection_Card ${card.tone}`}>
            <strong>{card.title}</strong>
            <p>{card.description}</p>
            <div className="LandingFeatureSection_CardImages">
              {card.images.map((image, index) => (
                <div key={card.title + index} className="LandingFeatureSection_CardImageWrap">
                  <img src={image} alt={card.title} />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LandingFeatureSection;
