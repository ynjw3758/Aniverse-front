
import { useState } from "react";

import Modal from "../Modal/Modal";
import "./Adress.scss";
import DaumPostcodeEmbed from "react-daum-postcode";


type address_info = {
    address: (data:object) => void
    onClose: () => void
  }

  //:React.FC<{onClose: () => void , address: (data:object) => void }>
const Adress =(props:address_info) =>{
    const[addresss, setAdress] = useState<boolean>(false);


    const map_complete = (data:object) =>{
     console.log("주소 입력 완료");
     setAdress(true);
     console.log("주소 입력 데이터 : " );
    let address_save:string = "";
     
     Object.entries(data).forEach((v) =>{
        console.log("주소값 전체 데이터 :" , v);
        if(v.at(0) == "address"){
            console.log("테스트 : " , v.at(1));
            address_save = v.at(1); 
        }
     });
     props.onClose();
     props.address(data);
    }

    return(<div className="Ad_BackDrop">
        <div className="AD_main">
        <DaumPostcodeEmbed  style={{width:"800px" ,height:"400px"}} onComplete={map_complete}/>        
        </div>
        </div>
    )
}
export default Adress;
