// set up zustand

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { BASE_URL } from '@/utils'
import axios from 'axios'

// it's going to have instant return
const authStore = (set:any) => ({
  // initial value
  userProfile: null, 
  allUsers:[],

  // action function
  addUser: (user:any) => set({userProfile:user}),
  removeUser: () => set({userProfile:null}), 
  fetchAllUsers:async() => {
    const response = await axios.get(`${BASE_URL}/api/users`)
    
    set({ allUsers: response.data})
  }
})

// persist the store data
// default is using 'localStorage' 
const userAuthStore = create(
  persist(
    authStore, 
    {name:'auth'} 
  )
)

export default userAuthStore;