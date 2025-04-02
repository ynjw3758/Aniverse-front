
import "./Private.scss";


const Private =() =>{


    console.log("활성화되라");

    return(<>
    <div className="TotalArea">
        <img src="/image/private.png"/>
       <div className="TextArea">
           <h3>비공개 계정입니다</h3>
           <p>사진 및 동영상을 보고 싶으면 팔로를 하세요</p>
           <button type="submit">팔로워</button>
       </div>
    </div>
    </>)

}

export default Private;