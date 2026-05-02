import { landingEvents } from "./landingData";

type LandingEventSectionProps = {
  onPrimaryAction: () => void;
};

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
          반려동물 보호자들과 새로운 경험을 만들어보세요.
        </p>
        <button type="button" onClick={onPrimaryAction}>
          이벤트 전체보기
        </button>

        <div className="LandingEventSection_MiniStats">
          <div>
            <strong>다양한 이벤트</strong>
            <p>매월 새롭게 열리는 참여형 콘텐츠</p>
          </div>
          <div>
            <strong>보호자 혜택</strong>
            <p>참여자를 위한 리워드와 쿠폰</p>
          </div>
          <div>
            <strong>함께하는 즐거움</strong>
            <p>커뮤니티 안에서 이어지는 이야기</p>
          </div>
        </div>
      </div>

      <div className="LandingEventSection_Cards">
        {landingEvents.map((event) => (
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
