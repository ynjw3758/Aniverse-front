import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import CheckBox from "../CheckBox/CheckBox";
import "./Agree.scss";
import { useNavigate } from "react-router-dom";

const Agree:React.FC =()=> {

    const[person ,  setPerson] = useState<boolean>(false);
    const[solution , setSolution] = useState<boolean>(false);
    const[others , setOthers] = useState<boolean>(false);
    const[sercice , setService] = useState<boolean>(false);
    const[marketingCheck , setMarketingCheck] = useState<boolean>(false);
    const [allCheck , setAllCheck] = useState<boolean>(false);
    const [isFormvalue , setIsFormvalue] = useState<boolean>(false);

   const navigate = useNavigate();
   const allBtnEvent =()=>{
    console.log("allcheck :" , allCheck);
    if(allCheck === false) {
      setAllCheck(true);
      setPerson(true);
      setSolution(true);
      setService(true);
      setOthers(true);
      setMarketingCheck(true);
      setIsFormvalue(true);
      
    }else {
      setAllCheck(false);
      setPerson(false);
      setSolution(false);
      setService(false);
      setOthers(false);
      setMarketingCheck(false);
      setIsFormvalue(false);
    } 
  };
  
  const PersonBtnEvent =()=>{
    if(person === false) {
      setPerson(true);
    }else {
      setPerson(false);
    }
  };
  
  const SolutionBtnEvent =()=>{
    if(solution === false) {
      setSolution(true);
    }else {
      setSolution(false);
    }
  };
  const OtherBtnEvent =()=>{
    if(others === false) {
      setOthers(true)
    }else {
      setOthers(false)
    }
  };
/*
  const ServiceBtnEvent =()=>{
    if(sercice === false) {
      setService(true)
    }else {
      setService(false)
    }
  };
  
  const marketingBtnEvent =()=>{
    if(marketingCheck === false) {
      setMarketingCheck(true)
    }else {
      setMarketingCheck(false)
    }
  };
   */
  useEffect(() =>{
    setIsFormvalue(person && solution && others);
  },[person , solution , others])

   const cancel =() =>{
    navigate(-1);
   }

   const sign =() =>{
   navigate("/sign");
   }




    return(<Fragment>
        <div className="Agree_header">
          <img src="../assets/images/log_test.jpg"></img>
        </div>
        <div className="text">
          <p>애니멀에 오신걸 환영합니다 회원가입 전에 이용약관 동의 해주세요</p>
          <h2>이용약관 동의 </h2>
          </div>
            <div className="all_check">
               <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent}/>
        		   <label >전체동의</label>
             </div>
            <div className="Horizantal">
          <hr />
          </div>
          <div className="Agree_pserson_check">
        		<input type="checkbox" id="check1" checked={person} onChange={PersonBtnEvent}/>
        		<label >개인정보 수집 이용 동의<span className="blue">(필수)</span></label>
            </div>
            <div className="Aggree_solution_check">
        		<input type="checkbox" id="check2" checked={solution}  onChange={SolutionBtnEvent}/>
        		<label > 개인정보 처리 위탁 동의<span className="blue">(필수)</span></label>
            </div>
            <div className="Aggre_other_check">
        		<input type="checkbox" id="check3" checked={others}  onChange={OtherBtnEvent}/>
        		<label >개인정보 제3자 제공 동의 <span className="blue">(필수)</span></label>
            </div>
          <div className="Aggre_button">
             <button type="button" disabled={!isFormvalue} onClick={sign}>다음</button>
             <button type="button" onClick={cancel}>취소 </button>
          </div>
    </Fragment>
    )
}

export default Agree;