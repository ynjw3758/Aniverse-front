
//                            +--------------------
//----------------------------+ 외부 라이브러리
//                            +--------------------
//#region type 
import { useContext, useEffect,  useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate  ,useParams} from "react-router-dom";
import axios from "axios";
 //#endregion

//                            +--------------------
//----------------------------+ 내부 라이브러리
//                            +--------------------
//#region type 
 import DropDownItem from "../Dropdow/DropDownItem";
 import MainSide from "./Side/MainSide";
 import MainContentsx from "./Contents/MainContents";
 import "./MainPage.scss";
 import user_info from "../Context/Userdata";
 import LoginExp from "../LginExpiration/LoginExp";
 import WebSocker_Provider from "../Context/WebSocker_Provider";
 import WebSocketAlarm_Provider from "../Context/WebSocketAlarm_Provider";
import AlarmMain from "./Alarm/AlarmMain";
import petBuddyLogo from "../assets/images/petbuddy_logo.svg";
import baseprofile from "../assets/images/baseimg.png"
import {api } from "../API/Api";
import UserUpload from "../Upload/UserUpload";
import dogAvatar from "../assets/images/dog.png";
import catAvatar from "../assets/images/cat.png";
import rabbitAvatar from "../assets/images/Rabbit.png";
import petPlusIcon from "../assets/images/petpluse.png";
import feedImage from "../assets/images/test.jpg";
import eventImage from "../assets/images/log_test.jpg";

 //#endregion

//                            +--------------------
//----------------------------+ 인터페이스
//                            +--------------------
//#region type 
interface ResponseDataType {
      message: string;
      code: number;
      response:object
    }
interface ResponseDataType {
  message: string;
  code: number;
  response:object;
  resultdata:any;
}

interface CustomError{
  errorcode:string;
  message :string
}
//#endregion

//                            +--------------------
//----------------------------+ type
//                            +--------------------
//#region type
type Noti_Kind={
  Chat:ChatNoti[];
}

type ChatNoti={
  ChatId:string;
  IsRead:boolean;
  MessageId:string;
  RoomName:string;
  UserId:string;
  message:string;
  nickname:string;
  profile:string;
  sendId:string;
  timestamp:string;
  type:string;
  Count:number;
}
//#endregion

 const MapinPage= () =>{      
      const[NickName, setNickName]=useState<string>("");
      const[profile, setProfile]=useState<string>("");
      const[id, setId]=useState<string>("");
      const[dropdow, setDropdow]=useState<boolean>(false);
      const[dropblur, setDropblur]=useState<boolean>(false);
      const [content , setContent]=useState<string[]>([]);
      const[contentitem  ,setContentitem]=useState<boolean>(false);
      const[isloading ,setIsloading]=useState<boolean>(false);
      const[isready, setIsready]=useState<boolean>(true);
      const[againlogin, setAgainlogin]=useState<boolean>(false);
      const[isperist, setIsperist]=useState<boolean>(false);
      const[isAlarm , SetIsAlarm]=useState<boolean>(false);
      const[userid, setUserid]=useState<string>("");
      const[noti, setNoti]=useState<Noti_Kind>()
      const[modal , setModal]=useState<boolean>(false);
      const [dataloaded,setDataLoaded]= useState<boolean>(false);
      



      const navigate = useNavigate();
      const login_info = useContext(user_info);
      const param=useParams();
/*
      useEffect(()=>{        
        setIsloading(true);

        let access_token:string="";
        let id:any;
        id=localStorage.getItem("id");
        
        if(param.userid != undefined) {
          setContentitem(false);
          navigate(`/main/${param.userid}`);
        }
        else{
          setIsready(true);
          //setIsready(false);
          access_token =localStorage.getItem("a_id")!;
          
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/gateway/api-proxy" ,{
              service: "common",
              endpoint: "main/refresh-main",
              method: "GET",
              body: {Id:id}
          },{
              withCredentials: true
          }).then(response =>{
              console.log("메인 페이지 새로고침 :" , response.data)
                if(response.status == 200){
                  console.log("아니 그럼 여기 와야지")
                setNoti(response.data.data.Noti);
                setContent(response.data.data.content_info);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);

                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
                else if(response.status == 201){
                setContent([]);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);
                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
          }).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error.response?.status);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/BadRequest");
                    }
                    else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                        navigate("/error/Gateway");
                    }
              }
          })
        }

      },[]);
      */
      const MainClick =() =>{
        console.log("메인 페이지 이동");
        setIsloading(true);
        let access_token:string="";
          setIsready(false);
          access_token =localStorage.getItem("a_id")!;
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/gateway/api-proxy" ,{
              service: "common",
              endpoint: "main/refresh-main",
              method: "GET",
              body: {Id:id}
          },{
              withCredentials: true
          }).then(response =>{
              console.log("로그 클릭 시 :" , response.data)
                if(response.status == 200){
                  console.log("아니 그럼 여기 와야지")
                setNoti(response.data.data.Noti);
                setContent(response.data.data.content_info);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);

                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
                else if(response.status == 201){
                setContent([]);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);
                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
          }).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error.response?.status);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/BadRequest");
                    }else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                       navigate("/error/Gateway");
                    }
                  
              }
          })
      }
      const SideHandler =(data:boolean) =>{
        setContentitem(data);
      }

      const ContentDisActive =(data:any) =>{
        const ischeck: boolean = data.isDisactive; 
        const user_id:string= data.userid;
        setContentitem(ischeck);
        navigate(`/main/${user_id}`);
      }
      const contentHandler =() =>{
        const Myid= localStorage.getItem("id");
        navigate(`/main/${Myid}`);
        setContentitem(false);
      }
      const handleDataLoaded = () => {
        setDataLoaded(true); // 데이터 로딩 완료
        setIsloading(false); // 로딩 화면 해제
      };

      const AlarmClick =() =>{
        if(isAlarm == false){
          SetIsAlarm(true);
        }else{
          SetIsAlarm(false);
        }
        
      }
    const ModalHandler =() =>{
      setModal(true)
    }

  const ModalClose =() =>{
   setModal(false);
  }
  const storyPets = [
    { name: "스토리 만들기", img: petPlusIcon, isCreate: true },
    { name: "루이", img: profile || baseprofile, isLive: true },
    { name: "코코", img: dogAvatar },
    { name: "몽이", img: rabbitAvatar },
    { name: "도리", img: catAvatar },
    { name: "해피", img: dogAvatar },
    { name: "밤비", img: rabbitAvatar },
  ];

  const nearbyPets = [
    { name: "보리", breed: "말티즈", distance: "0.2km", img: rabbitAvatar },
    { name: "콩이", breed: "푸들", distance: "0.4km", img: dogAvatar },
    { name: "캔디", breed: "포메라니안", distance: "0.6km", img: rabbitAvatar },
    { name: "두부", breed: "비숑프리제", distance: "0.7km", img: rabbitAvatar },
    { name: "레오", breed: "골든 리트리버", distance: "0.8km", img: dogAvatar },
  ];

  const trendingTags = [
    { tag: "# 산책스타그램", count: "12.3k 게시물" },
    { tag: "# 행복한_강아지", count: "8.7k 게시물" },
    { tag: "# 냥스타그램", count: "6.5k 게시물" },
    { tag: "# 오늘도_즐겁개", count: "5.2k 게시물" },
    { tag: "# 펫프렌리", count: "3.8k 게시물" },
  ];

    return(<WebSocketAlarm_Provider>
    <WebSocker_Provider>
    <div className="MainPage_back MainPage_redesign">
        {againlogin && (<LoginExp />)}
        <header className="MainPage_topbar">
          <button type="button" className="MainPage_brand" onClick={MainClick}>
            <img src={petBuddyLogo} alt="PetBuddy" />
            <span>PetBuddy</span>
          </button>
          <label className="MainPage_search">
            <span>⌕</span>
            <input placeholder="검색어를 입력하세요 (펫, 사람, 해시태그)" />
          </label>
          <div className="MainPage_topActions">
            <button className="active" type="button">홈</button>
            <button type="button">채팅 <span>3</span></button>
            <button type="button" onClick={AlarmClick}>알림 <span>5</span></button>
            <button type="button" className="MainPage_userChip" onClick={contentHandler}>
              <img src={profile || baseprofile} alt={NickName || "사용자"} />
              <strong>{NickName || "루미맘"}</strong>
            </button>
          </div>
        </header>

        <main className="MainPage_shell">
          <MainSide
            img={profile || baseprofile}
            nickname={NickName}
            id={id}
            onside={SideHandler}
            onProfile={contentHandler}
            isReady={isready}
            Noti={noti}
            AlarmClick={AlarmClick}
          />

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
              <div className="MainPage_composerPrompt" onClick={ModalHandler}>
                <img src={profile || baseprofile} alt="" />
                <span>무슨 일이 일어나고 있나요, 루미맘?</span>
              </div>
              <div className="MainPage_composerActions">
                <button type="button" onClick={ModalHandler}>사진/동영상</button>
                <button type="button">위치</button>
                <button type="button">기분/활동</button>
                <button type="button">투표</button>
              </div>
            </div>

            <article className="MainPage_postCard">
              <div className="MainPage_postHeader">
                <img src={profile || baseprofile} alt="" />
                <div>
                  <strong>{NickName || "루미맘"}</strong>
                  <span>@louis_mom · 2시간 전</span>
                </div>
                <button type="button">•••</button>
              </div>
              <p className="MainPage_postText">
                오늘 날씨 너무 좋아서 루이랑 공원 산책 다녀왔어요! 🐶✨
                <br />
                <span>#산책스타그램 #행복한_루이 #오늘도_즐겁개</span>
              </p>
              <div className="MainPage_postImage">
                <img src={feedImage} alt="공원에서 뛰어노는 반려동물" />
                <span>1/3</span>
              </div>
              <div className="MainPage_postActions">
                <button type="button">♥ 128</button>
                <button type="button">댓글 23</button>
                <button type="button">공유</button>
                <button type="button">저장</button>
              </div>
            </article>
          </section>

          <aside className="MainPage_rightPanel">
            <section className="MainPage_sideCard">
              <div className="MainPage_sideTitle">
                <h3>근처 펫</h3>
                <button type="button">더보기 ›</button>
              </div>
              {nearbyPets.map((pet) => (
                <div className="MainPage_nearPet" key={pet.name}>
                  <img src={pet.img} alt={pet.name} />
                  <div>
                    <strong>{pet.name}</strong>
                    <span>{pet.breed}</span>
                  </div>
                  <em>{pet.distance}</em>
                  <button type="button">인사하기</button>
                </div>
              ))}
            </section>

            <section className="MainPage_sideCard">
              <div className="MainPage_sideTitle">
                <h3>실시간 인기 해시태그</h3>
                <button type="button">더보기 ›</button>
              </div>
              <div className="MainPage_tags">
                {trendingTags.map((item) => (
                  <button type="button" key={item.tag}>
                    <strong>{item.tag}</strong>
                    <span>{item.count}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="MainPage_sideCard">
              <div className="MainPage_sideTitle">
                <h3>다가오는 이벤트</h3>
                <button type="button">더보기 ›</button>
              </div>
              <div className="MainPage_event">
                <img src={eventImage} alt="멍멍이 운동회" />
                <div>
                  <strong>멍멍이 운동회</strong>
                  <span>2024.06.01 (토)</span>
                  <small>서울 반려동물 공원</small>
                </div>
                <button type="button">참가 신청</button>
              </div>
            </section>
          </aside>
        </main>

          <Outlet />
          {isAlarm && (<>
          <AlarmMain AlarmData={noti}/>
          </>)}
          {modal && (<UserUpload img={profile || baseprofile} nickname={NickName || "루미맘"} onClose={ModalClose} onComplete={ModalClose}/>)}
          {dropdow===true && dropblur === false ?  (<DropDownItem img={profile}  nickname={NickName} />):<></>}

         
    </div>
    </WebSocker_Provider>
    </WebSocketAlarm_Provider>)
}

export default MapinPage;
