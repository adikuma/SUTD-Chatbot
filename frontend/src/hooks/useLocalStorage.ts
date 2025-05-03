import { useState } from 'react'
import {
  ERROR_READING_LOCAL_STORAGE,
  ERROR_SETTING_LOCAL_STORAGE
} from '@constants/messages'
import { SetValue } from '@typings/common'
import { isBrowser } from '@utils/handleValidation'

export const useLocalStorage = (
  key: string,
  initialValue: any
): [any, SetValue] => {
  const readValue = (): any => {
    if (!isBrowser()) return initialValue

    try {
      const item: any = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`${ERROR_READING_LOCAL_STORAGE} “${key}”:`, error)
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<any>(readValue)

  const setValue: SetValue = (value) => {
    try {
      const valueToStore: any =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (isBrowser()) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.warn(`${ERROR_SETTING_LOCAL_STORAGE} “${key}”:`, error)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage
