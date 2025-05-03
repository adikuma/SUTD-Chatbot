import { useMediaQuery, useTheme } from '@mui/material'

const useIsMobile = (): boolean => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return isMobile
}

export default useIsMobile
