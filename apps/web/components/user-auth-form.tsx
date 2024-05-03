'use client'

import { useSearchParams } from 'next/navigation'

import { HTMLAttributes, useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { signIn } from '@heimdall-logs/auth'
import { Icons } from './icons'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  activeStrategy: {
    github?: boolean
    google?: boolean
  }
}

export function UserAuthForm({ className, activeStrategy, ...props }: Props) {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()
  return (
    <div className={cn('grid gap-4 ', className)} {...props}>
      {activeStrategy.github && (
        <button
          type="button"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          onClick={() => {
            setIsGitHubLoading(true)
            signIn('github', {
              callbackUrl: searchParams?.get('from') || '/dashboard',
            })
          }}
          aria-disabled={isGitHubLoading}
          disabled={isGitHubLoading}
        >
          {isGitHubLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}
          Github
        </button>
      )}
    </div>
  )
}
