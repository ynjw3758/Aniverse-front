import { ExploreCategory, ExplorePost } from "../exploreMockData";
import ExplorePostCard from "./ExplorePostCard";

type ExploreFeedProps = {
  posts: ExplorePost[];
  searchTitle: string;
  selectedCategory: ExploreCategory;
  hasSearch: boolean;
  onRequireLogin: () => void;
};

const ExploreFeed = ({ posts, searchTitle, selectedCategory, hasSearch, onRequireLogin }: ExploreFeedProps) => {
  const title = searchTitle || `${selectedCategory} 인기 피드`;

  return (
    <section className="ExploreFeed">
      <div className="ExploreComposer">
        <button type="button" className="ExploreComposer_Input" onClick={onRequireLogin}>
          <span>🐶</span>
          무슨 일이 일어나고 있나요, 루이맘?
        </button>
        <div className="ExploreComposer_Actions">
          <button type="button" onClick={onRequireLogin}>사진/동영상</button>
          <button type="button" onClick={onRequireLogin}>위치</button>
          <button type="button" onClick={onRequireLogin}>기분/활동</button>
          <button type="button" onClick={onRequireLogin}>투표</button>
        </div>
      </div>

      <div className="ExploreFeed_Header">
        <div>
          <span>{hasSearch ? "검색 결과" : "메인 피드 미리보기"}</span>
          <h1>{title}</h1>
        </div>
      </div>

      {posts.length > 0 ? (
        posts.map((post) => <ExplorePostCard key={post.id} post={post} onRequireLogin={onRequireLogin} />)
      ) : (
        <div className="ExploreEmptyState">
          <strong>검색 결과가 없어요.</strong>
          <p>다른 키워드나 카테고리를 선택해보세요.</p>
        </div>
      )}
    </section>
  );
};

export default ExploreFeed;
