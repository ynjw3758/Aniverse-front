import { useContext, useEffect, useState } from "react";
import user_info from "../../Context/Userdata";
import "./MainPageContents.scss";
import UploadImg from"../../assets/images/Mainplus.png";
import Modal from "../../NewUpload/Common/Modal";


type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string
}

const MainPageContents:React.FC =() =>{

    const[imgList ,setImgList]=useState<File[]>([]);
    const[videoList ,setVideoList]=useState<File[]>([]);
    const[urlInfo,setUrlInfo]=useState<UrlInfo[]>([]);
    const[fileType, setFileType]=useState<string>("");
    const[isImg, setIsImg]=useState<boolean>(false);
    const[isVideo, setIsVideo]=useState<boolean>(false);
    const[isUpload ,setIsUpload]=useState<boolean>(false);

    const login_info = useContext(user_info);

    useEffect(() =>{
      if(!isImg && !isVideo) return;
        if(isImg == true){
          setFileType("P");
        }
        else if(isVideo == true){
          setFileType("V");
        }

        else if(isImg && isVideo){
            console.log("멀티 컴포넌트 활성화");
            setFileType("M");

        }
       setIsUpload(true);
      
    }, [imgList, videoList])

    const onChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
      const array=event.target.files;
      if(!array) return;
        const newImages: File[] = [];
        const newVideos: File[] = [];
        const UrlInfos:UrlInfo[]=[];
      for(let count =0; count<array.length;count++){
        if (array[count] !== null) {
            const file:File = array[count];
           if (file && file.type.substring(0, 5) === "image") {
               console.log("이미지");
               const ImageUrl = URL.createObjectURL(file);
               newImages.push(file);
               UrlInfos.push({
                      fileName: file.name,
                      fileUrl: ImageUrl,
                      fileType: "image",
                    });
           }else{
               console.log("동영상");
               const VideoUrl = URL.createObjectURL(file);
               newVideos.push(file);
               UrlInfos.push({
                      fileName: file.name,
                      fileUrl: VideoUrl,
                      fileType: "video",
               });
           }
        }
      }
      setUrlInfo(UrlInfos);
        if (newImages.length > 0) {
            setImgList(prev => [...prev, ...newImages]);
            setIsImg(true);
        }
        if (newVideos.length > 0) {
            setVideoList(prev => [...prev, ...newVideos]);
            setIsVideo(true);
        }
    }
    return (<div className="MainPageContents_Body">
             <div className="MainPageContents_FavoriteContents">
               <h2>환영합니다 , {`${login_info.UserNickName}`}님</h2>
               <label className="MainPageContents_UploadContents">
                 <img src={UploadImg}/>
                 <input type="file" 
                    style={{display:"none"}}
                    onChange={onChangeImg}
                    multiple={true}
                    accept=".jpg, .jpeg, .png , .mp4"
                        />
                    <h3>업로드</h3>
               </label>
               {isUpload && (<>
                   <Modal FileType={fileType} ImgList={imgList} VideoList={videoList} FileUrl={urlInfo}/>
               </>)}
             </div>
    </div>)
}
export default MainPageContents;