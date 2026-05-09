import {
  FaCalendarDays,
  FaCartShopping,
  FaCircleQuestion,
  FaClipboardList,
  FaCommentDots,
  FaGlobe,
  FaHouse,
  FaLocationDot,
  FaShieldHalved,
  FaStar,
} from "react-icons/fa6";
import PremiumPets from "../../assets/images/explore_premium_pets.png";

type MainSidebarProps = {
  isReady: boolean;
  onMenuClick: () => void;
  onSupportClick: () => void;
};

const menuItems = [
  { label: "홈", icon: <FaHouse aria-hidden="true" />, active: true },
  { label: "커뮤니티 피드", icon: <FaCommentDots aria-hidden="true" /> },
  { label: "반려동물 프로필", icon: <FaClipboardList aria-hidden="true" /> },
  { label: "맞춤 추천", icon: <FaStar aria-hidden="true" /> },
  { label: "병원과 위치 찾기", icon: <FaLocationDot aria-hidden="true" /> },
  { label: "이벤트와 모임", icon: <FaCalendarDays aria-hidden="true" /> },
  { label: "마켓과 나눔", icon: <FaCartShopping aria-hidden="true" /> },
  { label: "안전 신고", icon: <FaShieldHalved aria-hidden="true" /> },
  { label: "다국어 지원", icon: <FaGlobe aria-hidden="true" /> },
];

const MainSidebar = ({ isReady, onMenuClick, onSupportClick }: MainSidebarProps) => {
  return (
    <aside className="MainPage_sidebar">
      <nav className="MainPage_menu" aria-label="메인 메뉴">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={item.active ? "selected" : ""}
            disabled={!isReady}
            onClick={onMenuClick}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="MainPage_premium">
        <div>
          <strong>Aniverse 프리미엄</strong>
          <p>더 많은 기능과 혜택을 경험해보세요!</p>
          <button type="button" onClick={onMenuClick}>자세히 보기</button>
        </div>
        <img src={PremiumPets} alt="" />
      </div>

      <button type="button" className="MainPage_help" onClick={onSupportClick}>
        <FaCircleQuestion aria-hidden="true" />
        <span>
          <strong>도움이 필요하신가요?</strong>
          고객센터 바로가기
        </span>
      </button>
    </aside>
  );
};

export default MainSidebar;
