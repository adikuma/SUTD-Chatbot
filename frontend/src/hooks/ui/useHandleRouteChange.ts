import { useNavigate } from 'react-router-dom'

const useHandleRouteChange = () => {
  const navigate = useNavigate()

  const handleRouteChange = (route: string, callback?: () => void): void => {
    navigate(route)

    if (callback) {
      callback()
    }
  }

  return handleRouteChange
}

export default useHandleRouteChange
