import React, { useState, useEffect } from 'react'
import router, { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'

import userAuthStore from '@/store/auth.store'
import { client } from '../utils/client'

import { topics } from '@/utils/constants'


const Upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVdeoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)

  const [caption, setCaption] = useState('')
  const [category, setCcategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)

  const { userProfile }: { userProfile : any} = userAuthStore()

  const uploadVideo = async(e:any) => {
    // console.log('e', e.target.files[0])
    const selectedFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

    if(fileTypes.includes(selectedFile.type)){
      setIsLoading(true)
      client.assets.upload('file', selectedFile, {
        contentType:selectedFile.type, 
        filename:selectedFile.name
      }).then((data)=>{
        // console.log('data', data)
        setVdeoAsset(data)
        setIsLoading(false)
      })
    }else{
      setIsLoading(false)
      setWrongFileType(true)
    }
  }

  const handlePost = async() => {
    if(caption && videoAsset?._id && category){
      setSavingPost(true)

      const post = {
        _type: 'post',
        caption,
        video: {
          // the file type is a built-in asset type in Sanity that represents a file, such as a video, audio, or document file.
          type: 'file',

          // When you have a field of type 'file' in your schema, you need to provide an asset object with _type and _ref properties every time you add or upload a file through the Sanity Studio UI.
          asset: {
            // The _type is specified as 'reference' to indicate that this is a reference field
            _type: 'reference',
            //  the _ref property is set to the asset._id to identify which asset document the video file is associated with
            _ref: videoAsset?._id,
          },
        },

        userId: userProfile?._id,

        // To reference an existing user document as the value of the "postedBy" field, you would create an object with _type: 'reference' and _ref set to the _id of the user document.
        postedBy: {
          _type: 'reference',
          _ref: userProfile?._id,
        },
        topic: category,
      }

      await axios.post('http://localhost:3000/api/post', post)
     
      router.push('/')
    }


  }

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap xl:justify-between justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          {/* upload video */}
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p>
                          <FaCloudUploadAlt className="text-gray-300 text-7xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-7">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload_video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select right video type
              </p>
            )}
          </div>
        </div>
        {/* form for video */}
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value)
            }}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label> Choose a catagory</label>
          <select
            onChange={(e) => {
              setCcategory(e.target.value)
            }}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-200 "
                value={topic.name}
              >
                {' '}
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload