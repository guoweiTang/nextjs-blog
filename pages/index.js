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
      <a href='bdapp://map/navi?location=40.057023,116.307852&coord_type=bd09ll&src=andr.baidu.openAPIdemo&viaPoints={"viaPoints":[{"name":"日坛公园","lat":39.9213420718041,"lng":116.45043700279867},{"name":"天坛公园","lat":39.8882429566928,"lng":116.41724596166326},{"name":"北京西站","lat":39.90083463437583,"lng":116.32810279404168}]}'>android驾车导航</a><br/>
      <a href='baidumap://map/navi?location=40.057023,116.307852&coord_type=bd09ll&src=ios.baidu.openAPIdemo&viaPoints={"viaPoints":[{"name":"日坛公园","lat":39.9213420718041,"lng":116.45043700279867},{"name":"天坛公园","lat":39.8882429566928,"lng":116.41724596166326},{"name":"北京西站","lat":39.90083463437583,"lng":116.32810279404168}]}'>ios驾车导航</a>
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