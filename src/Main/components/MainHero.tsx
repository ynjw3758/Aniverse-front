import HeroPets from "../../assets/images/explore_hero_pets.png";

type MainHeroProps = {
  displayName: string;
  onAddPet: () => void;
  onHealthClick: () => void;
};

const MainHero = ({ displayName, onAddPet, onHealthClick }: MainHeroProps) => {
  return (
    <>
      <div className="MainPage_welcome">
        <div>
          <h1>안녕하세요, {displayName}님!</h1>
          <p>오늘도 모든 반려동물과 행복한 하루 보내세요.</p>
        </div>
        <button type="button" onClick={onAddPet}>+ 반려동물 추가</button>
      </div>

      <section className="MainPage_hero">
        <div className="MainPage_heroCopy">
          <h2>모든 생명이 소중한 우리,</h2>
          <strong>다양한 반려동물의 건강과 행복을 함께 지켜요</strong>
          <p>정기적인 건강 기록 관리와 알림 설정으로 모든 반려동물의 일상을 더 세심하게 챙겨보세요.</p>
          <button type="button" onClick={onHealthClick}>건강 기록 관리하기</button>
        </div>
        <div className="MainPage_heroPets" aria-hidden="true">
          <img src={HeroPets} alt="" />
        </div>
      </section>
    </>
  );
};

export default MainHero;
