// set up zustand

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// it's going to have instant return
const authStore = (set:any) => ({
  // initial value
  userProfile: null, 

  // action function
  addUser: (user:any) => set({userProfile:user}),
  removeUser: () => set({userProfile:null})
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