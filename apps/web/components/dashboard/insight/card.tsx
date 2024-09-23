import React from 'react'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@heimdall-logs/ui'
import { Skeleton } from '@heimdall-logs/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@heimdall-logs/ui'
import { BadgeDelta } from '@tremor/react'
import { LucideIcon } from 'lucide-react'

export type InsightType = {
  title: string
  Icon: LucideIcon
  data: {
    current: number | string
    change: number
  }
  valuePrefix?: string
  changePrefix?: string
  BottomChildren?: () => React.ReactNode | null
  negative?: boolean
  isLoading?: boolean
  tooltip?: string
}

export function InsightCard({
  title,
  data,
  valuePrefix,
  BottomChildren,
  isLoading,
  negative,
  changePrefix,
  tooltip,
}: InsightType) {
  const increase = negative ? data.change <= 0 : data.change >= 0
  return (
    <Card className="relative p-0 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-2">
        <CardTitle className="text-base font-bold text-muted-foreground">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <span>{title}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        {data.change ? (
          <div className="flex items-center text-xs xl:text-sm">
            <BadgeDelta
              deltaType={increase ? 'moderateIncrease' : 'moderateDecrease'}
              isIncreasePositive={true}
            >
              {' '}
              {changePrefix ?? ''}
              {data.change && `${data.change.toLocaleString()} %`}{' '}
            </BadgeDelta>
          </div>
        ) : (
          <div>-</div>
        )}
      </CardHeader>
      {!isLoading && data ? (
        <CardContent className="px-4">
          <div className="text-xl font-semibold tracking-tight xl:text-2xl flex flex-row items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="font-mono">
                {data.current ? data.current.toLocaleString().split(' ')[0] : 0}
              </span>
              <span className="text-base text-muted-foreground font-light">
                {valuePrefix ?? ''}
                {data.current
                  ? data.current.toLocaleString().split(' ')[1]
                  : ''}
              </span>
            </div>
            {BottomChildren ? <BottomChildren /> : null}
          </div>
        </CardContent>
      ) : (
        <CardContent className="px-4">
          <div
            className="text-xl font-semibold tracking-tight xl:text-2xl
              flex flex-row items-center justify-between"
          >
            <Skeleton className="h-6 w-20 my-2 rounded-md bg-gray-200 dark:bg-muted/50" />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
