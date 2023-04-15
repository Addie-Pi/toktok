import { NextPage } from 'next'
import React from 'react'

interface IProps{
  text:string
}

const NoResult: NextPage<IProps> = ({text}) => {
  return <div>NoResult</div>
}

export default NoResult