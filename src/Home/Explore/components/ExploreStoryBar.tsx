import { StoryItem } from "../exploreMockData";

type ExploreStoryBarProps = {
  stories: StoryItem[];
  onRequireLogin: () => void;
};

const ExploreStoryBar = ({ stories, onRequireLogin }: ExploreStoryBarProps) => {
  return (
    <section className="ExploreStoryBar" aria-label="스토리 미리보기">
      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          className={story.isCreate ? "ExploreStoryBar_Item create" : "ExploreStoryBar_Item"}
          onClick={onRequireLogin}
        >
          <span>{story.isCreate ? <em>+</em> : <img src={story.image} alt={story.name} />}</span>
          <strong>{story.name}</strong>
        </button>
      ))}
    </section>
  );
};

export default ExploreStoryBar;
