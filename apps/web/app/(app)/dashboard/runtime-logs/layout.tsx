import WebsiteNav from '@/components/layout/website-nav'
import { WEBSITE_NAMES } from '@/types/website'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <WebsiteNav activePage={WEBSITE_NAMES.RUNTIME_LOGS} />
      {children}
    </>
  )
}
