import { communityHashtags, communityPreviewPosts, communityRanking } from "./landingData";

type LandingCommunitySectionProps = {
  onBrowseAction: () => void;
};

const LandingCommunitySection = ({ onBrowseAction }: LandingCommunitySectionProps) => {
  return (
    <section className="LandingCommunitySection">
      <aside className="LandingCommunitySection_Aside">
        <h2>
          함께 나누고
          <br />
          함께 성장하는 공간
          <br />
          <strong>Aniverse 커뮤니티</strong>
        </h2>
        <p>
          다양한 반려동물 보호자들과 일상을 나누고
          <br />
          정보도 공유하며 따뜻한 인연을 만들어보세요.
        </p>
        <button type="button" onClick={onBrowseAction}>
          커뮤니티 둘러보기
        </button>

        <div className="LandingCommunitySection_Stats">
          <span>
            <strong>20,000+</strong>
            활발한 보호자
          </span>
          <span>
            <strong>15,000+</strong>
            다양한 반려동물
          </span>
          <span>
            <strong>50,000+</strong>
            게시글과 댓글
          </span>
        </div>
      </aside>

      <div className="LandingCommunitySection_Board">
        <div className="LandingCommunitySection_Tabs">
          <button type="button" className="isActive">
            인기
          </button>
          <button type="button">최신</button>
          <button type="button">질문답변</button>
          <button type="button">정보공유</button>
          <button type="button">자유게시판</button>
        </div>

        <div className="LandingCommunitySection_Layout">
          <div className="LandingCommunitySection_Posts">
            {communityPreviewPosts.map((post) => (
              <article key={post.author + post.time} className="LandingCommunitySection_Post">
                <div className="LandingCommunitySection_PostTop">
                  <div className="LandingCommunitySection_Avatar">{post.author[0]}</div>
                  <div>
                    <strong>{post.author}</strong>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="LandingCommunitySection_PostBody">
                  <div>
                    <p>{post.text}</p>
                    <div className="LandingCommunitySection_Reactions">
                      <span>좋아요 {post.likes}</span>
                      <span>댓글 {post.comments}</span>
                    </div>
                  </div>
                  <div className="LandingCommunitySection_PostImageWrap">
                    <img src={post.image} alt={post.author} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="LandingCommunitySection_SideWidgets">
            <section className="LandingCommunitySection_Widget">
              <strong>인기 해시태그</strong>
              <ul>
                {communityHashtags.map((tag) => (
                  <li key={tag}># {tag}</li>
                ))}
              </ul>
            </section>
            <section className="LandingCommunitySection_Widget">
              <strong>실시간 인기</strong>
              <ol>
                {communityRanking.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCommunitySection;
