import { useEffect, useState } from "react";
import "./PetSelectModal.scss"
import {api } from "../../../../API/Api";
import AnimalImg from"../../../../assets/images/UploadAnimal.png";
import PetRegisterModal from "../../../../Pets/PetRegisterModal";


interface props{

}
const PetSelectModal:React.FC<props> =() =>{
    const[isData, setIsData]=useState<boolean>(false);
    const[register, setRegister]=useState<boolean>(false);


    useEffect(() =>{
          const access_token =localStorage.getItem("a_id")!;
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/gateway/api-proxy" ,{
              service: "common",
              endpoint: "api/getpets",
              method: "GET",
              body:{}
          },{
              withCredentials: true
          }).then((response =>{
              console.log("response :" , response.data.data);
              if(response.data.data === null) setIsData(true);
          }))
    },[])

    const RegisterHandler =() =>{
        setIsData(false);
        setRegister(true)
    }

    return(<div className="PetSelectModal_BackDrop">
     <div className="PetSelectModal_Main">
            {isData && (<div className="PetSelectModal_Card">
                <h4 className="PetSelectModal_Title">반려동물 선택</h4>
                <div className="PetSelectModal_Header">
                    <img className="left" src={AnimalImg}/>
                    <p>아직 등록된 애완동물이 없어요</p>
                    <img className="right" src={AnimalImg}/>
            </div>
                <p>반려동물을 등록해 포토텔링 말로 게시물을<br />
                편리할 수 있어요.</p>
                    <button className="PetSelectModal_AddBtn" onClick={RegisterHandler}>
                        + 새 반려동물 등록
                    </button>
                    <div className="PetSelectModal_bottomBt">
                        <button className="PetSelectModal_Btn Cancel">취소</button>
                        <button className="PetSelectModal_Btn Confirm">확인</button>
                    </div>
            </div>)}
            {register && (<PetRegisterModal />)}
     </div>
    </div>)
}
export default PetSelectModal;