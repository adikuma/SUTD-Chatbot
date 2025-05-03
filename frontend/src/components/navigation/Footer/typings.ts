import { ReactNode } from 'react'

export interface FooterProps {
  mainLabel: string
  links: FooterLinksItemProps[]
  email: string
}

export interface FooterLinksProps {
  items: FooterLinksItemProps[]
}

export interface FooterLinksItemProps {
  href: string
  icon: ReactNode
}
