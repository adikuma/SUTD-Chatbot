import React from 'react'
import { AccordionProps } from '../typings'
import { AccordionProvider } from '../hooks'
import AccordionItem from './AccordionItem'

const CustomAccordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <AccordionProvider>
      {items.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </AccordionProvider>
  )
}

export default CustomAccordion
