import React, { useState  , useEffect} from "react";
import axios from "axios";
import "./Certification.scss";
import Modal from "../Modal/Modal";

interface ResponseDataType {
    message: string;
    code: number;
    response:object
  }

const Certification:React.FC<{onClose : () => void , 
    oncerfitication : (iscertification:boolean) => void, 
    onPhonNumber : (phonenumber:string) => void }> =(props) =>{
    const[count , setCount] = useState<boolean>(true);
    const[phonenumber , setPhonenumber] = useState<string>("");
    const[certifinumber , setCertifinumber] = useState<string>("");
    const[receive , setReceive] = useState<boolean>(false);
    const[iscertification , setIscertification] = useState<boolean>(false);
    const[values , setValues] = useState<unknown>();
    const[numberisvalid , setNumberisvalid] = useState<boolean>(false);
    let Certification:string = ""; 
    let isValuenumber:string = "";
    const user_nuber =(e:React.ChangeEvent<HTMLInputElement>) =>{
    Certification = e.target.value;
    }
    const isvaluenumber = (e:React.ChangeEvent<HTMLInputElement>) =>{
        isValuenumber = e.target.value;
    }

    const compare =() =>{
        console.log("test");
        console.log("인증번호 : " , values);
        console.log("사용자가 누른 번호 :" , isValuenumber);
        console.log("phonnumber : " , phonenumber);
        setCertifinumber(isValuenumber);
        console.log("인증번호 입력 값 :" , certifinumber);
        axios.post('http://localhost:8080/Pets-social/verifi-sms',
        {
            phonnumber:phonenumber,
           certifi_number:isValuenumber
        }
    ).then(function(response){
      console.log("인증 완료 ", response);
      setIscertification(true);
      setReceive(false);
    });
    }


    let cerfi_number:unknown =""; 
    const Number_Receive =() =>{
        // 복호화 키 지정   
        const seckey = process.env.REACT_APP_SECRET_KEY;
        const serviceid = process.env.REACT_APP_SERVICE_ID;
        const accesskey =process.env.REACT_APP_ACCESS_KEY;
          console.log(seckey);
          console.log(serviceid);
          console.log(accesskey);
            axios.post('http://localhost:8080/Pets-social/send-sms' , {
                service_id:serviceid,
                secret_key:seckey,
                access_key :accesskey,
                Phone_number : Certification
            }).then(response =>{
                console.log("응답 결과 : " , response.data , " 응답 코드 :"  , response.status);
                setReceive(true);
                setCount(false);
                setNumberisvalid(false);
            }).catch(error =>{
                if(axios.isAxiosError<ResponseDataType>(error)){
                    console.log("error code: " , error.code);
                    
                    if(error.code=="ERR_BAD_REQUEST"){
                        setNumberisvalid(true);
                    }
                    if(error.code == "ERR_NETWORK"){
                      console.log("네트워크 에러 ");
                      
                    }
                    console.log("error response: " , error.response?.data);
                  }
            })

    }
    const certification = () =>{
        console.log("최종 sms본인인증 완료 ");
        props.oncerfitication(iscertification);
        props.onPhonNumber(phonenumber);
        props.onClose();
    }

    const close =() =>{
     console.log("모달 창 닫기");
     props.onClose();
    }
   
    return (<Modal onClose={props.onClose}>
            <div className="Certification">
                <h2>본인 인증 서비스</h2>
                {count && <div className="test">
                <input type="number" 
                placeholder="전화번호"
                onChange={user_nuber}               
                />
                <button onClick={Number_Receive}
                type="button"
                >인증번호 받기</button>
                </div>
                }
                {numberisvalid && <p className="error">이미 인증한 번호입니다.</p>}
                {receive && <div className="commit">
                <input type="text" 
                placeholder="인증 번호" 
                onChange={isvaluenumber}
                />
                <button type="button" onClick={compare}>인증 확인</button>
                </div>}
                {iscertification && <h2 className="success">인증이 완료되었습니다</h2>}
                <div className="submit">
                <button  onClick={certification} disabled={!iscertification}>인증 완료</button>
                <button onClick={close}>취소</button>
                </div>
            </div>

    </Modal>
    )
}
export default Certification;
