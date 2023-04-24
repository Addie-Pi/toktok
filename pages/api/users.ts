// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { allUsersQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'GET') {
    const data = await client.fetch(allUsersQuery())

    if(data){
      console.log('data - users', data)
      res.status(200).json(data)
    }else{
      res.json([])
    }
  }
}
