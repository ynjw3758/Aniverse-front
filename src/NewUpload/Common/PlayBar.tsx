import { Fragment, MouseEvent, TouchEvent } from "react";
import "./PlayBar.scss";

interface props{
  FileTime:number,
  currentTime:number,
  onSeek : (values:number) => void
}

const PlayBar:React.FC<props> =({FileTime ,currentTime ,onSeek}:props) =>{


  const CurrentTime : number =0;
  const Duration:number=FileTime
   console.log("총 길이 :" , Duration)
    const stopEvent = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    };


    return(<Fragment>
    <div className="PlayBar_Wrapper">
      <input type="range"
             min={0}
             max={Duration}
             value={currentTime}
             className="PlayBar_Progress"
             onClick={(e) => e.stopPropagation()}
             onMouseDown={stopEvent}
             onTouchStart={stopEvent}
             onChange={(e) => onSeek(Number(e.target.value))}
      />
    </div>
    </Fragment>)

}
export default PlayBar;