// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { topicPostsQuery } from '@/utils/queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'GET') {
    const {topic} = req.query

    const videosQuery = topicPostsQuery(topic)
    const videos = await client.fetch(videosQuery)
    res.status(200).json(videos)
  }
}
