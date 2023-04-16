import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { SanityAssetDocument } from '@sanity/client'

import userAuthStore from '@/store/auth.store'
import { client } from '../utils/client'

const Upload = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [videoAsset, setVdeoAsset] = useState<SanityAssetDocument | undefined>()
  const [wrongFileType, setWrongFileType] = useState(false)


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

  return (
    <div className='flex w-full h-full'>
      <div className='bg-white rounded-lg'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload Video</p>
            <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
          </div>
          {/* upload video */}
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100'>
            {
              isLoading ? (
                <p>Uploading</p>
              ) : (
                <div>
                  { videoAsset ? (
                    <div>
                      <video src={videoAsset.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'></video>
                    </div>
                  ):(
                    <label className='cursor-pointer'>
                      <div className='flex flex-col items-center justify-center h-full'>
                        <div className='flex flex-col items-center justify-center'>
                          <p >
                            <FaCloudUploadAlt className='text-gray-300 text-7xl'/>
                          </p>
                          <p className='text-xl font-semibold'>
                            Upload video
                          </p>
                        </div>
                        <p className='text-gray-400 text-center mt-10 text-sm leading-7'>
                          MP4 or WebM or ogg <br />
                          720x1280 or higher <br />
                          Up to 10 minutes <br />
                          Less than 2GB
                        </p>
                        <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                          Select File                         
                        </p>
                      </div>
                      <input type="file" name="upload_video" onChange={uploadVideo} className='w-0 h-0'/>
                    </label>
                  )}
                </div>
              )
            }
            {wrongFileType && (
              <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[250px]'>Please select right video type</p>
            )}
          </div>
          {/* form for video */}
          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload