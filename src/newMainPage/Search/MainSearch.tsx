import "./MainSearch.scss";
import SearchImg from"../../assets/images/MainSearch.png";
import {api} from"../../API/Api";

const MainSearch:React.FC =() =>{

    const KeyboardHandler =(e: React.KeyboardEvent<HTMLInputElement>) =>{
      console.log("key : " ,e.key);
      if(e.key =="Enter"){

      }
    }

    return(<div className="MainSearch_Main">
        <img src={SearchImg}/>
        <input placeholder="Search" onKeyDown={KeyboardHandler}/>
    </div>)

}

export default MainSearch;

