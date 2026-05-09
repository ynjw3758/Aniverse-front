import {
  FaCalendarDays,
  FaCartShopping,
  FaClipboardList,
  FaCommentDots,
  FaLocationDot,
  FaStar,
} from "react-icons/fa6";

type MainQuickLinksProps = {
  onAction: () => void;
};

const quickLinks = [
  { label: "커뮤니티 피드", icon: <FaCommentDots aria-hidden="true" />, tone: "pink" },
  { label: "반려동물 프로필", icon: <FaClipboardList aria-hidden="true" />, tone: "green" },
  { label: "맞춤 추천", icon: <FaStar aria-hidden="true" />, tone: "purple" },
  { label: "병원 찾기", icon: <FaLocationDot aria-hidden="true" />, tone: "blue" },
  { label: "이벤트 & 모임", icon: <FaCalendarDays aria-hidden="true" />, tone: "yellow" },
  { label: "마켓 & 나눔", icon: <FaCartShopping aria-hidden="true" />, tone: "orange" },
];

const MainQuickLinks = ({ onAction }: MainQuickLinksProps) => {
  return (
    <section className="MainPage_quick">
      <h2>주요 기능 바로가기</h2>
      <div className="MainPage_quickGrid">
        {quickLinks.map((item) => (
          <button type="button" key={item.label} className={`tone-${item.tone}`} onClick={onAction}>
            <span>{item.icon}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
    </section>
  );
};

export default MainQuickLinks;
