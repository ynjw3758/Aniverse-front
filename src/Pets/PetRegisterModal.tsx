import "./PetRegisterModal.scss";
import beforeImg from"../assets/images/begorearrow.png";
import CameraImg from "../assets/images/cameraimg.png";
import { useState } from "react";

const PetRegisterModal =() =>{
    const[isprofile, setIsprofile]=useState<boolean>(false);
    const[imgfile, setimgfile]=useState<string>("");

    const handleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
       const files = event.target.files;
       if (!files || files.length === 0) return;
       const file = files[0];
       const imageUrl = URL.createObjectURL(file);
       setimgfile(imageUrl);
       setIsprofile(true);
    }

    return(<div className="PetRegisterModal_Main">
        <div className="PetRegisterModal_Header">
            <img src={beforeImg} />
            <h3 className="PetRegisterModal_Title">새 애완동물 등록</h3>
        </div>
        <div className="PetRegisterModal_Contents">
            {!isprofile && (<>
                      <label className="PetRegister_ProfileCircle">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    style={{ display: "none" }}
                        />
             <span className="PetRegister_PlusIcon">+</span>
                 <img
                    src={CameraImg}
                    alt="camera"
                    className="PetRegister_CameraIcon"
                    />
          </label>
            </>)}
            {isprofile && (<div className="PetRegister_ProfileCircle">
                <img src={imgfile} className="PetRegister_ProfileImg"/>
            </div>)}
            <p >사진을 업로드 해주세요</p>
        </div>
    </div>)

}

export default PetRegisterModal;