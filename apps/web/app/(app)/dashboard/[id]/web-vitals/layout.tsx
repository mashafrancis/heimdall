import WebsiteNav from '@/components/layout/website-nav'
import { WEBSITE_NAMES } from '@/types/website'
import { ReactNode } from 'react'

interface Props {
  params: {
    id: string
  }
  children: ReactNode
}

export default function Layout({ children, params }: Props) {
  return (
    <>
      <WebsiteNav activePage={WEBSITE_NAMES.WEB_VITALS} id={params.id} />
      {children}
    </>
  )
}
