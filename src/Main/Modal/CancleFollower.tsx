
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import {useState} from "react";

import "./CancleFollower.scss";


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

    const [isSuccess , setIsSuccess]=useState<boolean>(false);

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
        axios.post("http://localhost:8080/Pets-social/follower" , {Id:Myid , Userid:Userid , type:"disconnect"}  , {headers:{Authorization:access_token}})
        .then((response) =>{
           console.log("응답 결과 :" , response.status);
           if(response.status == 200){
              console.log("팔로우 신청 완료");
              props.onClose();
           }
  
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

    return(<div className="MainBackDrop" onClick={CancelHandler}>
             <div className="CancelFw_Main" onClick={(e) => e.stopPropagation()}>
               <div className="CancelFw_userinfo">
                 <img src={props.profile} />
                 <p>{props.nickname}님의 팔로우를 취소하시겠습니까?</p>
               </div>
               <div className="CancelFw_btn">
                <button type="submit" onClick={CancelFolloerHandler}>팔로워 취소</button>
                <button type="button" onClick={CloseModal}>취소</button>
               </div>
            </div>
        </div>
  )

}

export default CancelFollower;