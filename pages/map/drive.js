import Head from 'next/head'
import { useEffect } from 'react'
import qs from 'qs'

export async function getServerSideProps({query}) {
  let parseQuery = qs.parse(query);
  return {
    props: parseQuery
  }
}
export default function Home({ zoom, center, marks, lines }) {
  useEffect(() => {
    // 百度地图API功能
    const map = new BMap.Map("map");    // 创建Map实例
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
        alert('failed'+this.getStatus());
      } 
      console.log(res)
    })
    console.log(geo.getStatus())
  }, [])
  return (
    <div>
      <Head>
        <title>会展路线</title>
        <script src="//api.map.baidu.com/api?v=2.0&ak=pXBmbUqLB315LaGvtYqpjK4hoGuDPHeK"></script>
      </Head>
      <div id="map"></div>
    </div>
  )
}