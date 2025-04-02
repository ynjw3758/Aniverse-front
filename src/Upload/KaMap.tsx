
import { Map , MapMarker} from 'react-kakao-maps-sdk';
import "./KaMap.scss";
import { Fragment, useState ,useEffect, useRef} from "react";
interface LOcationData {
  onData :(Location_info:any) => void;
}
const KaMap =(props:LOcationData) =>{

  const [markers, setMarkers] = useState<any[]>([])
  const [position, setPosition] = useState<any[]>([])
  const[search, setSearch]=useState<string>("");
  const[checksearch , setChecksearch]=useState<boolean>(false);
  const[markerid, setMarkerid]=useState({X :0 , Y:0, content:""});
  const[id, setId] = useState<string>("");

  // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {

    const container = document.getElementById('myMap');
    const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4
  };
  var map = new window.kakao.maps.Map(container!, options);
    if(search == ""){
      console.log("제로");
      setMarkers([]);
      setChecksearch(false);
       console.log("makers  :" , markers);
    }
}, [search]);
/*
useEffect(() => {
  console.log("왜 갑자기");
  const identifier = setTimeout(() => {
    console.log("임력값 :" , search);
  
    const container = document.getElementById('myMap');
    const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4
  };
  var map = new window.kakao.maps.Map(container!, options);
  if(search == ""){
    console.log("제로");
    setMarkers([]);
    setChecksearch(false);
     console.log("makers  :" , markers);
  }
  });
  return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
  };
}, [search]);
*/
  /*
useEffect(() => {
  console.log("임력값 :" , search);
  
  const container = document.getElementById('myMap');
  const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 4
};
var map = new window.kakao.maps.Map(container!, options);

}, [search]);
*/
     const searchHandler =(e:React.ChangeEvent<HTMLInputElement>) =>{
      setSearch(e.target.value);
      console.log("검색 : " , search);

     }
     const clickHandler =() =>{
      console.log("마커 리렌더링 : " , markers);
      
      const container = document.getElementById('myMap');
    const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3
    };
    
      const map = new kakao.maps.Map(container!, options);
      
      
     /*
      if (mapRef.current) {
        var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };
        var map = new window.kakao.maps.Map(mapRef.current, options);
    }
    */
      const ps = new kakao.maps.services.Places(); 
    
      if(search !== ""){
        console.log("검색 : " , search);
        ps.keywordSearch(search, placesSearchCB); 
      
        function placesSearchCB (data:any, status:any, pagination:any) {
      
          console.log("data : " , data);
            if (status === kakao.maps.services.Status.OK) {
      
                let bounds = new kakao.maps.LatLngBounds();
      
                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);
                    //position.push({locate :{lat:data[i].y , lng:data[i].x , contents:data[i].place_name}});
                    if(data[i].phone == "" && data[i].road_address_name == "" ){
                      markers.push({
                        position: {
                          lat: data[i].y,
                          lng: data[i].x,
                        },
                        content: data[i].place_name,
                        id:data[i].id,
                        isaddress:false,
                        isphone:false
                      })
                    } 
                    else if(data[i].phone !== "" && data[i].road_address_name == ""){
                      markers.push({
                        position: {
                          lat: data[i].y,
                          lng: data[i].x,
                        },
                        content: data[i].place_name,
                        id:data[i].id,
                        phone:data[i].phone,
                        isaddress:false,
                        isphone:true
                      })
                    }
                      else if(data[i].phone == "" && data[i].road_address_name !== ""){
                        markers.push({
                          position: {
                            lat: data[i].y,
                            lng: data[i].x,
                          },
                          content: data[i].place_name,
                          id:data[i].id,
                          address:data[i].road_address_name,
                          isaddress:true,
                          isphone:false
                        })
                      }
                      else if(data[i].phone !== "" && data[i].road_address_name !== "" ){
                        markers.push({
                          position: {
                            lat: data[i].y,
                            lng: data[i].x,
                          },
                          content: data[i].place_name,
                          address:data[i].road_address_name,
                          id:data[i].id,
                          phone:data[i].phone,
                          isaddress:true,
                          isphone:true
                        })
                      }
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                    
                    
                }


                setMarkers(markers);    
                map.setBounds(bounds);
                setChecksearch(true);

            } 
        }
    
      }
      else{
        setMarkers([]);
      }

      function displayMarker(place:any) {
        console.log("장소 데이터 : " , place);
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),

        });
        let iwContent ='<div style="width:150px;text-align:center;">'+place.place_name+'</div>'
        let iwPosition= new kakao.maps.LatLng(place.y, place.x)//인포윈도우 표시 위치입니다
        
        var infowindow = new kakao.maps.InfoWindow({
          position : iwPosition, 
          content : iwContent,
          
        });
        
        
        kakao.maps.event.addListener( marker, 'mouseover' , function() {
          setId(place.id);
          infowindow.open(map, marker);
          console.log("id :" , place.id );
       });

       kakao.maps.event.addListener(marker , 'mouseout' , function() {
        infowindow.close();
       });
      }
    
    }
    const mark =(data:any) =>{
      console.log("data :" , data);
      /*
      const container = document.getElementById('myMap');
      const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 4
    };
    var map = new window.kakao.maps.Map(container!, options);
        let marker = new kakao.maps.Marker({
          map:map,
          position: new kakao.maps.LatLng(data.X, data.Y),
  
      });
      
      let iwContent ='<div style="width:150px;text-align:center;">'+data.content+'</div>'
      let iwPosition= new kakao.maps.LatLng(data.X, data.Y)//인포윈도우 표시 위치입니다

      
      var infowindow = new kakao.maps.InfoWindow({
        //map:Map,
        position : iwPosition, 
        content : iwContent,
        
      });
*/
      //infowindow.close();
      
  
    
    }
    //todo: 추후에 수정해야될 것
    const test =(id:any) =>{
      console.log("id :" , id);
      mark(markerid);
          }

    const selectlocation = (info:any) =>{
      console.log("위치 검색 데이터 메인 컴포넌트로 전송");
      props.onData(info);
    }

    return (  <>
     <div className="KMap_main"ref={mapRef}>     
      <div id='myMap' style={{
          width: '63vw', 
          height: '81.5vh'
      }}></div>
      </div>
        <div className="search">
        <input onChange={searchHandler} placeholder='위치 검색..'/>
        <button type="button" 
        onClick={clickHandler} 
        id="input_id"/>
       </div>
        {checksearch && (<div className="item_list" >
          {markers.map((id) =>(<div ref={mapRef} key={id.id} className="Kamp_list" onMouseOver={() =>{ 
           setMarkerid({X:id.position.lat, Y:id.position.lng , content:id.content});
           test(markerid);
           }}
           onClick={() =>{
            selectlocation(id);
           }}>
           <h3>{id.content}</h3>
           {id.isaddress ? (<p>{id.address}</p>) :(<></>)}
           {id.isphone ? (<p>{id.phone}</p>) :(<></>)}
          </div>))}
       </div>)}

       </>)
}


export default KaMap;


