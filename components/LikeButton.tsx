import React, {useState, useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'

import userAuthStore from '@/store/auth.store'

interface IProps {
  handleLike: () => void
  handleDislike : () => void
  likes: any[]
}


const LikeButton = ({ likes, handleLike, handleDislike }: IProps) => {
  const [alreadyLike, setAlreadyLike] = useState(false)
  const { userProfile }:any = userAuthStore()
  const filterLikes = likes?.filter((item)=>(item._ref === userProfile?._id))

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLike(true)
    } else {
      setAlreadyLike(false)
    }
  }, [filterLikes, likes])

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLike ? (
          <div
            className="bg-primary rounded-full p-[10px] md:p-4 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md-text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-[10px] md:p-4 onClick={handleLike}"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md-text-2xl" />
          </div>
        )}
        <p className="text-md font-semibold">{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton