type ExploreCTAProps = {
  onSign: () => void;
  onLogin: () => void;
};

const ExploreCTA = ({ onSign, onLogin }: ExploreCTAProps) => {
  return (
    <section className="ExploreCTA">
      <div>
        <strong>더 많은 이야기와 기능을 경험해보세요!</strong>
        <p>회원가입하면 게시글 작성, 댓글, 좋아요, 채팅 등 다양한 기능을 이용할 수 있어요.</p>
      </div>
      <div className="ExploreCTA_Actions">
        <button type="button" className="primary" onClick={onSign}>
          무료로 회원가입
        </button>
        <button type="button" className="secondary" onClick={onLogin}>
          로그인하기
        </button>
      </div>
    </section>
  );
};

export default ExploreCTA;
