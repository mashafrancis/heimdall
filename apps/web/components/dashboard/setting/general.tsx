import { useState } from 'react'

import { localSettingAtom } from '@/jotai/store'
import { TIMEZONES } from '@/lib/constants'
import { ScrollArea } from '@heimdall-logs/ui'
import { Label } from '@heimdall-logs/ui'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@heimdall-logs/ui'
import { useAtom } from 'jotai'

export const GeneralSetting = () => {
  const [setting, setSetting] = useAtom(localSettingAtom)

  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
  return (
    <form className=" flex flex-col items-start space-y-2">
      <Label>Timezone</Label>
      <Select
        onValueChange={(v) => {
          setSetting((prev) => ({
            ...prev,
            timezone: v,
          }))
        }}
        defaultValue={setting.timezone ?? timeZone}
        value={setting.timezone ?? timeZone}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className=" h-56">
            {TIMEZONES.map((timezone) => (
              <SelectItem key={timezone} value={timezone}>
                {timezone}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
      <Label>Default Graph</Label>
      <Select
        defaultValue={setting.graph ?? 'line-graph'}
        onValueChange={(graph) => {
          setSetting((prev) => ({
            ...prev,
            graph,
          }))
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bar-graph">Bar Graph</SelectItem>
          <SelectItem value="line-graph">Line Graph</SelectItem>
        </SelectContent>
      </Select>
    </form>
  )
}
