
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';


import "./Comments_Items.scss";
import LoginExp from "../../LginExpiration/LoginExp";

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
    cm_date:string
}

type cm_userinfo={
  userid:string,
  nickname:string,
  commentdid:string
}
//#endregion

const Comments_Items =({comment_Items ,SendComments}:props) =>{

    const[islike, setIslike]=useState<boolean>(false);
    const[isunlike, setIsunlike]=useState<boolean>(false);
    const[baselike, setBaselike]=useState<boolean>(false);
    const[iszero, setIszero]=useState<boolean>(false);
    const[againlogin, setAgainlogin]=useState<boolean>(false);
    const[isperist, setIsperist]=useState<boolean>(false);

    const[difdte, setDifdate]=useState<string>("");
    const[userid, setUserid]=useState<string>("");

    const[fa_cnt, setFa_cnt]=useState<number>(comment_Items.cm_favorite);

    let Like_Status = islike ? "/image/after_like.png" :"/image/base_like.png";
    const navigate = useNavigate();
    const cookies = new Cookies();


    useEffect(() =>{
    dayjs.extend(relativeTime);
    const fromNow = dayjs(comment_Items.cm_date).locale('ko').fromNow(); 
    setDifdate(fromNow);
    if(comment_Items.like_status == "N") setBaselike(true);
    else if(comment_Items.like_status == "L") setIslike(true);

    if(comment_Items.cm_favorite==0 ) setIszero(true);
    console.log("좋아요 ? " , baselike);
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
            )
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

    const CommentHandler =() =>{
        const data:cm_userinfo={userid:comment_Items.userid, nickname:comment_Items.nickname, commentdid:comment_Items.commentid};
        SendComments(data)
    }

    return(<div className="Comments_Item_Main">
        {againlogin && (<LoginExp />)}
        <div className="Comments_Item_Uerinfo_Stand">
         <img src={comment_Items.profile}/>
         <div className="Comments_Item_contents">
           <div className="Comments_Item_change">
             <h4>{comment_Items.nickname}</h4>
             <h3>{difdte}</h3>
           </div>
           <div className="Comments_Item_Content">
            <p>{comment_Items.comment_text}</p>
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
         </div>
        </div>
        
    </div>)

}
export default Comments_Items;