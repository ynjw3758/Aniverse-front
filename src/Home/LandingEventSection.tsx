import DogThumb from "../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../assets/images/landing_generated/pet_thumb_cat.png";
import BirdThumb from "../assets/images/landing_generated/pet_thumb_bird.png";
import FishThumb from "../assets/images/landing_generated/pet_thumb_fish.png";

type LandingEventSectionProps = {
  onPrimaryAction: () => void;
};

const events = [
  {
    badge: "진행중",
    title: "봄맞이 산책 챌린지",
    period: "2026.04.01 - 2026.04.30",
    description: "매일 산책하고 인증샷을 올리면 추첨을 통해 선물을 드려요.",
    people: "참여자 1,234명",
    cta: "참여하기",
    image: DogThumb,
    tone: "green",
  },
  {
    badge: "진행중",
    title: "우리집 냥이 자랑대회",
    period: "2026.04.05 - 2026.04.25",
    description: "사랑스러운 냥이 사진을 공유하고 멋진 상품을 받아가세요!",
    people: "참여자 856명",
    cta: "참여하기",
    image: CatThumb,
    tone: "orange",
  },
  {
    badge: "예약",
    title: "앵무새 행동 교실",
    period: "2026.04.15 - 2026.04.20",
    description: "전문가와 함께하는 앵무새 행동 교정 온라인 클래스",
    people: "참여자 120명",
    cta: "알림 신청",
    image: BirdThumb,
    tone: "olive",
  },
  {
    badge: "예정",
    title: "수초 어항 꾸미기 대회",
    period: "2026.04.20 - 2026.05.05",
    description: "멋진 수조 레이아웃을 자랑하고 상품도 받아가세요!",
    people: "참여자 320명",
    cta: "알림 신청",
    image: FishThumb,
    tone: "blue",
  },
];

const LandingEventSection = ({ onPrimaryAction }: LandingEventSectionProps) => {
  return (
    <section className="LandingEventSection">
      <div className="LandingEventSection_Intro">
        <span className="LandingEventSection_Badge">참여하고 함께 즐기기</span>
        <h2>
          Aniverse
          <br />
          <strong>이벤트</strong>
        </h2>
        <p>
          다양한 이벤트와 모임에 참여하고
          <br />
          특별한 경험과 혜택을 만나보세요.
        </p>
        <button type="button" onClick={onPrimaryAction}>
          이벤트 전체보기
        </button>

        <div className="LandingEventSection_MiniStats">
          <div>
            <strong>다양한 이벤트</strong>
            <p>매월 새로운 이벤트</p>
          </div>
          <div>
            <strong>특별한 혜택</strong>
            <p>참여자 전원 리워드</p>
          </div>
          <div>
            <strong>함께하는 즐거움</strong>
            <p>모두가 함께 즐겨요</p>
          </div>
        </div>
      </div>

      <div className="LandingEventSection_Cards">
        {events.map((event) => (
          <article key={event.title} className={`LandingEventSection_Card ${event.tone}`}>
            <div className="LandingEventSection_ImageWrap">
              <span>{event.badge}</span>
              <img src={event.image} alt={event.title} />
            </div>
            <div className="LandingEventSection_Body">
              <strong>{event.title}</strong>
              <small>{event.period}</small>
              <p>{event.description}</p>
            </div>
            <div className="LandingEventSection_Footer">
              <em>{event.people}</em>
              <button type="button">{event.cta}</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LandingEventSection;
