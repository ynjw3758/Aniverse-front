//                            +--------------------
//----------------------------+ 외부 라이브로리
//                            +--------------------
//#region type                        
import { Fragment ,useState , useEffect, useRef, useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Oval} from "react-loader-spinner";
import user_info from "../../Userdata/Userdata";
 //#endregion

//                            +--------------------
//----------------------------+ 내부 라이브러리
//                            +--------------------
//#region type     
import "./SearchTagPeople.scss";
import TagList from "./TagList";
import SearchTagItem from "./SearchTagItem";
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
const SearchTagPeople =() =>{
    const[keycheck, setKeycheck]=useState<boolean>(false);
    const[sendcheck, setSendcheck]=useState<boolean>(false);
    const[isSearch, setIsSearch]=useState<boolean>(false);
    const[search, setSearch]=useState<string>("");
    const[userinfo ,setUserinfo]=useState<object[]>([]);
    const[listActive, setListActive]=useState<boolean>(false);
    const[showdata, setShowdata]=useState<boolean>(false);
    const[isloading, setIsloading]=useState<boolean>(false);
    const[iskeyboard, setIskeyboard]=useState<boolean>(false);

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const Timeout = 700;
const navigate = useNavigate();
let Input_Search = useRef<string |null>(null);
let keyboard_valid= useRef<boolean | null | undefined >(false);
//#endregion

    //입력 후 700ms동안 이벤트 발생하는지 않는지 체크키
    useEffect(() =>{
            if(keycheck == false && search !== "" && userinfo.length ==0 ){
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
        setIsloading(true);
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
      
               if(response.status == 200 && response.data.length !==0){
                 setUserinfo(response.data);
               }
               else if(response.status == 200 && response.data.length ==0){
                 setUserinfo([]);
               }
               setIsloading(false);
               setIsSearch(true);
               keyboard_valid.current =false;
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
    

   useEffect(() =>{
    console.log("입력 후 일로와라");
    console.log("백스페이스 누른거 유무 :", keyboard_valid.current);
    console.log("search : " ,search);
    console.log("Input_Search.current : " ,Input_Search.current);
    if(Input_Search.current == search && Input_Search.current !== "" &&  
      keyboard_valid.current == false) return; 

    else if(Input_Search.current == search && Input_Search.current == "" &&  
      keyboard_valid.current == true){
      console.log("제발 ")
      setIsSearch(false);
      setUserinfo([]);
      setIskeyboard(false);
    }
    else if(Input_Search.current !== search){
      console.log("입력값이 변경됐다.")
    }
    keyboard_valid.current= false;
   },[search])

    const InputChange =(event:React.ChangeEvent<HTMLInputElement>) =>{

        setSearch(event.target.value);
        Input_Search.current = event.target.value;

    }

        //키보드 땟을 때 이벤트
        const KeyupHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
            setKeycheck(false);
          }
          //키보드 눌럿을 때 이벤트
          const KeyDOWNHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
              setKeycheck(true);
              if (event.key == "Backspace") {
                keyboard_valid.current = true;
                setIskeyboard(true);

              }
          }
          const AddHandler =(data:string, profile:string) =>{
          }
         const [isComposing, setIsComposing]=useState<boolean>(false);
         /*
                 onCompositionStart={() =>  setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        */
    return(<div className="AddTagPeople_Stand">
        <input placeholder="검색" onChange={InputChange} 
        value={search}
        onKeyUp={KeyupHandler} onKeyDown={KeyDOWNHandler}
/>
        {isloading && (<div className="Tag_Loding">
              <Oval 
                  color="#ff0000" 
                  height={20} 
                  width={20}
               />
            </div>)}
        {isSearch && ( <div className="SearchTag_Stand">
            <SearchTagItem List={userinfo} addName={AddHandler} />
        </div>)}




    </div>)

}

export default SearchTagPeople;