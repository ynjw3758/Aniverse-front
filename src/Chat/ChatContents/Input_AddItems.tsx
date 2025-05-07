//                            +------------------
//----------------------------+ 외부 라이브러리
//                            +------------------
//#region
import {useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie';
import axios from "axios";
//#endregion

//                            +------------------
//----------------------------+ 내부 라이브러리
//                            +------------------
//#region
import "./Input_AddItems.scss";
import Emoji from"./Emoji";
import Addfiles from "./Addfiles";
import Sizemessage from "./Sizemessage";
import WebSocketChatContext from "../../Context/WebSocketChatContext";

//#endregion


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type info ={
    CreateDate:string,
    ChatId:string,
    totalId:string[],
    Profile:string,
    isFirst:boolean

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

const Input_AddItems =(props:info) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[isSize, setIsSize]=useState<boolean>(false);
const[isEmoticon, setIsEmoticon]=useState<boolean>(false);
const[isfiles, setIsfiles]=useState<boolean>(false);
const[ispost,setIspost]=useState<boolean>(false);

const[emoticon, setEmoticon]=useState<string>("");
const[img, setImg]=useState<string[]>([]);
const[video, setVideo]=useState<string[]>([]);
const[imgid,  setImgid]=useState<string[]>([]);
const[videoid,  setVideoid]=useState<string[]>([]);

const[maxsize, setMaxsize]=useState<number>(0);
//const { sendMessage } = useContext(WebSocketContext);


//#endregion

//              +-----------------
//--------------+ 전역 변수수
//              +-----------------
//#region type
const max_size:number=  1024 * 1024 * 20;
const cookies = new Cookies();
const navigate = useNavigate();
const Chat_Context= useContext(WebSocketChatContext);

//#endregion

    const AddfileHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
        console.log("파일 :" , event.target.files);
        const array :any=event.target.files;
        let imglist:string[]=[...img];
        let imidlist:string[]=[...imgid];
        let videolist:string[]=[...video];
        let vilistid:string[]=[...videoid];

        for(let count =0; count<array.length;count++){
            console.log("이미지 미리보기 만들기");
            if (array[count] !== null) {
                const file = array[count];
                if(max_size < maxsize){
                    setMaxsize((prev) => prev+file.size);
                    if (file && file.type.substring(0, 5) === "image") {
                        const currentimg = URL.createObjectURL(file);
                        console.log("url :" , currentimg);
                        imglist.push(currentimg);
                        setImg(imglist);
                        const origin:string =file.name;
                        const index:number = origin.lastIndexOf(".");
                        const name:string =file.name.substring(0, index-1);
                        imidlist.push(name);
                        setImgid(imidlist);
                    }
                    else{
    
                        const create_url = URL.createObjectURL(file);
                        videolist.push(create_url);
                        setVideo(videolist);
                        const origin:string =file.name;
                        const index:number = origin.lastIndexOf(".");
                        const name:string =file.name.substring(0, index-1);
                        vilistid.push(name);
                        setVideoid(vilistid);
                    }
                }
                else{
                    console.log("용량 초과");
                    setIsSize(true);
                    setIsfiles(false);
                    return;
                }


            }

        }
        setIsfiles(true);
     }   

    const EmoticonHandler =() =>{
        if(isEmoticon == false){
            setIsEmoticon(true);
        }
        else{
            setIsEmoticon(false);
        }
       
    }

    const AddEmoticon =(data:string) =>{
        console.log("값 :" , data);
        setEmoticon((prev)=>prev+data);
    }

    const inputHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
        setEmoticon(e.target.value);
    }
    
    const CloseHandler =() =>{
        setIsSize(false);
    }

    useEffect(() =>{
       console.log("날짜 :" , props.totalId);
        Chat_Context.Partici_Chatid(props.ChatId, props.totalId);
    },[]);

    useEffect(() =>{
        if(emoticon.length == 0){
          setIspost(false);
        }
        else{
          setIspost(true);
        }
      },[emoticon])


      const sendChatHandler =() =>{
        let access_token:string="";
        let UserId:string= "";
        access_token = localStorage.getItem("a_id")!;
        UserId = localStorage.getItem("id")!;
        axios.defaults.headers.common['Authorization'] = access_token;
   
        axios.get("http://localhost:8080/Pets-social/acccheck").then((response) =>{
   
         if(response.status == 200){
           console.log("채팅 아이디 :" , props.ChatId);
           const UserId = localStorage.getItem("id")!;
           Chat_Context.sendMessage(props.ChatId, emoticon, UserId, props.Profile, props.isFirst);
           //Chat_Context.sendMessage("", "", "");
           //sendMessage(props.ChatId, emoticon, UserId);
           //sendMessage("", "", "");

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
               console.log("서버 에러발생");
               navigate("/error/se-error")
             }
             
             console.log("error response: " , error.response?.data);
           }
         })
      }

      /*
               axios.post("http://localhost:8089/Pets-social/Chat/Send", {ChatId:props.ChatId, UserId:UserId,  Content:emoticon
         }).then((response) =>{

            console.log("채팅 보내고 결과 :" , response);
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
           */


    return(
    <div className="AddChatItems_total">
        <div className="AddChatItems_date">
         <p>{props.CreateDate}</p>    
        </div>
        {isfiles &&(<div className="AddChatItems_filelist" >
            <Addfiles Img={img} Video={video} ImgId={imgid} VideoId={videoid}/>
        </div>)}
        <div className="AddChatItems_inputchat">
         <input type="text" placeholder="메시지 입력..." value={emoticon} onChange={inputHandler}/>
        </div>
        {ispost && (<div className="ChatInput_AddItems_Post">
            <p onClick={sendChatHandler}>게시</p>
        </div>)} 
        <div className="AddChatItems_AddContents">
         <img src={"/image/emoticon.png"} onClick={EmoticonHandler}/>
         <label  
            draggable="true"
            >
         <img src="/image/picture.png"/>
           <input type="file" 
           style={{display:"none"}}
           onChange={AddfileHandler}
           multiple={true}
           accept=".jpg, .jpeg, .png , .mp4"
            />
            </label>
        </div>
        {isEmoticon && (<>
          <Emoji onimage={AddEmoticon}/>
        </>)}
        {isSize && (<>
         <Sizemessage onClose={CloseHandler}/>
        </>)}
    </div>)

}
export default Input_AddItems;