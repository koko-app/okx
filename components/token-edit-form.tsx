"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type TokenData, useTokens } from "@/contexts/token-context"
import { Edit, Save, X } from "lucide-react"

interface TokenEditFormProps {
  token: TokenData
  onCancel?: () => void
}

export function TokenEditForm({ token, onCancel }: TokenEditFormProps) {
  const { updateToken } = useTokens()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<TokenData>(token)

  const handleSave = () => {
    updateToken(token.id, formData)
    setIsEditing(false)
    onCancel?.()
  }

  const handleCancel = () => {
    setFormData(token)
    setIsEditing(false)
    onCancel?.()
  }

  const handleChange = (field: keyof TokenData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Token
        </Button>
      </div>
    )
  }

  return (
    <Card className="bg-background/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Edit {token.name} ({token.symbol})
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Token Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="symbol">Symbol</Label>
            <Input id="symbol" value={formData.symbol} onChange={(e) => handleChange("symbol", e.target.value)} />
          </div>
        </div>

        <div>
          <Label htmlFor="contractAddress">Contract Address</Label>
          <Input
            id="contractAddress"
            value={formData.contractAddress}
            onChange={(e) => handleChange("contractAddress", e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="btcPrice">BTC Price (optional)</Label>
            <Input
              id="btcPrice"
              value={formData.btcPrice || ""}
              onChange={(e) => handleChange("btcPrice", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="priceChange">Price Change (optional)</Label>
            <Input
              id="priceChange"
              value={formData.priceChange || ""}
              onChange={(e) => handleChange("priceChange", e.target.value)}
              placeholder="+2.57%"
            />
          </div>
          <div>
            <Label htmlFor="daily">Daily Change</Label>
            <Input id="daily" value={formData.daily} onChange={(e) => handleChange("daily", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="balance">Balance</Label>
            <Input id="balance" value={formData.balance} onChange={(e) => handleChange("balance", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="apy">APY</Label>
            <Input id="apy" value={formData.apy} onChange={(e) => handleChange("apy", e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="maxTotalSupply">Max Total Supply</Label>
            <Input
              id="maxTotalSupply"
              value={formData.maxTotalSupply}
              onChange={(e) => handleChange("maxTotalSupply", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="circulatingSupply">Circulating Supply</Label>
            <Input
              id="circulatingSupply"
              value={formData.circulatingSupply}
              onChange={(e) => handleChange("circulatingSupply", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullyDilutedMarketCap">Fully Diluted Market Cap</Label>
            <Input
              id="fullyDilutedMarketCap"
              value={formData.fullyDilutedMarketCap}
              onChange={(e) => handleChange("fullyDilutedMarketCap", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="circulatingMarketCap">Circulating Market Cap</Label>
            <Input
              id="circulatingMarketCap"
              value={formData.circulatingMarketCap}
              onChange={(e) => handleChange("circulatingMarketCap", e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="totalValueLocked">Total Value Locked</Label>
          <Input
            id="totalValueLocked"
            value={formData.totalValueLocked}
            onChange={(e) => handleChange("totalValueLocked", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">State</Label>
            <Select value={formData.state} onValueChange={(value) => handleChange("state", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fixed">Fixed</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="liquidity">Liquidity</Label>
            <Select
              value={formData.liquidity}
              onValueChange={(value) => handleChange("liquidity", value as "high" | "medium" | "low")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date (optional)</Label>
            <Input
              id="endDate"
              value={formData.endDate || ""}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="network">Network</Label>
            <Input id="network" value={formData.network} onChange={(e) => handleChange("network", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="explorerUrl">Explorer URL</Label>
            <Input
              id="explorerUrl"
              value={formData.explorerUrl}
              onChange={(e) => handleChange("explorerUrl", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
