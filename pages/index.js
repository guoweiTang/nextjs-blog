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
      <a href='baidumap://map/navi?location=40.07436955334694,116.25060826587547&coord_type=bd09ll&src=ios.baidu.openAPIdemo&viaPoints={"viaPoints":[{"name":"日坛公园","lat":40.07428103530233,"lng":116.24946238791905},{"name":"天坛公园","lat":40.0736692358509,"lng":116.24976639479523},{"name":"北京西站","lat":40.07416115611646,"lng":116.25008385330311},{"name":"中海","lat":40.07456006361807,"lng":116.2498713175224}]}'>ios驾车导航</a>
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