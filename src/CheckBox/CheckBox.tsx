import React, { Children, Fragment, useState } from "react";
import "./CheckBox.scss";

interface SettingsMenuType {
    children: React.ReactNode;
    checked : boolean;
    onChange:(checked:boolean) => void;
    name:() => void;
  }

const CheckBox:React.FC<SettingsMenuType>=({children , checked ,onChange ,name})=> {
    console.log("checkbox : " , checked);
    console.log("react node " , children);
    console.log("name:" , name);

    
    return(<label className="check">
        <input type="checkBox"
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
</label>
    )
}

export default CheckBox;