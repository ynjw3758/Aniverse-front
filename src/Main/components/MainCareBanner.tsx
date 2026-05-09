import { FaClipboardList } from "react-icons/fa6";

type MainCareBannerProps = {
  onAction: () => void;
};

const MainCareBanner = ({ onAction }: MainCareBannerProps) => {
  return (
    <section className="MainPage_careBanner">
      <div className="MainPage_careIcon">
        <FaClipboardList aria-hidden="true" />
      </div>
      <span>
        <strong>정기 건강 체크를 잊지 마세요</strong>
        <small>반려동물의 건강 기록을 관리하고 예방접종 일정을 확인해보세요.</small>
      </span>
      <button type="button" onClick={onAction}>건강 기록 관리</button>
    </section>
  );
};

export default MainCareBanner;
