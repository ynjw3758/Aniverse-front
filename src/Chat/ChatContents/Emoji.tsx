import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "./Emoji.scss";


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type imglist ={
   onimage:(data:string) => void
 }
//#endregion

const Emoji =(props:imglist) =>{


    const onClickHandler =(emojiData:EmojiClickData) =>{
         props.onimage(emojiData.emoji);

    }

    return(<div className="Emo_position">
    <EmojiPicker onEmojiClick={onClickHandler}/>
    </div>)

}

export default Emoji;