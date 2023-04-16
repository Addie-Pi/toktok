import axios from 'axios';
import jwt_decode from 'jwt-decode'


export const createOrGetUser = async (response: any, addUser:any) => {
  const decoded: { name: string; picture: string; sub: string } = jwt_decode(
    response.credential
  )

  const { name, picture, sub } = decoded

  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  }

  addUser(user)
  // console.log(decoded)

  await axios.post('/api/auth', user)
}