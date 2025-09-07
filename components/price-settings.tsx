"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"

interface PriceSettingsProps {
  updateInterval: number
  onUpdateIntervalChange: (interval: number) => void
  autoUpdate: boolean
  onAutoUpdateChange: (enabled: boolean) => void
}

export function PriceSettings({
  updateInterval,
  onUpdateIntervalChange,
  autoUpdate,
  onAutoUpdateChange,
}: PriceSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const intervalOptions = [
    { value: 10000, label: "10 seconds" },
    { value: 30000, label: "30 seconds" },
    { value: 60000, label: "1 minute" },
    { value: 300000, label: "5 minutes" },
    { value: 900000, label: "15 minutes" },
  ]

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="gap-2">
        <Settings className="h-4 w-4" />
        Price Settings
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 z-50 w-80 bg-background/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-sm">Price Update Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-update">Auto Update</Label>
              <Switch id="auto-update" checked={autoUpdate} onCheckedChange={onAutoUpdateChange} />
            </div>

            <div className="space-y-2">
              <Label>Update Interval</Label>
              <Select
                value={updateInterval.toString()}
                onValueChange={(value) => onUpdateIntervalChange(Number.parseInt(value))}
                disabled={!autoUpdate}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {intervalOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2 border-t">
              <Button variant="outline" size="sm" onClick={() => setIsOpen(false)} className="w-full">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
