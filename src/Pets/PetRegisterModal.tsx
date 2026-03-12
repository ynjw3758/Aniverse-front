import "./PetRegisterModal.scss";
import beforeImg from"../assets/images/begorearrow.png";
import MaleImg from"../assets/images/male.png";
import FemaleImg from"../assets/images/female.png";
import { useEffect, useState } from "react";
import SpeciesPicker from "./components/SpeciesPicker";
import BreedPicker from "./components/BreedPicker";

type speciesInfo={
   title:string,
   code:string,
   id:number
}


const PetRegisterModal =() =>{
    const[isprofile, setIsprofile]=useState<boolean>(false);
    const[isType, setIsType]=useState<string>("form")
    const[imgfile, setimgfile]=useState<string>("")
    const[breedTitle, setBreedTitle]=useState<speciesInfo>({
        title:"",
        code:"",
        id:0
    })
    const[species, setSpecies]=useState<boolean>(false)
    const [gender, setGender] = useState<'male' | 'female' | null>(null);

    useEffect(() =>{
        return () => {
            if (imgfile) URL.revokeObjectURL(imgfile);
        };
    },[imgfile])

        const handleChange =(event: React.ChangeEvent<HTMLInputElement>) =>{
       const files = event.target.files;
       if (!files || files.length === 0) return;
       const file = files[0];
       const imageUrl = URL.createObjectURL(file);
       setimgfile(imageUrl);
       setIsprofile(true);
    }

    const openSpeciesModal =() =>{
         setIsType("species")
    }

    const NextHandler =(info:speciesInfo) =>{
        console.log("다음으로 ")
      setIsType("breed")
      setBreedTitle(info)
    }

    return(<div className="PetRegisterModal_Main">
        {isType == "form" && (<>
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
                  <div className={`PetRegister_male ${gender === 'male' ? 'active' : ''}`} onClick={() =>{
                    setGender("male")
                  }}>
                      <img src={MaleImg}/>
                      <p>수컷</p>
                  </div>
                  <div className={`PetRegister_female ${gender === 'female' ? 'active' : ''}`} onClick={() =>{
                    setGender("female")
                  }}>
                      <img src={FemaleImg}/>
                      <p>암컷</p>
                  </div>
               </div>
                <div className="PetRegister_Field">
                    <label>종</label>
                    <button 
                        type="button"
                        className="PetRegister_Select"
                        onClick={openSpeciesModal}
                    >
                        {species ? "test" : "어떤 종인가요?"}
                    </button>
                </div>
            </div>
        </div>
        </>)}
        {isType == "species" && (<SpeciesPicker next={NextHandler}/>)}
        {isType == "breed" && (<BreedPicker spInfo={breedTitle} />)}
    </div>)

}

export default PetRegisterModal;