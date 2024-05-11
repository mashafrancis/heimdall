'use client'

import { useSigninModal } from '@/hooks/use-signin-modal'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@heimdall-logs/ui'

export function GetStartedButton() {
  const signInModal = useSigninModal()

  return (
    <Button
      className={cn(buttonVariants({ size: 'large', type: 'primary' }))}
      onClick={signInModal.onOpen}
    >
      Get started
    </Button>
  )
}
