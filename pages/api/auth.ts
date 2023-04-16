// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { allPostsQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'POST') {
    
    const user = req.body
    console.log('user ', user)
    client.createIfNotExists(user)
      .then(()=>{
        res.status(200).json('Login Success')
      })
    
  }
}
