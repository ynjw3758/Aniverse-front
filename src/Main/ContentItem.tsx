
//                                        +=====================
//========================================+   임포트
//                                        +=====================

//#region Import
//                             +--------------------
//-----------------------------+  외부라이브러리
//                             +--------------------
import {useEffect, useState ,useRef , useContext, useSyncExternalStore, ReactNode} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {Oval} from "react-loader-spinner";

//                             +--------------------
//-----------------------------+   Module
//                             +--------------------
import "./ContentItem.scss";
import OtherProfile from "./OtherProfile";
import user_info from "../Userdata/Userdata";
import CancelFollower from "./CancleFollower";
import Modal from "../Modal/Modal";
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
//#endregion




const ContentItem =(props:content_info) =>{

//                             +--------------------
//-----------------------------+   상태 관리리
//                             +--------------------
//#region
    const[leftactive, setLeftactive]=useState<boolean>(false);
    const[rightactive, setRightactive]=useState<boolean>(false);
    const[checkheart , setCheckheart]=useState<boolean>(false);
    const[clickheart , setClickheart]=useState<boolean>(false);
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
    
    const[file , setFile]=useState<string[]>(props.files);
    const[img, setImg]=useState<string[]>([]);
    const[vid, setVid]=useState<string[]>([]);
    const[item, setItem]=useState<string[]>([]);
    const[blockList, setBlockList]=useState<string[]>([]);
    const[smallcontent ,setSmallcontent]=useState<string[]>([]);

    const[smallprofile ,setSmallprofile]=useState<string>("/image/baseimg.png");
    const[smallnickname ,setSmallnickname]=useState<string>("");
    const[otherId, setOtherId]=useState<string>("");
    const[post, setPost]=useState<string>("");
    const[emoticon, setEmoticon]=useState<string>("");
    const[hearticon,setHearticon]=useState<string>("/image/heart.png");
    const[priflelist , setProfilelist]=useState<string>(props.profile);
    const[muteicon,setMuteicon]=useState<string>("/image/muted.png");
    const[connectid, setConnectid]=useState<string>("");
    const[userid, setUserid]=useState<string>("");
    const[nickname, setNickname]=useState<string>("");
    const[text, setText]=useState<string>("")

    const[heart , setHeart]=useState<number>(props.heart);
    const[refcount, setRefcount]=useState<number>(0);
    const[smallfollowers ,setSmallfollowers]=useState<number>(0);
    const[smallfollowing ,setSmallfollowing]=useState<number>(0);
    const[pagenumber , setPagenumber]=useState<number>(1);
    const[mousepoint, setMousepoint]=useState<number>(0);
    const[emojiindex, setEmojiindex]=useState<number>()
  
    const [followcheck,  setFollowcheck]=useState<any>({
     isCancel:false, //팔로워 취소 버튼 활성화 유무
     CancelFollower:false, //팔로우 취소 유무
    })
//#endregion

//#region 변수초기화
const login_info = useContext(user_info);
const navigate = useNavigate();
const imgref= useRef<HTMLImageElement>(null);
const left_active = leftactive ? "left_active" : "left_unactive";
const right_active = rightactive ? "right_active" : "right_unactive";
const DIVref = useRef<HTMLDivElement>(null); 
const list:any=useRef<null | HTMLVideoElement[]>([]);
//#endregion




    useEffect(() =>{
      
      if(pagenumber == 1){
       
       setLeftactive(false);
       setRightactive(true);
       
      }
      
      else if(pagenumber == item.length){
       
       setRightactive(false);
       setLeftactive(true);
       
      }
      
      else if(pagenumber !== item.length && pagenumber !== 1){
       
       setLeftactive(true);
       setRightactive(true);
       

      }

     },[leftactive , rightactive , pagenumber, refcount])
   
    useEffect(() =>{//최초 로딩시 좋아요 갯수를 가져오는 것
      if(props.Like == "N"){
        setHearticon("/image/heart.png");
      }
      else{
        setHearticon("/image/redheart.png");
      }
      if(props.Commnets !==''){
        setIscommet(true);
        if(props.Commnets.length > 20){
          setIsmore(true);
        }
      }
    },[])




    const SlidenextHandler =() =>{
      
      if(pagenumber-1 !== item.length-1){
        setPagenumber((preNum) => preNum+1);
        
        if(pagenumber ==item.length){
          
          if(vid.length == 1){
          
          setMute(true);
          setMuteicon("/image/muted.png");
          list.current[refcount].play();
          return ;
          }
          else{
              
              setMute(true);
              setMuteicon("/image/muted.png");
              list.current[refcount].play();
              setRefcount(refcount+1);
              return;
          }
       }
       
       else if(pagenumber > item.length){
          console.log("n번째 동영상까지 모든 ref 할당 후 이전 동영상 정지 후 재생");
          if(pagenumber !== item.length-1){
           if(refcount == 0){
            setMute(true);
            setMuteicon("/image/muted.png");
              list.current[0].play();
              return;
           }
           else{
            setMute(true);
            setMuteicon("/image/muted.png");
          list.current[refcount-1].pause();
          list.current[refcount].play();
          setRefcount(refcount+1);
           }
          }
          else {
              console.log("마지막");
              setMute(true);
              setMuteicon("/image/muted.png");
              list.current[refcount-1].pause();
              list.current[refcount].play();
              
          }

       }
      }
      else{
        console.log("슬라이드 인덱스 마지막 다음 화살표 동작 안되게");
        setRightactive(true);
        
        return;
      }
   

    }

    const SlidebeforeHandler =() =>{
      console.log("leftpage :" ,pagenumber);
      if(pagenumber !== 1){
        setPagenumber((preNum) => preNum-1);
        console.log("이전으로 이동 :" , pagenumber , refcount , img.length);
         if(pagenumber > img.length){
            console.log("이전 동영상 재생 카운트가 1인 경우");
            if(refcount == 0){
                console.log("동영상 파일이 1개인 경우");
                setMute(true);
                setMuteicon("/image/muted.png");
                list.current[refcount].pause();
                //setVideocnt(videocnt-1);
                return;
            }

            else{
              console.log("n카운트 일경우 :" , refcount);
              if(pagenumber-1 !== img.length){
                setMute(true);
                setMuteicon("/image/muted.png");
              list.current[refcount].pause();
              list.current[refcount-1].play();
              setRefcount(refcount-1);
              }
              else{
                setMute(true);
                setMuteicon("/image/muted.png");
                list.current[0].pause();
                setRefcount(0);
              }
             }

         }
         else if(pagenumber-1 == img.length ){
            console.log("영상 파일 영역 지남");
            setMute(true);
            setMuteicon("/image/muted.png");
            list.current[0].pause();
         }
        }
        else{
          console.log("슬라이드 인덱스 0번째 이전 화살표 동작 안되게");
        }
    }
    const ClickHeart =() =>{
      console.log("하트 :" , heart);
      console.log("체크 :" , checkheart);
      if(checkheart == false){
        if(props.Like == "O"){//이미 내가 누른 상태
          setHeart((prenum)=>prenum-1);
          console.log("num : " ,heart)
          setHearticon("/image/heart.png")
        }
        else{
          if(heart > 0){
            setHeart((prenum)=>prenum+1);
            console.log("num : " ,heart)
            setHearticon("/image/redheart.png");
          }
          else if(heart == 1){
            setCheckheart(true)
            setHearticon("/image/heart.png")
          }

        }
      }
      else{
        setHeart((preNum) =>preNum+1);
        if(heart == 0){
          setCheckheart(false);
          setHearticon("/image/redheart.png");
         }
        
  

      }
      let access_token:string="";          
      let id:string="";
      id=localStorage.getItem("id")!;
      access_token = localStorage.getItem("a_id")!;
      const contentid :string =DIVref.current?.id!;
      console.log("id :" , contentid);

      axios.defaults.headers.common['Authorization'] = access_token;

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
                        if(error.code == "ERR_NETWORK"){
                          console.log("네트워크 에러 ");
                          
                        }
                        if(error.response?.status==401){
                            console.log("승인되지 않은 로그인");
                        }
                        if(error.response?.status==500){
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
            if(error.code == "ERR_NETWORK"){
              console.log("네트워크 에러 ");
              
            }
            if(error.response?.status==500){
              console.log("서버 에러발생");
              navigate("/error/se-error")
            }
            
            console.log("error response: " , error.response?.data);
          }
         })

      
    }

    const muteClick=() =>{
     console.log("소리 재생");
     if(mute == false){
      setMute(true);
      setMuteicon("/image/muted.png");
      
     }
     else{
      setMute(false);
      setMuteicon("/image/sound.png");
     }
    }

    const playHandler =() =>{
      
      if(list.current[refcount].currentime !== 0 && isplaying==false){
        console.log("11");
        list.current[refcount].pause();
        setIsplaying(true);
      }
      else if(isplaying== true){
        console.log("22");
        list.current[refcount].play();
        setIsplaying(false);
      }
        
    }

     const SmallProfile = (event:React.MouseEvent<HTMLDivElement>) =>{
      setMousepoint(event.clientY);
      console.log("마우스 오버 아이디 :" , imgref.current?.id);
      let access_token:string="";
      let Userid:any;
      let Myid:any;
      Myid = localStorage.getItem("id");
      Userid=imgref.current?.id;
      access_token =localStorage.getItem("a_id")!;
      axios.defaults.headers.common['Authorization'] = access_token;

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
                          if(error.code == "ERR_NETWORK"){
                            console.log("네트워크 에러 ");
                            
                          }
                          if(error.response?.status==401){
                              console.log("승인되지 않은 로그인");
                          }
                          if(error.response?.status==500){
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
          if(error.code == "ERR_NETWORK"){
            console.log("네트워크 에러 ");
            
          }
          if(error.response?.status==401){
              console.log("승인되지 않은 로그인");
          }
          if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
      })
      
     

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
        setRightactive(false);
        setLeftactive(false);
       }
       else{
        setMulti(true);
        setOne(false);
        setRightactive(true);
  
       }
      })


    },[])

     useEffect(() =>{

       if((img.length !=0 || vid.length !=0) && connectid != "" && nickname != "" && userid != ""){
        setIsshow(true);
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

     const commentHandler =(event:React.ChangeEvent<HTMLInputElement>) =>{
      setEmoticon(event.target.value);
     }
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

    const CommentUpload =() =>{
     console.log("댓글 달기");
     setIsloading(true);
     setText(emoticon)
     let access_token:string="";
     let UserId:string= "";
     access_token = localStorage.getItem("a_id")!;
     UserId = localStorage.getItem("id")!;
     axios.defaults.headers.common['Authorization'] = access_token;

     axios.get("http://localhost:8080/Pets-social/acccheck").then((response) =>{

      if(response.status == 200){
        
      axios.post("http://localhost:8090/Pets-social/comment/Create", {UserId :UserId ,Comments:emoticon ,
        contentid:props.conntetid, profile:props.MyImg, nickname:props.MyNick
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
          if(error.response?.status==500){
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
          if(error.code == "ERR_NETWORK"){
            console.log("네트워크 에러 ");
            
          }
          if(error.response?.status==401){
              console.log("승인되지 않은 로그인");
          }
          if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
      })

    }

    const CompleteModal_Close =() =>{
      setComplete(false);
    }
    return(<>

      {isshow && (<div id={props.conntetid} ref={DIVref}>     
      <div className="Mainpage_Content_userinfo" onMouseOver={SmallProfile}  
      onMouseLeave={Mouseout} onMouseMove={MouseMoveHandler}>
         <img src={priflelist}  id={props.UserId} ref={imgref} onClick={PeopleProfile}/>
         <h3>{props.nickname}</h3>
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
        <img src="/image/reply.png" id="reply"/>
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
         <p>{props.Commnets}</p>
         {isExpanded && <>
         <p>더 보기...</p>
         </>}
        </div>)}
        {showComment && (<div className="Comments_text_show">
              <p>{text}</p>
            </div>)}
        </div>
        <div className="MainPage_Comment_input">
        {isloading && (<>
          <Oval 
                  color="#ff0000" 
                  height={20} 
                  width={20}
               />
        </>)}
        {!isloading && (<>
          <input type="text" placeholder="댓글 달기" onChange={commentHandler} value={emoticon}/>  
        <img src={"/image/emoticon.png"}  onClick={EmojiHandler}/>
           {ispost && (<div className="Mainpage_Content_commnet_post">
            <p onClick={CommentUpload}>게시</p>
        </div>)}
        </>)}
        </div>
        </div>
       </div>   
      </>)}

       {(multi == true && one == false) && (<>
        {(leftactive == false && rightactive == true) && (
          <div className="Mainpage_Content_slide_right">
          <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
          </div>
        )}
        {(leftactive == true && rightactive == true) && (<>
          <div className="Mainpage_Content_slide_left">
             <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
            </div>
            <div className="Mainpage_Content_slide_right">
            <img src="/image/slideright.png" onClick={SlidenextHandler} id={right_active} />
            </div>
        </>)}
        {(leftactive == true && rightactive == false) && (<div className="Mainpage_Content_slide_left">
                         <img src="/image/slideleft.png" onClick={SlidebeforeHandler} id={left_active} />
                      </div>)}
         <div className="Mainpage_Content_MultiItem">
         {img.map((data) =>(<div style={{width:"34vw" ,height: "80vh" , transition:"all 0.3s ease-in-out" ,
          transform:`translateX(${(pagenumber-1)* -34+"vw"})`}}>
           <img src={data} id="image"/>
          </div>))}
          
         {vid.map((data ,id) =>(<div style={{width:"34vw" ,height: "80vh" , transition:"all 0.3s ease-in-out" ,
          transform:`translateX(${(pagenumber-1)* -34+"vw"})`}}>
            
           <video src={data}  muted={mute} ref={(element) => list.current[id] = element} onClick={playHandler}/>
           <div className="Mainpage_Content_Multimute">
             <img src={muteicon} onClick={muteClick} id="sound"/>
           </div>
          </div>))}
  
          </div>
          <div className="Mainpage_Content_Icon">
        <img src={hearticon} id="heart" onClick={ClickHeart}/>
        <img src="/image/reply.png" id="reply"/>
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
             <p>{props.Commnets}</p>
             {isExpanded && <>
              <p>더 보기...</p>
              </>}
            </div>)}
            {showComment && (<div className="Comments_text_show">
              <p>{text}</p>
            </div>)}
            </div>
            <div className="MainPage_Comment_input">
            {isloading && (<div className="Comments_loading">
          <Oval 
                  color="#ff0000" 
                  height={30} 
                  width={30}
               />
        </div>)}
        {!isloading && (<>
          <input type="text" placeholder="댓글 달기" onChange={commentHandler} value={emoticon}/>  
        <img src={"/image/emoticon.png"}  onClick={EmojiHandler}/>
           {ispost && (<div className="Mainpage_Content_commnet_post">
            <p onClick={CommentUpload}>게시</p>
        </div>)}
        </>)}
        </div>
        {(emojiindex === props.index && isemoji == true) &&(        
          <div className="Mainpage_Content_emojiopen">
          <EmojiPicker onEmojiClick={onClickHandler} className="EmojiPickerReact"/>
          </div>)}
        </div>
       </div>    
        </> )}
       <div className="Mainpage_Content_vertical">
        <hr />
       </div>

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