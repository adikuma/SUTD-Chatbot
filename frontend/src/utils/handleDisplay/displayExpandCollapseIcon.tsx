import { ReactElement } from 'react'
import { ExpandLessIcon, ExpandMoreIcon } from '@styles/Icons'

const DisplayExpandCollapseIcon: React.FC<{ isOpen: boolean }> = ({
  isOpen
}): ReactElement => {
  return isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
}

export default DisplayExpandCollapseIcon
