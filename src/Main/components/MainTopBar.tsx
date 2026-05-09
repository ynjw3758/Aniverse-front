import { FaBell, FaChevronDown, FaCommentDots, FaMagnifyingGlass } from "react-icons/fa6";

type MainTopBarProps = {
  logo: string;
  profileImage: string;
  displayName: string;
  searchKeyword: string;
  chatCount: number;
  onSearchChange: (value: string) => void;
  onHome: () => void;
  onChat: () => void;
  onAlarm: () => void;
  onProfile: () => void;
};

const MainTopBar = ({
  logo,
  profileImage,
  displayName,
  searchKeyword,
  chatCount,
  onSearchChange,
  onHome,
  onChat,
  onAlarm,
  onProfile,
}: MainTopBarProps) => {
  return (
    <header className="MainPage_topbar">
      <button type="button" className="MainPage_brand" onClick={onHome}>
        <img src={logo} alt="Aniverse" />
        <span>Aniverse</span>
      </button>

      <label className="MainPage_search" htmlFor="MainPageSearch">
        <FaMagnifyingGlass aria-hidden="true" />
        <input
          id="MainPageSearch"
          value={searchKeyword}
          placeholder="통합 검색 (커뮤니티, 반려동물, 이벤트 등)"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="MainPage_topActions" aria-label="상단 메뉴">
        <button type="button" aria-label="채팅" onClick={onChat}>
          {chatCount > 0 && <em>{chatCount}</em>}
          <FaCommentDots aria-hidden="true" />
        </button>
        <button type="button" aria-label="알림" onClick={onAlarm}>
          <em>5</em>
          <FaBell aria-hidden="true" />
        </button>
        <button type="button" className="profile" onClick={onProfile}>
          <img src={profileImage} alt="" />
          <strong>{displayName}</strong>
          <FaChevronDown aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default MainTopBar;
