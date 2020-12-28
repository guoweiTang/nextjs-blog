/*
 * @Author: your name
 * @Date: 2020-12-28 17:29:29
 * @LastEditTime: 2020-12-28 17:32:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nextjs-blog/components/date.js
 */
import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}