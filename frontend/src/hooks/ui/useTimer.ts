import { useEffect } from 'react'

const useTimer = (
  activate: boolean,
  callback: () => void,
  duration: number
) => {
  useEffect(() => {
    if (activate) {
      const timer = setTimeout(callback, duration)
      return () => clearTimeout(timer)
    }
  }, [activate, callback, duration])
}

export default useTimer
