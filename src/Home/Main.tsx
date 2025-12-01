import { Fragment, useState, useRef, useEffect } from "react";
import "./Main.scss";
import React from "react";
import testNote from "../assets/images/Main_Note.png" ;
import Communication from "../assets/images/communi.png";
import Share from "../assets/images/Ldshare.png";
import RealTime from "../assets/images/realtime.png";

const services = [
  {
      title: "쪽지",
      description: "개인적인 소통을 위한 1:1 쪽지 기능을 제공합니다.",
      image: "/image/message_icon.png",
  },
  {
      title: "채팅",
      description: "실시간으로 친구들과 소통할 수 있는 채팅 기능입니다.",
      image: "/image/chat_icon.png",
  },
  {
      title: "컨텐츠 공유",
      description: "사진과 영상을 쉽게 업로드하여 다양한 콘텐츠를 공유해보세요.",
      image: "/image/upload_icon.png",
  },
  {
      title: "팔로워",
      description: "관심 있는 사람들을 팔로우하고 최신 소식을 받아보세요.",
      image: "/image/follower_icon.png",
  },
];


const Main = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(event.currentTarget.scrollTop);
        console.log("스크롤 좌표 :" , event.currentTarget.scrollTop)
    };

    const calculateStyle = (start: number, end: number) => {
        const range = end - start;
        const progress = Math.max(0, Math.min(1, (scrollTop - start) / range));
        const opacity = 1 - progress;
        const translateY = progress * 20;
        return { opacity, transform: `translateY(${translateY}px)` };
    };

/*
    <h2>왜 이 공간이 필요한가요?</h2>
                    <div className="service_comumication">
                        <p className="intro-description">
                            그래서 우리는 이 공간을 만들었습니다.
                            <br />
                            <span className="highlight">
                                고민을 나누고, 사육 노하우를 공유하며, 같은 관심사를 가진 사람들과
                                인연을 맺을 수 있는 공간.
                            </span>
                            <br />
                            당신의 이야기를 들려주세요. 그리고 함께 만들어가요.
                        </p>
                    </div>
                    */
                   /*

                   */
    return (
        <Fragment>
            <main className="Main_Body" onScroll={handleScroll} ref={scrollRef}>
                <div className="Intro" style={calculateStyle(510, 550)}>
                    <h2>왜 Aniverse인가요?</h2>
                    <label>
                        Aniverse는 반려동물과 사람 모두가 행복한 삶을 만들기 위해 시작된 공간입니다.<br/>
                        희귀동물을 포함한 모든 반려동물 키우는 사람들의 경험과 노하우를 공유하며,<br/>
                        함께 성장하는 커뮤니티를 만들어가고 있습니다.
                    </label>
                </div>

                <section className="service" style={calculateStyle(680, 820)}>
                    <div className="service_Communi">
                        <img src ={Communication}/>
                        <h3>소통</h3>
                        <p>사진과 영상을 공유하며 전세계 <br />
                        애완동물 집사들과 소통하세요.</p>
                    </div>
                    <div className="service_share">
                            <img src ={Share}/>
                            <h3>지식 공유</h3>
                            <p>사육법, 훈련법, 건강관리 등<br />
                            다양한 노하우를 교류할 수 있습니다.</p>
                    </div>
                     <div className="service_realtime">
                        <img src ={RealTime}/>
                        <h3>실시간 연결</h3>
                        <p>채팅과 쪽지를 통해 반려인들과 즉시 연결되어 함께 성장하세요.</p>
                     </div>
                  <div>
                  </div>
                </section>
                
                <section className="landing_cta">
                    <h2>지금 바로 Aniverse에 합류하세요!</h2>
                    <p>첫 번째 이야기, 지금부터 시작됩니다</p>
                    <button>시작하기</button>
                </section>

                <section className="landing_ask">
                  <div className="ask_box">
                   <h2>Email</h2>
                   <p>yoonjw7894@naver.com</p>
                  </div>
                  <div className="ask_box"> 
                   <h2>phone</h2>
                   <p>010-9989-1234</p>
                  </div>
                </section>

                <footer className="landing_footer">
                   <h2>Aniverse</h2>
                   <div className="ldfooter_order">
                      <p>이용약관</p>
                      <p>개인정보처리방침</p>
                    </div>
                </footer>
                
            </main>
        </Fragment>
    );
};

export default Main;
