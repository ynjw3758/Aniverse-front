
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import axios from "axios";
import { useNavigate, useViewTransitionState } from "react-router-dom";
import {Cookies} from 'react-cookie';
import {Oval} from "react-loader-spinner";


import "./Comments_Items.scss";
import LoginExp from "../../LginExpiration/LoginExp";
import MentionList from "./MentionList";
import Reply_List from "./Reply/Reply_List";

//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------
//#region
interface props{
    comment_Items:comment_Items
    SendComments:(data:cm_userinfo) => void
}
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
type comment_Items={
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
    mentions:mention_user[]
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

type reply_info={
 cm_date:string,
 contentid:string,
 commentid:string,
 uniquekey:string ,
 cm_cnt:number,
 cm_favorite:number,
 comment_text:string ,
 profile:string ,
 userid:string ,
 nickname:string,
 like_status:string,
 mentions:any[]
}
//#endregion

const Comments_Items =({comment_Items ,SendComments}:props) =>{

    const[islike, setIslike]=useState<boolean>(false);
    const[isunlike, setIsunlike]=useState<boolean>(false);
    const[baselike, setBaselike]=useState<boolean>(false);
    const[iszero, setIszero]=useState<boolean>(false);
    const[againlogin, setAgainlogin]=useState<boolean>(false);
    const[isperist, setIsperist]=useState<boolean>(false);
    const[ismention, setIsmention]=useState<boolean>(false);
    const[iscm_cnt, setIscm_cnt]=useState<boolean>(false);
    const[iscm_open, setIscm_open]=useState<boolean>(false);
    const[iscm_close, setIscm_close]=useState<boolean>(false);
    const[isReply, setIsReply]=useState<boolean>(false);
    const[isLoading, setIsLoading]=useState<boolean>(false);

    const[difdte, setDifdate]=useState<string>("");
    const[userid, setUserid]=useState<string>("");

    const[fa_cnt, setFa_cnt]=useState<number>(comment_Items.cm_favorite);

    const[reply, setReply]=useState<reply_info[]>([{
      cm_date:"",
      contentid:"",
      commentid:"",
      uniquekey:"" ,
      cm_cnt:0,
      cm_favorite:0,
      comment_text:"" ,
      profile:"" ,
      userid:"" ,
      nickname:"",
      like_status:"",
      mentions:[]
    }])

    let Like_Status = islike ? "/image/after_like.png" :"/image/base_like.png";
    let exist_cm = iscm_cnt ? "Comments_Item_contents_extend" : "Comments_Item_contents"
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() =>{
      
      console.log("comment_Items : ", comment_Items.cm_cnt);
        if(comment_Items.mentions.length >0) setIsmention(true);
         console.log("comment_Items.mentioninfo : " ,comment_Items.mentions)
    dayjs.extend(relativeTime);
    const fromNow = dayjs(comment_Items.cm_date).locale('ko').fromNow(); 
    setDifdate(fromNow);
    if(comment_Items.like_status == "N") setBaselike(true);
    else if(comment_Items.like_status == "L") setIslike(true);

    if(comment_Items.cm_favorite==0 ) setIszero(true);
    if(comment_Items.cm_cnt > 0) {
      setIscm_cnt(true);
      setIscm_close(true);
    }
      
    },[])

    const likeHandler =() =>{
     console.log("좋아요 누른다");
     if(comment_Items.like_status == "N") {
        setFa_cnt((prenum) => prenum+1);
        comment_Items.cm_cnt+=1;
        setIszero(false);
        setIslike(true);
     }
     else {
        setFa_cnt((prenum) => prenum-1);
        comment_Items.cm_cnt-=1;
        if(comment_Items.cm_cnt ==0) setIszero(true);
        setIslike(false);
     }
     let access_token:string="";          
     let id:string="";
     id=localStorage.getItem("id")!;
     access_token = localStorage.getItem("a_id")!;
     axios.defaults.headers.common['Authorization'] = access_token;
     axios.get("http://localhost:8080/Pets-social/acccheck").then(
        response =>{
          if(response.status ===200){
            axios.post("http://localhost:8090/Pets-social/comment/likes" , {CommentId : comment_Items.commentid , Id:id, }
            ).then(response =>{
              console.log("응답 :" , response)
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

    }

    const openreplyHandler =() =>{
      if(iscm_close ===true){
        setIscm_close(false);
        setIscm_open(true);
        setIsLoading(true);

        let access_token:string="";          
        let id:string="";
        id=localStorage.getItem("id")!;
        access_token = localStorage.getItem("a_id")!;
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck").then(
          response =>{
            if(response.status ===200){
              axios.get("http://localhost:8090/Pets-social/Comment/cmlist" , {params:{CommentId : comment_Items.commentid ,
                ContentId:comment_Items.contentid}}

              ).then(response =>{
                  console.log("대댓글 응답 : ",response );
                  setReply(response.data.data);
                  setIsLoading(false);
                  setIsReply(true);

              }).catch((error) =>{
                if(axios.isAxiosError<ResponseDataType>(error)){
                  if(error.code=="ERR_BAD_REQUEST"){
                    navigate("/error");
                  }
                  else if(error.response?.status ==404){{
                    console.log("not found");
                  }

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
      }else{
        setIscm_open(false);
        setIscm_close(true);
        setIsReply(false);
      }
    }

    const CommentHandler =() =>{
        const data:cm_userinfo={userid:comment_Items.userid, nickname:comment_Items.nickname, commentdid:comment_Items.commentid};
        SendComments(data)
    }

    const replycmHandler =(data:cm_userinfo) =>{
      console.log("data : " ,data)
      SendComments(data);
    }


    return(<div className="Comments_Item_Main">
        {againlogin && (<LoginExp />)}

        <div className="Comments_Item_Uerinfo_Stand">
         <img src={comment_Items.profile}/>
         <div className={exist_cm}>
           <div className="Comments_Item_change">
             <h4>{comment_Items.nickname}</h4>
             <h3>{difdte}</h3>
           </div>
           <div className="Comments_Item_Content">
            {ismention && (<>
                <MentionList infos={comment_Items.mentions} text={comment_Items.comment_text}/>
            </>)}
            {!ismention && (<>
                <p>{comment_Items.comment_text}</p>
            </>)}
           </div>
          <div className="Comments_Item_content_row">
            {baselike && (<>
            <img src={Like_Status} onClick={likeHandler}/>
              {iszero && (<></>)}
              {!iszero && (<>
              <p>{fa_cnt}</p>
              </>)}
              <h3 onClick={CommentHandler}>댓글 달기</h3>
            </>)}
            {!baselike && (<>
              <img src={Like_Status} onClick={likeHandler}/>
              <p>{fa_cnt}</p>
              <h3 onClick={CommentHandler}>댓글 달기</h3>
            </>)}
          </div>
          {iscm_cnt && (<div className="Comments_Item_cm_cnt">
              {iscm_close && (<div className="Comments_Item_cm_row" onClick={openreplyHandler}>
                <img src="/image/down_arrow.png"/>
                <h3>{`댓글${comment_Items.cm_cnt}`}</h3>
                </div>)}
              {iscm_open && (<div className="Comments_Item_cm_row" onClick={openreplyHandler}>
                <img src="/image/up_arrow.png"/>
                <h3>{`댓글${comment_Items.cm_cnt}`}</h3>
              </div>)}
              {isLoading && (<div className="CommentsItems_ReplyLoading">
                        <Oval 
                                color="#ff0000" 
                                height={40} 
                                width={40}
                             />
              </div>)}
              {isReply && (<>
               <Reply_List Reply_infos={reply} Reply={replycmHandler}/>
              </>)}
            </div>)}
         </div>
        </div>

    </div>)

}
export default Comments_Items;