import { FaBell, FaChevronDown, FaCommentDots, FaHouse, FaMagnifyingGlass } from "react-icons/fa6";

type ExploreTopBarProps = {
  logo: string;
  profileImage: string;
  searchKeyword: string;
  onSearchChange: (value: string) => void;
  onRequireLogin: () => void;
  onLogoClick: () => void;
};

const ExploreTopBar = ({
  logo,
  profileImage,
  searchKeyword,
  onSearchChange,
  onRequireLogin,
  onLogoClick,
}: ExploreTopBarProps) => {
  return (
    <header className="ExploreTopBar">
      <button type="button" className="ExploreTopBar_Brand" onClick={onLogoClick}>
        <img src={logo} alt="Aniverse" />
        <span>Aniverse</span>
      </button>

      <label className="ExploreTopBar_Search" htmlFor="ExploreFeedSearch">
        <FaMagnifyingGlass aria-hidden="true" />
        <input
          id="ExploreFeedSearch"
          value={searchKeyword}
          placeholder="검색어를 입력하세요 (펫, 사람, 해시태그)"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="ExploreTopBar_Actions" aria-label="둘러보기 상단 메뉴">
        <button type="button" className="active" onClick={onRequireLogin}>
          <FaHouse aria-hidden="true" />
          <small>홈</small>
        </button>
        <button type="button" onClick={onRequireLogin}>
          <em>3</em>
          <FaCommentDots aria-hidden="true" />
          <small>채팅</small>
        </button>
        <button type="button" onClick={onRequireLogin}>
          <em>5</em>
          <FaBell aria-hidden="true" />
          <small>알림</small>
        </button>
        <button type="button" className="profile" onClick={onRequireLogin}>
          <img src={profileImage} alt="" />
          <strong>루이맘</strong>
          <FaChevronDown aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default ExploreTopBar;
