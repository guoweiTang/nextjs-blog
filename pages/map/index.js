import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import utilStyles from '../../styles/utils.module.css'
import qs from 'qs'

let marksTemp = [];
export default function Map() {
  const [drawingManager, setDrawingManager] = useState();
  const [active, setActive] = useState(0);
  const [marks, setMarks] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    console.log('effect');
    const map = new BMapGL.Map('map', {enableMapClick:false}); // 创建Map实例,GL版命名空间为BMapGL(鼠标右键控制倾斜角度)
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);      // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);                               // 开启鼠标滚轮缩放

    const styleOptions = {
        strokeColor: '#5E87DB',   // 边线颜色
        fillColor: '#5E87DB',     // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 2,          // 边线宽度，以像素为单位
        strokeOpacity: 1,         // 边线透明度，取值范围0-1
        fillOpacity: 0.2          // 填充透明度，取值范围0-1
    };

    // 实例化鼠标绘制工具
    setDrawingManager(new BMapGLLib.DrawingManager(map, {
      isOpen: true,        // 是否开启绘制模式
      enableCalculate: false, // 绘制是否进行测距测面
      enableSorption: true,   // 是否开启边界吸附功能
      sorptiondistance: 20,   // 边界吸附距离
      polylineOptions: styleOptions,   // 线的样式
    }));
  },[])

  useEffect(() => {
    if(!drawingManager) return;
    drawingManager.addEventListener("markercomplete", function(e) {
      marksTemp.push(JSON.stringify({lat: e.latLng.lat, lng: e.latLng.lng}));
      setMarks([...marksTemp]);
    });
    drawingManager.addEventListener('polylinecomplete', function(e, overlay) {
      setLines(e.points.map(item => (JSON.stringify(item.latLng))))
    });
  }, [drawingManager])
  
  const draw = (e) => {
    e.persist()
    switch(e.target.id) {
        case 'marker': {
            var drawingType = BMAP_DRAWING_MARKER;
            setActive(active === 0 ? -1 : 0);
            break;
        }
        case 'polyline': {
            var drawingType = BMAP_DRAWING_POLYLINE;
            setActive(active === 1 ? -1 : 1);
            break;
        }
    }
    // 进行绘制
    if (active !== -1 && drawingManager.getDrawingMode() === drawingType) {
        drawingManager.close();
    } else {
        drawingManager.setDrawingMode(drawingType);
        drawingManager.open();
    }
  };
  const openNewWindow = () => {
    location.href = `/map/drive?${qs.stringify({marks, lines})}`
  }
  return (
    <div>
      <Head>
        <title>会展导航绘制</title>
        <script src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=pXBmbUqLB315LaGvtYqpjK4hoGuDPHeK"></script>
        <link href="//mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css" rel="stylesheet" />
        <script src="//mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js"></script>
      </Head>
      <ul className="drawing-panel">
        <li className={`bmap-btn bmap-marker ${active === 0 ? utilStyles.beDrawing : utilStyles.noDrawing}`} id="marker" onClick={draw}></li>
        <li className={`bmap-btn bmap-polyline ${active === 1 ? utilStyles.beDrawing : utilStyles.noDrawing}`} id="polyline" onClick={draw}></li>
        <li className={`bmap-btn ${utilStyles.ok}`} onClick={openNewWindow}>
          生成路线
        </li>
      </ul>
      <div id="map"></div>
    </div>
  )
}