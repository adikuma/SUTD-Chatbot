import { formatLowercase } from '@utils/handleFormats'

const isEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const lowerCaseEmail: string = formatLowercase(email)

  return emailPattern.test(lowerCaseEmail)
}

export default isEmail
