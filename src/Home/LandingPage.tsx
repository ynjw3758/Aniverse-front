import { Fragment,useEffect, useState } from "react";
//import Cleasses from"./MainHeader.module.scss";
import "./LandingPage.scss";
import moment from"moment";
import { Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LandingImg from "../assets/images/igulanding.png";
import Main from "./Main";


const LandingPage:React.FC =()=> {
    const[login , setLogin]=useState<boolean>(false);
    const[acctime, setAcctime]=useState<boolean>(false);
    const navigate = useNavigate();
    const cookies = new Cookies();


    let cookie_str:string="";
    let p_exp:string="";
    cookie_str = cookies.getAll();

    try{
    Object.entries(cookie_str).forEach((v) =>{
      console.log("쿠키값 전체:" , v);
      if(v[0]=="p_exp"){
        p_exp = v.at(1)!;
        console.log("만료 시간 체크 :" , p_exp);
        throw new Error("stop loop");
      }
   });
  }catch(e){
      console.log("최초 사이트 접속");
  }

  useEffect(() =>{
    console.log("접속 체크 :");
    let exp_test:any="";
    exp_test=localStorage.getItem("p_exp");
    console.log("p_exp :" , exp_test);
    if(exp_test != "null"){
      setAcctime(true);
    }
    else return;
  },[])


    useEffect(() =>{
      if(acctime == true){
        let exp_test:any="";
        exp_test=localStorage.getItem("p_exp");
        console.log("p_exp :" , exp_test);
        
        let exp_number:number=0;
        exp_number =parseInt(exp_test);
        let date = new Date(exp_number*1000);
        let dates = moment(date).format('YYYY-MM-DD HH:mm');
        if(moment(dates).diff(moment() ) 
          > 0){
            
            console.log("시간 : " , moment(exp_test).diff(moment()));
            console.log("로그인 유지");
            setLogin(true);
      
      }
      else{
        console.log("로그인 유지 시간 만료");
        setLogin(false);
      }
      }
      else{
        console.log("최초 사이트 접근");
      }
  },[acctime]);

  const Sign=() =>{
      navigate("/Agree")
  }

  const Login =() =>{
     navigate("/login")
  }


    return(<Fragment>
        <div className="MainHeader">
        <div className="HeaderMain">  
          <img src={LandingImg} />
          <div className="Landing_Text">
            <p>모든 반려동물이 모이는 공간<br />
            <span className="BrandName">Aniverse</span>
            </p>
            <div className="Landing_Button">
              {!login && (<>
                <button id="Landing_Sign" onClick={Sign}>회원가입</button>
                <button id="Landing_Login" onClick={Login}>로그인</button>
              </>)}
               
            </div>
          </div>
        </div>
       </div>
       <Main />
       </Fragment>
    )
}

export default LandingPage;