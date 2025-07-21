import { Fragment, useState, useRef, useEffect } from "react";
import "./Main.scss";
import React from "react";
import Image from "../assets/images/New_img.png";
import testNote from "../assets/images/Main_Note.png" ;

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

    return (
        <Fragment>
            <main className="Main_Body" onScroll={handleScroll} ref={scrollRef}>
                <div className="slide" style={calculateStyle(0, 400)}>
                    <div className="img_list">
                        <img src={Image} alt="슬라이드 이미지" />
                    </div>
                </div>

                <div className="Intro" style={calculateStyle(510, 550)}>
                    <h2>세상의 모든 애완동물을 위한 소셜 공간</h2>
                    <label>
                        희귀동물을 키우는 사람들의 고민을 함께 풀면서 사육 노하우를 공유하며
                        사람도 동물도 모두 행복한 삶을 만들어 보고 싶습니다.
                    </label>
                </div>

                <div className="service" style={calculateStyle(680, 820)}>
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
                </div>
                <div  className="Main_Service_Intro" style={calculateStyle(860, 950)}>
                      <h2>제공하는 서비스</h2>
                      <p>우리 플랫폼에서 제공하는 다양한 서비스를 만나보세요.</p>
                    </div>

                    <div className="Main_Note" style={calculateStyle(1100, 1400)}>
                       <h2>쪽지</h2>
                       <div className="Main_Note_Descrip">
                        <img src={testNote}/>
                        <p>사진과 영상을 쉽게 업로드하여 다양한 콘텐츠를 공유해보세요.</p>
                      </div>
                    </div>
                    <div className="Main_Chat" style={calculateStyle(1300, 1650)}>
                       <h2>채팅</h2>
                       <div className="Main_Chat_Descript">
                        <img src={testNote}/>
                        <p>실시간으로 친구들과 소통할 수 있는 채팅 기능입니다.</p>
                      </div>
                    </div>
                    <div className="Main_Contents_Intro" style={calculateStyle(1500, 1900)}>
                       <h2>컨텐츠 공유</h2>
                       <div className="Main_Contents_Descript">
                        <img src={testNote}/>
                        <p>개인적인 소통을 위한 1:1 쪽지 기능을 제공합니다.</p>
                      </div>
                    </div>
                    <div className="Main_Follower" style={calculateStyle(1800, 1900)}>
                       <h2>팔로워</h2>
                       <div className="Main_Follower_Descript">
                        <img src={testNote}/>
                        <p>관심 있는 사람들을 팔로우하고 최신 소식을 받아보세요.</p>
                      </div>
                    </div>
                    <div className="vision-section">
                    <h2>우리의 미래 계획</h2>
                     <p>
                        우리 플랫폼은 단순한 소셜 공간을 넘어, 희귀 동물과 애완동물을 키우는 모든 사람들의 삶을 풍요롭게 만들고자 합니다. <br /><br />

                       <span className="market-highlight">
                           <strong>사육에 필요한 용품, 먹이, 장비 등을 거래할 수 있는 마켓과 커머스 서비스</strong>
                       </span>를 통해 사용자들의 거래를 더욱 쉽게 만들 계획입니다. <br /><br /> 
                        또한, <strong>AI 기반 산책 경로 추천 서비스</strong>를 도입하여 각 지역별로 애완동물에게 적합한 산책 경로와 시간을 분석하고, 실시간으로 알림을 제공할 예정입니다.
                        <br /><br />
                        우리는 단순히 소통을 위한 플랫폼이 아닌, <strong>실질적인 도움을 주고, 삶의 질을 향상시킬 수 있는 플랫폼</strong>을 만들어가고자 합니다.<br /><br /> 
                        <strong>여러분의 소중한 의견과 참여로 함께 만들어가는 공간을 기대합니다.</strong>
                     </p>
                </div>
            </main>
        </Fragment>
    );
};

export default Main;
