// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'GET') {
    const { id }:any = req.query
    const query = singleUserQuery(id)
    const userVideosQuery = userCreatedPostsQuery(id)
    const userLikedVideosQuery = userLikedPostsQuery(id)

    const user = await client.fetch(query)
    const userVideos = await client.fetch(userVideosQuery)
    const userLikedVideos = await client.fetch(userLikedVideosQuery)

    console.log('userLikedVideos ', userLikedVideos)

    res.status(200).json({ user: user[0], userVideos, userLikedVideos })

  }
}
