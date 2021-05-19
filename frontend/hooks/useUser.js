import useRequest from './useRequest'

const useUser = () => {
  const { data: user, mutate, error } = useRequest("/api/user");
  const loading = !user && !error ? true : false;

  return {
    loading,
    user,
    mutate,
  }
}
export default useUser