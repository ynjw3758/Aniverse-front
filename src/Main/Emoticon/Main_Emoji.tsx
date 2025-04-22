import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "./Main_Emoji.scss";


//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type imglist ={
   onimage:(data:string) => void
 }
//#endregion

const Main_Emoji =(props:imglist) =>{


    const onClickHandler =(emojiData:EmojiClickData) =>{
         props.onimage(emojiData.emoji);

    }

    return(<div className="Emo_position">
    <EmojiPicker onEmojiClick={onClickHandler}/>
    </div>)

}

export default Main_Emoji;