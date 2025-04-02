import Clesses from"./DropDown.module.scss";
import { useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import user_info from "../Userdata/Userdata";
type user_info ={
    img:string,
    nickname:string,
}


const DropDownItem =(props:user_info) =>{

    console.log("드롭 아이템으로 안되냐?");
    const navigate = useNavigate();
    const login_info = useContext(user_info);

    const mypage =() =>{
        console.log("메인 마이 페이지 이동");
        login_info.addprofile(props.img);
        login_info.addeNickName(props.nickname);
        navigate("/main/person/");
    }

    return(
            <ul className={Clesses.drop} >
                <li onMouseDown={mypage}>마이 페이지</li>
                <li>로그아웃</li>

            </ul>
    )

}

export default DropDownItem;