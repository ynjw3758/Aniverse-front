import axios from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import {
  FaBell,
  FaBookmark,
  FaCalendarDays,
  FaChevronDown,
  FaCircleQuestion,
  FaCommentDots,
  FaGear,
  FaHouse,
  FaLayerGroup,
  FaLocationDot,
  FaMagnifyingGlass,
  FaPaw,
  FaPeopleGroup,
  FaRegCircle,
  FaStar,
  FaStore,
} from "react-icons/fa6";
import "./MainPage.scss";
import user_info from "../Context/Userdata";
import LoginExp from "../LginExpiration/LoginExp";
import WebSocker_Provider from "../Context/WebSocker_Provider";
import WebSocketAlarm_Provider from "../Context/WebSocketAlarm_Provider";
import AlarmMain from "./Alarm/AlarmMain";
import MainContentsx from "./Contents/MainContents";
import baseprofile from "../assets/images/baseimg.png";
import petBuddyLogo from "../assets/images/petbuddy_logo.svg";
import dogAvatar from "../assets/images/dog.png";
import catAvatar from "../assets/images/cat.png";
import rabbitAvatar from "../assets/images/Rabbit.png";
import petPlusIcon from "../assets/images/petpluse.png";
import eventImage from "../assets/images/log_test.jpg";
import { api } from "../API/Api";

interface ResponseDataType {
  message: string;
  code: number;
  response: object;
  resultdata?: unknown;
}

type NotiKind = {
  Chat: ChatNoti[];
};

type ChatNoti = {
  ChatId: string;
  IsRead: boolean;
  MessageId: string;
  RoomName: string;
  UserId: string;
  message: string;
  nickname: string;
  profile: string;
  sendId: string;
  timestamp: string;
  type: string;
  Count: number;
};

const MainPage = () => {
  const [nickName, setNickName] = useState("");
  const [profile, setProfile] = useState("");
  const [id, setId] = useState("");
  const [content, setContent] = useState<string[]>([]);
  const [contentitem, setContentitem] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const [isready, setIsready] = useState(true);
  const [againlogin] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [noti, setNoti] = useState<NotiKind>();
  const [modal, setModal] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();
  const loginInfo = useContext(user_info);
  const param = useParams();

  const displayName = nickName || "루이맘";
  const profileImage = profile || baseprofile;
  const chatCount = noti?.Chat?.length || 0;

  const refreshMain = useCallback(() => {
    setIsloading(true);
    setIsready(false);

    const accessToken = localStorage.getItem("a_id") || "";
    const userId = localStorage.getItem("id") || id;

    if (!userId) {
      setIsloading(false);
      setIsready(true);
      navigate("/login");
      return;
    }

    api.defaults.headers.common.Authorization = accessToken;
    api
      .post(
        "/gateway/api-proxy",
        {
          service: "common",
          endpoint: "main/refresh-main",
          method: "GET",
          body: { id: userId },
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const data = response.data.data;
          const nextProfile = data.profile_img === "null" ? baseprofile : data.profile_img;

          setNoti(data.Noti);
          setContent(data.content_info || []);
          setNickName(data.nickname || "");
          setProfile(nextProfile);
          setId(data.id || "");
          setContentitem(true);
          loginInfo.addprofile(nextProfile);
          loginInfo.addeNickName(data.nickname || "");
        }
      })
      .catch((error) => {
        if (axios.isAxiosError<ResponseDataType>(error)) {
          if (!error.response) {
            navigate("/error/Gateway");
            return;
          }

          if (error.response.status === 400) {
            navigate("/error/BadRequest");
          } else if (error.response.status === 415) {
            setIsloading(false);
          } else if (error.response.status === 500) {
            navigate("/error/se-error");
          } else if (error.response.status === 502) {
            navigate("/error/Gateway");
          }
        }
      })
      .finally(() => {
        setIsloading(false);
        setIsready(true);
      });
  }, [id, loginInfo, navigate]);

  useEffect(() => {
    if (param.userid) {
      setContentitem(false);
      return;
    }

    refreshMain();
  }, [param.userid, refreshMain]);

  const menuItems = useMemo(
    () => [
      { label: "홈", icon: <FaHouse aria-hidden="true" />, active: true, onClick: refreshMain },
      { label: "스토리", icon: <FaRegCircle aria-hidden="true" />, onClick: refreshMain },
      { label: "인기 게시글", icon: <FaStar aria-hidden="true" />, onClick: refreshMain },
      { label: "카테고리", icon: <FaLayerGroup aria-hidden="true" />, onClick: refreshMain },
      { label: "커뮤니티", icon: <FaPeopleGroup aria-hidden="true" />, onClick: refreshMain },
      { label: "이벤트", icon: <FaCalendarDays aria-hidden="true" />, onClick: refreshMain },
      { label: "근처 펫 찾기", icon: <FaLocationDot aria-hidden="true" />, onClick: refreshMain },
      { label: "저장한 게시글", icon: <FaBookmark aria-hidden="true" />, onClick: refreshMain },
      { label: "마켓", icon: <FaStore aria-hidden="true" />, onClick: refreshMain },
      { label: "고객센터", icon: <FaCircleQuestion aria-hidden="true" />, onClick: refreshMain },
      { label: "설정", icon: <FaGear aria-hidden="true" />, onClick: refreshMain },
    ],
    [refreshMain],
  );

  const storyPets = [
    { name: "스토리 만들기", img: petPlusIcon, isCreate: true },
    { name: displayName, img: profileImage, isLive: true },
    { name: "코코", img: dogAvatar },
    { name: "몽이", img: rabbitAvatar },
    { name: "아리", img: catAvatar },
    { name: "해피", img: dogAvatar },
    { name: "바비", img: rabbitAvatar },
  ];

  const nearbyPets = [
    { name: "보리", breed: "말티즈", distance: "0.2km", img: rabbitAvatar },
    { name: "콩이", breed: "푸들", distance: "0.4km", img: dogAvatar },
    { name: "캔디", breed: "포메라니안", distance: "0.6km", img: rabbitAvatar },
    { name: "자몽", breed: "비숑프리제", distance: "0.7km", img: rabbitAvatar },
  ];

  const trendingTags = [
    { tag: "# 산책스타그램", count: "12.3k 게시물" },
    { tag: "# 행복한강아지", count: "8.7k 게시물" },
    { tag: "# 냥스타그램", count: "6.5k 게시물" },
    { tag: "# 오늘의즐거움", count: "5.2k 게시물" },
  ];

  const handleProfile = () => {
    const myId = localStorage.getItem("id") || id;
    if (myId) {
      navigate(`/main/${myId}`);
      setContentitem(false);
    }
  };

  const handleChat = () => {
    loginInfo.addeNickName(nickName);
    loginInfo.addprofile(profileImage);
    navigate(`/main/Chat/${id}`);
  };

  const handleAlarm = () => {
    setIsAlarm((prev) => !prev);
  };

  const handleUpload = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleContentDisActive = (data: any) => {
    setContentitem(data.isDisactive);
    navigate(`/main/${data.userid}`);
  };

  const handleDataLoaded = () => {
    setIsloading(false);
  };

  return (
    <WebSocketAlarm_Provider>
      <WebSocker_Provider>
        <main className="MainPage_back MainPage_redesign">
          {againlogin && <LoginExp />}

          <header className="MainPage_topbar">
            <button type="button" className="MainPage_brand" onClick={refreshMain}>
              <img src={petBuddyLogo} alt="Aniverse" />
              <span>Aniverse</span>
            </button>

            <label className="MainPage_search" htmlFor="MainPageSearch">
              <FaMagnifyingGlass aria-hidden="true" />
              <input
                id="MainPageSearch"
                value={searchKeyword}
                placeholder="검색어를 입력하세요 (예: 사람, 해시태그)"
                onChange={(event) => setSearchKeyword(event.target.value)}
              />
            </label>

            <div className="MainPage_topActions" aria-label="상단 메뉴">
              <button type="button" className="active" onClick={refreshMain}>
                <FaHouse aria-hidden="true" />
                <small>홈</small>
              </button>
              <button type="button" onClick={handleChat}>
                {chatCount > 0 && <em>{chatCount}</em>}
                <FaCommentDots aria-hidden="true" />
                <small>채팅</small>
              </button>
              <button type="button" onClick={handleAlarm}>
                <em>5</em>
                <FaBell aria-hidden="true" />
                <small>알림</small>
              </button>
              <button type="button" className="profile" onClick={handleProfile}>
                <img src={profileImage} alt="" />
                <strong>{displayName}</strong>
                <FaChevronDown aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="MainPage_shell">
            <aside className="MainPage_sidebar">
              <nav className="MainPage_menu" aria-label="메인 메뉴">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={item.active ? "selected" : ""}
                    disabled={!isready}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>

              <button type="button" className="MainPage_write" onClick={handleUpload}>
                <FaPaw aria-hidden="true" />
                글 작성하기
              </button>
            </aside>

            <section className="MainPage_feedColumn">
              <div className="MainPage_storyCard">
                {storyPets.map((pet) => (
                  <button key={pet.name} type="button" className={`MainPage_story ${pet.isCreate ? "create" : ""}`}>
                    <span className="MainPage_storyAvatar">
                      <img src={pet.img} alt={pet.name} />
                      {pet.isLive && <em>LIVE</em>}
                    </span>
                    <strong>{pet.name}</strong>
                  </button>
                ))}
              </div>

              <div className="MainPage_composer">
                <button type="button" className="MainPage_composerPrompt" onClick={handleUpload}>
                  <img src={profileImage} alt="" />
                  <span>무슨 일이 일어나고 있나요? {displayName}</span>
                </button>
                <div className="MainPage_composerActions">
                  <button type="button" onClick={handleUpload}>사진/동영상</button>
                  <button type="button" onClick={handleUpload}>위치</button>
                  <button type="button" onClick={handleUpload}>기분/활동</button>
                  <button type="button" onClick={handleUpload}>투표</button>
                </div>
              </div>

              <div className="MainPage_feedHeader">
                <span>{searchKeyword.trim() ? "검색 결과" : "메인 피드"}</span>
                <h1>{searchKeyword.trim() ? `"${searchKeyword.trim()}" 검색어` : "전체 인기 피드"}</h1>
              </div>

              {contentitem && (
                <MainContentsx
                  img={profileImage}
                  nickname={displayName}
                  content={content}
                  openmodal={modal}
                  onload={handleDataLoaded}
                  onclose={handleModalClose}
                  onDisActive={handleContentDisActive}
                />
              )}
              <Outlet />
            </section>

            <aside className="MainPage_rightPanel">
              <section className="MainPage_sideCard">
                <div className="MainPage_sideTitle">
                  <h3>실시간 인기 해시태그</h3>
                  <button type="button" onClick={refreshMain}>더보기</button>
                </div>
                <div className="MainPage_tags">
                  {trendingTags.map((item) => (
                    <button type="button" key={item.tag} onClick={refreshMain}>
                      <strong>{item.tag}</strong>
                      <span>{item.count}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="MainPage_sideCard">
                <div className="MainPage_sideTitle">
                  <h3>근처 펫</h3>
                  <button type="button" onClick={refreshMain}>더보기</button>
                </div>
                {nearbyPets.map((pet) => (
                  <button type="button" className="MainPage_nearPet" key={pet.name} onClick={refreshMain}>
                    <img src={pet.img} alt={pet.name} />
                    <span>
                      <strong>{pet.name}</strong>
                      <small>{pet.breed}</small>
                    </span>
                    <em>{pet.distance}</em>
                  </button>
                ))}
              </section>

              <section className="MainPage_sideCard">
                <div className="MainPage_sideTitle">
                  <h3>다가오는 이벤트</h3>
                  <button type="button" onClick={refreshMain}>더보기</button>
                </div>
                <button type="button" className="MainPage_event" onClick={refreshMain}>
                  <img src={eventImage} alt="멍멍이 운동회" />
                  <span>
                    <strong>멍멍이 운동회</strong>
                    <small>2026.06.01</small>
                    <em>서울 반려동물 공원</em>
                  </span>
                </button>
              </section>
            </aside>
          </div>

          {isloading && <div className="MainPage_loading">로딩 중...</div>}
          {isAlarm && <AlarmMain AlarmData={noti} />}
        </main>
      </WebSocker_Provider>
    </WebSocketAlarm_Provider>
  );
};

export default MainPage;
