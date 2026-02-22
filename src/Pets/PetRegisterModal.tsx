import "./PetRegisterModal.scss";
import beforeImg from"../assets/images/begorearrow.png";
import MaleImg from"../assets/images/male.png";
import FemaleImg from"../assets/images/female.png";
import { useState } from "react";

const PetRegisterModal =() =>{
    const[isprofile, setIsprofile]=useState<boolean>(false);
    const[imgfile, setimgfile]=useState<string>("");
    const [sex, setSex] = useState("");

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
          </label>
            </>)}
            {isprofile && (<div className="PetRegister_ProfileCircle">
                <img src={imgfile} className="PetRegister_ProfileImg"/>
            </div>)}
            <p >사진을 업로드 해주세요</p>
            <div className="PetRegister_InputForm">
               <div className="PetRegister_InputName">
                   <h4>이름</h4>
                    <input placeholder="이름을 입력해주세요..."/>
               </div>
               <div className="PetRegister_SelectSex">
                  <div className="PetRegister_male" onClick={() =>{
                    setSex("male")
                  }}>
                      <img src={MaleImg}/>
                      <p>수컷</p>
                  </div>
                  <div className="PetRegister_female" onClick={() =>{
                    setSex("female")
                  }}>
                      <img src={FemaleImg}/>
                      <p>암컷</p>
                  </div>
               </div>
            </div>
        </div>
    </div>)

}

export default PetRegisterModal;