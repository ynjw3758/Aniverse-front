import { ExplorePost } from "../exploreMockData";

type ExplorePostCardProps = {
  post: ExplorePost;
  onRequireLogin: () => void;
};

const ExplorePostCard = ({ post, onRequireLogin }: ExplorePostCardProps) => {
  return (
    <article className="ExplorePostCard">
      <button type="button" className="ExplorePostCard_Header" onClick={onRequireLogin}>
        <img src={post.image} alt="" />
        <div>
          <strong>{post.author}</strong>
          <span>
            {post.handle} · {post.time}
          </span>
        </div>

      </button>

      <button type="button" className="ExplorePostCard_Text" onClick={onRequireLogin}>
        <strong>{post.title}</strong>
        <span>{post.content}</span>
        <small>{post.tags.map((tag) => `#${tag}`).join(" ")}</small>
      </button>

      <button type="button" className="ExplorePostCard_Image" onClick={onRequireLogin}>
        <img src={post.image} alt={post.title} />
        <span>{post.imageCount}</span>
      </button>

      <div className="ExplorePostCard_Lock">
        로그인 후 좋아요, 댓글 등 모든 활동을 이용할 수 있어요.
      </div>

      <div className="ExplorePostCard_Actions">
        <button type="button" onClick={onRequireLogin}>
          좋아요 {post.likes}
        </button>
        <button type="button" onClick={onRequireLogin}>
          댓글 {post.comments}
        </button>
        <button type="button" onClick={onRequireLogin}>
          공유
        </button>
        <button type="button" onClick={onRequireLogin}>
          저장
        </button>
      </div>
    </article>
  );
};

export default ExplorePostCard;
