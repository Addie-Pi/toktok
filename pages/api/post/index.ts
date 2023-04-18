// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if(req.method === 'GET'){
    const query = allPostsQuery()
    const data = await client.fetch(query)
    console.log('data from DB ', data)
    res.status(200).json(data)
  }else if(req.method === 'POST'){
    const post =  req.body
    console.log('2 ', post)
    client.create(post).then(() => res.status(201).json('Video Created'))
  }
}
