//                             +--------------------
//-----------------------------+   외부부 라이브러리리
//                             +--------------------
//#region
import { useEffect, useState ,useRef} from "react";
import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import debounce from 'lodash/debounce';

//#endregion


//                             +--------------------
//-----------------------------+   내부 라이브러리리
//                             +--------------------
//#region
import "./ShowComment.scss";
import Comment_Slide from "./Comment_Slide";
import LoginExp from "../../LginExpiration/LoginExp";
import Comments_List from "./Comments_List";
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

interface ResponseDataType {
  message: string;
  code: number;
  response:object;
  resultdata:any;
}
//#endregion

//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region
type showdata={
        Img: string[];
        Video: string[];
        MyComment: string;
        MyProfile: string;
        MyNick: string;
        ContentId:string;
        UserId:string;
        Local:string;
        heart_ct:number;
        check_heart:string;
        content_ct:string;
};
type Commentslist={
  cm_cnt:number,
  cm_favorite:number,
  comment_text:string,
  commentid:string,
  nickname:string,
  profile:string,
  userid:string,
  like_status:string,
  cm_date:string
  mentions:mention_user[]
}
type Owner={
  Text:string,
  Id:string,
  Profile:string,
  Nickname:string,
  }

  type cm_userinfo={
    userid:string,
    nickname:string,
    commentdid:string
  }
  type mention_user={
    id:string,
    nickname:string,
    commentid:string
  }
//#endregion

//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface showcomments_info{
 OnClose :() => void,
ShowData:showdata,
Owner:Owner
}
//#endregion

const ShowComment =({ShowData, Owner, OnClose}:showcomments_info) =>{

//                             +--------------------
//-----------------------------+   상태 관리
//                             +--------------------
//#region
    const[isone, setIsone]=useState<boolean>(false);
    const[ismulti, setIsMulti]=useState<boolean>(false);
    const[isready, setIsready]=useState<boolean>(false);
    const[isComments, setIsComments]=useState<boolean>(false);
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const[againlogin, setAgainlogin]=useState<boolean>(false);
    const[isperist, setIsperist]=useState<boolean>(false);
    const[isemoji, setIsemoji]=useState<boolean>(false);
    const[ispost, setIspost]=useState<boolean>(false);
    
    

    const[totalcnt, setTotalcnt]=useState<number>(0);
    const[page, setPage]=useState<number>(1);
    const[video_last, setVideo_last]=useState<number>(0);
    const[screen_width, setScreen_width]=useState<number>(0)
    const[emojiindex, setEmojiindex]=useState<number>()

;   const[istype, setIstype]=useState<string>("");
    const[userid, setUserid]=useState<string>("");
    const[hearticon,setHearticon]=useState<string>(ShowData.check_heart);
    const[favorite, setFavorite]=useState<number>(ShowData.heart_ct);
    const[emoticon, setEmoticon]=useState<string>("");
    const[commentid, setCommentid]=useState<string>("");


    const[comments_list, setComments_list]=useState<Commentslist[]>([{
      cm_cnt:0,
      cm_favorite:0,
      comment_text:"",
      commentid:"",
      nickname:"",
      profile:"",
      userid:"",
      like_status:"",
      cm_date:"",
      mentions:[]
    }]);
    const[owner_info, setOwner_info]=useState<Owner>({
      Text:"",
      Id:"",
      Profile:"",
      Nickname:"",
    })
//#endregion
    
    
//                             +--------------------
//-----------------------------+   전역 변수
//                             +--------------------
//#region    
    const img:string[] = ShowData.Img;
    const play:string[] =ShowData.Video;
    const list:any=useRef<null | HTMLVideoElement[]>([]);
    const video_idx = useRef<number>(0);
    const navigate = useNavigate();
    const cookies = new Cookies();
//#endregion

//                             +--------------------
//-----------------------------+   useEffect
//                             +--------------------
//#region  
    useEffect(() =>{
     console.log("넘어온 데이터 :", ShowData.MyComment);
     if(ShowData.Img.length ==1 || ShowData.Video.length ==1){
      console.log("파일 1개");
      setIsone(true);
     }
     else if(ShowData.Img.length >1 || ShowData.Video.length >1){
      console.log("파일 다수");
      setIsMulti(true);
     }
     const sum:number = ShowData.Img.length + ShowData.Video.length;
     setTotalcnt(sum);
     if(window.innerWidth < 1550){
      setScreen_width(33);
     }
     else if(window.innerWidth > 1550){
      setScreen_width(36)
     }
     console.log("브라우저 넓이 :" , window.innerWidth);

     
    },[])


    useEffect(() => {
      const timer = setInterval(() => {
        if (list.current[0]) {
          console.log("🎬 video 태그 렌더링됨 : ", list.current[0]);
          setIsready(true);
          clearInterval(timer);
        }
      }, 100);
    
      return () => clearInterval(timer);
    }, []); // ✅ 수정 완료

    useEffect(() =>{
    console.log("이제 댓글 데이터를 가져오자");
    setIsLoading(true);
    let access_token:string="";          
    let id:string="";
    id=localStorage.getItem("id")!;
    access_token = localStorage.getItem("a_id")!;
    axios.defaults.headers.common['Authorization'] = access_token;
    axios.get("http://localhost:8080/Pets-social/acccheck").then(
      response =>{
        console.log("토큰 응답 : " ,response);
        if(response.status == 200){
          console.log("contentid : ")
          axios.get("http://localhost:8090/Pets-social/Comment/list", {params:{ContentId:ShowData.ContentId,
            UserId:ShowData.UserId, MyId:id}})
          .then((response) =>{
               console.log("응답 데이터: ", response.data.data);
               let text="";
               if(response.data.data.owner_text !== "null") text =response.data.data.owner_text;
               setComments_list(response.data.data.Comment_List);
               const ownerinfo:Owner={Text:text, Id:Owner.Id, Profile:Owner.Profile, Nickname:Owner.Nickname}
               setOwner_info(ownerinfo)
               setIsLoading(false);
          }).catch((error) =>{
            if(axios.isAxiosError<ResponseDataType>(error)){
              if(error.code=="ERR_BAD_REQUEST"){
                navigate("/error");
              }
              else if(error.response?.status==500){
                console.log("서버 에러발생");
                navigate("/error/se-error")
              }
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
            Object.entries(error.response?.data).map(key =>{
              if(key.at(0) == "errorcode"){
                if(key.at(1) == "00"){
                  navigate("/error/auth/");
                  return;
                }
                else if(key.at(1) == "01"){
                    console.log("토큰 시간 만료 refresh token을 보낸다");
                    let refresh_token:string="";
                    refresh_token= cookies.get('refresh_token');
                    const id= localStorage.getItem("id");
                    axios.post("http://localhost:8080/Pets-social/token/refresh", {
                      refresh_token : refresh_token,
                      id : id})
                      .then(
                      response =>{
                        console.log("응답 결과 :" , response)
                        if(response.status == 200){
                          localStorage.setItem("p_exp" ,response.data.data.exp);
                          localStorage.setItem("a_id" ,response.data.data.access_token);
                          navigate("/main");
                        }
                      }
                    ).catch(error =>{
                      if(axios.isAxiosError<ResponseDataType>(error)){
                                  console.log("error code: " , error.response?.status);
          
                                  if(error.response?.status==400){
                                    navigate("/error");
                                    return;
                                  }
                                  else if(error.code == "ERR_NETWORK"){
                                    console.log("네트워크 에러 ");
                                    return;
                                    
                                  }
                                  else if(error.response?.status == 401){
                                      console.log("다시 로그인해야 된다.");
                                      localStorage.clear();
                                      setAgainlogin(true);

       
                                  }
                                  else if(error.response?.status==301){
                                      console.log("기존 아이디 존재");
                                      setIsperist(true);
                                      setUserid(error.response?.data.resultdata);
                                  }
          
                                  
                                  console.log("error response: " , error.response?.data.response);
                                }
                  })
                    

                }
              }
             })
        }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
       })

    },[isComments])
    
    useEffect(() =>{
      if(emoticon.length == 0){
        setIspost(false);
      }
      else{
        setIspost(true);
      }
    },[emoticon])

    useEffect(() =>{
      
      if(list.current[0] === undefined && isready === false){
       return;
      }
      else{
        setIsComments(true);
       if(img.length == 0){
         if(page == 1) list.current[0].play();
         else{
           
           if(istype ==="next"){

             if(page == play.length){
              list.current[page-2].pause();
              list.current[page-1].play();
             }
             else{
              list.current[page-2].pause();
              list.current[page-1].play();
             }

           }
           else if(istype ==="before"){
                if(page ==1){
                  list.current[page].pause();
                  list.current[page-1].play();
                }
                else{
                  list.current[page-1].pause(); //3 2 => 2 1
                  list.current[page-2].play();
                }
           }
           else if(istype ===""){
               return;
           }
         }    
        }
        else{
         if(play.length == 0) return;
           const different = totalcnt- img.length; 
           setVideo_last(different);
           if(img.length <page && istype==="next"){
             if(play.length ==1){
              list.current[0].play();
              return;
             }
             else{
              video_idx.current+=1;
              console.log("video_idx.current : ", video_idx.current);
                if(video_idx.current== video_last){ //2 1, 3 2
                  list.current[video_idx.current-2].pause();
                  list.current[video_idx.current-1].play();
                }
                else{
                   list.current[video_idx.current-1].pause();
                   list.current[video_idx.current].play();
                }
             }

           }
          else if(img.length <page && istype==="before"){

            if(play.length ==1){
              list.current[0].pause();
              return;
            }else{
              video_idx.current-=1;
              console.log("video_idx.current : " ,video_idx.current)
              if(video_idx.current ==0){
                list.current[video_idx.current].pause();
                list.current[video_idx.current-1].play();
              }
              else{
                list.current[video_idx.current].pause();
                list.current[video_idx.current-1].play();
              }

            }
          }
          else if(img.length ==page && istype===""){
                 list.current[0].pause();
                return;
          }
        }
      }
     },[isready, page])
//#endregion

//                             +--------------------
//-----------------------------+   fucntion
//                             +--------------------
//#region  
  const CloseHandler =() =>{
    OnClose();
  }
  const SlideHandler =(data:number, type:string) =>{
  setPage(data);
  setIstype(type);
  }

  const EmojiHandler =() =>{
    if(isemoji == true){
      setIsemoji(false);
    }
    else{
      setIsemoji(true);
    }
   }
  const onClickHandler =(emojiData:EmojiClickData) =>{
  setEmoticon((prev)=>prev+emojiData.emoji);

    }
  const commentHandler =(event:React.ChangeEvent<HTMLInputElement>) =>{
  setEmoticon(event.target.value);
  }
  const SendCommentHandler =(data:cm_userinfo) =>{
    const values = `@${data.nickname}`;
    setEmoticon(values);
    setCommentid(data.commentdid);
    setIspost(true);
  } 

  const sendcomment =() =>{
    let access_token:string="";          
    let id:string="";
    id=localStorage.getItem("id")!;
    access_token = localStorage.getItem("a_id")!;
    axios.defaults.headers.common['Authorization'] = access_token;
    axios.get("http://localhost:8080/Pets-social/acccheck").then(
      response =>{
        if(response.status === 200){
            if(commentid == ""){
              console.log("root 댓글을 단다");

            }
            else{
              console.log("대댓글을 단다.");
        
            }
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
            Object.entries(error.response?.data).map(key =>{
              if(key.at(0) == "errorcode"){
                if(key.at(1) == "00"){
                  navigate("/error/auth/");
                  return;
                }
                else if(key.at(1) == "01"){
                    console.log("토큰 시간 만료 refresh token을 보낸다");
                    let refresh_token:string="";
                    refresh_token= cookies.get('refresh_token');
                    const id= localStorage.getItem("id");
                    axios.post("http://localhost:8080/Pets-social/token/refresh", {
                      refresh_token : refresh_token,
                      id : id})
                      .then(
                      response =>{
                        console.log("응답 결과 :" , response)
                        if(response.status == 200){
                          localStorage.setItem("p_exp" ,response.data.data.exp);
                          localStorage.setItem("a_id" ,response.data.data.access_token);
                          navigate("/main");
                        }
                      }
                    ).catch(error =>{
                      if(axios.isAxiosError<ResponseDataType>(error)){
                                  console.log("error code: " , error.response?.status);
          
                                  if(error.response?.status==400){
                                    navigate("/error");
                                    return;
                                  }
                                  else if(error.code == "ERR_NETWORK"){
                                    console.log("네트워크 에러 ");
                                    return;
                                    
                                  }
                                  else if(error.response?.status == 401){
                                      console.log("다시 로그인해야 된다.");
                                      localStorage.clear();
                                      setAgainlogin(true);

       
                                  }
                                  else if(error.response?.status==301){
                                      console.log("기존 아이디 존재");
                                      setIsperist(true);
                                      setUserid(error.response?.data.resultdata);
                                  }
          
                                  
                                  console.log("error response: " , error.response?.data.response);
                                }
                  })
                    

                }
              }
             })
        }
          else if(error.response?.status==500){
            console.log("서버 에러발생");
            navigate("/error/se-error")
          }
          
          console.log("error response: " , error.response?.data);
        }
       })

  }
//#endregion

    return(<div className="ShowAllComments_BackDrop" onClick={CloseHandler}>
          <div className="ShowAllComments_Main" onClick={(e) => e.stopPropagation()}>
          {againlogin && (<LoginExp />)}
            <div className="ShowAllComtents_content">
              {isone && (<>
                {ShowData.Img.map((data) =>(<>
                 <img src={data}/>
                </>))}
                {ShowData.Video.map((data) =>(<>
                  <video src={data} autoPlay muted/>
                </>))}
              </>)}
              {ismulti &&(<>
                <Comment_Slide total={totalcnt} pageChange={SlideHandler}/>
                <div className="ShowComments_display">
                   {ShowData.Img.map((data, id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
                    transform:`translateX(${(page-1)* -{screen_width}+"vw"})`}}>
                     <img src={data} key={id}/>
                    </div>))}
                    {ShowData.Video.map((data, id) =>(<div style={{transition:"all 0.3s ease-in-out" ,
                      transform:`translateX(${(page-1)* -{screen_width}+"vw"})`}}>
                      <video src={data}  ref={(element) => list.current[id] = element}/>
                    </div>))}
                    </div>
                </>)}
            </div>
            <div className="ShowComments_Comments">
              <div className="ShowComments_Myinfo">
                 <img src={ShowData.MyProfile} />
                 <p>{ShowData.MyNick}</p>
              </div>
              <p id="LocalName">{ShowData.Local}</p>
              <div className="ShowComments_Verticla">
                <hr />
              </div>
              <div className="Comments_list">
              {isLoading && (<div className="Comments_Loading">
                        <Oval 
                                color="#ff0000" 
                                height={70} 
                                width={70}
                             />
              </div>)}
              {!isLoading && (<>
                <Comments_List comments ={comments_list} Owner_infos={owner_info} Comment_Send={SendCommentHandler}/>
              </>)}
              </div>
              <div className="ShowComments_content_compare">
                 <div className="ShowComments_content_Imglist">
                    <img src={hearticon}/>
                    <img src="/image/share.png"/>
                    <img src="/image/favorite_content.png"/>
                 </div>
                 <h3>{`좋아요 ${favorite}개`}</h3>
                 <p>{ShowData.content_ct}</p>
                 <div className="ShowComments_Input">
                   <input type="text" placeholder="댓글 달기..." onChange={commentHandler} value={emoticon}/>
                   <img src={"/image/emoticon.png"}  onClick={EmojiHandler}/>
                   {ispost && (<div className="ShowComments_commnet_post">
                    <p onClick={sendcomment}>게시</p>
                   </div>)}
                 </div>
                 {isemoji && (<div className="ShowComments_Input_Emoji">
                    <EmojiPicker onEmojiClick={onClickHandler}  
                    height={400}
                    width={400}/>
                   </div>)}
              </div>

            </div>
          </div>
    </div>)
}

export default ShowComment;