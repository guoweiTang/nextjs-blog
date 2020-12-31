import Head from 'next/head'
import { useEffect } from 'react'
import qs from 'qs'

export async function getServerSideProps({query}) {
  let parseQuery = qs.parse(query);
  return {
    props: {
      marks: parseQuery.marks ? parseQuery.marks.map(item => JSON.parse(item)) : [],
      lines: parseQuery.lines ? parseQuery.lines.map(item => JSON.parse(item)) : [],
    }
  }
}
export default function Home({ marks, lines }) {
  useEffect(() => {
    // 百度地图API功能
    const map = new BMap.Map("map");    // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);  // 初始化地图,设置中心点坐标和地图级别
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
    console.log(linesPois)
    const polyline =new BMap.Polyline(linesPois, {
      enableEditing: false,//是否启用线编辑，默认为false
      enableClicking: true,//是否响应点击事件，默认为true
      icons:[icons],
      strokeWeight:'8',//折线的宽度，以像素为单位
      strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
      strokeColor:"#18a45b" //折线颜色
    });

    map.addOverlay(polyline);          //增加折线
  }, [])
  return (
    <div>
      <Head>
        <title>会展路线</title>
        <script src="//api.map.baidu.com/api?v=2.0&ak=pXBmbUqLB315LaGvtYqpjK4hoGuDPHeK"></script>
      </Head>
      <div id="map"></div>
      {marks.length > 0 && (
        <ul>
          <li>marks</li>
          {marks.map((item, i) => (
            <li key={i}>{`lat: ${item.lat} lng: ${item.lng}`}</li>
          ))}
        </ul>
      )}
      {lines.length > 0 && (
        <ul>
          <li>lines</li>
          {lines.map((item, i) => (
            <li key={i}>{`lat: ${item.lat} lng: ${item.lng}`}</li>
          ))}
        </ul>
      )}
    </div>
  )
}