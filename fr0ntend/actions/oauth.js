import axios from 'axios'
import { statStr } from '../constants'

export const useCode = async code => {
  const url = statStr.backendHost + '/api/auth/code?code=' + code + '&redirect_uri=browser'
  const user = await axios.get(url, { withCredentials: true })
  console.log(user)
  console.log('Logged in User:', user)
}
