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
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);

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

  useEffect(() => {
      if (!pendingFiles || pendingFiles.length === 0) return;

      let cancelled = false;

      const FileSave = async () => {
        const newImages: File[] = [];
        const newVideos: File[] = [];
        const urlInfos: UrlInfo[] = [];

        for (let i = 0; i < pendingFiles.length; i++) {
          if (cancelled) return;

          const file = pendingFiles[i];
          if (!file) continue;

          if (file.type.startsWith("image")) {
            const imageUrl = URL.createObjectURL(file);
            newImages.push(file);
            urlInfos.push({
              fileName: file.name,
              fileUrl: imageUrl,
              fileType: "image",
              fileTime: 0,
            });
          } else if (file.type.startsWith("video")) {
            const videoUrl = URL.createObjectURL(file);

            const duration = await GetDurationHandler(file);
            if (cancelled) return;

            urlInfos.push({
              fileName: file.name,
              fileUrl: videoUrl,
              fileType: "video",
              fileTime: Math.floor(duration),
            });
            newVideos.push(file);
          }
        }

        if (cancelled) return;

        // ✅ 상태 업데이트는 "한 번씩"만 (prev 기반 append)
        setImgList((prev) => [...prev, ...newImages]);
        setVideoList((prev) => [...prev, ...newVideos]);
        setUrlInfo(urlInfos);

        // ✅ fileType 계산: 기존 길이 + 새로 추가된 길이로 계산
        // (imgList/videoList는 stale일 수 있으니 length만 ref로 들고 가는게 더 완벽하지만,
        //  지금 구조가 "선택 후 바로 모달" 단발이면 이 방식도 잘 동작하는 편)
        const hasImg = (imgList.length + newImages.length) > 0;
        const hasVideo = (videoList.length + newVideos.length) > 0;

        if (!hasImg && !hasVideo) {
          setIsUpload(false);
          setFileType("");
        } else if (hasImg && hasVideo) {
          setFileType("M");
        } else if (hasImg) {
          setFileType("P");
        } else {
          setFileType("V");
        }

        // ✅ 처리 끝났으면 pendingFiles 비우기
        setPendingFiles([]);
      };

      FileSave();

      return () => {
        cancelled = true;
      };
}, [pendingFiles]);

     
    const onChangeImg = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;
          setPendingFiles(Array.from(files));
          event.target.value = "";
          setIsUpload(true);
        
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
             </>)}
               {isUpload && (<>
                   <Modal FileType={fileType} ImgList={imgList} VideoList={videoList} FileUrl={urlInfo} 
                   onReady={() => setIsModalReady(false)} />
               </>)}
             </div>
    </div>)
}
export default MainPageContents;