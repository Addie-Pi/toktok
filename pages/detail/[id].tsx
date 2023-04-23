import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'

import { BASE_URL } from '@/utils'
import { Video } from '@/types'
import userAuthStore from '../../store/auth.store'

import LikeButton from '@/components/LikeButton'
import Comments from '@/components/Comments'

interface IProps {
  postDetails: Video
}

const Detail: NextPage<IProps> = ({ postDetails }) => {
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()
  const { userProfile }:any = userAuthStore()

  const onVideoClick = () => {
    if (playing) {
      videoRef.current?.pause()
      setPlaying(false)
    } else {
      videoRef.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    // add post is to make sure when we enter another video, we would like to rerun the useEffect
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  const handleLike = async(like:boolean) => {
    console.log('post', post)
    if(userProfile){
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id, 
        postId: post._id, 
        like: like
      })

      setPost({...post, likes: data.likes})
    }

  }


  if (!post) {
    return null
  }

  return (
    
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p
            className="cursor-pointer"
            onClick={() => {
              router.back()
            }}
          >
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        {/* video view */}
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            ></video>
          </div>

          {/* play icon */}
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>
        {/* muted or not */}
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button
              onClick={() => {
                setIsVideoMuted(false)
              }}
            >
              <HiVolumeOff className="text-white text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsVideoMuted(true)
              }}
            >
              <HiVolumeUp className="text-white text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      {/* video information */}
      <div className="relative w-[1000px] md:w-[900px] lg:w-[780px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            {/* user image */}
            <div className="md:w-20 md:h-20 w-16 h-16">
              <Link href="/" className="flex justify-center">
                <>
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full "
                    src={post.postedBy.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            </div>

            {/* user name */}
            <div>
              <Link href="/">
                <div className="flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          {/* caption */}
          <p className="px-10 text-lg text-gray-600">{post.caption}</p>

          {/* like */}
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => {
                  handleLike(true)
                }}
                handleDislike={() => {
                  handleLike(false)
                }}
              />
            )}
          </div>
          {/* comment section */}
          <Comments />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params : {id:string}}) => {
  console.log('params', id)
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)
  return {
    props: { postDetails: data },
  }
}

export default Detail