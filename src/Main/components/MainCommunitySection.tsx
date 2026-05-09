import { ReactNode } from "react";
import { FaChevronRight } from "react-icons/fa6";

type MainCommunitySectionProps = {
  children: ReactNode;
  onMore: () => void;
};

const MainCommunitySection = ({ children, onMore }: MainCommunitySectionProps) => {
  return (
    <section className="MainPage_panel MainPage_communityPanel">
      <div className="MainPage_panelTitle">
        <h2>커뮤니티 피드</h2>
        <button type="button" onClick={onMore}>
          더보기
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className="MainPage_legacyFeed MainPage_feedColumn">{children}</div>
    </section>
  );
};

export default MainCommunitySection;
