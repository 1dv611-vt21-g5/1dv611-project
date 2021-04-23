import axios from 'axios'

export const logout = async () => {
  await axios.get('http://localhost:9999/api/logout')

  window.location = '/'
}
