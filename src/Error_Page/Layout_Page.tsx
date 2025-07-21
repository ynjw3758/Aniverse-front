import React from "react";
import "./Layout_Page.scss";
import { Outlet } from "react-router-dom";
import headerimg from "../assets/images/log_test.jpg"


const Layout_Page =() =>{

    return(
        <div className="head">
            <img src={headerimg} alt="애완멀" ></img>
            <Outlet />
        </div>
    )
}

export default Layout_Page;