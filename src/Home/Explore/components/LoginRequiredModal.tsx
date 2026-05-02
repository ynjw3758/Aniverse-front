type LoginRequiredModalProps = {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSign: () => void;
};

const LoginRequiredModal = ({ open, onClose, onLogin, onSign }: LoginRequiredModalProps) => {
  if (!open) return null;

  return (
    <div className="LoginRequiredModal" role="dialog" aria-modal="true" aria-labelledby="LoginRequiredModalTitle">
      <button type="button" className="LoginRequiredModal_Backdrop" aria-label="닫기" onClick={onClose} />
      <div className="LoginRequiredModal_Box">
        <span>로그인 안내</span>
        <h2 id="LoginRequiredModalTitle">로그인 후 모든 기능을 이용할 수 있어요!</h2>
        <p>좋아요, 댓글, 채팅 등 모든 기능은 로그인 후 자유롭게 이용할 수 있어요.</p>
        <div className="LoginRequiredModal_Actions">
          <button type="button" className="primary" onClick={onLogin}>
            로그인
          </button>
          <button type="button" className="secondary" onClick={onSign}>
            회원가입
          </button>
          <button type="button" className="ghost" onClick={onClose}>
            나중에 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
