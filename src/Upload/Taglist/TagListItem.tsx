
import "./TagListItem.scss";
import Deleteimg from "../../assets/images/delete.png"
interface TagItem{
    Nickname:string,
    Profile:string,
    Id:string
   }

const TagListItem =(props:TagItem) =>{
    return(<div className="TagListItems_Stand">
                 <img src={props.Profile}/>
           <div className="TagListItems_Profiles"> 
               <h3>{props.Nickname}</h3>
               <p>{props.Id}</p>
           </div>
           <div className="TagListItems_delete">
            <img src={Deleteimg}/>
           </div>
    </div>)

}

export default TagListItem;