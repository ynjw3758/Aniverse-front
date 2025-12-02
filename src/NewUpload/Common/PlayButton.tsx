import { Fragment, useEffect, useState } from "react";
import "./PlayButton.scss";

interface props{
    IsPlaying:boolean;
    variant?: "main" | "thumb";
}

const PlayButton:React.FC<props> =({variant, IsPlaying}:props) =>{
    const[isPlay, setIsPlay]=useState<boolean>(false);

    useEffect(() =>{
      console.log("영상 클릭 시 재생 및 일시 정지 : " ,variant );
      if(variant == "thumb") return;
      if(IsPlaying == true){
         setIsPlay(true);
      }else{
         setIsPlay(false);
      }
    },[IsPlaying])


    const ToggleHandler =() =>{
        console.log("클릭 :" , variant)
        if(variant == "thumb") return;
        if(isPlay == false){
          setIsPlay(true)
        }else{
            setIsPlay(false);
        }
       
    }

    return(<Fragment>
        <button type="button" className={`PlayButton_Btn--${variant}`} onClick={ToggleHandler}
        >
          <div className={`PlayButton_Stand--${variant}`}>
            {isPlay ? (<div className="PlayButton_Pause">
                <span />
                <span />
                </div>) : <div className="PlayButton_Play" />}
          </div>
        </button>
    </Fragment>)

}
export default PlayButton;