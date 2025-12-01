import { Fragment } from "react";
import "./Video.scss";

interface props{
    FileInfo: File[]
    UrlInfo:UrlInfo[]
}

type UrlInfo={
  fileName:string,
  fileUrl:string,
  fileType:string
}


const Video : React.FC<props> =({FileInfo, UrlInfo}:props) =>{

    return(<Fragment>
        <div className="UploadVideo_Main">
          <section className="UploadV">
            <video />
          </section>
        </div>
    </Fragment>)
}
export default Video;