import useSWR from 'swr'
import axios from 'axios'

import { statStr } from '../constants'

export default function useRequest (request, { initialData, ...config } = {}) {
  return useSWR(
    request && JSON.stringify(request),
    () => axios(request || {}, { withCredentials: true, baseURL: statStr.backendHost }).then(response => response.data),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData
      }
    }
  )
}
