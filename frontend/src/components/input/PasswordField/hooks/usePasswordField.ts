import { useState, useCallback } from 'react'

const usePasswordField = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = useCallback((): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }, [])

  return { showPassword, togglePasswordVisibility }
}

export default usePasswordField
