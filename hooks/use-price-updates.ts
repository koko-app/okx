"use client"

import { useEffect, useRef, useState } from "react"
import { fetchTokenPrices } from "@/services/crypto-api"
import { useTokens } from "@/contexts/token-context"

export function usePriceUpdates(updateInterval = 30000) {
  // 30 seconds default
  const { tokens, updateToken } = useTokens()
  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const updatePrices = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const symbols = tokens.map((token) => token.symbol)
      const priceData = await fetchTokenPrices(symbols)

      // Update each token with new price data
      Object.entries(priceData).forEach(([symbol, data]) => {
        const token = tokens.find((t) => t.symbol.toUpperCase() === symbol)
        if (token) {
          const priceChangeSign = data.priceChangePercentage24h >= 0 ? "+" : ""
          const dailyChangeSign = data.priceChange24h >= 0 ? "+" : ""

          updateToken(token.id, {
            price: `$${data.price.toFixed(data.price < 1 ? 4 : 2)}`,
            btcPrice: data.btcPrice ? `${data.btcPrice.toFixed(8)} BTC` : undefined,
            priceChange: `${priceChangeSign}${data.priceChangePercentage24h.toFixed(2)}%`,
            daily: `${dailyChangeSign}$${Math.abs(data.priceChange24h).toFixed(2)}`,
            circulatingSupply: data.circulatingSupply.toLocaleString(),
            maxTotalSupply: data.maxSupply ? data.maxSupply.toLocaleString() : data.totalSupply.toLocaleString(),
            circulatingMarketCap: `$${data.marketCap.toLocaleString()}`,
            fullyDilutedMarketCap: data.maxSupply
              ? `$${(data.price * data.maxSupply).toLocaleString()}`
              : `$${data.marketCap.toLocaleString()}`,
          })
        }
      })

      setLastUpdate(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update prices")
    } finally {
      setIsLoading(false)
    }
  }

  const startUpdates = () => {
    // Initial update
    updatePrices()

    // Set up interval for regular updates
    intervalRef.current = setInterval(updatePrices, updateInterval)
  }

  const stopUpdates = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    startUpdates()

    return () => {
      stopUpdates()
    }
  }, [tokens.length, updateInterval])

  return {
    isLoading,
    lastUpdate,
    error,
    updatePrices,
    startUpdates,
    stopUpdates,
  }
}
