import { useCallback } from 'react'

const useIncrementor = (
  setAttribute: React.Dispatch<React.SetStateAction<number>>,
  step: number
) => {
  const increment = useCallback((): void => {
    setAttribute((prev) => prev + step)
  }, [setAttribute, step])

  const decrement = useCallback((): void => {
    setAttribute((prev) => prev - step)
  }, [setAttribute, step])

  return { increment, decrement }
}

export default useIncrementor
