// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { client } from '@/utils/client'
import { postDetailQuery } from '@/utils/queries'
import type { NextApiRequest, NextApiResponse } from 'next'
import { uuid } from 'uuidv4';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.status(200).json({ name: 'Response success' })
  if (req.method === 'GET') {
    // console.log('req.query ', req.query)
    const {id}:any = req.query;
    const query = postDetailQuery(id)

    const data = await client.fetch(query)

    res.status(200).json(data[0])
  }else if(req.method === 'PUT'){
    // console.log('req', req)
    const { comment, userId} = req.body
    const {id}:any = req.query

    const data = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [
        {
          comment: comment,
          _key: uuid(),
          postedBy:{
            _type:'postedBy', 
            _ref: userId
          }
        },
      ])
      .commit()

    res.status(200).json(data)
  }
}
