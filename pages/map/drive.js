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
  useEffect(() => {
    console.log('effect map');
    setMap(new BMap.Map('map'));          // 创建Map实例
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
        {marks && marks.map((item, i) => (
          <li key={i}><a href={`baidumap://map/navi?location=${item.lat},${item.lng}&coord_type=bd09ll&type=BLK&src=ios.baidu.openAPIdemo`}>导航至集合点{i + 1}</a></li>
        ))}
        <li><a href={`baidumap://map/navi?location=${lines.slice(-1)[0].lat},${lines.slice(-1)[0].lng}&coord_type=bd09ll&type=BLK&src=ios.baidu.openAPIdemo`}>导航至终点</a></li>
      </ul>
      <div className="geo" onClick={getGeo}><svg t="1609756234094" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2099" width="32" height="32"><path d="M1022.944 533.184a511.2 511.2 0 0 1-489.6 489.6 15.744 15.744 0 0 1-5.344 1.088h-32a15.744 15.744 0 0 1-5.344-1.088 511.2 511.2 0 0 1-489.6-489.6A15.744 15.744 0 0 1 0 528v-32a15.392 15.392 0 0 1 1.056-5.152A511.2 511.2 0 0 1 490.656 1.088 15.744 15.744 0 0 1 496 0h32a15.744 15.744 0 0 1 5.344 1.088 511.2 511.2 0 0 1 489.6 489.76 15.392 15.392 0 0 1 1.056 5.152v32a15.744 15.744 0 0 1-1.056 5.184zM544 65.6V272a16 16 0 0 1-16 16h-32a16 16 0 0 1-16-16V65.6A447.552 447.552 0 0 0 65.536 480H272a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H65.536A447.552 447.552 0 0 0 480 958.4V752a16 16 0 0 1 16-16h32a16 16 0 0 1 16 16v206.4A447.552 447.552 0 0 0 958.464 544H752a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h206.464A447.552 447.552 0 0 0 544 65.6z" p-id="2100" fill="#1196db"></path></svg></div>
      <div id="map"></div>
    </div>
  )
}