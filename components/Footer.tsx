import React from 'react'
import { footerList1, footerList2, footerList3 } from '@/utils/constants'

const Footer = () => {

  const FooterList = ({items, mt}: {items:string[], mt:boolean}) => {
    return (
      <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
        {items.map((item) => (
          <p
            key={item}
            className="text-gray-400 text-sm hover:underline cursor-pointer"
          >
            {item}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-6 hidden xl:block">
      <div className="flex flex-wrap gap-2 mt-5">
        <FooterList items={footerList1} mt={false}/>
        <FooterList items={footerList2} mt/>
        <FooterList items={footerList3} mt/>
        <p className='text-gray-400 text-sm mt-5'>2023 TokTok</p>
      </div>
    </div>
  )
}

export default Footer