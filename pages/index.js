/*
 * @Author: your name
 * @Date: 2020-12-28 14:38:49
 * @LastEditTime: 2020-12-28 17:37:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nextjs-blog/pages/index.js
 */
import Link from 'next/link'
import Layout from '../components/layout'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import { useEffect } from 'react'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
export default function Home({ allPostsData }) {
  useEffect(() => {
    // 判断设备类型
    const isMobile = (function(a){return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
    const isIos = (() => {
      return /ip(hone|od|ad)/i.test(navigator.userAgent)
    })();
  }, [])
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <a href="https://itunes.apple.com/cn/app/id477927812" id="openApp">贴吧客户端</a><br/>
      <a href='bdapp://map/navi?location=40.057023,116.307852&coord_type=bd09ll&src=andr.baidu.openAPIdemo&viaPoints={"viaPoints":[{"name":"日坛公园","lat":39.9213420718041,"lng":116.45043700279867},{"name":"天坛公园","lat":39.8882429566928,"lng":116.41724596166326},{"name":"北京西站","lat":39.90083463437583,"lng":116.32810279404168}]}'>android驾车导航</a><br/>
      <a href='baidumap://map/navi?location=40.074551885807665,116.24979791494071&coord_type=bd09ll&src=ios.baidu.openAPIdemo&viaPoints={"viaPoints":[{"lng":116.25233422546484,"lat":40.07478643285409,"name":"自定义拐点"},{"lng":116.25198196011426,"lat":40.07466374680829,"name":"自定义拐点"},{"lng":116.25221210680998,"lat":40.074255994526055,"name":"自定义拐点"},{"lng":116.25214165373986,"lat":40.07420908481364,"name":"自定义拐点"},{"lng":116.25236240669288,"lat":40.07376885361772,"name":"自定义拐点"},{"lng":116.25217922871059,"lat":40.0737075096988,"name":"自定义拐点"},{"lng":116.25195377888622,"lat":40.07407196392903,"name":"自定义拐点"},{"lng":116.25165317912038,"lat":40.07397453576297,"name":"自定义拐点"},{"lng":116.25160151353565,"lat":40.07410804839932,"name":"自定义拐点"},{"lng":116.25160621040698,"lat":40.07432094638179,"name":"自定义拐点"},{"lng":116.2510237983607,"lat":40.07532769216143,"name":"自定义拐点"},{"lng":116.2506574423961,"lat":40.0752266574199,"name":"自定义拐点"},{"lng":116.25094864841924,"lat":40.07453384369344,"name":"自定义拐点"},{"lng":116.25078895479365,"lat":40.07447610889556,"name":"自定义拐点"},{"lng":116.25106607020277,"lat":40.07411165684529,"name":"自定义拐点"},{"lng":116.25116470450094,"lat":40.07398896957422,"name":"自定义拐点"},{"lng":116.25022533023274,"lat":40.0737002927635,"name":"自定义拐点"},{"lng":116.25017366464797,"lat":40.073859065162026,"name":"自定义拐点"},{"lng":116.24999988040837,"lat":40.07413691596168,"name":"自定义拐点"},{"lng":116.24979791494071,"lat":40.074551885807665,"name":"自定义拐点"}]}'>ios驾车导航</a><br/>
      <a href='baidumap://map/direction?origin=40.07478643285409,116.25233422546484&destination=40.074551885807665,116.24979791494071&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo&viaPoints={"viaPoints":[{"lng":116.25233422546484,"lat":40.07478643285409,"name":"自定义拐点"},{"lng":116.25198196011426,"lat":40.07466374680829,"name":"自定义拐点"},{"lng":116.25221210680998,"lat":40.074255994526055,"name":"自定义拐点"},{"lng":116.25214165373986,"lat":40.07420908481364,"name":"自定义拐点"},{"lng":116.25236240669288,"lat":40.07376885361772,"name":"自定义拐点"},{"lng":116.25217922871059,"lat":40.0737075096988,"name":"自定义拐点"},{"lng":116.25195377888622,"lat":40.07407196392903,"name":"自定义拐点"},{"lng":116.25165317912038,"lat":40.07397453576297,"name":"自定义拐点"},{"lng":116.25160151353565,"lat":40.07410804839932,"name":"自定义拐点"},{"lng":116.25160621040698,"lat":40.07432094638179,"name":"自定义拐点"},{"lng":116.2510237983607,"lat":40.07532769216143,"name":"自定义拐点"},{"lng":116.2506574423961,"lat":40.0752266574199,"name":"自定义拐点"},{"lng":116.25094864841924,"lat":40.07453384369344,"name":"自定义拐点"},{"lng":116.25078895479365,"lat":40.07447610889556,"name":"自定义拐点"},{"lng":116.25106607020277,"lat":40.07411165684529,"name":"自定义拐点"},{"lng":116.25116470450094,"lat":40.07398896957422,"name":"自定义拐点"},{"lng":116.25022533023274,"lat":40.0737002927635,"name":"自定义拐点"},{"lng":116.25017366464797,"lat":40.073859065162026,"name":"自定义拐点"},{"lng":116.24999988040837,"lat":40.07413691596168,"name":"自定义拐点"},{"lng":116.24979791494071,"lat":40.074551885807665,"name":"自定义拐点"}]}'>路线规划</a>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}