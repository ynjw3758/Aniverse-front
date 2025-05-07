//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import { useContext, useEffect, useState ,useRef} from "react";
import { useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import {Oval} from "react-loader-spinner";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./AddChat.scss";
import MatList from "./MatList";
import AddList from "./AddList";
import Chatmember from "./Chatmember";
//#endregion

//                             +--------------------
//-----------------------------+   에러 인터페이스
//                             +--------------------
//#region type
interface ResponseDataType {
    resultmsg: string;
    resultcode: number;
    resultdata:object
  }
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type data ={
    onClose:() => void,
    ChatShow:(data:Object[] ,img:string[], name:string, roomid:string, createdate:string) => void,
    onDuple:(data:object) =>void,
    OnOneDuple:() => void,
    Profile:string,
    Nickname:string
 }
 //#endregion

const AddChat =(props:data) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[firstMat, setFirstMat]=useState<Object[]>([]);
const[img, setImg]=useState<string[]>([]);
const[nickname, setNickname]=useState<Object[]>([]);
const [userinfo , setUserinfo]=useState<string[]>([]);
const[search ,setSearch]=useState<string>("");
const[matlist, setMatlist]=useState<Object[]>([]);
const[addLiist, setAddList]=useState<Object[]>([]);
const[loading, setLoading]=useState<boolean>(false);
const[invite, setInvite]=useState<boolean>(false);
const[isType, setIsType]=useState<boolean>(false);
const[isCreate ,setIscreate]=useState<boolean>(false);
const[keycheck, setKeycheck]=useState<boolean>(false);
const[sendcheck, setSendcheck]=useState<boolean>(false);
const[isnotmat, setIsnotmat]=useState<boolean>(false);
const[searchempty, setSearchempty] = useState<boolean>(false);
const[listbox, setListbox]=useState<boolean>(false);
//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const navigate = useNavigate();
const param=useParams();
const Timeout=700;
//#endregion

//              +-----------------
//--------------+ useefect
//              +-----------------
//#region type

useEffect(() =>{
  
  if(sendcheck == true ){
    setLoading(false);
    const id:string =param.userid!;
  axios.get("http://localhost:8088/Pets-social/Search/MatList" , {params:{Nickname:search, Id:id}})
  .then((response) =>{
    console.log("아니 ㅅㅂ :" , response );

     if(response.status == 200 ){
      setMatlist([]);
      setMatlist(response.data);
       
     }
     else if(response.status == 204){
      setSearchempty(true);
     }
     setLoading(true);

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
else return;

},[sendcheck])

    //입력 후 700ms동안 이벤트 발생하는지 않는지 체크키
    useEffect(() =>{
      if(keycheck == false && search !=="" && userinfo.length ==0 ){
          console.log("입력 완료 후 일정 시간 체크 시작");
          let check_time =setTimeout(() => {
              setSendcheck(true);
          }, Timeout);
          return () => {
              console.log("CLEANUP");
              clearTimeout(check_time);
              setSendcheck(false);
              setKeycheck(true);
            };
      }

  },[keycheck ,search , userinfo])
    useEffect(() =>{
        let access_token:string="";
        access_token =localStorage.getItem("a_id")!;
        console.log("access : " , access_token);
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck")
        .then(response =>{
           console.log("응답 결과 확인 " , response.data);
          if(response.status == 200){
            console.log("토큰 인증 성공");
            const id:string =param.userid!;
            axios.get("http://localhost:8080/Pets-social/MatList" , {params:{Id:id}})
            .then((response) =>{
                console.log("조회 결과 :" , response.data.data);

                if(response.data.data=="null" ){
                  setIsnotmat(true);
                  setLoading(true);
                }
                else{
                  setMatlist(response.data.data);
                  setFirstMat(response.data.data);
                  setLoading(true);
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
               if(error.response?.status==500){
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
               if(error.code == "ERR_NETWORK"){
                 console.log("네트워크 에러 ");
                 
               }
               if(error.response?.status==401){
                   console.log("승인되지 않은 로그인");
                   navigate("/login");
               }
               if(error.response?.status==500){
                 console.log("서버 에러발생");
                 navigate("/error/se-error")
               }
               
               console.log("error response: " , error.response?.data);
             }
        })
    },[])

    useEffect(() =>{
     
      if(addLiist.length ==0){
        setInvite(false);
      }
      else{

        const Nickname:string[]=[];   
        addLiist.map((data) => Object.entries(data).map((key) =>{
    
                      if(key.at(0) == "Nickname"){
                        Nickname.push(key[1]);
                        setNickname(Nickname);
                       }

        }))
                       
        setInvite(true);
      }
    },[addLiist])
//#endregion
    const closeHandler =() =>{
    props.onClose();
    }

    const addlist =(data:Object) =>{

      setInvite(false);
      setIscreate(true);
        const add:Object[]=[...addLiist];
        console.log("add :" , addLiist);
        if(addLiist.length == 0){
          add.push(data);
          setAddList(add);
          return; 
        }

        if(addLiist.length > 0){
          const list:Object[] = addLiist.filter((remove) =>{
            return JSON.stringify(remove) !== JSON.stringify(data);
          })
          if(list.length == addLiist.length){
            add.push(data);
            setAddList(add);
          }
          else{
            if(list.length == 0){
              setIscreate(false);
              setAddList(list);

            }
            else{
              setAddList(list);
            }

            return;
          }


        }
        if(addLiist.length <=6){
          setListbox(false);
        }
        else{
          setListbox(true);
        }
      

    
    }
    const normalchat =() =>{
      setIsType(false);
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      console.log("access : " , access_token);
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.get("http://localhost:8080/Pets-social/acccheck")
      .then(response =>{
         console.log("응답 결과 확인 " , response.data);
        if(response.status == 200){
          console.log("토큰 인증 성공");
          let RoomName:string=props.Nickname;
          let length:number=1;
          console.log("룸 이름 전 :" , RoomName);
          nickname.forEach((data) =>{
            
            if(nickname.length == length){
              RoomName+=","+data;
            }
            else{
              RoomName+=","+data;
            }
            length++;
            
          });
          console.log("룸 이름 :" , RoomName);
          const Id:string =param.userid! ;
          console.log("img :" , img);
          axios.post("http://localhost:8089/Pets-social/Chat/Create" , {params:{list:addLiist , 
            Name:RoomName , Img:props.Profile , Id:Id, Nickname:props.Nickname}})
          .then((response) =>{
              console.log("채팅 생성 결과 :" , response);
              if(response.status == 200){
                console.log("중복 채팅방 존재")
                if(response.data.data.isDuplicate== false){
                   console.log("그냥 해당 채팅으로 이동");
                   props.OnOneDuple();
                   
                }
                else{
                  props.onDuple(response.data.data);
                }
                
              }
              else if(response.status == 201){
                console.log("새로 생성")
                props.ChatShow(addLiist ,img,RoomName , response.data.Id , response.data.Date);
              }
  
  
          }).catch((error) =>{
         if(axios.isAxiosError<ResponseDataType>(error)){
             console.log("error code: " , error.response?.status);
             
             if(error.response?.status==400){
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
             if(error.code == "ERR_NETWORK"){
               console.log("네트워크 에러 ");
               
             }
             if(error.response?.status==401){
                 console.log("승인되지 않은 로그인");
                 navigate("/login");
             }
             if(error.response?.status==500){
               console.log("서버 에러발생");
               navigate("/error/se-error")
             }
             
             console.log("error response: " , error.response?.data);
           }
      })
    }

  const cr_close =() =>{
    setIsType(false);
  }

  const ImageList =(data:string[]) =>{
    setImg(data);
  }
  
  const SendPerson =(event:React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(event.target.value);
    if(event.target.value ==""){
      console.log("값이 존재하지 않는다", matlist);
      setLoading(true);
      setIsnotmat(false);
      setSearchempty(false);
      setMatlist([]);
      setIsnotmat(true);
    }
    else if(search == event.target.value){
      console.log("변호 이벤트 감지 :" , event.target.value);
      return;
    }
}

useEffect(() =>{
  if(matlist.length == 0 && firstMat.length > 0 && isnotmat == true) {
    setIsnotmat(false);
    setMatlist(firstMat);
  } 

},[matlist, firstMat, true])

  
    //키보드 땟을 때 이벤트
    const KeyupHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
      setKeycheck(false);
    }

   const chatbox_size = listbox ? "AddChat_bigbox" : "addchat_normalbox";
    return(<div className="AddChat_total">
      <div className="AddChat_header">
        <p>초대하기</p>
            <hr />
      </div>
      {invite && (<div className="AddChat_invitelist">
       <AddList List={addLiist} imgList={ImageList}/>
      </div>)}
      {!loading &&( <div className="AddChat_load">
             <Oval 
                  color="#ff0000" 
                  height={100} 
                  width={100}
               />
               </div>) }
        {loading && (<>
        <div>
            <p></p>
        </div>
         <div className="AddChat_search">
          <input type="text" placeholder="닉네임(모음 제외외) 또는 아이디를를 입력해주세요...." onChange={SendPerson}
          onKeyUp={KeyupHandler} /*onKeyDown={KeyDOWNHandler}*/ value={search}/>
      </div>
      {searchempty && (<div className="search_empty">
      <p>맞팔로워 분이 존재하지 않습니다.</p>
      </div>)}
      <div className="matfollwer_list">
        <p>맞팔로워</p>
      </div>
      {isnotmat && (<div className="isnot_matlist">
      <p>맞팔로워 맺은 분이 없습니다.</p>
      </div>)}
      {!isnotmat && (<>
        <MatList List={matlist} onlist={addlist}/>
       </>)}
      </>)}
      <div className="AddChat_btn">
        <button onClick={normalchat} disabled={!isCreate}>채팅</button>
        <button onClick={closeHandler}>닫기</button>
    </div>
    </div>)

}

export default AddChat;