
import { Map , MapMarker} from 'react-kakao-maps-sdk';
import "./KaMap.scss";
import { Fragment, useState ,useEffect, useRef} from "react";
interface LOcationData {
  onData :(Location_info:any) => void;
  onclose : () => void
}

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkerData {
  marker: any; // kakao.maps.Marker
  content: string;
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  address?: string;
  phone?: string;
  isaddress: boolean;
  isphone: boolean;
}

const KaMap =(props:LOcationData) =>{

  const [markers, setMarkers] = useState<any[]>([])
  const[search, setSearch]=useState<string>("");
  const[checksearch , setChecksearch]=useState<boolean>(false);
  const mapRef1 = useRef<kakao.maps.Map | undefined>(undefined);
  const infoRef = useRef<any>(null);

useEffect(() => {
  const container = document.getElementById('myMap');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  const map = new kakao.maps.Map(container!, options);
  mapRef1.current = map;

  // 장소 검색도 여기서!
}, []);
  

     const searchHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
      setSearch(e.target.value);

     }

    //todo: 추후에 수정해야될 것
    const test =(data:any) =>{
      displayMarker1(data);
      function displayMarker1(place:any) {
        if (!mapRef1.current) return;
        const lat = parseFloat(place.Y);
        const lng = parseFloat(place.X);
        let marker = new kakao.maps.Marker({
          map: mapRef1.current,
          position: new kakao.maps.LatLng(lat, lng),

      });
      let iwContent ='<div style="width:150px;text-align:center;">'+place.content+'</div>'
      let iwPosition= new kakao.maps.LatLng(place.Y, place.X)//인포윈도우 표시 위치입니다
      
      var infowindow = new kakao.maps.InfoWindow({
        position : iwPosition, 
        content : iwContent,
        
      });

      infowindow.open(mapRef1.current, marker);

      }
          }

    const selectlocation = (info:any) =>{
      console.log("위치 검색 데이터 메인 컴포넌트로 전송");
      props.onData(info);
    }

  const EnterSearch=(event: React.KeyboardEvent<HTMLInputElement>) =>{

    if(event.key == 'Enter'){
        const ps = new kakao.maps.services.Places(); 
        if(search !== ""){
          ps.keywordSearch(search, placesSearchCB); 
        
          function placesSearchCB (data:any, status:any) {
        
              if (status === kakao.maps.services.Status.OK) {
        
                  let bounds = new kakao.maps.LatLngBounds();
                  const marker_array:MarkerData[]=[];
                  for (let i=0; i<data.length; i++) {
                          
                    
                    const lat = parseFloat(data[i].y);
                    const lng = parseFloat(data[i].x);
                    const position = new window.kakao.maps.LatLng(lat, lng);

                    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
                    const imageSize = new kakao.maps.Size(36, 37);
                    const spriteSize = new kakao.maps.Size(36, 691); // 전체 sprite 크기
                    const spriteOrigin = new kakao.maps.Point(0, (i * 46)); // index = 0부터 시작

                    const markerImage = new kakao.maps.MarkerImage(
                          imageSrc,
                          imageSize,
                        {
                         spriteSize,
                         spriteOrigin,
                         offset: new kakao.maps.Point(13, 37),
                        }
                      );
                  
                    const marker = new kakao.maps.Marker({
                      map: mapRef1.current,
                      position,
                    });
                   marker_array.push({
                      marker,
                      position: { lat, lng },
                      content: data[i].place_name,
                      id: data[i].id,
                      address: data[i].road_address_name,
                      phone: data[i].phone,
                      isaddress: data[i].road_address_name !== "",
                      isphone: data[i].phone !== "",
                    });

                    let iwPosition= new kakao.maps.LatLng(data[i].y, data[i].x)//인포윈도우 표시 위치입니다
                    const overlayContent = `
                    <div style="
                      background: #3182f6;
                      color: white;
                      font-size: 14px;
                      padding: 6px 10px;
                      border-radius: 999px;
                      border: 2px solid white;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                      white-space: nowrap;
                      font-weight: bold;
                    ">
                      ${data[i].place_name}
                    </div>
                  `;
                    
                    var infowindow = new kakao.maps.InfoWindow({
                      position : iwPosition, 
                      content : overlayContent,
                      
                    });

                    
                    bounds.extend(position);
                    const customOverlay = new kakao.maps.CustomOverlay({
                      position: position,
                      content: overlayContent,
                      yAnchor: 3, // 마커 아래에 붙도록
                    });
                    kakao.maps.event.addListener( marker, 'mouseover' , function() {
                      customOverlay.setMap(mapRef1.current!);
                      //infowindow.open(mapRef1.current!, marker);
                   });
            
                   kakao.maps.event.addListener(marker , 'mouseout' , function() {
                    customOverlay.setMap(null);
                    infowindow.close();
                   });
                   
                   
                  }

                  setMarkers(marker_array);    
                  mapRef1.current?.setBounds(bounds);
                  setChecksearch(true);
  
              } 
              else return;
                  
          }
      
        }
        else{
          setMarkers([]);
        }
        function displayMarker(place:any) {
          let marker = new kakao.maps.Marker({
              map: mapRef1.current,
              position: new kakao.maps.LatLng(place.y, place.x),
  
          });
          let iwContent ='<div style="width:150px;text-align:center;">'+place.place_name+'</div>'
          let iwPosition= new kakao.maps.LatLng(place.y, place.x)//인포윈도우 표시 위치입니다
          
          var infowindow = new kakao.maps.InfoWindow({
            position : iwPosition, 
            content : iwContent,
            
          });


          kakao.maps.event.addListener( marker, 'mouseover' , function() {
            infowindow.open(mapRef1.current!, marker);
         });
  
         kakao.maps.event.addListener(marker , 'mouseout' , function() {
          infowindow.close();
         });
         
        }

    }  
  }

  const CancelHandler =() =>{
    props.onclose()
  }
/*
                   <h3>{id.content}</h3>
           {id.isaddress ? (<p>{id.address}</p>) :(<></>)}
           {id.isphone ? (<p>{id.phone}</p>) :(<></>)}
           */
    return (<>
     <div className="KMap_main" >     
      <div id='myMap' style={{
          width: '63vw', 
          height: '81.5vh'
      }} />
      </div>
      <div className="Kmap_search">
        <input onChange={searchHandler} placeholder='위치 검색..' onKeyDown={EnterSearch}/>
        <img src="/image/Map_Cancel.png" onClick={CancelHandler}/>
       </div>
        {checksearch && (<div className="item_list" >
          {markers.map(({ marker, content, address, phone, position}, idx) =>(<div  key={idx} className="Kamp_list" onMouseOver={() =>{ 
 if (!mapRef1.current) return;

 if (infoRef.current instanceof kakao.maps.CustomOverlay) {
   infoRef.current.setMap(null);
 }

 const latLng = new kakao.maps.LatLng(position.lat, position.lng);

 const overlayContent = `
   <div style="
     background: #3182f6;
     color: white;
     font-size: 14px;
     padding: 6px 10px;
     border-radius: 999px;
     border: 2px solid white;
     box-shadow: 0 2px 6px rgba(0,0,0,0.3);
     white-space: nowrap;
     font-weight: bold;
   ">
     ${content}
   </div>
 `;

 const customOverlay = new kakao.maps.CustomOverlay({
   position: latLng,
   content: overlayContent,
   yAnchor: 2,
 });

 customOverlay.setMap(mapRef1.current);
 infoRef.current = customOverlay;
           }}
           onClick={() =>{
            selectlocation(idx);
           }}>
            <h3>{content}</h3>
           <p>{address}</p>
           <p>{phone}</p>
          </div>))}
       </div>)}
       
       </>)
}


export default KaMap;


