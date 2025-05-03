import { Orientation } from '@enums/ui'
import { displayListSubItemsIndicator } from '@utils/handleDisplay'

export const list = (orientation: Orientation) => ({
  width: '100%',
  display: orientation === Orientation.HORIZONTAL ? 'flex' : 'block'
})

export const list_item = (selected: boolean) => ({
  borderRadius: 2,
  backgroundColor: selected ? 'grey.300' : 'inherit',
  '&:hover': {
    backgroundColor: 'grey.200'
  },
  '&.Mui-selected': {
    backgroundColor: 'grey.200',
    '&:hover': {
      backgroundColor: 'grey.200'
    }
  }
})

export const list_sub_item_divider = (idx: string, itemsCount: number) => ({
  position: 'absolute',
  left: 0,
  top: idx === '0' ? '50%' : 0,
  bottom: idx === (itemsCount - 1).toString() ? '50%' : 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  ml: 2,
  '&::before': {
    content: '""',
    width: 2,
    height: '100%',
    bgcolor: 'divider',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)'
  }
})

export const list_sub_item_indicator = (
  idx: string,
  itemsCount: number,
  isVisible: boolean
) => ({
  width: 8,
  height: 8,
  bgcolor: 'text.primary',
  borderRadius: '50%',
  position: 'absolute',
  top: displayListSubItemsIndicator(idx, itemsCount),
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: isVisible ? 'block' : 'none'
})

export const list_subheader = {
  mt: 2
}

export const list_item_children = {
  display: 'flex',
  flexDirection: 'column',
  ml: 2
}
