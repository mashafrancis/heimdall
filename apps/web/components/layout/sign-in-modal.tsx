'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Modal } from '@/components/shared/modal'
import { siteConfig } from '@/config/site'
import { useSigninModal } from '@/hooks/use-signin-modal'
import { Button, Icons } from '@heimdall-logs/ui'

export const SignInModal = () => {
  const signInModal = useSigninModal()
  const [signInClicked, setSignInClicked] = useState(false)

  return (
    <Modal showModal={signInModal.isOpen} setShowModal={signInModal.onClose}>
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="h-10 w-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Sign in to access your account and continue using Heimdall.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <Button
            size="large"
            disabled={signInClicked}
            loading={signInClicked}
            icon={<Icons.github className="h-5 w-5" />}
            onClick={() => {
              setSignInClicked(true)
              signIn('github', { redirect: false }).then(() =>
                // TODO: fix this without setTimeOut(), modal closes too quickly. Idea: update value before redirect
                setTimeout(() => {
                  signInModal.onClose()
                }, 1000),
              )
            }}
          >
            Sign In with Github
          </Button>
        </div>
      </div>
    </Modal>
  )
}
