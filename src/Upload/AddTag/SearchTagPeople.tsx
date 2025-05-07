    //                            +--------------------
    //----------------------------+ 외부 라이브로리
    //                            +--------------------
    //#region type                        
    import { Fragment ,useState , useEffect, useRef, useContext} from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";
    import {Oval} from "react-loader-spinner";
    import user_info from "../../Context/Userdata";
    import {Cookies} from 'react-cookie';
    //#endregion

    //                            +--------------------
    //----------------------------+ 내부 라이브러리
    //                            +--------------------
    //#region type     
    import "./SearchTagPeople.scss";
    import SearchTagItem from "./SearchTagItem";
    import LoginExp from "src/LginExpiration/LoginExp";
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
    //-----------------------------+   토큰 갱신신 인터페이스
    //                             +--------------------
    //#region type
    interface tokenRenewal {
      message: string;
      code: number;
      data:string
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
    const[againlogin, setAgainlogin]=useState<boolean>(false);
    const[userid, setUserid]=useState<string>("");
    const[isfirst, setIsfirst]=useState<boolean>(false);

    //              +-----------------
    //--------------+ 전역 변수
    //              +-----------------
    //#region type
    const Timeout = 700;
    const navigate = useNavigate();
    let Input_Search = useRef<string |null>(null);
    let keyboard_valid= useRef<boolean | null | undefined >(false);
    const cookies = new Cookies();
    let refresh_token:string =""
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
            Object.entries(error.response?.data).map(key =>{
              if(key.at(0) == "errorcode"){
                if(key.at(1) == "00"){
                  navigate("/error/auth/");
                  return;
                }
                
                else if(key.at(1) == "01"){
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
                                    setAgainlogin(true);

     
                                }
                                else if(error.response?.status==301){
                                    console.log("기존 아이디 존재");
                                    setIsfirst(true);
                                    setUserid(error.response?.data.data);
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