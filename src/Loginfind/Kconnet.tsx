import { Fragment, useContext } from "react";
import "./Kconnet.scss";
import user_info from "../Userdata/Userdata";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ResponseDataType {
    message: string;
    code: number;
    response:object;
  }

  interface ResponseDataTypetest {
    resultcode:number;
    resultdata:any;
    resultmsg:string;

  }

const link =() =>{
    const navigate = useNavigate();
    const login_info = useContext(user_info);
    console.log("id :" ,login_info.UserId , ", email :" , login_info.email ," , 날짜 :" , login_info.date );
    const originbuttonHandler =() =>{
        navigate("/login");
    }
    const create_kakaohandler =() =>{
        console.log("카카오 계정 생성");
        axios.post("http://localhost:8080/Pets-social/oauth/create" , {kakao_info:login_info.kakao_info}).then(response =>{
            console.log("response :" , response.data.resultdata);
            localStorage.setItem("a_id" , response.headers.authorization);
            localStorage.setItem("p_exp" , response.data.resultdata.exp);
            localStorage.setItem("id" , response.data.resultdata.id);

            navigate("/main");
            return ;

        }).catch(error =>{
            if(axios.isAxiosError<ResponseDataTypetest>(error)){
                console.log("error code: " , error.response?.data.resultcode);

                if(error.code=="ERR_BAD_REQUEST"){
                  navigate("/error");
                }
                if(error.code == "ERR_NETWORK"){
                  console.log("네트워크 에러 ");
                  
                }
                if(error.response?.status==401){
                    console.log("승인되지 않은 로그인");
                    navigate("/error/auth/");
                }

                
                console.log("error response: " , error.response);
              }
        })

    } 

    return(<Fragment>
        <div className="id">
        <p>{login_info.email}로 가입된 아이디가 존재합니다. 연동하시겠습니까?</p>
          <div className="list">
            <p>{login_info.UserId} (가입일자 : {login_info.date})</p>
          </div>
        </div>
        <div className="btn">
          <button type="button">선택한 아이디로 카카오 연동</button>
        </div>
        <div className="line">
            <hr />
        </div>
        <div className="login">
        <h3>연동없이 기존 아이디로 로그인하시겠습니까?</h3>
          <button type="button" id="log_btn" onClick={originbuttonHandler}>기존 아이디 로그인</button>
        </div>
        <div className="kakao_login">
            <h3>카카오 계정으로 새계정을 만드시겠습니까?</h3>
            <button id="kakao_button" onClick={create_kakaohandler}>카카오 로그인</button>
        </div>
        
         

    </Fragment>
    )
}

export default link;