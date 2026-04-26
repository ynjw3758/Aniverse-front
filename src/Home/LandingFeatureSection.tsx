import CommunityFeedImage from "../assets/images/feature_cards/community_feed.svg";
import PetProfileImage from "../assets/images/feature_cards/pet_profile.svg";
import RecommendImage from "../assets/images/feature_cards/recommend.svg";
import HospitalLocationImage from "../assets/images/feature_cards/hospital_location.svg";
import EventsMeetupsImage from "../assets/images/feature_cards/events_meetups.svg";
import MarketShareImage from "../assets/images/feature_cards/market_share.svg";
import DailyNewsImage from "../assets/images/feature_cards/daily_news.svg";
import SafetyReportImage from "../assets/images/feature_cards/safety_report.svg";
import MultilingualImage from "../assets/images/feature_cards/multilingual.svg";

type LandingFeatureSectionProps = {
  onPrimaryAction: () => void;
};

const featureCards = [
  {
    title: "커뮤니티 & 피드",
    description: "일상 공유, 질문, 정보 교환 등 다양한 주제로 소통해요",
    tone: "pink",
    image: CommunityFeedImage,
  },
  {
    title: "반려동물 정보 관리",
    description: "프로필, 건강, 기록을 한 곳에서 체계적으로 관리해요",
    tone: "green",
    image: PetProfileImage,
  },
  {
    title: "맞춤 추천",
    description: "관심사와 정보를 기반으로 맞춤 콘텐츠를 추천해드려요",
    tone: "purple",
    image: RecommendImage,
  },
  {
    title: "병원 & 위치 찾기",
    description: "내 주변 병원, 산책로, 펫 프렌들리 장소를 찾아요",
    tone: "blue",
    image: HospitalLocationImage,
  },
  {
    title: "이벤트 & 모임",
    description: "다양한 이벤트와 오프라인 모임에 참여하고 즐겨요",
    tone: "yellow",
    image: EventsMeetupsImage,
  },
  {
    title: "마켓 & 나눔",
    description: "필요한 물품을 사고팔고 나눔으로 연결해요",
    tone: "orange",
    image: MarketShareImage,
  },
  {
    title: "일상 & 소식",
    description: "즐겨 찾는 주제에 맞춘 소식을 빠르게 확인해보세요",
    tone: "green",
    image: DailyNewsImage,
  },
  {
    title: "안전 & 신고",
    description: "긴급한 이슈나 신고 상황을 빠르게 기록하고 공유해요",
    tone: "pink",
    image: SafetyReportImage,
  },
  {
    title: "다국어 지원",
    description: "다양한 언어로 서비스를 이용하고 소통할 수 있어요",
    tone: "blue",
    image: MultilingualImage,
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
          반려동물과 보호자에게 꼭 필요한
          <br />
          주요 기능을 한곳에 모아 제공해드려요.
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
