
import "./BreedPicker.scss"
import { useEffect, useState } from "react";
import {api} from"../../API/Api"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import beforeImg from"../../assets/images/begorearrow.png";
import SearchImg from "../../assets/images/search.png";

interface props{
    spInfo:speciesInfo
}

interface ResponseDataType {
      message: string;
      code: number;
      errorcode:string;
      timestamp:String;
      
}


type speciesInfo={
   title:string,
   code:string,
   id:number
}

type breedInfo={
   breedId:number,
   nameKo:string,
   nameEn:string
}
const BreedPicker:React.FC<props> =({spInfo} : props) =>{

    const [isLoading, setIsLoading] = useState(true);
    const[popular, setPopular]=useState<breedInfo[]>([])
    const[total, setTotal]=useState<breedInfo[]>([])

    const navigate = useNavigate();
    

    useEffect(() =>{
     
          const access_token =localStorage.getItem("a_id")!;
          const catagoryCode:string = spInfo.code
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/gateway/api-proxy" ,{
              service: "common",
              endpoint: `api/pet-categories/${catagoryCode}/breeds`,
              method: "GET",
              body:{}
          },{
              withCredentials: true
          }).then((response =>{
              console.log("response :" , response.data.data);
              const Item:breedInfo[] = response.data.data
              const popularityItem =Item.slice(0,6)
              console.log("인기 품종 :" , popularityItem)
              setPopular(popularityItem)
              setIsLoading(false);
              
              
          })).catch(error =>{
              if(axios.isAxiosError<ResponseDataType>(error)){
                  console.log("error code: " , error.response);
                  if(!error.response) {
                        console.warn("서버 응답 없음 (게이트웨이 연결 실패)");
                        navigate("/error/Gateway"); // 502로 간주
                        return;
                  }
                  if(error.response?.status==400){
                      console.log("400에러 발생")
                      navigate("/error/BadRequest");
                    }
                    else if(error.response?.status==401){
                    }
                    else if(error.response?.status==415){
                        console.log("지원하지 않는 형식입니다.")
                        setIsLoading(false);
                    }
                    else if(error.response?.status==500){
                        //navigate("/error/se-error")
                    }
                    else if(error.response?.status==502){
                        navigate("/error/Gateway");
                    }
              }
          })
          
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
        <div className="BreedPickerSearch">
            <img src={SearchImg} className="BreedPickerSearch_icon"/>
            <input 
                type="text"
                placeholder="품종을 검색하세요"
                className="BreedPickerSearch_input"
            />
        </div>
        <div className="BreedPicker_Popular">
            <h4>인기 품종</h4>

        </div>
        </div>

    </>)

}

export default BreedPicker;