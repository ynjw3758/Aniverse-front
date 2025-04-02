import axios from "axios";
import { useCallback, useEffect, useState  ,useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./MainProfile.scss";
import Filelist from "./Filelist";
import user_info from "../Userdata/Userdata";
import Private from "./Private";


interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }

const MainProfile =() =>{
    const[profile, setProfile]=useState<string>("");
    const[nickname ,setNickname]=useState<string>("");
    const[id ,setId]=useState<string>("");
    const[contentItem, setContentItem]=useState<string[]>([]);
    const[checkimg, setCheckmg]=useState<boolean>(false);
    const[imgtype, setImgtype]=useState<boolean>(false);
    const[person, setPerson] =useState<any>({
      isMypage:false,
      isOtherpage:false,
    });

    const [account, setAccount]=useState<any>({
      isPublic:false,
      isPrivate:false
    });

    const param=useParams();
    const navigate = useNavigate();
    const login_info = useContext(user_info);
    const ImageType = imgtype ? "jpgProfile" :"profile";


    useEffect(() =>{
      let access_token:string="";
      let id:any;
      id=localStorage.getItem("id");
      //const userid:string = login_info.UserId;
      3322793526
      const userid:string =param.userid! ;
      let UserId:string="";
      let kind:string="";
      console.log("유저 아이디 :" , userid  , "localstorage :" , id);
      
      if(userid != id){
        console.log("다른 사람 페이지");
        id=localStorage.getItem("id");
        UserId = userid; 
      }

      else{
        console.log("마이 페이지 " );
        kind="My";
      }
        
      console.log("type :" , person);
        access_token =localStorage.getItem("a_id")!;
        axios.defaults.headers.common['Authorization'] = access_token;
        axios.get("http://localhost:8080/Pets-social/SearchProfile" , {params:{Id:id , type:kind , Userid:UserId}})
        .then((response) =>{
            console.log("응답 결과 :" , response.data.resultdata);


            if(response.data.resultdata.profile_img == "null"){
                console.log("프로파일 없음");
                setProfile("/image/baseimg.png");
            }
            else{
              const Profile:string = response.data.resultdata.profile_img;
              const index:number = Profile.lastIndexOf(".");
              const type:string=Profile.substring(index+1, Profile.length);
              if(type =="jpg"){
                setImgtype(true);
              }else{
                setImgtype(false);
              }
              setProfile(response.data.resultdata.profile_img);
              
            }
            if(response.data.resultdata.private_check == "true"){
              console.log("비공개 계정 :" );
              setAccount({isPrivate:true});
              
            }
            else{
              setAccount({isPublic:true});
              setContentItem(response.data.resultdata.content_info);
            }
            
            setNickname(response.data.resultdata.nickname);
            setId(response.data.resultdata.id);
            navigate(`/main/${param.userid}`);

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
      const test:number=0;
 
    return(<>
    <div className={ImageType}>
    <img src={profile}/>
     </div>
     <div className="Nickname">
        <h3>{`${nickname}(${id})`}</h3>
        {person.isMypage&& (<>
          <button>프로필 편집</button>
        </>) }
        {person.isOtherpage && (<>
        </>)}
     </div>
     <div className="content">
      <h3>게시물 {`${contentItem.length}`}</h3>
      <h3>팔로우 {`${test}`}</h3>
      <h3>팔로워 {`${test}`}</h3>
     </div>
     <div className="Hor">
      <hr />
     </div>

    {account.isPublic && (<>
      <div className="notreels">
      {checkimg &&(<>
        <button>게시물</button>
        <button>태그</button>
      </>)}
      </div>
      <div className="tag">
      {!checkimg && (<>
        <button>게시물</button>
        <button>릴즈</button>
        <button>태그</button>
      </>)}
      </div>
      <Filelist Item={contentItem} />
      </>)}
    {account.isPrivate && (<Private />)}
      
      
</>)
}





export default MainProfile;
