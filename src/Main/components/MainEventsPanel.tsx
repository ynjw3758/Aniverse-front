import { FaCalendarDays, FaChevronRight, FaLocationDot } from "react-icons/fa6";
import hamsterImage from "../../assets/images/landing_generated/pet_thumb_hamster.png";
import birdImage from "../../assets/images/landing_generated/pet_thumb_bird.png";
import beetleImage from "../../assets/images/landing_generated/pet_thumb_arthropod.png";

type MainEventsPanelProps = {
  onAction: () => void;
};

const events = [
  {
    title: "이색 반려동물 정보 교류 모임",
    date: "2026.05.30 (목) 14:00",
    place: "서울 마포구",
    image: hamsterImage,
  },
  {
    title: "조류 입양 & 케어 세미나",
    date: "2026.06.02 (일) 10:00",
    place: "온라인 진행",
    image: birdImage,
  },
  {
    title: "곤충 사육자 네트워크 모임",
    date: "2026.06.08 (토) 13:00",
    place: "부산 해운대",
    image: beetleImage,
  },
];

const MainEventsPanel = ({ onAction }: MainEventsPanelProps) => {
  return (
    <section className="MainPage_panel MainPage_eventsPanel">
      <div className="MainPage_panelTitle">
        <h2>이벤트 & 모임</h2>
        <button type="button" onClick={onAction}>
          더보기
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className="MainPage_eventList">
        {events.map((event) => (
          <button type="button" key={event.title} onClick={onAction}>
            <img src={event.image} alt="" />
            <span>
              <strong>{event.title}</strong>
              <small>
                <FaCalendarDays aria-hidden="true" />
                {event.date}
              </small>
              <em>
                <FaLocationDot aria-hidden="true" />
                {event.place}
              </em>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MainEventsPanel;
