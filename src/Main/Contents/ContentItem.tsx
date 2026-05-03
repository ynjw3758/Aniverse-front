
//                                        +=====================
//========================================+   임포트
//                                        +=====================

//#region Import
//                             +--------------------
//-----------------------------+  외부라이브러리
//                             +--------------------
import {useEffect, useState ,useRef , useContext,useMemo} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {Oval} from "react-loader-spinner";
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import {Cookies} from 'react-cookie';
import debounce from 'lodash/debounce';
    
//                             +--------------------
//-----------------------------+   Module
//                             +--------------------
import "./ContentItem.scss";
import OtherProfile from "../Profile/OtherProfile";
import user_info from "../../Context/Userdata";
import CancelFollower from "../Modal/CancleFollower";
import ShowComment from "../Comment/ShowComment";
import Slide from "../Slide/Slide";
import AddMentionMain from "../Mention/AddMentionMain";
import replyimg from "../../assets/images/reply.png";
import emoimg from "../../assets/images/emoticon.png";
import profilebaseimg from "../../assets/images/baseimg.png";
import beforeheartimg from "../../assets/images/heart.png";
import afterhearimg from "../../assets/images/redheart.png";
import muteimg from "../../assets/images/muted.png";
import soundimg from "../../assets/images/sound.png";
import {api} from"../../API/Api"
//#endregion


//                             +--------------------
//-----------------------------+   Type
//                             +--------------------
//#region
type content_info = {
  nickname:any,
  profile:any,
  files:any,
  heart:number,
  conntetid:any,
  UserId:any,
  MyImg:string,
  index:number,
  Like:string,
  Commnets:string,
  MyNick:string,
  Commnet_cnt:number,
  Local:string,
  Ct_date:string
  ondeactivate:(chage_data:object) => void
}

//#endregion

//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface ResponseDataType {
  message: string;
  code: number;
  response:object
}

interface tokenRenewal { //토큰 생긴 인터페이스
  message: string;
  code: number;
  data:string
}
//#endregion

//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region
type user_info ={
  id:string,
  nickname:string,
  img:string
}

type Content_cm={
 contentid:string,
 img:string,
 nickname:string
}

const ContentItem =(props:content_info) =>{

//                             +--------------------
//-----------------------------+   상태 관리리
//                             +--------------------
//#region
    //const[leftactive, setLeftactive]=useState<boolean>(false);
    //const[rightactive, setRightactive]=useState<boolean>(false);
    const[checkheart , setCheckheart]=useState<boolean>(false);
    const[smallcheckfl ,setSmallcheckfl]=useState<boolean>(false);
    const[mousecheck ,setMousecheck]=useState<boolean>(false);
    const[complete, setComplete]=useState<boolean>(false);
    const[isplaying, setIsplaying]=useState<boolean>(false);
    const[isBlock ,setIsBlock]=useState<boolean>(false);
    const[one, setOne]=useState<boolean>(false);
    const[multi, setMulti]=useState<boolean>(false);
    const[mute,setMute]=useState<boolean>(true);
    const[isonlyone, setIsonlyone]=useState<boolean>(false);
    const[ispost, setIspost]=useState<boolean>(false);
    const[isemoji, setIsemoji]=useState<boolean>(false);
    const [isshow ,setIsshow]=useState<boolean>(false);
    const[iscommet, setIscommet]=useState<boolean>(false);
    const[ismore, setIsmore]=useState<boolean>(false);
    const [isExpanded, setiSExpanded]=useState<boolean>(false);
    const[showComment, setShowComment]=useState<boolean>(false);
    const[isloading, setIsloading]=useState<boolean>(false);
    const[iscomcnt, setIscomcnt]=useState<boolean>(false);
    const[fullText, setFullText]=useState<boolean>(false);
    const[allCommtent, setAllComment]=useState<boolean>(false);
    const[isready, setIsready]=useState<boolean>(false);
    const[isnormal, setIsnormal]=useState<boolean>(false);
    const[isfull, setIsfull]=useState<boolean>(false);
    const[searchLoading, setSearchLoading]=useState<boolean>(false);
    const[iskeyboard,setIskeyboard]=useState<boolean>(false);

    
    
    const[file , setFile]=useState<string[]>(props.files);
    const[img, setImg]=useState<string[]>([]);
    const[vid, setVid]=useState<string[]>([]);
    const[item, setItem]=useState<string[]>([]);
    const[blockList, setBlockList]=useState<string[]>([]);
    const[smallcontent ,setSmallcontent]=useState<string[]>([]);

    const[smallprofile ,setSmallprofile]=useState<string>(profilebaseimg);
    const[smallnickname ,setSmallnickname]=useState<string>("");
    const[otherId, setOtherId]=useState<string>("");
    const[emoticon, setEmoticon]=useState<string>("");
    const[hearticon,setHearticon]=useState<string>(beforeheartimg);
    const[priflelist , setProfilelist]=useState<string>(props.profile);
    const[muteicon,setMuteicon]=useState<string>(muteimg);
    const[connectid, setConnectid]=useState<string>("");
    const[userid, setUserid]=useState<string>("");
    const[nickname, setNickname]=useState<string>("");
    const[text, setText]=useState<string>("");
    const[istype, setIstype]=useState<string>("");
    const[showcommenttext, setShowcommenttext]=useState<string>("");
    const[ct_date, setCt_date]=useState<string>("");
    const[textmention, setTextmention]=useState<string>("");
    const[mentionsize, setMentionsize]=useState<string[]>([]);


    const[heart , setHeart]=useState<number>(props.heart);
    const[refcount, setRefcount]=useState<number>(0);
    const[smallfollowers ,setSmallfollowers]=useState<number>(0);
    const[smallfollowing ,setSmallfollowing]=useState<number>(0);
    const[mousepoint, setMousepoint]=useState<number>(0);
    const[emojiindex, setEmojiindex]=useState<number>()
    const[totalcnt, setTotalcnt]=useState<number>(0);
    const[page, setPage]=useState<number>(1);
    const[video_last, setVideo_last]=useState<number>(0);
    const [followcheck,  setFollowcheck]=useState<any>({
     isCancel:false, //팔로워 취소 버튼 활성화 유무
     CancelFollower:false, //팔로우 취소 유무
    })

    const[showCommentData, setShowCommentData]=useState<any>({
    Img: [],
    Video: [],
    MyComment: "",
    MyProfile: "",
    MyNick: "",
    ContentId:"",
    UserId:"",
    Local:"",
    heart_ct:0, 
    check_heart:"",
    content_ct:""
  });
  const[owners, setOwners]=useState<any>({
    Id:"",
    Profile:"",
    Nickname:""
  })

  const[userinfo ,setUserinfo]=useState<user_info[]>([{
    id:"",
    nickname:"",
    img:""
  }]);

  const[content_cm ,setContent_cm]=useState<Content_cm>({
    contentid:"",
    nickname:"",
    img:""
  });

  const[mentioninfo, setMentioninfo]=useState<object[]>([])

//#endregion

//#region 변수초기화
const login_info = useContext(user_info);
const navigate = useNavigate();
const imgref= useRef<HTMLImageElement>(null);
const DIVref = useRef<HTMLDivElement>(null); 
const list:any=useRef<null | HTMLVideoElement[]>([]);
const video_idx = useRef<number>(0);
const input_tag_position = iscomcnt ? "MainPage_Comment_input_extend":"MainPage_Comment_input";
const comment_cnt_position = fullText ? "MainContent_Comment_cnt_extend" : "MainContent_Comment_cnt";
const Timeout = 200;
const cookies = new Cookies();
let IsSearchCheck=useRef<boolean | null | undefined>(false);
const textareaRef = useRef<HTMLTextAreaElement>(null);
//#endregion

//                             +--------------------
//-----------------------------+   useEffect
//                             +--------------------
//#region
  useEffect(() =>{
    setConnectid(props.conntetid);
    setUserid(props.UserId);
    setNickname(props.nickname);
    setHeart(props.heart);
    let showItem:string[] =[...item]; 
    
    if(heart == 0){
      setCheckheart(true);
    }
    let image:string[]=[...img];
    let video:string[]=[...vid];
    file.forEach((data) =>{
      
    Object.entries(data).map((key) =>{
      if(key.at(0)=="url"){
        showItem.push(key[1]);
        setItem(showItem);
        let url:string = key[1];
        let last:number =url.lastIndexOf(".");
        let expand:string =url.substring(last+1 , url.length);
        if((expand=="jpg" || expand=="png")){
            image.push(key[1]);
            setImg(image);
          }
          
          else if(expand=="mp4"){
            video.push(key[1]);
            setVid(video);

          }

      }
    })

    if(props.files.length == 1){
      setOne(true);
      setMulti(false);
    }
    else{
      setMulti(true);
      setOne(false);
    }
    })
    dayjs.extend(relativeTime);
    const fromNow = dayjs(props.Ct_date).locale('ko').fromNow(); 
    setCt_date(fromNow);
  },[])


  useEffect(() =>{

    if((img.length !=0 || vid.length !=0) && connectid != "" && nickname != "" && userid != ""){
      setIsshow(true);
      const total = img.length + vid.length;
      setTotalcnt(total)
      const new_profile={isDisactive:true, userid:""}
      props.ondeactivate(new_profile);
    }
  },[img, connectid, nickname, userid, vid])

  useEffect(() =>{
    if(emoticon.length == 0){
      setIspost(false);
    }
    else{
      setIspost(true);
    }
  },[emoticon])

   
    useEffect(() =>{//최초 로딩시 좋아요 갯수를 가져오는 것
      if(props.Like == "N"){
        setHearticon(beforeheartimg);
      }
      else{
        setHearticon(afterhearimg);
      }
      if(props.Commnets !==''){
        setIscommet(true);
        if(props.Commnets.length > 20){
          console.log("길이 ");
          setShowcommenttext(props.Commnets.slice(0,10));
          setIsmore(true);
        }
        else{
          setIsnormal(true);
        }
      }

      if(props.Commnet_cnt >0){
        setIscomcnt(true);
      }
    },[])

    useEffect(() =>{
      if(showCommentData.Img?.length > 0 || showCommentData.Video?.length > 0) setAllComment(true);
    },[showCommentData])

    useEffect(() =>{
      if (!multi || vid.length === 0) return;

      list.current.forEach((video: HTMLVideoElement | null | undefined) => {
        if (video) video.pause();
      });

      const activeVideoIndex = page - img.length - 1;
      if (activeVideoIndex < 0 || activeVideoIndex >= vid.length) return;

      const activeVideo = list.current[activeVideoIndex];
      if (!activeVideo || !activeVideo.src) return;

      setRefcount(activeVideoIndex);
      activeVideo.play().catch(() => {});
     },[img.length, multi, page, vid.length])
     useEffect(() =>{ //모달창 활성화 시 아래 있는 화면은 고정
      console.log("이제 아래 화면은 움지이면 안된다");
      if(allCommtent == true){
        document.body.style.overflow = 'hidden';
      }
      else{
        document.body.style.overflow = 'auto';
      }
    

    },[allCommtent])
//#endregion




//                             +--------------------
//-----------------------------+   function
//                             +--------------------
//#region
    const muteClick=() =>{
     console.log("소리 재생");
     if(mute == false){
      setMute(true);
      setMuteicon(muteimg);
      
     }
     else{
      setMute(false);
      setMuteicon(soundimg);
     }
    }

    const playHandler =() =>{
      
      const currentVideo = list.current[refcount];
      if (!currentVideo || !currentVideo.src) return;

      if(currentVideo.currentTime !== 0 && isplaying==false){
        console.log("11");
        currentVideo.pause();
        setIsplaying(true);
      }
      else if(isplaying== true){
        console.log("22");
        currentVideo.play().catch(() => {});
        setIsplaying(false);
      }
        
    }


    const MouseMoveHandler =(event:React.MouseEvent<HTMLDivElement>) =>{

    }
    const Mouseout =(event:React.MouseEvent<HTMLDivElement>) =>{
      if(mousepoint > event.clientY){
        setMousecheck(false);
      }
      else{
        setMousecheck(true);
      }

    }
    const Mouseover =() =>{
      setMousecheck(true);
    } 

   
    const PeopleProfile =() =>{
      login_info.addid(props.UserId);
      login_info.addcheck(true);
      const new_profile={isDisactive:false, userid:props.UserId}
      props.ondeactivate(new_profile);
    }

    const CancelHandler =(isCancel:boolean) =>{
       setMousecheck(false);
       setFollowcheck({isCancel:true});
    }

    const CancelModelHandler =() =>{
      setFollowcheck({isCancel:false});
    }
    const profileHandler =() =>{
      setMousecheck(false);
    }
    const Notecompplete =() =>{
      setMousecheck(false);
      setComplete(true);
    }
    const ModalClose =() =>{
      setComplete(false);
    }
    const BlockRecept=(data:string[]) =>{
      if(data.length ==1){
        setMousecheck(false);
        setComplete(false);
        setIsBlock(true);
        setIsonlyone(false);
        setBlockList(data);
      }
      else{
        setMousecheck(false);
        setComplete(false);
        setIsBlock(true);
        setIsonlyone(true);
        setBlockList(data);
      }
    }

    const closeModal =() =>{
     setIsBlock(false);
    }
    
     const commentHandler =(event:React.ChangeEvent<HTMLTextAreaElement>) =>{
      
      const findgoal = event.target.value.lastIndexOf("@");
      if(event.target.value.length-1 ==findgoal && iskeyboard === true){
        if(searchLoading === true) setSearchLoading(false);
        IsSearchCheck.current=true;
      }else{
        if(event.target.value.length >0 && event.target.value.includes("@") && 
            iskeyboard === true &&IsSearchCheck.current===true  ) {
          const idx:number =event.target.value.lastIndexOf("@"); 
          const values =event.target.value.slice(idx+1 ,event.target.value.length);
          Searchbound(values)
        }
        
      }
      if(event.target.value == ""){
        setSearchLoading(false);
        setEmoticon("");
        setMentionsize([]);
        IsSearchCheck.current=false;
      }
      setEmoticon(event.target.value);
     }

     const Searchbound =useMemo(() => debounce((values:string) =>{
      setTextmention(values);
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      api.defaults.headers.common['Authorization'] = access_token;
      api.post("/gateway/api-proxy" ,{
      service: "search",
      endpoint: "Person",
      method: "GET",
      body: {word:values}
      },{
          withCredentials: true
      }).then(response =>{
          console.log("검색 결과 :" , response);
              if(response.status == 200 && response.data.length !==0){
                setUserinfo(response.data);
              }
              else if(response.status == 200 && response.data.length ==0){
                setUserinfo([]);
              }
              setIskeyboard(false);
              setSearchLoading(true);

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
     },Timeout),[textmention])
     const EmojiHandler =() =>{
      if(isemoji == true){
        setIsemoji(false);
      }
      else{
        setIsemoji(true);
        setEmojiindex(props.index);
      }
      
     }

     const onClickHandler =(emojiData:EmojiClickData) =>{
      setEmoticon((prev)=>prev+emojiData.emoji);

       }
       const CompleteModal_Close =() =>{
        setComplete(false);
      }
      const fulltext =() =>{
        setFullText(true);
        setShowComment(false);
        setiSExpanded(false);
        setIsmore(false);
        setIsfull(true);
      }
      const showAllComment=() =>{
        console.log("댓글 보기")
        const data={Img :img , Video:vid, MyComment:props.Commnets, MyProfile:props.profile, 
          MyNick:props.nickname, ContentId:props.conntetid ,UserId:props.UserId, 
          Local:props.Local, heart_ct:heart, check_heart:hearticon, content_ct:ct_date}
  
          const ownerinfos:object={Id:props.UserId , Profile:props.profile, Nickname:props.nickname}
          const content_cm:Content_cm={ contentid:props.conntetid,
            img:props.MyImg,
            nickname:props.MyNick}
            setContent_cm(content_cm);
            setOwners(ownerinfos); 
            setShowCommentData(data);
            setAllComment(true);
      }
      const CloseAllComment =() =>{
        setAllComment(false);
      }
      const SlideHandler =(data:number, type:string) =>{
        const nextPage = Math.min(Math.max(data, 1), totalcnt || 1);
        setPage(nextPage);
        setIstype(type);
      }

      const InsertMention =(data:user_info) =>{
        let infos:object[]=[...mentioninfo];
        infos.push(data);
        setMentioninfo(infos);

        if(mentionsize.length ==0) {
          let add_name:string=`@${data.nickname}`;
          setEmoticon(add_name);
          setSearchLoading(false);
          setTextmention("");
        }
        else{
          let before_text ="";
          mentionsize.forEach((values) =>{
            before_text+=`@${values}`;
          })
          
          let add_name:string=before_text+`@${data.nickname}`;
          setEmoticon(add_name);
          setSearchLoading(false);
          setTextmention("");
        }
        
        let size = [...mentionsize]
        size.push(data.nickname)
        setMentionsize(size);
        setIskeyboard(false);
        IsSearchCheck.current=false;
      }
          //키보드 눌럿을 때 이벤트
    const KeyDOWNHandler =(event:React.KeyboardEvent<HTMLTextAreaElement>) =>{
     setIskeyboard(true);
  }


//                             +--------------------
//-----------------------------+   Axios
//                             +--------------------
//#region
    const ClickHeart =() =>{

      if(checkheart == false){
        if(props.Like == "O"){//이미 내가 누른 상태
          setHeart((prenum)=>prenum-1);

          setHearticon(beforeheartimg)
        }
        else{
          if(heart > 0){
            setHeart((prenum)=>prenum+1);

            setHearticon(afterhearimg);
          }
          else if(heart == 1){
            setCheckheart(true)
            setHearticon(beforeheartimg)
          }

        }
      }
      else{
        setHeart((preNum) =>preNum+1);
        if(heart == 0){
          setCheckheart(false);
          setHearticon(afterhearimg);
         }
        
  

      }
      let access_token:string="";          
      let id:string="";
      id=localStorage.getItem("id")!;
      access_token = localStorage.getItem("a_id")!;
      const contentid :string =DIVref.current?.id!;
      console.log("id :" , contentid);

      api.defaults.headers.common['Authorization'] = access_token;
      api.post("/gateway/api-proxy" ,{
      service: "reaction",
      endpoint: "/Heart/likes",
      method: "POST",
      body: {Contentid : contentid , Id:id, ProfileImg : props.MyImg}
      },{
          withCredentials: true
      }).then(response =>{
        console.log("좋아요 결과 :" , response);
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
/*

      axios.get("http://localhost:8080/Pets-social/acccheck").then(
        response =>{
          if(response.status == 200){
            console.log("엑세스 토큰 확인")
            console.log("나의 이미지 :" , props.MyImg)
            axios.post("http://localhost:8090/Pets-social/Heart/likes" , {Contentid : contentid , Id:id, ProfileImg : props.MyImg}
            )
            .then((response) =>{
              console.log("response :" , response);



            }).catch(error =>{
            if(axios.isAxiosError<ResponseDataType>(error)){
                        console.log("error code: " , error.response?.status);
                        
                        if(error.code=="ERR_BAD_REQUEST"){
                          navigate("/error");
                        }
                        else if(error.response?.status==500){
                          console.log("서버 에러발생");
                          navigate("/error/se-error")
                        }
                        
                        console.log("error response: " , error.response?.data);
                      }
        })
          }
        }
      ).catch((error) =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
            console.log("error code: " , error.response?.status);
            
            if(error.code=="ERR_BAD_REQUEST"){
              navigate("/error");
            }
            else if(error.response?.status==401){
              console.log("승인되지 않은 로그인");
          }
            else if(error.response?.status==500){
              console.log("서버 에러발생");
              navigate("/error/se-error")
            }
            
            console.log("error response: " , error.response?.data);
          }
         })
*/
      
    }
    const CommentUpload =() =>{
      console.log("댓글 달기 : " , mentioninfo);
     setIsloading(true);
     setText(emoticon)
     let access_token:string="";
     let UserId:string= "";
     access_token = localStorage.getItem("a_id")!;
     UserId = localStorage.getItem("id")!;
     api.defaults.headers.common['Authorization'] = access_token;
      api.post("/gateway/api-proxy" ,{
      service: "reaction",
      endpoint: "/Comment/Create",
      method: "POST",
      body: {UserId :UserId ,Comments:emoticon ,
        contentid:props.conntetid, profile:props.MyImg, nickname:props.MyNick, MentionInfos:mentioninfo}
      },{
          withCredentials: true
      }).then(response =>{
          console.log("응답 :" , response);
          setIspost(false);
          setShowComment(true);
          setIsloading(false);
          setEmoticon("");
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
                }else if(error.response?.status==404){
                  
                   navigate("/error/NotFound");
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

/*
     axios.get("http://localhost:8080/Pets-social/acccheck").then((response) =>{

      if(response.status == 200){
        
      axios.post("http://localhost:8090/Pets-social/comment/Create", {UserId :UserId ,Comments:emoticon ,
        contentid:props.conntetid, profile:props.MyImg, nickname:props.MyNick, MentionInfos:mentioninfo
      }).then((response) =>{
          console.log("응답 :" , response);
          setIspost(false);
          setShowComment(true);
          setIsloading(false);
          setEmoticon("");
      }).catch((error) =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
          console.log("error code: " , error.response?.status);
          
          if(error.code=="ERR_BAD_REQUEST"){
            navigate("/error");
          }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
      })}

     }).catch((error) =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
          console.log("error code: " , error.response?.status);
          
          if(error.code=="ERR_BAD_REQUEST"){
            navigate("/error");
          }
          else if(error.response?.status==401){
              console.log("승인되지 않은 로그인");
          }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
      })
*/
    }

    const SmallProfile = (event:React.MouseEvent<HTMLDivElement>) =>{
      setMousepoint(event.clientY);
      
      let access_token:string="";
      let Userid:any;
      let Myid:any;
      Myid = localStorage.getItem("id");
      Userid=imgref.current?.id;
      access_token =localStorage.getItem("a_id")!;
        api.defaults.headers.common['Authorization'] = access_token;
                api.post("/gateway/api-proxy" ,{
                      service: "common",
                      endpoint: `profile/Smallprofile`,
                      method: "GET",
                      body: {userid:Userid , id:Myid}
                  },{
                      withCredentials: true
                  }).then(response =>{
                     console.log("드래그 프로필 결과 :" , response);
                      if(response.data.data.user_data.profile == "null"){
                      }
                      else{
                        setSmallprofile(response.data.data.user_data.profile);
                      }
            
                      if(response.data.data.user_data.profile != "null"){
                        setSmallprofile(response.data.data.user_data.profile);
                      }
                      setSmallcheckfl(response.data.data.user_data.id_exist);
                      setSmallnickname(response.data.data.user_data.nickname);
                      setSmallfollowers(response.data.data.user_data.follower);
                      setSmallfollowing(response.data.data.user_data.following);
                      setSmallcontent(response.data.data.url);
                      setOtherId(Userid);
                      setMousecheck(true);
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
                    }else if(error.response?.status==404){
                  
                      navigate("/error/NotFound");
                    }
                  
              }
                  })
                  /*
      axios.get("http://localhost:8080/Pets-social/acccheck").then((response) =>{
        if(response.status == 200){
          axios.get("http://localhost:8080/Pets-social/Smallprofile" , {params:{Userid:Userid , Myid:Myid}})
          .then((response) =>{
              console.log("응답 결과 :" , response);
              if(response.data.resultdata.user_data.profile == "null"){
              }
              else{
                setSmallprofile(response.data.resultdata.user_data.profile);
              }
    
              if(response.data.resultdata.user_data.profile != "null"){
                setSmallprofile(response.data.resultdata.user_data.profile);
              }
              setSmallcheckfl(response.data.resultdata.user_data.id_exist);
              setSmallnickname(response.data.resultdata.user_data.nickname);
              setSmallfollowers(response.data.resultdata.user_data.follower);
              setSmallfollowing(response.data.resultdata.user_data.following);
              setSmallcontent(response.data.resultdata.url);
              setOtherId(Userid);
              setMousecheck(true);
    
    
          }).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                          console.log("error code: " , error.response?.status);
                          
                          if(error.code=="ERR_BAD_REQUEST"){
                            navigate("/error");
                          }
                          else if(error.response?.status==500){
                            console.log("서버 에러발생");
                            navigate("/error/se-error")
                          }
                          
                          console.log("error response: " , error.response?.data);
                        }
          }); 
        }
      }).catch((error) =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
          console.log("error code: " , error.response?.status);
          
          if(error.code=="ERR_BAD_REQUEST"){
            navigate("/error");
          }
          else if(error.response?.status==401){
              console.log("승인되지 않은 로그인");
          }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
      })
      */
    }
//#endregion
    const te_inpuHandler =(event: React.FormEvent<HTMLTextAreaElement>) =>{
      const textarea = textareaRef.current;
      const max_height = 200;
    
      if (textarea) {
        // 1️⃣ 초기화 → 줄어드는 경우를 위해 height 리셋
        textarea.style.height = "auto";
    
        // 2️⃣ 실제 필요한 scrollHeight 계산
        const newHeight = Math.min(textarea.scrollHeight, max_height);
    
        // 3️⃣ 설정
        textarea.style.height = `${newHeight}px`;
      }
    }


    return(<>
      {allCommtent && (<ShowComment OnClose={CloseAllComment} ShowData={showCommentData} Owner={owners} Content_cm={content_cm}/>)}
      {isshow && (<div id={props.conntetid} ref={DIVref}>     
      <div className="Mainpage_Content_userinfo" onMouseOver={SmallProfile}  
      onMouseLeave={Mouseout} onMouseMove={MouseMoveHandler}>
         <img src={priflelist}  id={props.UserId} ref={imgref} onClick={PeopleProfile}/>
          <h3>{props.nickname}</h3>
          <p>{ct_date}</p>
      </div>
       {(one == true && multi == false) && (<>
       <div className="Mainpage_Content_Item">
         {img.map((data) =>(<>
            <img src={data}/>
          </>))}
        {vid.map((data) =>(<>
        <video src={data} autoPlay muted={mute}/>
        <div className="Mainpage_Content_mute">
        <img src={muteicon} onClick={muteClick}/>
        </div>  
       </>))}      
       </div>
       <div className="Mainpage_Content_Icon">
        <img src={hearticon} id="heart" onClick={ClickHeart} key={props.conntetid} />
        <img src={replyimg} id="reply"/>
       </div>
       <div className="Mainpage_Content_subItem">
        {checkheart && (<>
        <h3>{`가장 먼저 좋아요를 눌러보세요`}</h3>
        </>)}
        {!checkheart && (<><h3>{`좋아요 ${heart}`+"개"}
        </h3>
        </>)}
        <div className="Mainpage_Content_imoticon">
        <div className="MainPage_Comments">
          {iscommet && (<div className="Content_MyComment">
         <h3>{props.nickname}</h3>
            {isnormal && (<>
              <p>{props.Commnets}</p>
             </>)}
             {ismore && <>
              <h4>{showcommenttext}</h4>
              <p onClick={fulltext}>...더 보기</p>
              </>}
              {isfull && (<>
                <h4>{showcommenttext}</h4>
              </>) }
        </div>)}
        {fullText && (<div className="MyComment_fullText">
          {props.Commnets.slice(11, props.Commnets.length)}
        </div>)}
        {iscomcnt && (<div className={comment_cnt_position}>
         <p onClick={showAllComment}>{`댓글  ${props.Commnet_cnt}개 모두 보기`}</p>
        </div>)}
        {showComment && (<div className="Comments_text_show">
              <p>{text}</p>
            </div>)}

        </div>
        <div className={input_tag_position}>
        {isloading && (<>
          <Oval 
                  color="#ff0000" 
                  height={20} 
                  width={20}
               />
        </>)}
        {!isloading && (<>
          <textarea  placeholder="댓글 달기" onChange={commentHandler} value={emoticon} ref={textareaRef}
          onKeyDown={KeyDOWNHandler} onInput={te_inpuHandler}/>  
        <img src={emoimg}  onClick={EmojiHandler}/>
           {ispost && (<div className="Mainpage_Content_commnet_post">
            <p onClick={CommentUpload}>게시</p>
        </div>)}
        </>)}
        {searchLoading && (<div>
          <AddMentionMain Userinfo={userinfo} AddMentionData={InsertMention}/>
        </div>)}
        </div>
        </div>
        <div className="Mainpage_Content_vertical">
          <hr />
        </div>
       </div>   
      </>)}

       {(multi == true && one == false) && (<>
         <div className="Mainpage_Content_MultiItem">
         {img.map((data, id) =>(<div className="Mainpage_Content_SlideItem" style={{transform:`translateX(${(page-1)* -100+"%"})`}}>
           <img src={data} id="image" key={id}/>
          </div>))}
          
         {vid.map((data ,id) =>(<div className="Mainpage_Content_SlideItem" style={{transform:`translateX(${(page-1)* -100+"%"})`}}>
            
           <video src={data}  muted={mute} ref={(element) => list.current[id] = element} onClick={playHandler}/>
           <div className="Mainpage_Content_Multimute">
             <img src={muteicon} onClick={muteClick} id="test" />
           </div>
          </div>))}
          <Slide total={totalcnt} pageChange={SlideHandler}/>
  
          </div>
          <div className="Mainpage_Content_Icon">
        <img src={hearticon} id="heart" onClick={ClickHeart}/>
        <img src={replyimg} id="reply"/>
       </div>
       <div className="Mainpage_Content_subItem">
       {checkheart && (<>
        <h3>{`가장 먼저 좋아요를 눌러보세요`}</h3>
        </>)}
        {!checkheart && (<><h3>{`좋아요 ${heart}`+"개"}
        </h3>
        </>)}
        <div className="Mainpage_Content_imoticon">
          <div className="MainPage_Comments">
            {iscommet && (<div className="Content_MyComment">
             <h3>{props.nickname}</h3>
             {isnormal && (<>
              <p>{props.Commnets}</p>
             </>)}
             {ismore && <>
              <h4>{showcommenttext}</h4>
              <p onClick={fulltext}>...더 보기</p>
              </>}
              {isfull && (<>
                <h4>{showcommenttext}</h4>
              </>) }
            </div>)}
            {fullText && (<div className="MyComment_fullText">
              {props.Commnets.slice(11, props.Commnets.length)}
             </div>)}
            {iscomcnt && (<div className={comment_cnt_position}>
             <p onClick={showAllComment}>{`댓글  ${props.Commnet_cnt}개 모두 보기`}</p>
            </div>)}
            {showComment && (<div className="Comments_text_show">
              <p>{text}</p>
            </div>)}
            </div>
            <div className={input_tag_position}>
            {isloading && (<div className="Comments_loading">
          <Oval 
                  color="#ff0000" 
                  height={30} 
                  width={30}
               />
        </div>)}
        {!isloading && (<>
          <textarea  placeholder="댓글 달기" onChange={commentHandler} value={emoticon} ref={textareaRef}
           onKeyDown={KeyDOWNHandler} onInput={te_inpuHandler}/>  
        <img src={emoimg}  onClick={EmojiHandler}/>
           {ispost && (<div className="Mainpage_Content_commnet_post">
            <p onClick={CommentUpload}>게시</p>
        </div>)}
        </>)} 
        {searchLoading && (<div>
          <AddMentionMain Userinfo={userinfo} AddMentionData={InsertMention}/>
        </div>)}
        </div>
        {(emojiindex === props.index && isemoji == true) &&(        
          <div className="Mainpage_Content_emojiopen">
          <EmojiPicker onEmojiClick={onClickHandler} />
          </div>)}
        </div>
        <div className="Mainpage_Content_vertical">
          <hr />
        </div>
       </div>    
        </> )}

       {mousecheck && (<div className="Mainpage_Content_smallprofile"
       onMouseOver={Mouseover} > 
        <OtherProfile nickname={smallnickname} 
      profile={smallprofile} content={smallcontent} followers={smallfollowers} 
      following={smallfollowing} checkfl={smallcheckfl} id={otherId} 
      CancelFollower={CancelHandler} Onclose={profileHandler} Oncomplete={Notecompplete} onBlock={BlockRecept} />
      </div>)}

      {followcheck.isCancel && (<CancelFollower  id={otherId} nickname={smallnickname} 
      profile={smallprofile} onClose={CancelModelHandler}/>)}

     {complete && (<div className="Note_Complete_SendBackDrop" onClick={CompleteModal_Close}>
                    <div className="Note_Complete_Main">
               <p>쪽지가 전송되었습니다.</p>
     </div>
    </div>)}
     {isBlock && (<div className="Mainpage_Content_cpmodal">
      {blockList.map((data) =>(<>
      <p>{data}님이 차단상태입니다</p>
      {isonlyone &&(<>
        <h4>(차단 외에 전송 완료)</h4>
      </>)}
      </>))}
      <button onClick={closeModal}>확인</button>
     </div>)}
      </div>)}

      </>)
}

export default ContentItem
