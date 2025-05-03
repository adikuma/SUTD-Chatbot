import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { ExpandMoreIcon } from '@styles/Icons'
import { Text } from '@components/display'
import { AccordionItemProps } from '../typings'
import { useAccordion } from '../hooks'

const CustomAccordionItem: React.FC<{ item: AccordionItemProps }> = ({
  item
}) => {
  const { expandedItems, handleExpandChange } = useAccordion()

  return (
    <Accordion
      expanded={expandedItems.includes(item.id)}
      onChange={handleExpandChange(item.id)}
      disabled={item.disabled}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${item.id}bh-content`}
        id={`${item.id}bh-label`}
      >
        <Text content={item.label} />
      </AccordionSummary>

      <AccordionDetails>{item.content}</AccordionDetails>
    </Accordion>
  )
}

export default CustomAccordionItem
