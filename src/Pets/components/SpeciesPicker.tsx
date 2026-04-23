import "./SpeciesPicker.scss"
import beforeImg from"../../assets/images/begorearrow.png";
import DogImg from"../../assets/images/dog.png"
import CatImg from"../../assets/images/cat.png"
import FishImg from"../../assets/images/fish.png"
import BirdsImg from"../../assets/images/birds.png"
import RepImg from"../../assets/images/reptile.png"
import AmphiImg from"../../assets/images/amphibia.png"
import RodentImg from "../../assets/images/rodent.png"
import arthropodImg from"../../assets/images/icon_arthropod.png"
import { useEffect, useMemo, useState } from "react";
import {api} from"../../API/Api"

interface props{
    next : (Info:NextBreedInfo) => void
}

type NextBreedInfo={
   title:string,
   code:string,
   id:number
}

type spicesInfo={
    img:string,
    code:string,
    nameKo:string,
    sortOrder:number
}

const SpeciesPicker:React.FC<props> =({next} : props) =>{
    const [selectedCode, setSelectedCode] = useState<string | null>(null);
    const [selInfo, setSelInfo]=useState<NextBreedInfo | null>({
        title:"",
        code:"",
        id:0
    })

  const speciesList: (NextBreedInfo & { img: string })[] = [
    { img: DogImg, title: "개", code: "dog" , id:1},
    { img: CatImg, title: "고양이", code: "cat" , id:2},
    { img: BirdsImg, title: "조류", code: "bird",id:3 },
    { img: FishImg, title: "어류", code: "fish" ,id:4 },
    { img: RodentImg, title: "설치류", code: "rodent", id:5 },
    { img: RepImg, title: "파충류", code: "reptile" ,id:6},
    { img: AmphiImg, title: "양서류", code: "amphibian", id:7 },
    { img: arthropodImg, title: "곤충/절지류", code: "arthropod" , id:8},
  ];

    useEffect(() =>{
     console.log("애완동물 카테고리 서버 요청")
          const access_token =localStorage.getItem("a_id")!;
          api.defaults.headers.common['Authorization'] = access_token;
          api.post("/gateway/api-proxy" ,{
              service: "common",
              endpoint: "api/pet-categories",
              method: "GET",
              body:{}
          },{
              withCredentials: true
          }).then((response =>{
              console.log("response :" , response.data.data);
             
          }))
    },[])
        const selectedItem = useMemo(() => {
            return speciesList.find((item) => item.code === selectedCode) ?? null;
            }, [speciesList, selectedCode]);

    const handleSelect = (Item: NextBreedInfo) => {
        setSelectedCode(prev => prev === Item.code ? null : Item.code)
    }
    const NextHandler=() =>{
            if (!selectedItem) return; // 선택 안 됐으면 아무것도 안 함
            next({ title: selectedItem.title, code: selectedItem.code, id : selectedItem.id });
    }


    return(
      <div className="SpeciesPicker_Main">
        <div className="SpeciesPicker_Header">
                <img src={beforeImg} alt="뒤로가기" />
                <h3 className="SpeciesPicker_Title">종 선택</h3>
        </div>
        <div className="SpeciesPicker_Body">
          <div className="SpeciesPicker_container">
              {speciesList.map((item) => (
                  <div
                  key={item.title}
                  className={`SpeciesPicker_item ${selectedCode === item.code ? "active" : ""}`}
                  onClick={() => handleSelect({title:item.title , code:item.code, id:item.id})}
                  >
                  <div className="SpeciesPicker_ImgBox">
                      <img src={item.img} alt={item.title} />
                  </div>

                  <span>{item.title}</span>

                  {selectedCode === item.code && <div className="SpeciesPicker_check">✓</div>}
                  </div>
              ))}
          </div>
        </div>
        <div className="SpeciesPicker_Footer">
           <button className="SpeciesPicker_Btn SpeciesPicker_BtnCancel">취소</button>
           <button className="SpeciesPicker_Btn SpeciesPicker_BtnNext" 
           disabled={!selectedCode}
           onClick={NextHandler}>다음</button>
         </div>
      </div>
    )

}

export default SpeciesPicker;
