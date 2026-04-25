type LandingSharedFooterProps = {
  loggedIn: boolean;
  onPrimaryAction: () => void;
  onLogin: () => void;
};

const LandingSharedFooter = ({
  loggedIn,
  onPrimaryAction,
  onLogin,
}: LandingSharedFooterProps) => {
  return (
    <section className="LandingSharedFooter">
      <div className="LandingSharedFooter_Cta">
        <div>
          <h2>
            당신의 <strong>반려동물 이야기</strong>를 들려주세요
          </h2>
          <p>Aniverse는 모든 반려동물과 보호자를 하나의 커뮤니티로 연결합니다.</p>
        </div>

        <div className="LandingSharedFooter_CtaActions">
          <button type="button" onClick={onPrimaryAction}>
            무료로 시작하기
          </button>
          {!loggedIn && (
            <small>
              이미 계정이 있으신가요?
              <button type="button" onClick={onLogin}>
                로그인
              </button>
            </small>
          )}
        </div>
      </div>

      <footer className="LandingSharedFooter_Footer">
        <div className="LandingSharedFooter_Brand">
          <strong>Aniverse</strong>
          <p>모든 반려동물과 보호자가 하나로 만나는 따뜻한 커뮤니티</p>
          <div className="LandingSharedFooter_Socials">
            <span>◎</span>
            <span>◐</span>
            <span>◉</span>
            <span>⌁</span>
          </div>
        </div>

        <div className="LandingSharedFooter_Links">
          <div>
            <strong>서비스</strong>
            <a>서비스 소개</a>
            <a>주요 기능</a>
            <a>커뮤니티</a>
            <a>이벤트</a>
            <a>가이드</a>
          </div>
          <div>
            <strong>커뮤니티</strong>
            <a>자유 게시판</a>
            <a>질문/답변</a>
            <a>정보 공유</a>
            <a>작업하기</a>
          </div>
          <div>
            <strong>이벤트</strong>
            <a>진행중 이벤트</a>
            <a>이벤트 후기</a>
            <a>지난 이벤트</a>
          </div>
          <div>
            <strong>고객센터</strong>
            <a>공지사항</a>
            <a>자주 묻는 질문</a>
            <a>문의하기</a>
          </div>
        </div>

        <div className="LandingSharedFooter_Subscribe">
          <strong>새로운 소식 받아보기</strong>
          <p>이벤트와 유용한 반려동물 팁을 메일로 받아보세요.</p>
          <div className="LandingSharedFooter_SubscribeForm">
            <input type="text" placeholder="이메일 주소를 입력해주세요" readOnly />
            <button type="button">구독하기</button>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default LandingSharedFooter;
