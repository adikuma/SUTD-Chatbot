import { ListProps } from '@components'

const generateListWithRoutings = (
  items: ListProps['items'],
  handleRouteChange: (route: string, callback?: () => void) => void,
  isMobile?: boolean,
  setOpen?: (open: boolean) => void
): any[] => {
  return items.map((item: any): any =>
    addRoutingToItem(item, handleRouteChange, isMobile, setOpen)
  )
}

const addRoutingToItem = (
  item: any,
  handleRouteChange: (route: string, callback?: () => void) => void,
  isMobile?: boolean,
  setOpen?: (open: boolean) => void
): any => ({
  ...item,
  onPrimaryClick: handlePrimaryClick(
    item.route,
    handleRouteChange,
    item.onPrimaryClick,
    isMobile,
    setOpen
  ),
  subItems: addRoutingToSubItems(
    item?.subItems,
    handleRouteChange,
    isMobile,
    setOpen
  )
})

const addRoutingToSubItems = (
  subItems: any[] | undefined,
  handleRouteChange: (route: string, callback?: () => void) => void,
  isMobile?: boolean,
  setOpen?: (open: boolean) => void
): any[] => {
  if (!subItems) return subItems

  return subItems.map((subItem: any): any => ({
    ...subItem,
    onPrimaryClick: handlePrimaryClick(
      subItem.route,
      handleRouteChange,
      subItem.onPrimaryClick,
      isMobile,
      setOpen
    )
  }))
}

const handlePrimaryClick = (
  route: string | undefined,
  handleRouteChange: (route: string, callback?: () => void) => void,
  onPrimaryClick: (() => void) | undefined,
  isMobile?: boolean,
  setOpen?: (open: boolean) => void
): any => {
  if (route) {
    const callback: () => void =
      isMobile && setOpen ? () => setOpen(false) : undefined

    return () => handleRouteChange(route, callback)
  }

  return onPrimaryClick
}

export default generateListWithRoutings
