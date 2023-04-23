// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { postDetailQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'GET') {
    console.log('req.query ', req.query)
    const { id } = req.query;
    const query = postDetailQuery(id)

    const data = await client.fetch(query)

    res.status(200).json(data[0])
  }
}
