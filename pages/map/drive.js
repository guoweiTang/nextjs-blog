import Head from 'next/head'
import { useEffect, useState } from 'react'
import qs from 'qs'

export async function getServerSideProps({query}) {
  let parseQuery = qs.parse(query);
  return {
    props: parseQuery
  }
}
export default function Home({ zoom, center, marks, lines }) {
  const [map, setMap] = useState();
  const [isMobile, setIsMobile] = useState(false);
  // const [isIos, setIsIos] = useState(false);
  useEffect(() => {
    console.log('effect map');
    setMap(new BMap.Map('map'));          // 创建Map实例
    // 判断设备类型
    setIsMobile((function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera));
    // setIsIos(/ip(hone|od|ad)/i.test(navigator.userAgent));
  },[])
  useEffect(() => {
    if (!map) return;
    map.centerAndZoom(new BMap.Point(center.lng, center.lat), zoom);  // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    const sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
      scale: 0.6,//图标缩放大小
      strokeColor:'#fff',//设置矢量图标的线填充颜色
      strokeWeight: '2',//设置线宽
    });
    const icons = new BMap.IconSequence(sy, '10', '30');
    // 创建polyline对象
    let linesPois = [];
    if(lines.length > 0) {
      linesPois = lines.map(item => {
        return new BMap.Point(item.lng,item.lat);
      })
    }
    const polyline =new BMap.Polyline(linesPois, {
      enableEditing: false,//是否启用线编辑，默认为false
      enableClicking: true,//是否响应点击事件，默认为true
      icons:[icons],
      strokeWeight:'8',//折线的宽度，以像素为单位
      strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
      strokeColor:"#18a45b" //折线颜色
    });

    map.addOverlay(polyline);          //增加折线
    if (!marks) return;
    let markIcon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
      scale: 1,//图标缩放大小
      fillColor: "red",//填充颜色
      fillOpacity: 0.8//填充透明度
    });
    marks.forEach((mark, i) => {
      let label = new BMap.Label(`集合点${i + 1}`,{offset:new BMap.Size(20,-10)});
      let marker = new BMap.Marker(new BMap.Point(mark.lng, mark.lat), {
        // 指定Marker的icon属性为Symbol
        icon: markIcon
      });
      map.addOverlay(marker);
      marker.setLabel(label);
    })
  }, [map])
  const getGeo = () => {
    // 获取当前位置
    const geo = new BMap.Geolocation();
    geo.getCurrentPosition(res => {
      if(geo.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(res.point, {
          icon: new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
            scale: 1,//图标缩放大小
            fillColor: "green",//填充颜色
            fillOpacity: 0.8//填充透明度
          })
        });
        map.addOverlay(mk);
        map.panTo(res.point);
      }
      else {
        alert('failed' + geo.getStatus());
      } 
    })
  }
  return (
    <div>
      <Head>
        <title>会展路线</title>
        <script src="//api.map.baidu.com/api?v=2.0&ak=pXBmbUqLB315LaGvtYqpjK4hoGuDPHeK"></script>
      </Head>
      <ul className="info">
        {!isMobile ? (
          <>
          {marks && marks.map((item, i) => (
            <li key={i}><a href="javascript:alert('请用移动设备查看')">导航至集合点{i + 1}</a></li>
          ))}
            <li><a href="javascript:alert('请用移动设备查看')">导航至终点</a></li>
          </>
        ) : (
          <>
          {marks && marks.map((item, i) => (
            <li key={i}><a href={`baidumap://map/navi?location=${item.lat},${item.lng}&coord_type=bd09ll&type=BLK&src=ios.baidu.openAPIdemo`}>导航至集合点{i + 1}</a></li>
          ))}
            <li><a href={`baidumap://map/navi?location=${lines.slice(-1)[0].lat},${lines.slice(-1)[0].lng}&coord_type=bd09ll&type=BLK&src=ios.baidu.openAPIdemo`}>导航至终点</a></li>
          </>
        )}
      </ul>
      <div className="geo" onClick={getGeo}><svg t="1609756234094" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2099" width="32" height="32"><path d="M1022.944 533.184a511.2 511.2 0 0 1-489.6 489.6 15.744 15.744 0 0 1-5.344 1.088h-32a15.744 15.744 0 0 1-5.344-1.088 511.2 511.2 0 0 1-489.6-489.6A15.744 15.744 0 0 1 0 528v-32a15.392 15.392 0 0 1 1.056-5.152A511.2 511.2 0 0 1 490.656 1.088 15.744 15.744 0 0 1 496 0h32a15.744 15.744 0 0 1 5.344 1.088 511.2 511.2 0 0 1 489.6 489.76 15.392 15.392 0 0 1 1.056 5.152v32a15.744 15.744 0 0 1-1.056 5.184zM544 65.6V272a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V65.6A447.552 447.552 0 0 0 65.536 480H272a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H65.536A447.552 447.552 0 0 0 480 958.4V752a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16v206.4A447.552 447.552 0 0 0 958.464 544H752a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h206.464A447.552 447.552 0 0 0 544 65.6z" p-id="2100" fill="#1196db"></path></svg></div>
      <div id="map"></div>
    </div>
  )
}