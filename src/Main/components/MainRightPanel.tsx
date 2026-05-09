import { FaChevronRight } from "react-icons/fa6";
import dogImage from "../../assets/images/landing_generated/pet_thumb_dog.png";
import catImage from "../../assets/images/landing_generated/pet_thumb_cat.png";
import rabbitImage from "../../assets/images/landing_generated/pet_thumb_rabbit.png";
import birdImage from "../../assets/images/landing_generated/pet_thumb_bird.png";
import lizardImage from "../../assets/images/landing_generated/pet_thumb_bearded_dragon.png";
import hamsterImage from "../../assets/images/landing_generated/pet_thumb_hamster.png";
import beetleImage from "../../assets/images/landing_generated/pet_thumb_arthropod.png";

type MainRightPanelProps = {
  onAction: () => void;
};

const pets = [
  { name: "행복이", type: "강아지", detail: "5살 · 골든 리트리버", image: dogImage },
  { name: "냥냥이", type: "고양이", detail: "3살 · 코리안 숏헤어", image: catImage },
  { name: "초코", type: "토끼", detail: "2살 · 네덜란드 드워프", image: rabbitImage },
  { name: "로이", type: "조류", detail: "1살 · 코뉴어", image: birdImage },
  { name: "레오", type: "파충류", detail: "2살 · 비어디드 드래곤", image: lizardImage },
  { name: "톰", type: "소동물", detail: "1살 · 골든 햄스터", image: hamsterImage },
  { name: "장수", type: "곤충", detail: "성체 · 넓적사슴벌레", image: beetleImage },
];

const recommendations = [
  { title: "모든 동물을 위한 영양 가이드", category: "건강 정보", image: hamsterImage },
  { title: "파충류 사육 환경 완벽 가이드", category: "훈련 가이드", image: lizardImage },
  { title: "조류의 언어와 행동 이해하기", category: "케어 노하우", image: birdImage },
];

const MainRightPanel = ({ onAction }: MainRightPanelProps) => {
  return (
    <aside className="MainPage_rightPanel">
      <section className="MainPage_sideCard MainPage_myPets">
        <div className="MainPage_sideTitle">
          <h3>우리 아이들</h3>
          <button type="button" onClick={onAction}>
            전체보기
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="MainPage_petList">
          {pets.map((pet) => (
            <button type="button" key={pet.name} onClick={onAction}>
              <img src={pet.image} alt="" />
              <span>
                <strong>{pet.name}</strong>
                <small>{pet.detail}</small>
              </span>
              <em>{pet.type}</em>
              <FaChevronRight aria-hidden="true" />
            </button>
          ))}
        </div>
        <button type="button" className="MainPage_morePets" onClick={onAction}>+ 더 많은 아이 보기</button>
      </section>

      <section className="MainPage_sideCard">
        <div className="MainPage_sideTitle">
          <h3>맞춤 추천 콘텐츠</h3>
          <button type="button" onClick={onAction}>
            더보기
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
        <div className="MainPage_recommendList">
          {recommendations.map((item) => (
            <button type="button" key={item.title} onClick={onAction}>
              <img src={item.image} alt="" />
              <span>
                <strong>{item.title}</strong>
                <small>{item.category}</small>
              </span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default MainRightPanel;
