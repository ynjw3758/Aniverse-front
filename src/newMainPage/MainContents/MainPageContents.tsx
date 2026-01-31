import { useContext, useEffect, useState } from "react";
import user_info from "../../Context/Userdata";
import "./MainPageContents.scss";
import UploadImg from"../../assets/images/Mainplus.png";
import Modal from "../../NewUpload/Common/Modal/Modal";


type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string
  fileTime:number
}

const MainPageContents:React.FC =() =>{

    const[imgList ,setImgList]=useState<File[]>([]);
    const[videoList ,setVideoList]=useState<File[]>([]);
    const[urlInfo,setUrlInfo]=useState<UrlInfo[]>([]);
    const[fileType, setFileType]=useState<string>("");
    const[isUpload ,setIsUpload]=useState<boolean>(false);
    const [isModalReady, setIsModalReady] = useState(false);

    const login_info = useContext(user_info);

    const GetDurationHandler =async(file:File):Promise<number> =>{
      return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const video = document.createElement("video");
          video.preload = "metadata";

      video.onloadedmetadata = () => {
        const duration = video.duration; // 초 단위
        URL.revokeObjectURL(url);
        resolve(duration);
      };

      video.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(e);
      };

      video.src = url;
    });
    }

    const onChangeImg = async(event: React.ChangeEvent<HTMLInputElement>) => {
      const array=event.target.files;
       setIsUpload(true);
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
                      fileTime:0
                    });
           }else{
               console.log("동영상");
               const VideoUrl = URL.createObjectURL(file);
               const Duration:number = await GetDurationHandler(file);
               const SecondDuration = Math.floor(Duration);
               console.log("총 영상 길이 :" ,SecondDuration )
               newVideos.push(file);
               UrlInfos.push({
                      fileName: file.name,
                      fileUrl: VideoUrl,
                      fileType: "video",
                      fileTime:SecondDuration
               });
           }
        }
      }
        
        if (newImages.length > 0) {
            setImgList(prev => [...prev, ...newImages]);
        }
        if (newVideos.length > 0) {
            setVideoList(prev => [...prev, ...newVideos]);

        }
        const nextImgList = [...imgList, ...newImages];
        const nextVideoList = [...videoList, ...newVideos];

        const hasImg = nextImgList.length > 0;
        const hasVideo = nextVideoList.length > 0;

        console.log("nextImgList :", nextImgList, "nextVideoList :", nextVideoList);
          if (!hasImg && !hasVideo) {
                setIsUpload(false);
                setFileType("");
          } else {
            if (hasImg && hasVideo) {
                console.log("멀티 컴포넌트 활성화");
                setFileType("M");
            } else if (hasImg) {
                console.log("2222");
                setFileType("P");
            } else if (hasVideo) {
                console.log("2");
                setFileType("V");
            }
                
          }
            setUrlInfo(UrlInfos);
            setImgList(nextImgList);
            setVideoList(nextVideoList);
            //setIsUpload(true);
        
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
               {!isModalReady  && (<div className="UploadModal_Loading_Overlay">
             <div className="UploadModal_Spinner" />
              <p>파일 준비 중입니다...</p>
             </div>)}
             </>)}
               {isUpload && (<>
                   <Modal FileType={fileType} ImgList={imgList} VideoList={videoList} FileUrl={urlInfo} 
                   onReady={() => setIsModalReady(true)} />
               </>)}
             </div>
    </div>)
}
export default MainPageContents;