import React from "react";
import "./Layout_Page.scss";
import { Outlet } from "react-router-dom";



const Layout_Page =() =>{

    return(
        <div className="head">
            <img src="/image/log_test.jpg" alt="애완멀" ></img>
            <Outlet />
        </div>
    )
}

export default Layout_Page;