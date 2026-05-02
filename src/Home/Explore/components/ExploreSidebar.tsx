import {
  FaBookmark,
  FaCalendarDays,
  FaCircleQuestion,
  FaGear,
  FaHouse,
  FaLayerGroup,
  FaLocationDot,
  FaPaw,
  FaPeopleGroup,
  FaRegCircle,
  FaStar,
  FaStore,
} from "react-icons/fa6";

type ExploreSidebarProps = {
  onShowCategories: () => void;
  onRequireLogin: () => void;
  onSign: () => void;
};

const ExploreSidebar = ({ onShowCategories, onRequireLogin, onSign }: ExploreSidebarProps) => {
  return (
    <aside className="ExploreSidebar">
      <nav className="ExploreSidebar_Menu" aria-label="메인 메뉴">
        <button type="button" className="selected" onClick={onRequireLogin}>
          <FaHouse aria-hidden="true" />
          홈
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaRegCircle aria-hidden="true" />
          스토리
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaStar aria-hidden="true" />
          인기 게시글
        </button>
        <button type="button" onClick={onShowCategories}>
          <FaLayerGroup aria-hidden="true" />
          카테고리
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaPeopleGroup aria-hidden="true" />
          커뮤니티
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaCalendarDays aria-hidden="true" />
          이벤트
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaLocationDot aria-hidden="true" />
          근처 펫 찾기
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaBookmark aria-hidden="true" />
          저장한 게시물
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaStore aria-hidden="true" />
          마켓
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaCircleQuestion aria-hidden="true" />
          고객센터
        </button>
        <button type="button" onClick={onRequireLogin}>
          <FaGear aria-hidden="true" />
          설정
        </button>
      </nav>

      <button type="button" className="ExploreSidebar_Write" onClick={onRequireLogin}>
        <FaPaw aria-hidden="true" />
        글 작성하기
      </button>

      <div className="ExploreSidebar_Cta">
        <strong>더 많은 기능을 이용해보세요!</strong>
        <p>게시글 작성, 댓글, 채팅 등 다양한 기능을 경험해보세요.</p>
        <button type="button" className="primary" onClick={onSign}>
          프리미엄 가입하기
        </button>
      </div>
    </aside>
  );
};

export default ExploreSidebar;
