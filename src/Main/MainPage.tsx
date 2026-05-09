import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import "./MainPage.scss";
import user_info from "../Context/Userdata";
import LoginExp from "../LginExpiration/LoginExp";
import WebSocker_Provider from "../Context/WebSocker_Provider";
import WebSocketAlarm_Provider from "../Context/WebSocketAlarm_Provider";
import AlarmMain from "./Alarm/AlarmMain";
import MainContentsx from "./Contents/MainContents";
import MainCareBanner from "./components/MainCareBanner";
import MainCommunitySection from "./components/MainCommunitySection";
import MainEventsPanel from "./components/MainEventsPanel";
import MainHero from "./components/MainHero";
import MainQuickLinks from "./components/MainQuickLinks";
import MainRightPanel from "./components/MainRightPanel";
import MainSidebar from "./components/MainSidebar";
import MainTopBar from "./components/MainTopBar";
import baseprofile from "../assets/images/baseimg.png";
import petBuddyLogo from "../assets/images/petbuddy_logo.svg";
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

  const displayName = nickName || "김아니";
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
        <main className="MainPage_back MainPage_platform">
          {againlogin && <LoginExp />}

          <MainTopBar
            logo={petBuddyLogo}
            profileImage={profileImage}
            displayName={displayName}
            searchKeyword={searchKeyword}
            chatCount={chatCount}
            onSearchChange={setSearchKeyword}
            onHome={refreshMain}
            onChat={handleChat}
            onAlarm={handleAlarm}
            onProfile={handleProfile}
          />

          <div className="MainPage_shell">
            <MainSidebar isReady={isready} onMenuClick={refreshMain} onSupportClick={refreshMain} />

            <section className="MainPage_content">
              <MainHero displayName={displayName} onAddPet={handleUpload} onHealthClick={refreshMain} />
              <MainQuickLinks onAction={refreshMain} />

              <div className="MainPage_centerGrid">
                <MainCommunitySection onMore={refreshMain}>
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
                </MainCommunitySection>
                <MainEventsPanel onAction={refreshMain} />
              </div>

              <MainCareBanner onAction={refreshMain} />
            </section>

            <MainRightPanel onAction={refreshMain} />
          </div>

          {isloading && <div className="MainPage_loading">로딩 중...</div>}
          {isAlarm && <AlarmMain AlarmData={noti} />}
        </main>
      </WebSocker_Provider>
    </WebSocketAlarm_Provider>
  );
};

export default MainPage;
