//                             +--------------------
//-----------------------------+   외부부 라이브러리리
//                             +--------------------
//#region
import { useEffect, useState ,useRef, useMemo} from "react";
import {Oval} from "react-loader-spinner";
import axios from "axios";
import { useNavigate, useResolvedPath } from "react-router-dom";
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
import AddMentionMain from "../Mention/AddMentionMain";
import useMentionHandler from "../../UseHook/SearchHandler";

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
  cm_date:string,
  contentid:string,
  mentions:any[]
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

   type reply={
    commentid:string,
    userid:string,
    nickname:string
   }
   type comment_infos={
    commentid:string, 
    id:string, 
    comments:string, 
    nickname:string,
    profile:string
   }

//#endregion

//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface showcomments_info{
 OnClose :() => void,
ShowData:showdata,
Owner:Owner,
Content_cm:Content_cm
}
interface tokenRenewal { //토큰 생긴 인터페이스
  message: string;
  code: number;
  data:string
}
//#endregion

const ShowComment =({ShowData, Owner, Content_cm,OnClose}:showcomments_info) =>{

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
    const[searchLoading, setSearchLoading]=useState<boolean>(false);
    const[iskeyboard,setIskeyboard]=useState<boolean>(false);
    const[isReply, setIsReply]=useState<boolean>(false);
    const[showComment, setShowComment]=useState<boolean>(false);
    const[isloading, setIsloading]=useState<boolean>(false);
    const[reploading, setRepload]=useState<boolean>(false);
    const[ischangeline, setIschangeline]=useState<boolean>(false);
    const[isnewreply, setIsnewreply]=useState<boolean>(false);
    
    
    
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
    const[textmention, setTextmention]=useState<string>("");
    const[mentionsize, setMentionsize]=useState<string[]>([]);
    const[mentioninfo, setMentioninfo]=useState<object[]>([])
    


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
      contentid:"",
      mentions:[]
    }]);
    const[owner_info, setOwner_info]=useState<Owner>({
      Text:"",
      Id:"",
      Profile:"",
      Nickname:"",
    })

    const[userinfo ,setUserinfo]=useState<user_info[]>([{
      id:"",
      nickname:"",
      img:""
    }]);
    const[replyinfo, setReplyinfo]=useState<reply>({
      userid:"",
      nickname:"",
      commentid:""
    })

    const[commentsinfos, setCommentsinfos]=useState<comment_infos>({
      commentid:"", 
      id:"", 
      comments:"", 
      nickname:"",
      profile:""
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
    const Timeout = 200;
    const cookies = new Cookies();
    let IsSearchCheck=useRef<boolean | null | undefined>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const DivRef = useRef<HTMLDivElement>(null);
    const input_div = useRef<HTMLDivElement>(null);
    const infos_div =useRef<HTMLDivElement>(null);
    const imglist_div =useRef<HTMLDivElement>(null);
    const text_width = useRef<string>("");
    const text_string = useRef<string>("");
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
     console.log("Content_cm :" , Content_cm);

     
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
               console.log("응답 데이터: ", response.data);
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

    const KeyDOWNHandler =(event:React.KeyboardEvent<HTMLTextAreaElement>) =>{
     setIskeyboard(true);
  }
  const margin = useRef<number>(0);
  const img_margin = useRef<number>(-1);
  const compare_height = useRef<number>(139);
  const change_height =(data:any) =>{
    if(window.innerWidth <1550 && window.innerWidth> 1540 ){
      const textarea = textareaRef.current;
      const input = input_div.current;
      const infos = infos_div.current;
      const imgage = imglist_div.current;
      const text_height = 60;
      const div_current=  DivRef.current;
      const margin_limit = -3;
  
      if (textarea && div_current && input && infos && imgage) {
  
        // 2️⃣ 실제 필요한 scrollHeight 계산
        const newHeight = Math.min(textarea.scrollHeight, text_height);
        const input_Height = Math.min(div_current.scrollHeight, 150);
        console.log("text_width.current :" ,input_Height)
       if(ischangeline === true) {
       if(margin.current > margin_limit) {
        text_width.current="";
        margin.current+=-1
        img_margin.current+=-1;
        imgage.style.marginTop = `${img_margin.current}vh`;
        compare_height.current += 5;
        if(compare_height.current>= 150) compare_height.current = 150;
        div_current.style.height = `${compare_height.current}px`;
        div_current.style.marginTop = `${margin.current}vh`;
        textarea.style.height = `${newHeight}px`;
      }
      else{
        div_current.style.height = `${input_Height}px`;
        textarea.style.height = `${newHeight}px`;
      }
      text_width.current="";
       }
       else if(text_string.current.length == 0){
        console.log("제발")
        margin.current=0;
        compare_height.current =139;
        imgage.style.marginTop = "1vh";
        //infos.style.marginTop = "1.5vh";
        input.style.marginTop="2vh";
        textarea.style.height = "auto";
        textarea.style.marginTop ="auto";
        div_current.style.height = "auto";
        div_current.style.marginTop="auto";
        
       }
    }
    }
    else if(window.innerWidth >1550 && window.innerWidth<= 1920){
      console.log("브라우저 크기 1550이상");
      const textarea = textareaRef.current;
      const input = input_div.current;
      const infos = infos_div.current;
      const imgage = imglist_div.current;
      const text_height = 60;
      const div_current=  DivRef.current;
      const margin_limit = -3;
      console.log("길이 :" , )
      if (textarea && div_current && input && infos && imgage) {
  
        // 2️⃣ 실제 필요한 scrollHeight 계산
        const newHeight = Math.min(textarea.scrollHeight, text_height);
        const input_Height = Math.min(div_current.scrollHeight, 180);
        console.log("text_width.current :" ,input_Height)
       if(ischangeline === true) {
       if(margin.current > margin_limit) {
        text_width.current="";
        margin.current+=-1
        img_margin.current+=-1;
        imgage.style.marginTop = `${img_margin.current}vh`;
        compare_height.current += 10;
        if(compare_height.current>= 180) compare_height.current = 180;
        div_current.style.height = `${compare_height.current}px`;
        div_current.style.marginTop = `${margin.current}vh`;
        textarea.style.height = `${newHeight}px`;
      }
      else{
        div_current.style.height = `${input_Height}px`;
        textarea.style.height = `${newHeight}px`;
      }
      text_width.current="";
       }
       else if(text_string.current.length == 0){
        console.log("제발")
        margin.current=0;
        compare_height.current =139;
        imgage.style.marginTop = "1vh";
        //infos.style.marginTop = "1.5vh";
        input.style.marginTop="2vh";
        textarea.style.height = "4vh";
        textarea.style.marginTop ="1vh";
        div_current.style.height = "auto";
        div_current.style.marginTop="auto";
        
       }
    }
    }
   
}
const ischeck = useRef<string>("");
  const commentHandler =(event:React.ChangeEvent<HTMLTextAreaElement>) =>{
    if(window.innerWidth <1550 && window.innerWidth> 1540 ){
        if(event.target.value.length===34 ){
          setIschangeline(true);
          ischeck.current = event.target.value;
        }
        else if(event.target.value.length -ischeck.current.length ===34 ){
          setIschangeline(true);
          ischeck.current = event.target.value;
        }
        else if(event.target.value.length -ischeck.current.length !==34 ){
          setIschangeline(false);
        }
  }
   else if(window.innerWidth >1550 && window.innerWidth<= 1920){
    console.log("길이 :" , event.target.value.length)
    if(event.target.value.length===52 ){
      setIschangeline(true);
      ischeck.current = event.target.value;
    }
    else if(event.target.value.length -ischeck.current.length ===52 ){
      setIschangeline(true);
      ischeck.current = event.target.value;
    }
    else if(event.target.value.length -ischeck.current.length !==52 ){
      setIschangeline(false);
    }
   }
    text_width.current =event.target.value;
    text_string.current = event.target.value;
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
      console.log("모두 지워졌다");
      setSearchLoading(false);
      setEmoticon("");
      setMentionsize([]);
      IsSearchCheck.current=false;
    }
    setEmoticon(event.target.value);
    change_height(text_width.current);
    
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
  const Searchbound =useMemo(() => debounce((values:string) =>{
    setTextmention(values);
    
    console.log("검색 :" , values)
    let access_token:string="";
    access_token =localStorage.getItem("a_id")!;
    console.log("access : " , access_token);
    axios.defaults.headers.common['Authorization'] = access_token;
    axios.get("http://localhost:8080/Pets-social/acccheck")
    .then(response =>{
      if(response.status == 200){
        console.log("토큰 인증 성공");
        axios.get("http://localhost:8088/Pets-social/Search/Person" , {params:{Word:values}})
        .then((response) =>{
              console.log("검색 결과 :", response.data)
            if(response.status == 200 && response.data.length !==0){
              setUserinfo(response.data);
            }
            else if(response.status == 200 && response.data.length ==0){
              setUserinfo([]);
            }
            setIskeyboard(false);
            setSearchLoading(true);
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
        })
      }
    }).catch((error) =>{
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
                  let refresh_token:string="";
                  console.log("토큰 시간 만료 refresh token을 보낸다");
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
                    if(axios.isAxiosError<tokenRenewal>(error)){
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
                                    //setAgainlogin(true);

     
                                }
                                else if(error.response?.status==301){
                                    console.log("기존 아이디 존재");
                                    //setIsfirst(true);
                                    //setUserid(error.response?.data.data);
                                }
                              }
                })
                  
                }
              }
            })
        }

          else if(error.response?.status==500){
            navigate("/error/se-error")
          }
        }
    })
   },Timeout),[textmention])

  const SendCommentHandler =(data:cm_userinfo) =>{
    const values = `@${data.nickname}`;
    setEmoticon(values);
    setCommentid(data.commentdid);
    const value = {userid:data.userid , commentid:data.commentdid, nickname:data.nickname}
    setReplyinfo(value);
    setIspost(true);
    setIsReply(true);
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
          if(isReply){
            setIsLoading(true);
            console.log("content_cm : " , Content_cm);
            
            axios.post("http://localhost:8090/Pets-social/comment/reply", {Comments:emoticon,contentid:Content_cm.contentid,
              CommentId:replyinfo.commentid ,MentionUser:replyinfo.userid, 
              MentionNickname:replyinfo.nickname ,MyId :id , MyNick:Content_cm.nickname , MyProrile:Content_cm.img}).then(response =>{
                console.log("응답 처리 :" , response);

                const data={cm_cnt:0, cm_favorite:0 ,comment_text:emoticon, CommentId:response.data.data};
                setEmoticon("");
                setIsLoading(false);

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
                  else if(error.response?.status == 404){
                    console.log("not found");
                  }
                  
                  console.log("error response: " , error.response?.data);
                }
              })
                
          }
          else{
            setIsLoading(true);
            let access_token:string="";
            let UserId:string= "";
            access_token = localStorage.getItem("a_id")!;
            UserId = localStorage.getItem("id")!;
            axios.defaults.headers.common['Authorization'] = access_token;

               
             axios.post("http://localhost:8090/Pets-social/comment/Create", {UserId :UserId ,Comments:emoticon ,
               contentid:Content_cm.contentid, profile:Content_cm.img, nickname:Content_cm.nickname, MentionInfos:mentioninfo
             }).then((response) =>{
                  const today = new Date();
                  const todayString = today.toISOString(); 
                  const comments_info={commentid:response.data.data, id:UserId, comments:emoticon, 
                  nickname:Content_cm.nickname, profile:Content_cm.img};
                  let new_list:Commentslist[]=[...comments_list];
                  if(emoticon.length ===0){
                    const newdata ={ cm_cnt:0,
                      cm_favorite:0,comment_text:emoticon,commentid: response.data.data,
                      nickname:Content_cm.nickname,
                      profile:Content_cm.img,
                      userid:UserId,
                      like_status:"N",
                      cm_date:todayString,
                      contentid:ShowData.ContentId,
                      mentions:[]}; 
                      new_list.unshift(newdata);
                  }
                  else{
                    const aaa:mention_user={id:"", nickname:"", commentid:""};
                    const newdata ={ cm_cnt:0,
                      cm_favorite:0,comment_text:emoticon,commentid: response.data.data,
                      nickname:Content_cm.nickname,
                      profile:Content_cm.img,
                      userid:UserId,
                      like_status:"N",
                      cm_date:todayString,
                      contentid:ShowData.ContentId,
                      mentions:mentioninfo}; 
                      new_list.unshift(newdata);
                  }
                  setComments_list(new_list);

                  
                 
                 //setCommentsinfos(comments_info);
                 setEmoticon("");
                 setIsLoading(false);
                 
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
          })
        }

      }}
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
                <Comments_List comments ={comments_list} Owner_infos={owner_info} Comment_Send={SendCommentHandler} />
              </>)}
              </div>
              <div className="ShowComments_content_compare" ref={DivRef}>
                {!reploading && (<div className="ShowComments_Input" ref={input_div}>
                  <div className="ShowComments_Imoticon">
                    <img src={"../assets/images/emoticon.png"}  onClick={EmojiHandler} />
                  </div>
                    {ispost && (<div className="ShowComments_commnet_post">
                      <p onClick={sendcomment}>게시</p>
                    </div>)}
                    <textarea  placeholder="댓글 달기..." onChange={commentHandler} value={emoticon} 
                    onKeyDown={KeyDOWNHandler}  ref={textareaRef}/>
                  </div>)}
                {reploading && (<div className="ShowComments_Loading">
                  <Oval 
                                color="#ff0000" 
                                height={40} 
                                width={40}
                             />
                </div>)}

                  <div className="ShowComments_content_Infos" ref={infos_div}>
                    <h3>{`좋아요 ${favorite}개`}</h3>
                    <p>{ShowData.content_ct}</p>
                  </div>
                 <div className="ShowComments_content_Imglist" ref={imglist_div}>
                    <img src={hearticon}/>
                    <img src="../assets/images/share.png"/>
                    <img src="../assets/images/favorite_content.png"/>
                 </div>
                 {isemoji && (<div className="ShowComments_Input_Emoji">
                    <EmojiPicker onEmojiClick={onClickHandler}  
                    height={400}
                    width={400}/>
                   </div>)}
              </div>
              {searchLoading && (<div>
                      <AddMentionMain Userinfo={userinfo} AddMentionData={InsertMention}/>
              </div>)}
            </div>
          </div>
    </div>)
}

export default ShowComment;