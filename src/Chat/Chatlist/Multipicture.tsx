
//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import { useEffect ,useState } from "react";
//#endregion

//                            +--------------------
//----------------------------+ 내부 라이브로리
//                            +--------------------
//#region type 
import "./Multipicture.scss";
import StylePickture from "./StylePickture";
//#endregion

//                            +------------------
//----------------------------+ props 정리
//                            +------------------
//#region
type image ={
    Image:object
   }
//#endregion


const Multipicture =(props:image) =>{

//              +-----------------
//--------------+ 상태 관리
//              +-----------------
//#region type
const[isSingle, setIsSingle]=useState<boolean>(false);
const[isTwo, setIsTwo]=useState<boolean>(false);
const[isTree, setIsTree]=useState<boolean>(false);
const[isFour, setIsFour]=useState<boolean>(false);
const[img, setImg]=useState<string[]>([]);

//#endregion

//              +-----------------
//--------------+ 전역 변수
//              +-----------------
//#region type
const imagesize =isSingle ? "MultiPicture_Single" : "MultiPicture_multi"; 
let img_cnt:number=0;
//#endregion 

useEffect(() =>{
   
    let title_img :string[]=[...img];
    const images:object=props.Image;
    Object.entries(images).map((key) =>{
      if(img_cnt <4){
        img_cnt++
        title_img.push(key[1]);
        setImg(title_img);
      }
        console.log("카운트 :" , img_cnt);
    })

},[props.Image]);
useEffect(() =>{
  console.log("이미지 갯수 :"  , img)
    if(img.length ==1){
        setIsSingle(true);
        setIsTwo(false);
        setIsTree(false);
        setIsFour(false);
      }
      else if(img.length == 2){
        setIsTwo(true);
        setIsSingle(false);
        setIsTree(false);
        setIsFour(false);
      }
      else if(img.length == 3){
        setIsTree(true);
        setIsSingle(false);
        setIsTwo(false);
        setIsFour(false);
      }
      else if(img.length ==4){
        setIsFour(true);
        setIsSingle(false);
        setIsTwo(false);
        setIsTree(false);
      }
},[img]);

return(<>
{isSingle && (<>
    <div className="MultiPicture_Single"> 
   {img.map((data) =>(<>
      <img src={data}/>
   </>))}
</div>
</>)}
{isTwo && (<>
    <div className="MultiPicture_Two"> 
   {img.map((data) =>(<>
      <img src={data}/>
   </>))}
</div>
</>)}
{isTree && (<>
    <div className="MultiPicture_Tree"> 
   {img.map((data ,i) =>(<div className="MultiPicture_flex">
    <StylePickture Image={data} Id={i}/>
   </div>))}
</div>
</>)}
{isFour && (<>
    <div className="MultiPicture_multi"> 
   {img.map((data) =>(<>
      <img src={data}/>
   </>))}
</div>
</>)}
</>)
}

export default Multipicture;