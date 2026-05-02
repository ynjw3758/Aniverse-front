import { ExploreCommunity, ExploreEvent, HashtagItem, NearbyPet } from "../exploreMockData";

type ExploreRightPanelProps = {
  hashtags: HashtagItem[];
  events: ExploreEvent[];
  communities: ExploreCommunity[];
  nearbyPets: NearbyPet[];
  onRequireLogin: () => void;
};

const ExploreRightPanel = ({
  hashtags,
  events,
  communities,
  nearbyPets,
  onRequireLogin,
}: ExploreRightPanelProps) => {
  return (
    <aside className="ExploreRightPanel">
      <section className="ExploreRightPanel_Card">
        <div className="ExploreRightPanel_Title">
          <h3>실시간 인기 해시태그</h3>
          <button type="button" onClick={onRequireLogin}>
            더보기
          </button>
        </div>
        <div className="ExploreRightPanel_Tags">
          {hashtags.slice(0, 6).map((item) => (
            <button type="button" key={item.id} onClick={onRequireLogin}>
              <strong>{item.tag}</strong>
              <span>{item.count}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="ExploreRightPanel_Card">
        <div className="ExploreRightPanel_Title">
          <h3>활발한 커뮤니티</h3>
          <button type="button" onClick={onRequireLogin}>
            더보기
          </button>
        </div>
        {communities.slice(0, 4).map((community) => (
          <button type="button" className="ExploreRightPanel_ListItem" key={community.id} onClick={onRequireLogin}>
            <img src={community.image} alt="" />
            <span>
              <strong>{community.name}</strong>
              <small>{community.members}</small>
            </span>
          </button>
        ))}
      </section>

      <section className="ExploreRightPanel_Card">
        <div className="ExploreRightPanel_Title">
          <h3>진행 중인 이벤트</h3>
          <button type="button" onClick={onRequireLogin}>
            더보기
          </button>
        </div>
        {events.slice(0, 3).map((event) => (
          <button type="button" className="ExploreRightPanel_Event" key={event.id} onClick={onRequireLogin}>
            <img src={event.image} alt="" />
            <span>
              <strong>{event.title}</strong>
              <small>{event.date}</small>
              <em>{event.place}</em>
            </span>
          </button>
        ))}
      </section>

      <section className="ExploreRightPanel_Card">
        <div className="ExploreRightPanel_Title">
          <h3>근처 펫 친구들</h3>
          <button type="button" onClick={onRequireLogin}>
            위치 변경
          </button>
        </div>
        {nearbyPets.slice(0, 4).map((pet) => (
          <button type="button" className="ExploreRightPanel_ListItem" key={pet.id} onClick={onRequireLogin}>
            <img src={pet.image} alt="" />
            <span>
              <strong>{pet.name}</strong>
              <small>
                {pet.species} · {pet.distance}
              </small>
            </span>
          </button>
        ))}
      </section>
    </aside>
  );
};

export default ExploreRightPanel;
