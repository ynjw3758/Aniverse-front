import "./MainPlatformSide.scss";
import TitleImg from"../../assets/images/Rabbit.png";
import HomeImg from"../../assets/images/MainHome.png";
import SearchImg from"../../assets/images/MainSearch.png";
import MessageImg from"../../assets/images/MainMessage.png";
import Bookmark from"../../assets/images/Bookmark.png";
import Setting from"../../assets/images/Setting.png";
import PluseImg from "../../assets/images/Mainplus.png";

const MainPlatformSide =() =>{

    return(<div className="MainPlatformSide">
        <div className="MainPlatformSideTitle">
          <img src={TitleImg}/>
          <h2>ANIVERSE</h2>
        </div>
        <div className="MainPlatformSideList">
          <img src={HomeImg}/>
          <h2>홈</h2>
        </div>
        <div className="MainPlatformSideList">
          <img src={SearchImg}/>
          <h2>탐색</h2>
        </div>
        <div className="MainPlatformSideList">
          <img src={MessageImg}/>
          <h2>메세지</h2>
        </div>
        <div className="MainPlatformSideList">
          <img src={Bookmark}/>
          <h2>북마크</h2>
        </div>
        <div className="MainPlatformSideSetting">
          <img src={Setting} />
          <h2>설정</h2>
        </div>
        <div className="MainPlatformSidePlus">
          <img src={PluseImg} />
          <h2>생성</h2>
        </div>
    </div>)

}
export default MainPlatformSide;