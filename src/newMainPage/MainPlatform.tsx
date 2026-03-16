
import { useEffect , useState ,useContext} from "react";
import MainPageContents from "./MainContents/MainPageContents";
import "./MainPlatform.scss";
import MainSearch from "./Search/MainSearch";
import MainPlatformSide from "./Side/MainPlatformSide";
import { useNavigate  ,useParams} from "react-router-dom";
import user_info from "../Context/Userdata";
import {api , GATEWAY_URL} from "../API/Api";
import baseprofile from "../assets/images/baseimg.png";
import axios from "axios";
import Main from "src/Home/Main";

//                            +--------------------
//----------------------------+ 인터페이스
//                            +--------------------
//#region type 
interface ResponseDataType {
      message: string;
      code: number;
      errorcode:string;
      timestamp:String;
      
    }

interface CustomError{
  errorcode:string;
  message :string
}
//#endregion

//                            +--------------------
//----------------------------+ type
//                            +--------------------
//#region type
type Noti_Kind={
  Chat:ChatNoti[];
}

type ChatNoti={
  ChatId:string;
  IsRead:boolean;
  MessageId:string;
  RoomName:string;
  UserId:string;
  message:string;
  nickname:string;
  profile:string;
  sendId:string;
  timestamp:string;
  type:string;
  Count:number;
}
//#endregion


const MainPlatform:React.FC =() =>{

          const[NickName, setNickName]=useState<string>("");
          const[profile, setProfile]=useState<string>("");
          const[id, setId]=useState<string>("");
          const[dropdow, setDropdow]=useState<boolean>(false);
          const[dropblur, setDropblur]=useState<boolean>(false);
          const [content , setContent]=useState<string[]>([]);
          const[contentitem  ,setContentitem]=useState<boolean>(false);
          const[isloading ,setIsloading]=useState<boolean>(true);
          const[isready, setIsready]=useState<boolean>(true);
          const[againlogin, setAgainlogin]=useState<boolean>(false);
          const[isperist, setIsperist]=useState<boolean>(false);
          const[isAlarm , SetIsAlarm]=useState<boolean>(false);
          const[userid, setUserid]=useState<string>("");
          const[noti, setNoti]=useState<Noti_Kind>()
          const[modal , setModal]=useState<boolean>(false);
          const [dataloaded,setDataLoaded]= useState<boolean>(false);

          const navigate = useNavigate();
          const login_info = useContext(user_info);
          const param=useParams();



      useEffect(()=>{        
        setIsloading(true);

        let access_token:string="";
        let id:any;
        id=localStorage.getItem("id");
        
        if(param.userid != undefined) {
          setContentitem(false);
          navigate(`/main/${param.userid}`);
        }
        else{
          setIsready(true);
          //setIsready(false);
          //access_token =localStorage.getItem("a_id")!;
          
          //api.defaults.headers.common['Authorization'] = access_token;
          api.post(`${GATEWAY_URL}/gateway/api-proxy` ,{
              service: "common",
              endpoint: "main/refresh-main",
              method: "GET",
              body: {id:id}
          },{
              withCredentials: true
          }).then(response =>{
              console.log("메인 페이지 새로고침 :" , response.data)
                if(response.status == 200){
                setNoti(response.data.data.Noti);
                setContent(response.data.data.content_info);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);

                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
                else if(response.status == 201){
                setContent([]);
                setNickName(response.data.data.nickname);
                const progile:string=response.data.data.profile_img;
                if(progile =="null"){
                  setProfile(baseprofile);
                }
                else{
                  setProfile(response.data.data.profile_img);
                }
                login_info.addprofile(response.data.data.profile_img);
                login_info.addeNickName(response.data.data.nickname);
                setId(response.data.data.id);
                setContentitem(true);
                }
                setIsloading(false)
          }).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error.response);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/BadRequest");
                    }
                    else if(error.response?.status==401){
                           if(error.response.data.errorcode){

                           }
                    }
                    else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        setIsloading(false);
                    }
                    else if(error.response?.status==500){
                        //navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                        navigate("/error/Gateway");
                    }
              }
          })
        }

      },[]);

    return(<div className="MainPage_Main">
        <aside>
          <MainPlatformSide />
        </aside>
        <main className="MainPage_MainContents">
        <header>
            <MainSearch />
        </header>
        <section >
            {isloading && (<>
              <div className="LoadingContainer">
                <div className="LoadingSpinner"></div>
              </div>
            </>)}
            {!isloading && (<>
            <MainPageContents />
            </>)}
        </section>
        </main>
        
    </div>)
}

export default MainPlatform;