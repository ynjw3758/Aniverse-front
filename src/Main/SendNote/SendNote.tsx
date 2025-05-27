


//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type                        
import { Fragment ,useState , useEffect, useRef, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import user_info from "../../Context/Userdata";
 //#endregion

//                            +--------------------
//----------------------------+ 내부 라이브러리
//                            +--------------------
//#region type               
import "./SendNote.scss";
import Search from "./Search";
import Addimage from "../skips/Addimage";
 //#endregion


//                             +--------------------
//-----------------------------+   타입
//                             +--------------------
//#region type
type Note = {
    nickname:string,
    Profile:string,
    Onclose:() => void,
    Oncomplete:() => void,
    onBlock:(data:string[]) => void,
  }
 //#endregion

 //                            +--------------------
//-----------------------------+   에러 인터페이스
//                             +--------------------
//#region type
interface ResponseDataType {
    message: string;
    code: number;
    response:object,
    resultdata:string[]
  }
 //#endregion


const SendNote =(props:Note) =>{
  //              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
    const[sendList, setSendList]=useState<string[]>([]);
    const[addprofile, setAddprofile]=useState<string[]>([]);
    const [userinfo , setUserinfo]=useState<string[]>([]);
    const[search ,setSearch]=useState<string>("");
    const[keycheck, setKeycheck]=useState<boolean>(false);
    const[sendcheck, setSendcheck]=useState<boolean>(false);
    const[loading ,setLoading]=useState<boolean>(false);
    const[ sizecheck,setSizecheck] =useState<boolean>(false);
    const[addImage , setAddImage]=useState<boolean>(false);
    const[limitsize, setLimitsize]=useState<boolean>(false);
    const[fileerror, setFileerror]=useState<boolean>(false);
    const[isnick, setIsnick]=useState<boolean>(false);
    const[iskeyboard, setIskeyboard]=useState<boolean>(false);
    
    const[sendimage, setSendimage]=useState<string[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [filename, setFilename] = useState<string[]>([]);
    const[textArea , setTextArea]=useState<string>("");
    const[vercount, setVercount]=useState<number>(0);
//#endregion    

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
    const sendRef = useRef<HTMLDivElement>(null);
    const Timeout = 700;
    const navigate = useNavigate();
    const max_size=1024*1024*8; // 8MB이상 업로드 금지
    const restruct = addImage ? "AddPicture" : "AddImg";
    const profile = useContext(user_info);
    const file_size = useRef(0);
    let Input_Search = useRef<string |null>(null);
    let keyboard_valid= useRef<boolean | null | undefined >(false);
//#endregion

    useEffect(() =>{
        if(props.nickname!=="" && props.Profile !==""){
          setIsnick(true);
        const Nickname_List:string[] = [...sendList];
        const add_pro:string[] =[...addprofile];
        const data:string = props.nickname;
        Nickname_List.push(data);
        add_pro.push(props.Profile);
        setAddprofile(add_pro);
        setSendList(Nickname_List);
        }
        else{
          const Nickname_List:string[] = [...sendList];
          const add_pro:string[] =[...addprofile];
          const data:string = props.nickname;
          Nickname_List.push("알수 없는 사용자");
          add_pro.push("/image/baseimg.png");
          setAddprofile(add_pro);
          setSendList(Nickname_List);
        }
    },[props.nickname, props.Profile])


    const CancelHandler =() =>{
     props.Onclose();
    }
    useEffect(() =>{
      if(search == "" && keyboard_valid.current ===false) return;
      else if(search =="" && Input_Search.current?.length ===1 && 
        keyboard_valid.current ===true
      ){
        setUserinfo([]);
        setIskeyboard(false);
        
      }
      keyboard_valid.current= false;
      },[search])


    const SendPerson =(event:React.ChangeEvent<HTMLInputElement>) =>{
      Input_Search.current = search;
      setSearch(event.target.value);
    }
    
    const ListDelete =() =>{
        const delete_list:string = sendRef.current?.innerText!;
        const list:string[] = sendList.filter((data) =>{
            return data !==delete_list 
        });
        setSendList(list);
        
    }

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
      console.log("실제로 검색되는 문자 :" , search);
      if(sendcheck == true ){
        let access_token:string="";
        access_token =localStorage.getItem("a_id")!;
        console.log("access : " , access_token);
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/acccheck")
        .then(response =>{
           console.log("응답 결과 확인 " , response.data);
          if(response.status == 200){
            console.log("토큰 인증 성공");
            axios.get("http://localhost:8088/Pets-social/Search/Person" , {params:{Word:search}})
            .then((response) =>{
              console.log("아니 ㅅㅂ :" , response );
      
               if(response.status == 200 && response.data.length !==0){
                 setUserinfo(response.data);
                 setLoading(true);
                 setVercount(0);
               }
               else if(response.status == 200 && response.data.length ==0){
                 setUserinfo([]);
                 setVercount(0);
                 setLoading(true);
               }
                 
      
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
          }
        }).catch((error) =>{
           if(axios.isAxiosError<ResponseDataType>(error)){
               console.log("error code: " , error.response?.status);
               
               if(error.code=="ERR_BAD_REQUEST"){
                 navigate("/error");
               }
               else if(error.response?.status==401){
                   console.log("승인되지 않은 로그인");
               }
               else if(error.response?.status==500){
                 console.log("서버 에러발생");
                 navigate("/error/se-error")
               }
               
               console.log("error response: " , error.response?.data);
             }
        })

     
    }
    else return;
    
    },[sendcheck])



    //키보드 땟을 때 이벤트
    const KeyupHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
      setKeycheck(false);
    }
    //키보드 눌럿을 때 이벤트
    const KeyDOWNHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
      keyboard_valid.current = true;
      setKeycheck(true);
      setIskeyboard(true);
      /*
        setKeycheck(true);
        console.log("키 이벤트  :" , event);
        if(userinfo.length ==0){
          if(event.key == "ArrowDown" || event.key == "ArrowUp"){
            console.log("적용 불가");
            return;
          }
        }
        else{
          if(event.key == "ArrowDown"){
            profile.addcount(vercount+1);
            setVercount(vercount+1);
            
          }
          else if(event.key == "ArrowUp"){
            profile.addcount(vercount-1);
            setVercount(vercount-1);
          }
          else if(event.key != "ArrowUp" && event.key != "ArrowDown"){
             console.log("문자 추가");
             //setSearch(event.target.value);
          }
          
        }
*/
    }
    const AddHandler =(data:string, profile:string) =>{
     const isValue:boolean = sendList.includes(data);
     if(isValue == false){
      let addNickname:string[]=[...sendList];
      let addpro_list:string[]=[...addprofile];
      addNickname.push(data);
      addpro_list.push(profile);
      setSendList(addNickname);
      setAddprofile(addpro_list);
      setSearch("");
      setLoading(false);
      setKeycheck(false);
      setUserinfo([]);
     }
     else{
      const list:string[] = sendList.filter((remove) =>{
        return remove !==data 
      });
      const pro_list:string[]=addprofile.filter((remove) =>{
        return remove!=profile;
      })
      setSendList(list);
      setAddprofile(pro_list);
      setSearch("");
      setLoading(false);
      setKeycheck(false);
      setUserinfo([]);
     }
    }

  const addImageHandler =(event: React.ChangeEvent<HTMLInputElement>) =>{
    const array :any=event.target.files;
    console.log("array :" , array.length);
    let total_size:number=0;
    let send_list:string[]=[...sendimage];
    let file_list:string[]=[...preview];
    let file_name:string[]=[...filename];
    file_size.current = file_size.current+1;
    if(file_size.current > 3){
      file_size.current=3;
      setFileerror(true);
      return;
    }
    if(array.length > 3 ){
      console.log("초과");
      setLimitsize(true);
    }
    else{
      for(let count =0; count<array.length;count++){
        setLimitsize(false);
        if (array[count] !== null) {
          const file = array[count];
          send_list.push(file);
          setSendimage(send_list);
          total_size+=file.size;
          file_name.push(file.name);
          setFilename(file_name);
          if(total_size < max_size){
            const currentimg = URL.createObjectURL(file);
            console.log("url :" , currentimg);
            file_list.push(currentimg);
            setPreview(file_list);
          }
          else{
               setSizecheck(true);
          }

        }
      }
      setAddImage(true);
    }

  }

  const errorModal =() =>{
    setFileerror(false);
  }
  
  const textHandler =(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setTextArea(e.target.value);
    console.log("넓이 :" , window.innerWidth);
  }
  const SendNoteHnadler =() =>{
    
    let access_token:string="";
     access_token =localStorage.getItem("a_id")!;
     axios.defaults.headers.common['Authorization'] = access_token;
     axios.get("http://localhost:8080/Pets-social/acccheck")
     .then(response =>{
       if(response.status == 200){
         const senduser:string =profile.UserNickName;
         const receiveuser:string[] =sendList;
         const Profile:string = profile.Profile;
         axios.post("http://localhost:8082/Pets-social/Note/SendNote" , {params :{SendUser:senduser , 
          ReceiveUser:receiveuser ,ReceiveImg:addprofile , Profile:Profile, Contents:textArea}})
         .then((response) =>{

          if(response.status == 200){
            console.log("성공");
            props.Oncomplete();
          }
          else if(response.status == 206){
            console.log("쪽지 보내기 일부만 성공");
            props.onBlock(response.data.resultdata);
          }

         }).catch((error) =>{
        if(axios.isAxiosError<ResponseDataType>(error)){
             console.log("error :" , error.response?.data.resultdata);
            if(error.response?.status == 404){
              console.log("Not Found");
              props.onBlock(error.response.data.resultdata);
              return;
            }
            
            if(error.response?.status ==400){
              navigate("/error/BadRequest");
              return;
            }

            else if(error.response?.status==500){
              console.log("서버 에러발생");
              navigate("/error/se-error");
              return;
            }
            else if(error.response?.status==403){
              console.log("인가 문제?");
              navigate("/error/NoAccess");
            }
            else if(error.response?.status==502){
              console.log("gateway 에러 발생");
              navigate("/error/Gateway");
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

           else if(error.response?.status==401){
                console.log("승인되지 않은 로그인");
            }
            else if(error.response?.status==500){
              console.log("서버 에러발생");
              navigate("/error/se-error")
            }
            else if(error.response?.status==403){
              console.log("cors 문제제");
              navigate("/error/NoAccess");
            }
            else if(error.response?.status==502){
              console.log("gateway 에러 발생");
              navigate("/error/Gateway");
              return;
            }
            
            console.log("error response: " , error.response?.data);
          }
     })
  }

  const textAra = loading ? "SendNote_sentents_active" :"SendNote_sentents";
    return(<>
            <div className="MainBackDrop" onClick={CancelHandler}>
              <div className="SendNote_Main" onClick={(e) => e.stopPropagation()}>
                {fileerror && (<div className="error">
                 <p>최대 3개 이미지 가능합니다.</p>
                 <button onClick={errorModal}>확인</button>
                </div>)}
                <div className="Content">
                <label  
            draggable="true"
            className="picture"
            >
           <input type="file" 
           style={{display:"none"}}
           multiple={true}
           maxLength={3}
           accept=".jpg, .jpeg, .png"
           onChange={addImageHandler}
            />
           <p>이미지 첨부</p>
          </label>
                  <h4>쪽지 보내기</h4>
                  <button onClick={SendNoteHnadler}>보내기</button>
               </div>
               <div className="SendNote_vertical">
                 <hr />
                </div>
               <div className="SendNote_sendlist">
                 <p>받는 사람 :</p>
                 <div className="SendNote_addList">
                  {isnick && (<>
                    {sendList.map((data) =>(<div className="aaa" id={data} ref={sendRef}>
                     <p>{data}</p>
                     <img src="/image/delete.png" onClick={ListDelete}/>   
                    </div>))}
                  </>)}
                    <div className="SendNote_search">
                 <input type="text" onChange={SendPerson} placeholder="검색..." 
                 onKeyUp={KeyupHandler} onKeyDown={KeyDOWNHandler} value={search}/>
                 </div>
                 </div>
               </div>
               <div className="SendNote_vertical">
                < hr />
               </div>
               {loading && (<div className="SendNote_PersonList" >                
                  <Search List={userinfo} addName={AddHandler} Count={vercount}/>
               </div>)}
               <div className={restruct}>
               {limitsize && (<div className="SendNote_impossible">
                <p>최대 3개 이미지 가능합니다</p>
                </div>)}
                {sizecheck && (<div className="SendNote_impossible">
                  <p>용량을 초과하였습니다</p>
                </div>)}
                {(limitsize == false && sizecheck == false) && (<div className="SendNote_imagelist">
                 {filename.map((data, i) =>(<>
                 <Addimage name={data} image={preview[i]}/>
                 </>))}
                </div>)}
                <p>{file_size.current} / 3 (0 / 8MB)</p>
               </div>
               <div className={textAra}>
                <textarea placeholder="쪽지를 보내보세요" onChange={textHandler}/>
               </div>
         </div>
    </div>
    
    </>)
}

export default SendNote;