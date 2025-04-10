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
import SendNote from "./SendNote";
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
   const[showItem, setShowItem]=useState<string[]>([]);
   const[img, setImg]=useState<string[]>([]);
   const[vid, setVid]=useState<string[]>([]);
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
        /*
        let image = [...img];
        let video=[...vid];

        for(let i=0; i<3; i++){
            let url:string = content[i];
            let last:number =url.lastIndexOf(".");
            let expand:string =url.substring(last+1 , url.length);
            if((expand=="jpg" || expand=="png")){
                image.push(content[i]);
                setImg(image);
              }
              
              else if(expand=="mp4"){
                video.push(content[i]);
                setVid(video);
    
              }
        }
        setAa(true);
*/
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
      axios.post("http://localhost:8080/Pets-social/follower" , {Id:Myid , Userid:Userid , type:"connect"}  , {headers:{Authorization:access_token}})
      .then((response) =>{
         console.log("응답 결과 :" , response.status);
         if(response.status == 200){
            setCheck({following:false});
            setCheck({follower:true});
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
     <Item content={content}/>
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