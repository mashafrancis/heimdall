import type { ReactNode } from 'react'

import { ClientProvider } from '@/components/client-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/toaster'
import { fontMono, fontNumeric, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
// import Heimdall from '@heimdall-logs/tracker/react'

import { constructMetadata } from '@/lib/construct-metadata'
// import '@/styles/syntax-highlighter.module.css';
import Analytics from '../components/analytics'

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): JSX.Element {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'min-[100dvh] font-sans text-black',
        fontSans.variable,
        fontNumeric.variable,
        fontMono.variable,
      )}
    >
      <body className="antialiased">
        <ClientProvider>
          {children}
          {/*<Heimdall*/}
          {/*  config={{*/}
          {/*    id: 'heimdall',*/}
          {/*    consent: 'granted',*/}
          {/*    host: '/api/heimdall',*/}
          {/*    collector: '/api/trace',*/}
          {/*    // host: 'http://localhost:8000',*/}
          {/*    autoTrack: true,*/}
          {/*    // env: 'prod',*/}
          {/*    // debug: true,*/}
          {/*  }}*/}
          {/*/>*/}
          <Toaster />
          <Analytics />
          <TailwindIndicator />
        </ClientProvider>
      </body>
    </html>
  )
}
