//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type    
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate , useParams } from "react-router-dom";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type  
import "./NoteItem.scss";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type Item={
    User:string,
    image:string,
    content:string,
    time:string,
    allcheck:boolean,
    noteid:string,
    state:string,
    message:string,
    readtime:string,
    Read:string[],
    onShow:(info:Object) => void,
    ondelete:(data:string) => void
 }
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

const NoteItem =(props:Item) =>{

    const[colorchanges, setColorchanges]=useState<boolean>(false);
    const[showtitle ,setShowtitle]=useState<string>("");
    const[checked, setChecked]=useState<boolean>(false);
    const[readtime, setReadtime]=useState<string>("");
    const[writetime ,setWritetime]=useState<string>("");
    const[noteid, setNoteid]=useState<string>("");
    const[image, setImage]=useState<string>("");
    const[user, setUser]=useState<string>("");

    

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
    const navigate = useNavigate();
    const param=useParams();
    const Divref =useRef<HTMLDivElement>(null);
    const colorChange = colorchanges? "NoteItem_change" : "NoteItem_MainItem";
//#endregion


useEffect(() =>{
  if(props.allcheck == true){
    setChecked(true);
  }
  else{
    setChecked(false);
  }
},[props.allcheck]);

  useEffect(() =>{
    
    if(props.state == 'N'){
      console.log("이미지 :" , props.image);
      if(props.content.length > 8){
        const substring:string = props.content.slice(0,6)+"...";
        setShowtitle(substring);
    }
    else{
        setShowtitle(props.content);
    }
        setColorchanges(false);
        setUser(props.User);
        setImage(props.image);
        setWritetime(props.time);
        setNoteid(props.noteid);
    }
    else if(props.state == 'R'){
        setColorchanges(true);
        props.Read.map((data) =>{
          Object.entries(data).map((key) =>{
            if(key.at(0) == "noteid"){
              setNoteid(key[1]);

          }
          else if(key.at(0) == "content"){
            if(key[1].length > 8){
              const substring:string = props.content.slice(0,6)+"...";
              setShowtitle(substring);
          }
          else{
              setShowtitle(props.content);
          }
          }
          else if(key.at(0) == "writetime"){
            setWritetime(key[1]);

          }
          else if(key.at(0) == "img"){
              if(key.at(1) == "N"){
                  setImage("/image/baseimg.png");
              }
              else{
                 setImage(key[1]);
              }
              
              

          }
          else if(key.at(0) == "user"){
            setUser(key[1]);
          }

          else if(key.at(0) == "readtime"){
              
            setReadtime(key[1]);
          }
          })
        })

        
    }
      setChecked(props.allcheck);

    
    

  },[props.content,  props.allcheck]);

    const showcontent =() =>{

        const content_data:Object ={img:props.image , user:props.User , content:props.content , time:props.time , isShow:true, noteid:Divref.current?.id!} 
        props.onShow(content_data);
        if(colorchanges == false && props.message =="receive"){
            
            let access_token:string="";
            access_token =localStorage.getItem("a_id")!;
            console.log("access : " , access_token);
            axios.defaults.headers.common['Authorization'] = access_token;
            axios.get("http://localhost:8080/Pets-social/acccheck")
                  .then((response) =>{
                    if(response.status == 200){
                        console.log("토큰 인증 성공");
                        const id:string =param.userid! ;
                        const NoteId:string = Divref.current?.id!;
                        console.log("note :" , NoteId);
                        axios.post("http://localhost:8082/Pets-social/Note/readNote" , {Id:id , Noteid:NoteId , Type:props.message})
                        .then((response) =>{
                         console.log("결과 :" , response);
    
                         if(response.status == 200){
                           console.log("성공");
                           setColorchanges(true);
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
                        }
                        if(error.response?.status==500){
                          console.log("서버 에러발생");
                          navigate("/error/se-error")
                        }
                        
                        console.log("error response: " , error.response?.data);
                      }
                 })
        }
       
    }
       const checkedHandler =() =>{
    if(checked == false){
      setChecked(true);
      const id:string =param.userid! ;
      const noteinfo:string =props.noteid;
      props.ondelete(noteinfo);
    }
    else{
      setChecked(false);
      const id:string =param.userid! ;
      const noteinfo:string =props.noteid;
      props.ondelete(noteinfo);
    }
   }

    return(<>
            <div className="NoteItem_checkbox">
              <input type="checkbox" checked={checked} onChange={checkedHandler}/>
            </div>
       <div className={colorChange} onClick={showcontent} id={noteid} ref={Divref}>
        <img src={image}/>
        <p>{user}</p>
        <h4>{showtitle}</h4>
        <h3>{readtime}</h3>
        <h3>{writetime}</h3>
        
    </div>
    </>)

}
export default NoteItem;