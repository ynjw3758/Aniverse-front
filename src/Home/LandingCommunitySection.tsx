import DogThumb from "../assets/images/landing_generated/pet_thumb_dog.png";
import CatThumb from "../assets/images/landing_generated/pet_thumb_cat.png";
import LizardThumb from "../assets/images/landing_generated/pet_thumb_lizard.png";

type LandingCommunitySectionProps = {
  onPrimaryAction: () => void;
};

const posts = [
  {
    author: "댕댕이맘",
    time: "30분 전",
    text: "오늘 우리 댕댕이 산책길이 너무 좋았어요. 날씨도 좋고 기분도 최고!",
    likes: 124,
    comments: 23,
    image: DogThumb,
  },
  {
    author: "냥집사",
    time: "14분 전",
    text: "고양이 사료 추천 부탁드려요. 입맛이 까다로워서 고민이에요.",
    likes: 89,
    comments: 45,
    image: CatThumb,
  },
  {
    author: "파충류사랑",
    time: "2시간 전",
    text: "크레스티드게코 보온 방법 공유합니다. 밤 온도 유지가 중요하네요.",
    likes: 67,
    comments: 12,
    image: LizardThumb,
  },
];

const hashtags = ["오늘의산책", "사료추천", "반려동물일상", "질문답변", "자유수다", "초보집사"];
const ranking = ["강아지 여름철 관리법", "고양이 장난감 비교", "산책 코스 추천", "반려동물 보험 체크", "초보 집사 가이드"];

const LandingCommunitySection = ({ onPrimaryAction }: LandingCommunitySectionProps) => {
  return (
    <section className="LandingCommunitySection">
      <aside className="LandingCommunitySection_Aside">
        <h2>
          함께 나누고,
          <br />
          함께 성장하는 공간
          <br />
          <strong>Aniverse 커뮤니티</strong>
        </h2>
        <p>
          다양한 반려동물 보호자들과 일상을 나누고,
          <br />
          정보도 공유하며 따뜻한 인연을 만들어보세요.
        </p>
        <button type="button" onClick={onPrimaryAction}>
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
            게시글 & 댓글
          </span>
        </div>
      </aside>

      <div className="LandingCommunitySection_Board">
        <div className="LandingCommunitySection_Tabs">
          <button type="button" className="isActive">
            인기
          </button>
          <button type="button">최신</button>
          <button type="button">질문/답변</button>
          <button type="button">정보공유</button>
          <button type="button">자유게시판</button>
        </div>

        <div className="LandingCommunitySection_Layout">
          <div className="LandingCommunitySection_Posts">
            {posts.map((post) => (
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
                      <span>♡ {post.likes}</span>
                      <span>◦ {post.comments}</span>
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
                {hashtags.map((tag) => (
                  <li key={tag}># {tag}</li>
                ))}
              </ul>
            </section>
            <section className="LandingCommunitySection_Widget">
              <strong>실시간 인기</strong>
              <ol>
                {ranking.map((item) => (
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
