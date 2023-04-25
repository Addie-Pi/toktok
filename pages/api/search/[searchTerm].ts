// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { allPostsQuery, searchPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'GET') {
    const {searchTerm} = req.query

    const videosQuery = searchPostsQuery(searchTerm)
    const videos = await client.fetch(videosQuery)

    res.status(200).json(videos)
    
    
  }
}
