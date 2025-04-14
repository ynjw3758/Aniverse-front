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

    //                            +--------------------
    //-----------------------------+   props 인터페이스
    //                             +--------------------
    //#region type
    interface TagInfo{
    AddTag:(data: object) => void
  }
    const SearchTagPeople =(props:TagInfo) =>{
    const[keycheck, setKeycheck]=useState<boolean>(false);
    const[sendcheck, setSendcheck]=useState<boolean>(false);
    const[isSearch, setIsSearch]=useState<boolean>(false);
    const[search, setSearch]=useState<string>("");
    const[userinfo ,setUserinfo]=useState<object[]>([]);
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
    setIsSearch(false);
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
      if(search == "" && keyboard_valid.current ===false) return;
      else if(search =="" && Input_Search.current?.length ===1 && 
        keyboard_valid.current ===true
      ){
        setIsSearch(false);
        setUserinfo([]);
        setIskeyboard(false);
        
      }
      keyboard_valid.current= false;
      },[search])

    //키보드 땟을 때 이벤트
    const KeyupHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
      setKeycheck(false);
    }
    //키보드 눌럿을 때 이벤트
    const KeyDOWNHandler =(event:React.KeyboardEvent<HTMLInputElement>) =>{
        keyboard_valid.current = true;
        setKeycheck(true);
        setIskeyboard(true);
    }
    const InputChange =(event:React.ChangeEvent<HTMLInputElement>) =>{

      Input_Search.current = search;
      setSearch(event.target.value);
    }


    const AddHandler =(data:object) =>{
      console.log("태그 추가 정보 :" ,data);
      props.AddTag(data);
    }

    return(<div className="AddTagPeople_Stand">
    <input placeholder="검색" onChange={InputChange} 
    value={search}
    onKeyUp={KeyupHandler} onKeyDown={KeyDOWNHandler}/>
    {isloading && (<div className="Tag_Loding">
        <Oval 
            color="#ff0000" 
            height={20} 
            width={20}
          />
      </div>)}
    {isSearch && ( <div className="SearchTag_Stand">
      <SearchTagItem List={userinfo} addTaginfo={AddHandler} />
    </div>)}




    </div>)

    }

    export default SearchTagPeople;