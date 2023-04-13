import axios from 'axios';
import { Video } from '../types'

interface IProps{
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  console.log("videos ", videos)
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
   )
}

// Next.js will pre-render this page on each request using the data returned by getServerSideProps
export const getServerSideProps = async() => {
  const { data } = await axios.get(`http://localhost:3000/api/post`)
  
  return {
    props:{
      videos: data
    }
  }
}

export default Home;