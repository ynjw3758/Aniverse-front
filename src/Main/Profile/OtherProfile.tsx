//                            +---------------------
//----------------------------+외부라이브로리      
//                            +----------------------
//#region external_library
import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//#endregion


//                            +---------------------
//----------------------------+Module      
//                            +----------------------
//#region Module
import "./OtherProfile.scss";
import Item from "./Item";
import SendNote from "../SendNote/SendNote";
import {api} from"../../API/Api"
import { Oval } from "react-loader-spinner";
//#endregion


//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type Samll_profile = {
    nickname:string,
    profile:any,
    content:string[],
    checkfl:boolean,
    followers:number,
    following:number,
    id:string,
    CancelFollower :(Cancel:boolean) => void
    Onclose:() => void,
    Oncomplete:() => void,
    onBlock:(data:string[]) => void,
  }
 //#endregion

//                             +--------------------
//-----------------------------+   인터페이스
//        `                         +--------------------

//#region type
interface ResponseDataType {
   message: string;
   code: number;
   response:object,
   onClose:() => void
 }
 //#endregion


const OtherProfile =(props:Samll_profile) =>{
   const[content, setContent]=useState<string[]>(props.content);
   const[isloading, setIsloading]=useState<boolean>(true);
   const[check , setCheck]=useState<any>({
      follower:false,
      following:false,

   });
   const[send ,setSend]=useState<any>({
      isClick:false
   });
    
   //#region 변수 선언
   const divRef = useRef<HTMLDivElement>(null);
   const navigate = useNavigate();
   //#endregion

    useEffect(() =>{    

        if(props.checkfl == true){
           setCheck({follower:true});
           
        }
        else{
         setCheck({following:true});
        }
        console.log("check :" , check.follower);

    },[props.checkfl , props.content , props.followers , props.following , props.id , props.nickname , props.profile]);

    //팔로워 신청 함수
    const FollowerHandler =() =>{
      let access_token:string="";
      let Userid:any;
      let Myid:any;
      Myid = localStorage.getItem("id");
      Userid=props.id;
      access_token =localStorage.getItem("a_id")!;
      axios.defaults.headers.common['Authorization'] = access_token;
      api.defaults.headers.common['Authorization'] = access_token;
      api.post("/Pets-social/gateway/api-proxy" ,{
         service: "common",
         endpoint: "follow/follower",
         method: "POST",
         body: {Id:Myid , Userid:Userid , type:"connect"}
      },{
         withCredentials: true
      }).then(response=>{
         console.log("결과 :" , response)
         if(response.status == 200){
            setCheck({following:false});
            setCheck({follower:true});
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

    const CancelFollowerHandler =() =>{
      props.CancelFollower(true);

    }

    const SendNoteHandler =() =>{
      setSend({isClick:true});

    }
    const NoteHandler =() =>{
      setSend({isClick:false});
      setCheck({follower:false});
      props.Onclose();
   }

   const Notecompete =() =>{
    setSend({isClick:false});
   props.Oncomplete();
   }

   const OnBlock =(data:string[]) =>{
    console.log("data :" , data);
    setSend({isClick:false});
   props.onBlock(data);
   }
   const handleItemLoaded =() =>{
      setIsloading(false);
   }

    return(<Fragment >
      {!send.isClick && (<> <div className="OProfile_userinfo"  ref={divRef}>
        <img src={props.profile} />
        <h3>{props.nickname}</h3>
    </div>
     <div className="OProfile_total_list">
      <div className="OProfile_Itemcontent">
         <h3>{content.length}</h3>
         <p>게시물</p>
      </div>
      <div className="OProfile_Itemfollwers">
         <h3>{props.followers}</h3>
         <p>팔로워</p>
      </div>
      <div className="OProfile_Itemfollwing">
         <h3>{props.following}</h3>
         <p>팔로잉</p>
      </div>   
     </div>
     {isloading && (<>
         <Oval 
               color="#ff0000" 
               height={100} 
               width={100}
            />
     </>)}
      <Item content={content} onLoaded={handleItemLoaded}/>
     {check.following && (<div className="OProfile_fwbtn">
      <button onClick={FollowerHandler} type="submit">팔로워</button>
     </div>)}
     {check.follower && (<div className="OProfile_flbtn">
      <button id="OProfile_send" onClick={SendNoteHandler}>쪽지 보내기</button>
      <button id="OProfile_follwingbt" type="submit" onClick={CancelFollowerHandler}>팔로잉</button>
     </div>)}</>)}
       
     {send.isClick && (<SendNote nickname={props.nickname} Profile={props.profile} Onclose={NoteHandler} Oncomplete={Notecompete} onBlock={OnBlock} />)}
    </Fragment>)

}

export default OtherProfile;