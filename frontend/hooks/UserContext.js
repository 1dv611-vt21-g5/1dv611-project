import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { statStr } from '../constants'

let userSession = false

axios.get(statStr.backendHost + '/api/user', { withCredentials: true })
  .then(function (response) {
    userSession = true
  })
  .catch(function (error) {
    console.log(error.response.status);
    console.log(error.response.statusText);
  })

console.log(userSession);


const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userSession)
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)