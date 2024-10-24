import { celebrateSettingAtom } from '@/jotai/store'
import { Alert, AlertDescription, AlertTitle } from '@heimdall-logs/ui'
import { Switch } from '@heimdall-logs/ui'
import { Label } from '@heimdall-logs/ui'
import { Input } from '@heimdall-logs/ui'
import { useAtom } from 'jotai'
import { Terminal } from 'lucide-react'

export const CelebrateSetting = () => {
  const [cSetting, setCSetting] = useAtom(celebrateSettingAtom)
  return (
    <div>
      <Alert>
        <Terminal size={18} />
        <AlertTitle className=" font-bold">
          This let's you set goals and get a
          <span className=" text-brand-400"> celebration.</span>
        </AlertTitle>
        <AlertDescription>
          The goals are calculated in the last 24 hours.
        </AlertDescription>
      </Alert>
      <div className=" mt-4 flex flex-col space-y-2">
        <Label>Enable Celebrations</Label>
        <Switch
          onCheckedChange={(checked) => {
            setCSetting((prev) => ({
              ...prev,
              enabled: checked,
            }))
          }}
          checked={cSetting.enabled}
        />
      </div>
      <div className=" mt-4 space-y-2">
        <Label>Unique Visitors Goal</Label>

        <Input
          type="number"
          className=" appearance-none"
          value={cSetting.uniqueVisitors}
          onChange={(v) => {
            setCSetting((prev) => ({
              ...prev,
              uniqueVisitors: parseInt(v.currentTarget.value),
            }))
          }}
        />
      </div>
    </div>
  )
}
