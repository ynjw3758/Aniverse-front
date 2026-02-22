import "./SpeciesPicker.scss"
import beforeImg from"../../assets/images/begorearrow.png";
import DogImg from"../../assets/images/dog.png"
import CatImg from"../../assets/images/cat.png"
import FishImg from"../../assets/images/fish.png"
import BirdsImg from"../../assets/images/birds.png"
import RepImg from"../../assets/images/reptile.png"
import AmphiImg from"../../assets/images/amphibia.png"
import RodentImg from "../../assets/images/rodent.png"
import PluseImg from "../../assets/images/petpluse.png"

const SpeciesPicker =() =>{

    return(<>
        <div className="SpeciesPicker_Header">
                <img src={beforeImg} />
                <h3 className="SpeciesPicker_Title">종 선택</h3>
        </div>
        <div className="SpeciesPicker_container">
                <div className="SpeciesPicker_item">
                   <img src={DogImg} alt="개" />
                   <span>개</span>
                </div>

                <div className="SpeciesPicker_item">
                    <img src={CatImg} alt="고양이" />
                    <span>고양이</span>
                </div>

                <div className="SpeciesPicker_item">
                    <img src={BirdsImg} alt="조류" />
                    <span>조류</span>
                </div>
                <div className="SpeciesPicker_item">
                    <img src={FishImg} alt="어류" />
                    <span>어류</span>
                </div>
                <div className="SpeciesPicker_item">
                    <img src={RodentImg} alt="설치류" />
                    <span>설치류</span>
                </div>
                <div className="SpeciesPicker_item">
                    <img src={RepImg} alt="파충류" />
                    <span>파충류</span>
                </div>
                <div className="SpeciesPicker_item">
                    <img src={AmphiImg} alt="양서류" />
                    <span>양서류</span>
                </div>
                <div className="SpeciesPicker_item">
                    <img src={PluseImg} alt="기타" />
                    <span>기타</span>
                </div>
        </div>
    </>)

}

export default SpeciesPicker;