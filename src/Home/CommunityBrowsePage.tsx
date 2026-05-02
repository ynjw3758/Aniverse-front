import { useEffect, useState } from "react";
import moment from "moment";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./CommunityBrowsePage.scss";
import PetBuddyLogo from "../assets/images/petbuddy_logo.svg";
import LandingSharedFooter from "./LandingSharedFooter";
import {
  browseCategories,
  browseEvents,
  communities,
  nearbyPets,
  popularPosts,
} from "./landingData";

const CommunityBrowsePage: React.FC = () => {
  const [login, setLogin] = useState(false);
  const [acctime, setAcctime] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const allCookies = cookies.getAll();
    Object.entries(allCookies).forEach(([key, value]) => {
      if (key === "p_exp" && value) setAcctime(true);
    });

    const exp = localStorage.getItem("p_exp");
    if (exp && exp !== "null") setAcctime(true);
  }, []);

  useEffect(() => {
    if (!acctime) return;

    const exp = localStorage.getItem("p_exp");
    const expNumber = Number(exp);

    if (!Number.isFinite(expNumber)) {
      setLogin(false);
      return;
    }

    const date = new Date(expNumber * 1000);
    const dates = moment(date).format("YYYY-MM-DD HH:mm");
    setLogin(moment(dates).diff(moment()) > 0);
  }, [acctime]);

  const sign = () => navigate("/sign");
  const goLogin = () => navigate("/login");
  const goLanding = () => navigate("/");
  const startHandler = () => navigate("/");
  const primaryAction = login ? startHandler : sign;

  return (
    <main className="CommunityBrowsePage">
      <header className="CommunityBrowsePage_Header">
        <div className="CommunityBrowsePage_HeaderInner">
          <button type="button" className="CommunityBrowsePage_Brand" onClick={goLanding}>
            <img src={PetBuddyLogo} alt="Aniverse" />
            <span>Aniverse</span>
          </button>

          <nav className="CommunityBrowsePage_Nav" aria-label="커뮤니티 둘러보기 메뉴">
            <button type="button" onClick={goLanding}>서비스 소개</button>
            <button type="button" onClick={goLanding}>주요 기능</button>
            <button type="button" className="isActive">커뮤니티</button>
            <button type="button" onClick={goLanding}>이벤트</button>
            <button type="button" onClick={goLanding}>가이드</button>
          </nav>

          <div className="CommunityBrowsePage_Auth">
            {!login ? (
              <>
                <button type="button" className="ghost" onClick={goLogin}>로그인</button>
                <button type="button" className="solid" onClick={sign}>회원가입</button>
              </>
            ) : (
              <button type="button" className="solid" onClick={startHandler}>시작하기</button>
            )}
          </div>
        </div>
      </header>

      <div className="CommunityBrowsePage_Content">
        <section className="CommunityBrowsePage_Hero">
          <div className="CommunityBrowsePage_TitleBlock">
            <span className="CommunityBrowsePage_Icon">A</span>
            <div>
              <h1>커뮤니티 둘러보기</h1>
              <p>
                로그인 없이도 Aniverse 커뮤니티의 인기 글, 추천 모임, 이벤트와 주변 반려동물 친구들을 살펴볼 수 있어요.
              </p>
            </div>
          </div>

          <form className="CommunityBrowsePage_Search" onSubmit={(event) => event.preventDefault()}>
            <div className="CommunityBrowsePage_SearchField">
              <span>검색</span>
              <input type="text" placeholder="관심 있는 동물이나 주제를 검색해보세요" />
            </div>
            <button type="submit">검색</button>
          </form>
        </section>

        <section className="CommunityBrowsePage_CategoryStrip" aria-label="반려동물 카테고리">
          {browseCategories.map((category, index) => (
            <button
              key={category.label + index}
              type="button"
              className={index === 0 ? "CommunityBrowsePage_Category isActive" : "CommunityBrowsePage_Category"}
            >
              <span className="CommunityBrowsePage_CategoryThumb">
                <img src={category.image} alt={category.label} />
              </span>
              <strong>{category.label}</strong>
            </button>
          ))}
        </section>

        <section className="CommunityBrowsePage_Section">
          <div className="CommunityBrowsePage_SectionHeader">
            <h2>인기 게시글</h2>
            <button type="button">더보기</button>
          </div>
          <div className="CommunityBrowsePage_PostGrid">
            {popularPosts.map((post) => (
              <article key={post.title} className="CommunityBrowsePage_PostCard">
                <div className="CommunityBrowsePage_PostImageWrap">
                  {post.rank ? <span className="rank">{post.rank}</span> : null}
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="CommunityBrowsePage_PostBody">
                  <em>{post.badge}</em>
                  <strong>{post.title}</strong>
                  <small>{post.author}</small>
                  <div className="CommunityBrowsePage_PostMeta">
                    <span>좋아요 {post.likes}</span>
                    <span>댓글 {post.comments}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="CommunityBrowsePage_Section">
          <div className="CommunityBrowsePage_SectionHeader">
            <h2>지금 활발한 커뮤니티</h2>
            <button type="button">더보기</button>
          </div>
          <div className="CommunityBrowsePage_CommunityGrid">
            {communities.map((community) => (
              <article key={community.title} className="CommunityBrowsePage_CommunityCard">
                <img src={community.image} alt={community.title} />
                <strong>{community.title}</strong>
                <span>{community.members}</span>
                <p>{community.desc}</p>
                <button type="button">둘러보기</button>
              </article>
            ))}
          </div>
        </section>

        <section className="CommunityBrowsePage_Section">
          <div className="CommunityBrowsePage_SectionHeader">
            <h2>진행 중인 이벤트</h2>
            <button type="button">더보기</button>
          </div>
          <div className="CommunityBrowsePage_EventRow">
            {browseEvents.map((event) => (
              <article key={event.title} className={`CommunityBrowsePage_EventCard ${event.tone}`}>
                <div>
                  <strong>{event.title}</strong>
                  <small>{event.period}</small>
                  <button type="button">{event.action}</button>
                </div>
                <img src={event.image} alt={event.title} />
              </article>
            ))}
          </div>
        </section>

        <section className="CommunityBrowsePage_Section">
          <div className="CommunityBrowsePage_SectionHeader">
            <h2>내 주변 친구들</h2>
            <button type="button">위치 변경</button>
          </div>
          <div className="CommunityBrowsePage_NearbyLayout">
            <div className="CommunityBrowsePage_MapCard" aria-label="주변 반려동물 위치 미리보기">
              <div className="CommunityBrowsePage_MapPins">
                <span className="pin p1">D</span>
                <span className="pin p2">C</span>
                <span className="pin p3">B</span>
                <span className="pin p4">R</span>
                <span className="pin p5">F</span>
              </div>
            </div>

            <div className="CommunityBrowsePage_NearbyGrid">
              {nearbyPets.map((pet) => (
                <article key={pet.name} className="CommunityBrowsePage_NearbyCard">
                  <div className="CommunityBrowsePage_NearbyImageWrap">
                    <img src={pet.image} alt={pet.name} />
                    <span>{pet.distance}</span>
                  </div>
                  <div className="CommunityBrowsePage_NearbyBody">
                    <strong>{pet.name}</strong>
                    <small>{pet.meta}</small>
                    <p>{pet.bio}</p>
                    <button type="button">자세히 보기</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LandingSharedFooter loggedIn={login} onPrimaryAction={primaryAction} onLogin={goLogin} />
      </div>
    </main>
  );
};

export default CommunityBrowsePage;
