import React from "react";
import "./Layout_Page.scss";
import { Outlet } from "react-router-dom";
import headerimg from "../assets/images/log.png"


const Layout_Page =() =>{

    return(
        <div className="head">
        
            <Outlet />
        </div>
    )
}

export default Layout_Page;