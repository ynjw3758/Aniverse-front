//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type 
import { useState ,useContext, useEffect, useRef, Fragment} from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./NoteList.scss";
import Item from "./Item";
import user_info from "../Context/Userdata";
import NoteItemList from "./NoteItemList";
import BlockList from "./BlockList";
import SendNote from "../Main/SendNote/SendNote";
//#endregion

//                             +--------------------
//-----------------------------+   에러 인터페이스
//                             +--------------------
//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }
 //#endregion

const NoteList =() =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
    const [tag , setTag] =useState<any>({
        receive:false,
        send:false,
        save:false,
        spam:false,
    })
    const[notesize, setNotesize]=useState<number>(0);

    const[isreceive, setIsreceive]=useState<boolean>(false);
    const[allcheck, setAllcheck]=useState<boolean>(false);
    const[selectreceive ,setSelectreceive]=useState<boolean>(false);
    const[isshow, setIsshow]=useState<boolean>(false);
    const[blcomplete, setBlcomplete]=useState<boolean>(false);
    const[blexist, setBlexist]=useState<boolean>(false);
    const[blinsert, setBlinsert]=useState<boolean>(false);
    const[blList, setBlList]=useState<boolean>(false);
    const[isLoading, setIsLoading]=useState<boolean>(false);
    const[isnote, setIsnote]=useState<boolean>(false);

    const [message ,setMessage]=useState<string>("");
    const[noteId, setNoteId]=useState<string>("");
    const[img, setImg]=useState<string>("");
    const[user, setUser]=useState<string>("");
    const[content, setContent]=useState<string>("");
    const[time, setTime]=useState<string>("");
    const[selectmsg, setSelectmsg]=useState<string>("");
    const[contents, setContens]=useState<string>("");

    const[noteList , setNoteList]=useState<string[]>([]);
    const[blockList, setBlockList]=useState<string[]>([]);
    const[deleteLists, setDeleteLists]=useState<string[]>([]);
//endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const navigate = useNavigate();
const param=useParams();
const noteref=useRef<HTMLDivElement>(null);
//#endregion

    useEffect(() =>{
      setTag({receive:true , send:false , save:false , spam:false});
      setMessage("receive");
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      console.log("access : " , access_token);
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.get("http://localhost:8080/Pets-social/acccheck")
      .then(response =>{
         console.log("응답 결과 확인 " , response.data);
        if(response.status == 200){
          console.log("토큰 인증 성공");
          const id:string =param.userid! ;
          axios.get("http://localhost:8082/Pets-social/getNote" , {params:{Id:id , Type:"receive"}})
          .then((response) =>{
           console.log("결과 :" , response);
           /*
           if(response.status ==200 && response.data.Read !=="null" &&  response.data.NotRead !=="null"){
            console.log("둘다 존재");
           setGetnoteinfo({Nrsize:response.data.NotRead.length ,Rsize:response.data.Read.length , 
             Nrlist:response.data.NotRead , Rlist:response.data.Read});
             setIsreceive(true);
             //return;
          }
          else if(response.status ==200 && response.data.Read =="null" &&  response.data.NotRead !=="null"){

           setGetnoteinfo({...getnoteinfo, Nrsize:response.data.NotRead.length , Nrlist:response.data.NotRead});
           setIsreceive(true);
           return;
          }
          else if(response.status ==200 && response.data.Read !=="null" &&  response.data.NotRead =="null"){

           setGetnoteinfo({...getnoteinfo ,Rsize:response.data.Read.length ,  Rlist:response.data.Read});
           setIsreceive(true);
           return;
          }
          else if(response.status ==200 && response.data.Read =="null" &&  response.data.NotRead =="null"){
             console.log("데이터가 존재하지 않는다");
             return;
          }
             */

           if(response.status == 200 && response.data.resultdata !== "null"){
             console.log("성공");
             const size:string[] = response.data.resultdata;
             setNotesize(size.length);
             setNoteList(response.data.resultdata);
             setIsreceive(true);
           }
           else if(response.status == 200 && response.data.resultdata == "null"){
            setIsreceive(false);
            setNoteList([]);
            setNotesize(0);
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




    const receiveHandler =() =>{
        setTag({receive:true , send:false , save:false , spam:false});
        setMessage("receive");
        setNoteList([]);
        setIsreceive(false);
        console.log("받은 쪽지 리셋 :" , noteList , " ,tag :" , tag);
        if(tag.receive == false){
          setIsshow(false);
          let access_token:string="";
          access_token =localStorage.getItem("a_id")!;
          console.log("access : " , access_token);
          axios.defaults.headers.common['Authorization'] = access_token;
          axios.get("http://localhost:8080/Pets-social/acccheck")
          .then(response =>{
             console.log("응답 결과 확인 " , response.data);
            if(response.status == 200){
              console.log("토큰 인증 성공");
              const id:string =param.userid! ;
              axios.get("http://localhost:8082/Pets-social/getNote" , {params:{Id:id , Type:"receive"}})
              .then((response) =>{
               console.log("결과 :" , response.data);


               if(response.status == 200 && response.data.resultdata !=="null"){
                 console.log("성공");
                 const size:string[] = response.data.resultdata;
                 setNotesize(size.length);
                 setNoteList(response.data.resultdata);
                 setIsreceive(true);
               }
               else if(response.status == 200 && response.data.resultdata == "null"){
                setIsreceive(false);
                setNoteList([]);
                setNotesize(0);
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

               }
          })
        }
        else {/*
          let access_token:string="";
          access_token =localStorage.getItem("a_id")!;
          console.log("access : " , access_token);
          axios.defaults.headers.common['Authorization'] = access_token;
          axios.get("http://localhost:8080/Pets-social/acccheck")
          .then(response =>{
             console.log("응답 결과 확인 " , response.data);
            if(response.status == 200){
               console.log("결과 :" , response);
               if(noteList.length> 0){
                 console.log("성공");
                 const size:string[] = response.data.resultdata;
                 setNotesize(size.length);
                 setNoteList(response.data.resultdata);
                 setIsreceive(true);
               }
               else if(noteList.length== 0){
                setIsreceive(false);
                setNoteList([]);
                setNotesize(0);
               }

     
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

               }
          })
               */

        }
     
    }
//#endregion
//#region      보낸 쪽지 핸들러
    const sendHandler =() =>{
        setTag({receive:false , send:true , save:false , spam:false});
        setMessage("send");
        console.log("보낸 쪽지 클릭 :" , tag);
        if(tag.send == false){
          setIsshow(false);
          setIsreceive(false);
          setNoteList([]);
          console.log("isreceive :" , isreceive , " ,data :" , noteList);
          let access_token:string="";
          access_token =localStorage.getItem("a_id")!;
          console.log("access : " , access_token);
          axios.defaults.headers.common['Authorization'] = access_token;
          axios.get("http://localhost:8080/Pets-social/acccheck")
          .then(response =>{
             console.log("응답 결과 확인 " , response.data);
            if(response.status == 200){
              console.log("토큰 인증 성공");
              const id:string =param.userid! ;
              axios.get("http://localhost:8082/Pets-social/getNote" , {params:{Id:id , Type:"send"}})
              .then((response) =>{
               console.log("결과 :" , response);

               if(response.status == 200 && response.data.resultdata !=="null"){
                 console.log("성공");
                 const size:string[] = response.data.resultdata;
                 setNotesize(size.length);
                 setNoteList(response.data.resultdata);
                 setIsreceive(true);
               }
               else if(response.status == 200 && response.data.resultdata == "null"){
                setNotesize(0);
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

               }
          })
        }
        else return;
    }
//#endregion
//#region      보관함 핸들러
    const saveHandler =() =>{
        setTag({receive:false , send:false , save:true , spam:false});
        setMessage("save");
        console.log("보관함으로 이동");
        setNoteList([]);
        setIsshow(false);
      
    }
//#endregion
//#region       스팸함 핸들러
    const spamHandler =() =>{
        setTag({receive:false , send:false , save:false , spam:true});
        setMessage("spam");
        setIsshow(false);
    }
//#endregion

    
    const NoteHandler =(data:Object) =>{

      Object.entries(data).map((key) =>{
       if(key[0] == "img"){
        setImg(key[1]);
       }       
       else if(key[0] == "user"){
        setUser(key[1]);
       }
       else if(key[0] == "content"){
        setContent(key[1]);
       }
       else if(key[0] == "time"){
        setTime(key[1]);
       }
       else if(key[0] == "isShow"){
        setIsshow(key[1]);
       }
       else if(key[0] == "noteid"){
        setNoteId(key[1]);
       }
        
      })
      
    }
   const Alldelete =(isdelete:boolean) =>{
    
    setIsreceive(false);
    setNoteList([]);
    setIsshow(false);
    setNotesize(0);

 }

 const saveType=(data:string)=>{

  console.log("data :" , data);
  setIsreceive(false);
  setSelectmsg(data);
    if(data == "받은 쪽지"){
      setNoteList([]);
      setSelectreceive(true);
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.get("http://localhost:8080/Pets-social/acccheck")
      .then(response =>{
         console.log("응답 결과 확인 " , response.data);
        if(response.status == 200){
          console.log("토큰 인증 성공");
          const id:string =param.userid! ;
          axios.get("http://localhost:8082/Pets-social/getSaveNote" , {params:{Id:id , Type:"receive"}})
          .then((response) =>{
           console.log("결과 :" , response);

           if(response.status == 200 && response.data.resultdata !==""){
             console.log("성공");
             const size:string[] = response.data.resultdata;
             setNotesize(size.length);
             setNoteList(response.data.resultdata);
             setIsreceive(true);
           }
           else if(response.status == 200 && response.data.resultdata == ""){
            console.log("데이터가 존재하지 않습니다");
            setIsreceive(false);
            setNoteList([]);
            setNotesize(0);
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

           }
      })
    }
    else{
      setNoteList([]);
      
      setSelectreceive(false);
      console.log("isreceive :" , isreceive , " ,data :" , noteList);
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      console.log("access : " , access_token);
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.get("http://localhost:8080/Pets-social/acccheck")
      .then(response =>{
        if(response.status == 200){
          console.log("토큰 인증 성공");
          const id:string =param.userid! ;
          axios.get("http://localhost:8082/Pets-social/getSaveNote" , {params:{Id:id , Type:"send"}})
          .then((response) =>{
           console.log("결과 :" , response);

           if(response.status == 200 && response.data.resultdata !==""){
             const size:string[] = response.data.resultdata;
             setNotesize(size.length);
             setNoteList(response.data.resultdata);
             setIsreceive(true);
           }
           else if(response.status == 200 && response.data.resultdata == ""){
            setIsreceive(false);
            setNoteList([]);
            setNotesize(0);
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

           }
      })
    }
 }

 const saveItemHandler =() =>{
  setNotesize(0);
  setNoteList([]);
  setIsshow(false);
  setIsreceive(false);
  let access_token:string="";
  access_token =localStorage.getItem("a_id")!;
  console.log("access : " , access_token);
  axios.defaults.headers.common['Authorization'] = access_token;
  axios.get("http://localhost:8080/Pets-social/acccheck")
  .then(response =>{
     console.log("응답 결과 확인 " , response.data);
    if(response.status == 200){
      console.log("토큰 인증 성공");
      const id:string =param.userid! ;
      axios.post("http://localhost:8082/Pets-social/saveNote" , {Id:id , Noteid:noteId , Type:message})
      .then((response) =>{
       if(response.status == 200 && response.data.resultdata !=="null"){

          const size:string[] = response.data.resultdata;
          setNotesize(size.length);
          setNoteList(response.data.resultdata);
          setIsreceive(true);
       }
       else if(response.status == 200 && response.data.resultdata == "null"){
        setIsreceive(false);
        setNoteList([]);
        setNotesize(0);
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

       }
  })
 }

 const BlockReceptHandler =() =>{

  let access_token:string="";
  access_token =localStorage.getItem("a_id")!;
  console.log("access : " , access_token);
  axios.defaults.headers.common['Authorization'] = access_token;
  axios.get("http://localhost:8080/Pets-social/acccheck")
  .then(response =>{
     console.log("응답 결과 확인 " , response.data);
    if(response.status == 200){
      console.log("토큰 인증 성공");
      const id:string =param.userid! ;
      axios.post("http://localhost:8080/Pets-social/blockrecept" , {FromUser:id ,Touser:user })
      .then((response) =>{

       console.log("쪽지 차단 :" , response);
       if(response.status ==200){
        setBlcomplete(true);
        setBlexist(false);
        setBlinsert(true);
       }

      }).catch((error) =>{
     if(axios.isAxiosError<ResponseDataType>(error)){
         console.log("error code: " , error.response?.status);

         if(error.response?.status == 409){
          setBlcomplete(true);
          setBlexist(true);
          setBlinsert(false);
          return;
         }
         
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

       }
  })

 }
 const Onclose =() =>{
  setBlcomplete(false);
}

const NoteBlock =() =>{
  console.log("차단 리스트");
  let access_token:string="";
  access_token =localStorage.getItem("a_id")!;
  console.log("access : " , access_token);
  axios.defaults.headers.common['Authorization'] = access_token;
  axios.get("http://localhost:8080/Pets-social/acccheck")
  .then(response =>{
     console.log("응답 결과 확인 " , response.data);
    if(response.status == 200){
      console.log("토큰 인증 성공");
      const id:string =param.userid! ;
      axios.get("http://localhost:8082/Pets-social/BlockList" , {params:{Id:id}})
      .then((response) =>{

       console.log("차단 리스트 :" , response);
       if(response.status ==200){
         if(response.data.resultdata !== ""){
          setBlockList(response.data.resultdata);
         }
         else{
          setBlockList([]);
         }

        setBlList(true);
       }

      }).catch((error) =>{
     if(axios.isAxiosError<ResponseDataType>(error)){
         console.log("error code: " , error.response?.status);

         
         if(error.code=="ERR_BAD_REQUEST"){
           navigate("/error");
           return;
         }
         if(error.code == "ERR_NETWORK"){
           console.log("네트워크 에러 ");
           return;
           
         }
         if(error.response?.status==500){
           console.log("서버 에러발생");
           navigate("/error/se-error");
           return;
         }
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

       }
  })
}

  const CloseList =() =>{
    setBlList(false);
  }
  const SelectDelete =(data:string) =>{
    console.log("선택 삭제 리스트 :" , data);
     if(deleteLists.length ==0){
      console.log("최초");
      let values:string[]=[...deleteLists];
      values.push(data);
      setDeleteLists(values);
     }
     else{
     console.log("선별");
     deleteLists.map((values) =>{
      if(data == values){
        console.log("중복");
        const Filter:string[]= deleteLists.filter((value) =>{
          return value !== data;
        })
        setDeleteLists(Filter);
      }
      else{
        console.log("추가");      
        let values:string[]=[...deleteLists];
        values.push(data);
        setDeleteLists(values);
      }
     })
     }

  }

  const OnDataHandler =(data:string[]) =>{
    if(data.length == 0){
      setNoteList([]);
      setIsreceive(false);
    }
    else{
      setNoteList([]);
      setIsreceive(false);
      setIsreceive(true);
      setNoteList(data);
    }
  }

  const LoadingHandler =() =>{
    setIsLoading(true);
  }
  const SnedNoteHandler =() =>{
    setIsnote(true);
  }
  const Notecompete =() =>{
   setIsnote(false);
   }

   const OnBlock =(data:string[]) =>{
    console.log("data :" , data);
    setIsnote(false);
    
   }
   const close =() =>{
    setIsnote(false);
   }

   const Searchhandler=(e:React.ChangeEvent<HTMLInputElement>) =>{
      setContens(e.target.value);
   }
   const keboardHnalder =(e:React.KeyboardEvent<HTMLInputElement>) =>{
    console.log("키보드 :" , e.key);
    if(e.key=="Enter"){
      let access_token:string="";
      access_token =localStorage.getItem("a_id")!;
      console.log("access : " , access_token);
      axios.defaults.headers.common['Authorization'] = access_token;
      axios.get("http://localhost:8080/Pets-social/acccheck")
      .then(response =>{
         console.log("응답 결과 확인 " , response.data);
        if(response.status == 200){
          console.log("토큰 인증 성공");
          const id:string =param.userid! ;
          axios.get("http://localhost:8088/Pets-social/Note/contents" , {params:{Contents:contents}})
          .then((response) =>{
    
           console.log("검색 결과 :" , response);

    
          }).catch((error) =>{
         if(axios.isAxiosError<ResponseDataType>(error)){
             console.log("error code: " , error.response?.status);
    
             
             if(error.code=="ERR_BAD_REQUEST"){
               navigate("/error");
               return;
             }
             if(error.code == "ERR_NETWORK"){
               console.log("네트워크 에러 ");
               return;
               
             }
             if(error.response?.status==500){
               console.log("서버 에러발생");
               navigate("/error/se-error");
               return;
             }
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
    
           }
      })
    }
   }

    return(<Fragment>
    {isnote && (<SendNote nickname={""} Profile={""} Onclose={close} Oncomplete={Notecompete} onBlock={OnBlock}/>)}
    {blList && (<BlockList Name={blockList} onClose={CloseList}/>)}
    {blcomplete && (<div className="NoteList_cpmodal">
      {blinsert &&(<>
        <h2>수신 차단이 완료되었습니다</h2>
        <p>수친 차단은 환경 변수로 수정가능합니다</p>
        </>)}
        {blexist && (<>
        <h2>이미 수신 차단 목록에 존재합니다</h2>
        </>)}
      <button onClick={Onclose}>확인</button>
    </div>)}
    <div className="NoteList_ListTag">
      <h3 onClick={receiveHandler}>받은 쪽지</h3>
      <h3 onClick={sendHandler}>보낸 쪽지</h3>
      <h3 onClick={saveHandler}>보관함</h3>
      <h3 onClick={spamHandler}>스팸함</h3>
      <h3 onClick={NoteBlock}>수신 차단 목록</h3>
      <h3 onClick={SnedNoteHandler}>쪽지 보내기</h3>
       <div className="NoteList_NoteSearch"> 
         <input type="text"  placeholder="검색...." onChange={Searchhandler} onKeyDown={keboardHnalder}/>
       </div>
    </div>
    <div className="NoteList_Line">
      <hr />
    </div>
    <Item tag={tag} name={message} size={notesize}  
    alldelete={Alldelete} saveNote={saveType} DeleteList={deleteLists} onData={OnDataHandler} onLoading={LoadingHandler}/>
    <div className="NoteList_vertical">
    <hr />
    </div>
    {isreceive && (<NoteItemList Item={noteList}
    showcontent={NoteHandler} Message={message} selectmsg={selectmsg} OnDeleteList={SelectDelete} loading={isLoading}/>)}
    {isshow && (<div className="NoteList_Mainshow"ref={noteref} id={noteId} >
      <div className="NoteList_ver">
       <hr />
      </div>
      <h3>보낸 사람</h3>
      <div className="NoteList_userinfo" >
       <img src={img}/>
       <h4>{user}</h4>
       <p>{time}</p>
       {tag.receive && (<>
        <button onClick={saveItemHandler}>보관</button>
        <button onClick={BlockReceptHandler}>수신차단</button>
        <button>스팸</button>
        </>)}
        {tag.send && (<>
        <button onClick={saveItemHandler}>보관</button>
        </>)}
        {tag.save && (<>
        {selectreceive && (<>
          <button>수신차단</button>
          <button>스팸</button>
        </>)}
        </>)}
    </div>
    <div className="NoteList_infoline">
      <hr />
    </div>
    <div className="NoteList_content">
       <p>{content}</p>
    </div>
    </div>)}
        </Fragment>)

}

export default NoteList;