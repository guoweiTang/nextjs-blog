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
      <a href="baidumap://map/direction?origin=40.09041840732878,116.24387479484852&destination=39.90083463437583,116.32810279404168&coord_type=bd09ll&mode=driving&src=ios.baidu.openAPIdemo&viaPoints=%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D">路线规划</a>
      <a href="baidumap://map/navi?location=39.90083463437583,116.32810279404168&coord_type=bd09ll&type=BLK&src=ios.baidu.openAPIdemo&viaPoints=%5Bobject%20Object%5D%2C%5Bobject%20Object%5D%2C%5Bobject%20Object%5D">驾车导航</a>
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