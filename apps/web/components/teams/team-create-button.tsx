'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'
import { ButtonProps, buttonVariants } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { createTeamModalAtom } from '@/jotai/store'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'

interface TeamCreateButtonProps extends ButtonProps {
  teamsCount: number
}

export function TeamCreateButton({ variant, ...props }: TeamCreateButtonProps) {
  const [, setCreateTeam] = useAtom(createTeamModalAtom)
  async function onClick() {
    if (props.teamsCount > 2) {
      return toast({
        title: 'Limit of 2 team is reached.',
        description: 'We currently only support 2 teams per account.',
        variant: 'destructive',
      })
    }
    setCreateTeam(true)
  }
  return (
    <button
      onClick={onClick}
      className={cn(buttonVariants({ variant }))}
      {...props}
    >
      <Icons.add className="h-4 w-4 " />
      <span className="">New Team</span>
    </button>
  )
}
