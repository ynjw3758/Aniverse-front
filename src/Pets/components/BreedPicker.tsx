
import "./BreedPicker.scss"
import beforeImg from"../../assets/images/begorearrow.png";
import { useEffect, useState } from "react";
import {api} from"../../API/Api"

interface props{
    spInfo:speciesInfo
}

type speciesInfo={
   title:string,
   code:string
}
const BreedPicker:React.FC<props> =({spInfo} : props) =>{

    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() =>{
     console.log("최초 렌더링 시 서버 요청 : " ,spInfo )
     
          const access_token =localStorage.getItem("a_id")!;
          const catagori_code = "dog"
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/gateway/api-proxy" ,{
              service: "common",
              endpoint: `api/pet-categories/${catagori_code}/breeds`,
              method: "GET",
              body:{}
          },{
              withCredentials: true
          }).then((response =>{
              console.log("response :" , response.data.data);
              
          }))
          
    },[])

    return(<>
        <div className="BreedPicker_Header">
                <img src={beforeImg} />
                <h3 className="BreedPicker_Title">{`${spInfo.title} 선택`}</h3>
        </div>
        <div className="BreedPicker_container">
        {isLoading && (
          <div className="BreedPicker_Loading_Overlay">
            <div className="BreedPicker_Spinner" />
            <p>로딩중...</p>
          </div>
        )}
        </div>

    </>)

}

export default BreedPicker;