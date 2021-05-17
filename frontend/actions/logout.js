import axios from 'axios'

export const logout = async () => {
  await axios.post('http://localhost:9999/api/auth/logout', {}, { withCredentials: true })
}
