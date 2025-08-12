import { useEffect, useState } from "react";
import "./CertifiTimer.scss";


interface TimerProps{
    IsFinish:(data:boolean) => void;
    Retry:boolean;
}

const CertifiTimer =({IsFinish ,Retry} : TimerProps) =>{

      const [timeLeft, setTimeLeft] = useState(180);
      const [issix, setIssix]=useState<boolean>(false);



    useEffect(() =>{
        setTimeLeft(180);
    },[Retry])

      useEffect(() => {

    if (timeLeft <= 0) {
      IsFinish(true);
      return;  // 타이머 종료시 setInterval을 실행하지 않도록
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      if(timeLeft === 60) setIssix(true);
    }, 1000);

    return () => {
        clearInterval(timer)};
  }, [timeLeft ,Retry]);

    const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


     return(<div className="CertifiTimer_Contain">
        <p style={{ color: timeLeft <= 60 ? '#ef4444' : '#1f2937' }}>
        유효 시간 : {formatTime()}
        </p>
    </div>)

}  
export default CertifiTimer;