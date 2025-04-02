import Clesses from"./MydropDown.module.scss";


const MydropDown =() =>{


    return(
            <ul className={Clesses.drop} >
                <li>활동 기록</li>
                <li>쪽지 설정</li>
                <li>블랙리스트 설정</li>
                <li>즐겨찾기 목록</li>
                <li>로그아웃</li>
            </ul>
    )
}

export default MydropDown;