import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ExplorePage.scss";
import AniverseLogo from "../../assets/images/petbuddy_logo.svg";
import ExploreCategoryTabs from "./components/ExploreCategoryTabs";
import ExploreFeed from "./components/ExploreFeed";
import ExploreRightPanel from "./components/ExploreRightPanel";
import ExploreSidebar from "./components/ExploreSidebar";
import ExploreStoryBar from "./components/ExploreStoryBar";
import ExploreTopBar from "./components/ExploreTopBar";
import LoginRequiredModal from "./components/LoginRequiredModal";
import {
  categories,
  communities,
  events,
  ExploreCategory,
  hashtags,
  nearbyPets,
  posts,
  stories,
} from "./exploreMockData";

const normalize = (value: string) => value.trim().toLowerCase();

const matchesKeyword = (keyword: string, values: Array<string | string[]>) => {
  if (!keyword) return true;

  return values.some((value) => {
    if (Array.isArray(value)) return value.some((item) => normalize(item).includes(keyword));
    return normalize(value).includes(keyword);
  });
};

const ExplorePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExploreCategory>("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const keyword = normalize(searchKeyword);
  const isAll = selectedCategory === "전체";

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const categoryMatched = isAll || post.category === selectedCategory;
        const keywordMatched = matchesKeyword(keyword, [
          post.title,
          post.content,
          post.author,
          post.category,
          post.tags,
        ]);
        return categoryMatched && keywordMatched;
      }),
    [isAll, keyword, selectedCategory],
  );

  const filteredCommunities = useMemo(
    () =>
      communities.filter((community) => {
        const categoryMatched = isAll || community.category === selectedCategory;
        const keywordMatched = matchesKeyword(keyword, [
          community.name,
          community.description,
          community.category,
          community.tags,
        ]);
        return categoryMatched && keywordMatched;
      }),
    [isAll, keyword, selectedCategory],
  );

  const filteredEvents = useMemo(
    () =>
      events.filter((event) => {
        const categoryMatched = isAll || event.category === "전체" || event.category === selectedCategory;
        const keywordMatched = matchesKeyword(keyword, [event.title, event.description, event.category, event.place]);
        return categoryMatched && keywordMatched;
      }),
    [isAll, keyword, selectedCategory],
  );

  const filteredNearbyPets = useMemo(
    () =>
      nearbyPets.filter((pet) => {
        const categoryMatched = isAll || pet.category === selectedCategory;
        const keywordMatched = matchesKeyword(keyword, [pet.name, pet.species, pet.intro, pet.category, pet.tags]);
        return categoryMatched && keywordMatched;
      }),
    [isAll, keyword, selectedCategory],
  );

  const filteredHashtags = useMemo(
    () =>
      hashtags.filter((item) => {
        const categoryMatched = isAll || item.category === "전체" || item.category === selectedCategory;
        const keywordMatched = matchesKeyword(keyword, [item.tag, item.category]);
        return categoryMatched && keywordMatched;
      }),
    [isAll, keyword, selectedCategory],
  );

  const visibleStories = useMemo(
    () => stories.filter((story) => story.isCreate || isAll || story.category === selectedCategory),
    [isAll, selectedCategory],
  );

  const searchTitle = searchKeyword.trim() ? `"${searchKeyword.trim()}" 검색 결과` : "";
  const profileImage = stories.find((story) => !story.isCreate)?.image || AniverseLogo;
  const openLoginModal = () => setModalOpen(true);
  const goSign = () => navigate("/sign");
  const goLanding = () => navigate("/");
  const showCategories = () => {
    document.getElementById("ExploreCategoryTabs")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="ExplorePreview">
      <ExploreTopBar
        logo={AniverseLogo}
        profileImage={profileImage}
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
        onRequireLogin={openLoginModal}
        onLogoClick={goLanding}
      />

      <div className="ExplorePreview_Shell">
        <ExploreSidebar onShowCategories={showCategories} onRequireLogin={openLoginModal} onSign={goSign} />

        <section className="ExplorePreview_FeedColumn">
          <ExploreStoryBar stories={visibleStories} onRequireLogin={openLoginModal} />
          <ExploreCategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          {(searchKeyword.trim() || !isAll) && (
            <div className="ExploreFilterNotice">
              <strong>{searchKeyword.trim() ? `"${searchKeyword.trim()}" 검색어` : selectedCategory}</strong>
              <span>
                {isAll
                  ? "에 맞는 게시글과 커뮤니티를 보여주고 있어요."
                  : `${selectedCategory} 카테고리 기준으로 피드를 필터링했어요.`}
              </span>
            </div>
          )}
          <ExploreFeed
            posts={filteredPosts}
            searchTitle={searchTitle}
            selectedCategory={selectedCategory}
            hasSearch={Boolean(searchKeyword.trim())}
            onRequireLogin={openLoginModal}
          />
        </section>

        <ExploreRightPanel
          hashtags={filteredHashtags}
          events={filteredEvents}
          communities={filteredCommunities}
          nearbyPets={filteredNearbyPets}
          onRequireLogin={openLoginModal}
        />
      </div>

      <LoginRequiredModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onLogin={() => navigate("/login")}
        onSign={goSign}
      />
    </main>
  );
};

export default ExplorePage;
