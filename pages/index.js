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

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}
      <a href="https://itunes.apple.com/cn/app/id477927812" id="openApp">贴吧客户端</a><br/>
      <a href='bdapp://map/navi?location=40.057023,116.307852&coord_type=bd09ll&src=andr.baidu.openAPIdemo&viaPoints={"viaPoints":[{"name":"日坛公园","lat":39.9213420718041,"lng":116.45043700279867},{"name":"天坛公园","lat":39.8882429566928,"lng":116.41724596166326},{"name":"北京西站","lat":39.90083463437583,"lng":116.32810279404168}]}'>android驾车导航</a><br/>
      <a href='baidumap://map/navi?location=40.07478643285409,116.25233422546484&coord_type=bd09ll&src=ios.baidu.openAPIdemo&viaPoints={"viaPoints":[{"lng":116.24979791494071,"lat":40.074551885807665,"name":"自定义拐点"},{"lng":116.24999988040837,"lat":40.07413691596168,"name":"自定义拐点"},{"lng":116.25017366464797,"lat":40.073859065162026,"name":"自定义拐点"},{"lng":116.25022533023274,"lat":40.0737002927635,"name":"自定义拐点"},{"lng":116.25116470450094,"lat":40.07398896957422,"name":"自定义拐点"},{"lng":116.25106607020277,"lat":40.07411165684529,"name":"自定义拐点"},{"lng":116.25078895479365,"lat":40.07447610889556,"name":"自定义拐点"},{"lng":116.25094864841924,"lat":40.07453384369344,"name":"自定义拐点"},{"lng":116.2506574423961,"lat":40.0752266574199,"name":"自定义拐点"},{"lng":116.2510237983607,"lat":40.07532769216143,"name":"自定义拐点"},{"lng":116.25160621040698,"lat":40.07432094638179,"name":"自定义拐点"},{"lng":116.25160151353565,"lat":40.07410804839932,"name":"自定义拐点"},{"lng":116.25165317912038,"lat":40.07397453576297,"name":"自定义拐点"},{"lng":116.25195377888622,"lat":40.07407196392903,"name":"自定义拐点"},{"lng":116.25217922871059,"lat":40.0737075096988,"name":"自定义拐点"},{"lng":116.25236240669288,"lat":40.07376885361772,"name":"自定义拐点"},{"lng":116.25214165373986,"lat":40.07420908481364,"name":"自定义拐点"},{"lng":116.25221210680998,"lat":40.074255994526055,"name":"自定义拐点"},{"lng":116.25198196011426,"lat":40.07466374680829,"name":"自定义拐点"},{"lng":116.25233422546484,"lat":40.07478643285409,"name":"自定义拐点"}]}'>ios驾车导航</a>
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