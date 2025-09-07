"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { TokenLogo } from "@/components/token-logo"
import { TokenEditForm } from "@/components/token-edit-form"
import { useTokens } from "@/contexts/token-context"

interface TokenDetailsProps {
  tokenId: string
}

export function TokenDetails({ tokenId }: TokenDetailsProps) {
  const { tokens } = useTokens()
  const [isEditing, setIsEditing] = useState(false)

  const token = tokens.find((t) => t.id === tokenId)

  if (!token) {
    return <div>Token not found</div>
  }

  if (isEditing) {
    return <TokenEditForm token={token} onCancel={() => setIsEditing(false)} />
  }

  return (
    <Card className="bg-background/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <TokenLogo symbol={token.symbol} className="w-12 h-12" />
          <CardTitle className="flex items-center justify-between flex-1">
            <div>
              <span>
                {token.name} ({token.symbol})
              </span>
              {token.btcPrice && (
                <div className="text-sm font-normal text-muted-foreground mt-1">
                  {token.price} @ {token.btcPrice}
                  {token.priceChange && <span className="text-green-500 ml-1">({token.priceChange})</span>}
                </div>
              )}
            </div>
            <Badge variant="outline">{token.network}</Badge>
          </CardTitle>
        </div>
        <div className="flex justify-end">
          <TokenEditForm token={token} onCancel={() => setIsEditing(false)} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Contract Address</p>
            <p className="text-sm font-mono">{token.contractAddress}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Price</p>
            <p className="text-lg font-bold">{token.price}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Max Total Supply</p>
            <p>{token.maxTotalSupply}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Circulating Supply</p>
            <p>{token.circulatingSupply}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Fully Diluted Market Cap</p>
            <p>{token.fullyDilutedMarketCap}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Circulating Market Cap</p>
            <p>{token.circulatingMarketCap}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Value Locked</p>
            <p>{token.totalValueLocked}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">APY</p>
            <p>{token.apy}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">State</p>
            <p>{token.state}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{token.endDate ? "Date Range" : "Start Date"}</p>
            <p>{token.endDate ? `${token.startDate} - ${token.endDate}` : token.startDate}</p>
          </div>
        </div>
        <a
          href={token.explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm text-primary hover:underline"
        >
          View on Explorer
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  )
}
