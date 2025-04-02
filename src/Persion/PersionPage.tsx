import "./PersionPage.scss";
import { Outlet, useNavigate ,Link} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import user_info from "../Userdata/Userdata";
import HiBellIcon from "../Layout/HibellIcon";
import MyPage from "../Layout/MyPage";
import moment from "momnet";
import {Cookies} from 'react-cookie';
import axios from "axios";

interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }


const PersionPage =() =>{
    const[NickName, setNickName]=useState<string>("");
    const[profile, setProfile]=useState<string>("");
    const[dropdow, setDropdow]=useState<boolean>(false);
    const[dropblur, setDropblur]=useState<boolean>(false);
    const[ref, setRef]=useState<number>(0);
    const navigate = useNavigate();
    const login_info = useContext(user_info);
    const cookies = new Cookies();
    

    let uuid:any="";
    let p_exp:any="";
    let sessionid:any="";
  useEffect(()=>{
        p_exp=localStorage.getItem("p_exp");
        uuid = localStorage.getItem("page_uuid");
        sessionid = localStorage.getItem("a_id");
        console.log("만료 시간 :" , p_exp);
        let date = new Date(p_exp*1000);
        console.log("변환 날짜 :" + date);
        let dates = moment(date).format('YYYY-MM-DD HH:mm');
        console.log("date : " + dates);
        cookies.set("p_exp" , p_exp);
        cookies.set("uuid" , uuid);
        cookies.set("Sessionid" , sessionid);

        setNickName(login_info.UserNickName);
        setProfile(login_info.Profile);

        console.log("상태 값 확인 : ", NickName);
        if(moment(dates).diff(moment()) > 0){

              console.log("시간 : " , moment(dates).diff(moment()));
              console.log("로그인 ");
              setNickName(login_info.UserNickName);
              let access_token:string="";
              access_token =cookies.get("Sessionid");
              let id:any;
              id=localStorage.getItem("s_id");
              console.log("access : " , access_token);
              axios.defaults.headers.common['Authorization'] = access_token;
              axios.get("http://localhost:8080/Pets-social/refresh-main" , {params:{Id:id}})
              .then(response =>{
                 console.log("응답 결과 확인 ");
                  console.log("status : " , response.status);
                  console.log("data : " , response.data.resultdata.profile_img);

                  setNickName(response.data.resultdata.nickname);
                  setProfile(response.data.resultdata.profile_img);
                  
                  navigate("/main/person");
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
                          }
                          
                          console.log("error response: " , error.response?.data);
                        }
          })
                
        }
        else{
          console.log("로그인 유지 시간 만료");
          setNickName("");
          setProfile("");
          navigate("/login");

        }

  },[p_exp]);

    const DropDown =(data:boolean) =>{
        console.log("드롭다운");
        setDropdow(data);
        console.log("boolean:", dropdow);
       }
 
       const Dropref =(count:number) =>{
         console.log("드롭다운 카운트");
         setRef(count);
       }
       const Dropblur = (check:boolean) =>{
         console.log("드롭다운 blur : " , check);
         setDropblur(check);
       }

    return(<>
        <div className="log">
        <Link to = "/main" 
            style={{ textDecoration: 'none'  , 
                   color:"black",
                    fontSize:"xx-large"}}>
                    <div className="log">
                       <img src="/image/log_test.jpg" alt="애완멀" ></img>
                    </div>
                </Link>
        </div>
         <div className="nav">
          <HiBellIcon />
          <MyPage img={profile}
                  Dropdow={DropDown} 
                  DropRef={Dropref}
                  DropBlur={Dropblur}/>
         </div>
         <div className="MainHeader">
         <h2>마이 페이지</h2>
         </div> 
         <Outlet />   
         </> )
}

export default PersionPage;