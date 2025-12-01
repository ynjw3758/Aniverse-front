import "./SlideButton.scss";
import RrightImg from"../../assets/images/RightArrow.png";
import LeftImg from"../../assets/images/LeftArrow.png";
import { useEffect, useState } from "react";


interface props{
   FileIdx:number,
   FileSize:number,
   onChangeIndex: (nextIndex: MoveInfo) => void;
   onLeftMove : () => void;
   onRightMove : () => void;
}

type MoveInfo={
  FileIdx:number,
  Direct:string,
  Event:string
}



const SlideButton: React.FC<props> =({FileIdx ,FileSize ,onChangeIndex ,onLeftMove ,onRightMove}:props) =>{

    const[rightEnable ,setRightEnable]=useState<boolean>(false)
    const[leftEnable ,setLeftEnable]=useState<boolean>(false)

    useEffect(() =>{
         setLeftEnable(FileIdx > 0);               // 0보다 크면 이전 가능
         setRightEnable(FileIdx < FileSize - 1);    // 마지막보다 작으면 다음 가능
    },[FileIdx])

    const RightHandler =() =>{
       if(FileIdx >= FileSize -1 ) return;
       if(FileIdx == 0 ) onChangeIndex({FileIdx:FileIdx+1 ,Direct:"R" ,Event:"F"});
       else if(FileIdx % 2 !== 0) {
        onLeftMove();
        onChangeIndex({FileIdx:FileIdx+1 ,Direct:"R" ,Event:"M"});
    }
       else if(FileIdx % 2 == 0 ){
        onChangeIndex({FileIdx:FileIdx+1 ,Direct:"R" ,Event:"F"});
       }

    }

    const LeftHandler =() =>{
         if(FileIdx < 0) return;
         if(FileIdx == FileSize -1 ){ //마지막 파일에서 그 전 파일 포커스만 이동
            if(FileSize % 2 !== 0){
                onRightMove();
                onChangeIndex({FileIdx:FileIdx-1 ,Direct:"L" ,Event:"M"});
            }else{
                onChangeIndex({FileIdx:FileIdx-1 ,Direct:"L" ,Event:"F"});
            }

         }
         else if(FileIdx == 2){
           onRightMove();
           onChangeIndex({FileIdx:FileIdx-1 ,Direct:"L" ,Event:"M"});
         }else if(FileIdx == 1){
            onChangeIndex({FileIdx:FileIdx-1 ,Direct:"L" ,Event:"F"});
         }else if(FileIdx % 2 !== 0){

                onChangeIndex({FileIdx:FileIdx-1 ,Direct:"L" ,Event:"M"});
        }else if(FileIdx % 2 == 0){
                onRightMove();
                onChangeIndex({FileIdx:FileIdx-1 ,Direct:"L" ,Event:"F"});
        }

 
    }
    return(<div className="SlideButton_Main">
        <img src={LeftImg} id="SlideButton_Left" onClick={LeftHandler} 
                    className={leftEnable ? "" : "disabled"}
        // 🔥 leftEnable이 false면 비활성 UI처럼 보이게
        style={{
          opacity: leftEnable ? undefined : 0.3,
          pointerEvents: leftEnable ? "auto" : "none",
          cursor: leftEnable ? "pointer" : "default",
        }}/>

        <img src={RrightImg} id="SlideButton_Right" onClick={RightHandler}
                     className={rightEnable ? "" : "disabled"}
        style={{
          opacity: rightEnable ? undefined : 0.3,
          pointerEvents: rightEnable ? "auto" : "none",
          cursor: rightEnable ? "pointer" : "default",
        }}/>
    </div>)
}

export default SlideButton