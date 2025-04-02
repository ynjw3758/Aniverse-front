import { Fragment, useContext, useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import Header from "../Layout/Header"
//import Cleasses from"./MainHeader.module.scss";
import "./MainHeader.scss";
import moment from "momnet";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const MainHeader:React.FC =()=> {
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

    /*
    let exp:string="";
     let test:string =""; 
     test = localStorage.key(0)!;
     let test2:string =""; 
     test2 = localStorage.key(1)!;

    if(test==null && test2 == null){
      console.log("페이지 최초 접속");
    }
    else{
        exp=localStorage.getItem("exp")!.toString();
        useEffect(() =>{
            if(moment(exp).diff(moment()) > 0){
                
                console.log("시간 : " , moment(exp).diff(moment()));
                console.log("로그인 유지");
                setLogin(true);
          
          }
          else{
            console.log("로그인 유지 시간 만료");
            setLogin(false);
          }
        },[exp]);
    }
    */
   
  /*
    let exp:any="";
    exp=localStorage.getItem("exp");
    console.log("만료 시간 :" , exp);
    let date = new Date(exp*1000);
    console.log("변환 날짜 :" + date);
    let dates = moment(date).format('YYYY-MM-DD HH:mm');
    console.log("date : " + dates);
  useEffect(()=>{
        if(moment(dates).diff(moment()) > 0){
            
              console.log("시간 : " , moment(exp).diff(moment()));
              console.log("로그인 유지");
              setLogin(true);
        }
        else{
          console.log("로그인 유지 시간 만료");
        }

  },[dates]);
*/

/*
        <header className={Cleasses.Main}>         
       <Header />
</header>
*/

    return(
        <div className="MainHeader">
        <div className="HeaderMain">         
          <Header />
       {!login && <Navigation />}
       {login && <div>
        <nav className="nav">
        <ul>
        <li><Link to="/main"
            style={{
                textDecoration: 'none'
            }}
            className="home">홈 이동</Link>
            </li>
            </ul>
            </nav>
        </div>}
        </div>
       <Outlet />
       </div>
       
    )
}

export default MainHeader;