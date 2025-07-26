
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import "./CancleFollower.scss";
import {api } from "../../API/Api"


type user_info = {
    onClose: () => void,
    profile:string,
    nickname:string,
    id:string
}

//                             +--------------------
//-----------------------------+   인터페이스
//                             +--------------------

//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }
//#endregion

const CancelFollower =(props:user_info) =>{

    //#region 변수초기화
const navigate = useNavigate();
//#endregion

    const CancelHandler =() =>{
        props.onClose();
    }
    const CloseModal =() =>{
        props.onClose();
    }

    const CancelFolloerHandler =() =>{
        let access_token:string="";
        let Userid:any;
        let Myid:any;
        Myid = localStorage.getItem("id");
        console.log("유저 아이디 :" , props.id)
        Userid=props.id;
        access_token =localStorage.getItem("a_id")!;
        axios.defaults.headers.common['Authorization'] = access_token;
        api.defaults.headers.common['Authorization'] = access_token;
              api.post("/Pets-social/gateway/api-proxy" ,{
         service: "common",
         endpoint: "follow/follower",
         method: "POST",
         body: {Id:Myid , Userid:Userid , type:"disconnect"}
      },{
         withCredentials: true
      }).then(response=>{
         console.log("결과 :" , response)
         if(response.status == 200){
            props.onClose();
         }
      }).catch(error =>{
         if(axios.isAxiosError<ResponseDataType>(error)){

            if(error.response?.status==400){
               console.log("400에러 발생")
               navigate("/error/BadRequest");
            }
            else if(error.response?.status==415){
               console.log("지원하지 않는 형식입니다.")
               //setIsloading(false);
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

    return(<div className="MainBackDrop" onClick={CancelHandler}>
             <div className="CancelFw_Main" onClick={(e) => e.stopPropagation()}>
               <div className="CancelFw_userinfo">
                 <img src={props.profile} />
                 <p>{props.nickname}님의 팔로우를<br />취소하시겠습니까?</p>
               </div>
               <div className="CancelFw_btn">
                <button type="submit" onClick={CancelFolloerHandler} id="btn_Cancel_fw">팔로워 취소</button>
                <button type="button" onClick={CloseModal} id="btn_Cancel">취소</button>
               </div>
            </div>
        </div>
  )

}

export default CancelFollower;