"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, Wifi, WifiOff } from "lucide-react"
import { usePriceUpdates } from "@/hooks/use-price-updates"

export function PriceUpdateStatus() {
  const { isLoading, lastUpdate, error, updatePrices } = usePriceUpdates()

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "Never"
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)

    if (minutes === 0) return `${seconds}s ago`
    if (minutes < 60) return `${minutes}m ago`
    return date.toLocaleTimeString()
  }

  return (
    <div className="flex items-center gap-2">
      <Badge variant={error ? "destructive" : "outline"} className="gap-1">
        {error ? <WifiOff className="h-3 w-3" /> : <Wifi className="h-3 w-3" />}
        {error ? "Offline" : "Live"}
      </Badge>

      <span className="text-xs text-muted-foreground">Updated: {formatLastUpdate(lastUpdate)}</span>

      <Button variant="ghost" size="sm" onClick={updatePrices} disabled={isLoading} className="h-6 w-6 p-0">
        <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
      </Button>

      {error && (
        <span className="text-xs text-destructive" title={error}>
          Update failed
        </span>
      )}
    </div>
  )
}
