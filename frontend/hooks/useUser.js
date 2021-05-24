import useRequest from './useRequest'

const useUser = () => {
  const { data: user, mutate, error } = useRequest('/api/user')
  const loading = !!(!user && !error)

  return {
    loading,
    user,
    mutate,
    error
  }
}

export default useUser
