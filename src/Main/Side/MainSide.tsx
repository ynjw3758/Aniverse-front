import "./MainSide.scss";
import { useNavigate } from "react-router-dom";
import user_info from "../../Context/Userdata";
import { useContext, useEffect, useState } from "react";
import HomeIcon from "../../assets/images/side_home.svg";
import ProfileIcon from "../../assets/images/side_profile.svg";
import PetIcon from "../../assets/images/side_pet.svg";
import FollowingIcon from "../../assets/images/side_following.svg";
import BookmarkIcon from "../../assets/images/side_bookmark.svg";
import NearbyIcon from "../../assets/images/side_nearby.svg";
import CommunityIcon from "../../assets/images/side_community.svg";
import EventIcon from "../../assets/images/side_event.svg";
import MarketIcon from "../../assets/images/side_market.svg";
import HelpIcon from "../../assets/images/side_help.svg";
import SettingsIcon from "../../assets/images/side_settings.svg";
import PetRegisterIcon from "../../assets/images/side_pet_register.svg";

type UserInfos = {
  img: string;
  nickname: string;
  id: string;
  isReady: boolean;
  Noti: NotiKind | undefined;
  onside: (side: any) => void;
  onProfile: () => void;
  AlarmClick: (data: boolean) => void;
};

type NotiKind = {
  Chat: ChatInfo[];
};

type ChatInfo = {
  ChatId: string;
  IsRead: boolean;
  MessageId: string;
  RoomName: string;
  UserId: string;
  message: string;
  nickname: string;
  profile: String;
  sendId: string;
  timestamp: string;
  type: string;
};

type MenuItem = {
  label: string;
  icon: string;
  active?: boolean;
  onClick?: () => void;
};

const MainSide = (props: UserInfos) => {
  const [isNoti, setIsNoti] = useState(false);

  const navigate = useNavigate();
  const data = useContext(user_info);

  useEffect(() => {
    if (props.Noti?.Chat && props.Noti.Chat.length > 0) {
      setIsNoti(true);
    }
  }, [props.Noti]);

  const handleMain = () => {
    navigate("/main");
  };

  const handleProfile = () => {
    props.onProfile();
  };

  const handleChat = () => {
    data.addeNickName(props.nickname);
    data.addprofile(props.img);
    navigate(`/main/Chat/${props.id}`);
  };

  const menuItems: MenuItem[] = [
    { label: "홈", icon: HomeIcon, active: true, onClick: handleMain },
    { label: "내 프로필", icon: ProfileIcon, onClick: handleProfile },
    { label: "내 펫", icon: PetIcon },
    { label: "팔로잉", icon: FollowingIcon },
    { label: "저장한 게시물", icon: BookmarkIcon },
    { label: "근처 펫 찾기", icon: NearbyIcon },
    { label: "커뮤니티", icon: CommunityIcon },
    { label: "이벤트", icon: EventIcon },
    { label: "마켓", icon: MarketIcon },
    { label: "고객센터", icon: HelpIcon },
  ];

  return (
    <aside className="MainPage_leftRail MainSide_panel">
      <nav className="MainPage_menu MainSide_menu" aria-label="메인 메뉴">
        {menuItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={item.active ? "selected" : ""}
            disabled={!props.isReady}
            onClick={item.onClick}
          >
            <img className="MainSide_menuIcon" src={item.icon} alt="" />
            <span className="MainSide_menuText">{item.label}</span>
          </button>
        ))}
        <button type="button" disabled={!props.isReady} onClick={handleChat}>
          <img className="MainSide_menuIcon" src={CommunityIcon} alt="" />
          <span className="MainSide_menuText">채팅</span>
          {isNoti && <span className="MainSide_notifyDot" aria-label="새 알림" />}
        </button>
      </nav>

      <div className="MainPage_leftBottom MainSide_bottom">
        <button type="button">
          <img className="MainSide_menuIcon" src={SettingsIcon} alt="" />
          <span className="MainSide_menuText">설정</span>
        </button>
        <button type="button" className="MainPage_petRegister MainSide_petRegister">
          <img className="MainSide_menuIcon" src={PetRegisterIcon} alt="" />
          <span className="MainSide_menuText">펫 등록하기</span>
        </button>
      </div>
    </aside>
  );
};

export default MainSide;
