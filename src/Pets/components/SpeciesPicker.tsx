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
//import PluseImg from "../../assets/images/petpluse.png"
import { useEffect, useState } from "react";

const SpeciesPicker =() =>{
    const [selected, setSelected] = useState<string | null>(null);

    const speciesList=[{img : DogImg, text : "개"},
                {img : CatImg, text : "고양이"},
                {img : BirdsImg, text : "조류"},
                {img : FishImg, text : "어류"},
                {img : RodentImg, text : "설치류"},
                {img : RepImg, text : "파충류"},
                {img : AmphiImg, text : "양서류"},
                {img : arthropodImg, text : "곤충/절지류"},
    ]

    const handleSelect = (text: string) => {
        setSelected(prev => (prev === text ? null : text)); // ✅ 같으면 해제, 다르면 선택
        };


    return(<>
        <div className="SpeciesPicker_Header">
                <img src={beforeImg} />
                <h3 className="SpeciesPicker_Title">종 선택</h3>
        </div>
        <div className="SpeciesPicker_container">
            {speciesList.map((item) => (
                <div
                key={item.text}
                className={`SpeciesPicker_item ${selected === item.text ? "active" : ""}`}
                onClick={() => handleSelect(item.text)}
                >
                <div className="SpeciesPicker_ImgBox">
                    <img src={item.img} alt={item.text} />
                </div>

                <span>{item.text}</span>

                {selected === item.text && <div className="SpeciesPicker_check">✓</div>}
                </div>
            ))}
        </div>
        <div className="SpeciesPicker_Footer">
           <button className="SpeciesPicker_Btn SpeciesPicker_BtnCancel">취소</button>
           <button className="SpeciesPicker_Btn SpeciesPicker_BtnNext" disabled={!selected}>다음</button>
         </div>
    </>)

}

export default SpeciesPicker;