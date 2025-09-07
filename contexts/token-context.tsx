"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface TokenData {
  id: string
  name: string
  symbol: string
  contractAddress: string
  maxTotalSupply: string
  circulatingSupply: string
  fullyDilutedMarketCap: string
  circulatingMarketCap: string
  price: string
  btcPrice?: string
  priceChange?: string
  daily: string
  balance: string
  apy: string
  state: string
  startDate: string
  endDate?: string
  totalValueLocked: string
  network: string
  explorerUrl: string
  liquidity: "high" | "medium" | "low"
}

interface TokenContextType {
  tokens: TokenData[]
  updateToken: (id: string, updates: Partial<TokenData>) => void
  addToken: (token: TokenData) => void
  deleteToken: (id: string) => void
}

const TokenContext = createContext<TokenContextType | undefined>(undefined)

const initialTokens: TokenData[] = [
  {
    id: "matic",
    name: "MATIC",
    symbol: "MATIC",
    contractAddress: "0x299cd046bfed4003544040fdc20776a73055f743",
    maxTotalSupply: "100,000,000,000,000",
    circulatingSupply: "4,200,000,000,000,000",
    fullyDilutedMarketCap: "$4,200,000,000,000,000",
    circulatingMarketCap: "$4,200,000,000,000,000",
    price: "$0.42",
    btcPrice: "0.000004 BTC",
    priceChange: "+2.57%",
    daily: "+$2.57",
    balance: "$4,200,000,000,000,000",
    apy: "8.56%",
    state: "Flexible",
    startDate: "05.31.2020",
    endDate: "01.01.2025",
    totalValueLocked: "$1,234,567,890",
    network: "Polygon Mainnet",
    explorerUrl: "https://polygonscan.com/token/0x299cd046bfed4003544040fdc20776a73055f743",
    liquidity: "high",
  },
  {
    id: "wsns",
    name: "wSNS",
    symbol: "WSNS",
    contractAddress: "0x25a2db8659707766b3452ab38bCeA593C7E6B559",
    maxTotalSupply: "100,000,000,010,000",
    circulatingSupply: "100,000,000,010,000",
    fullyDilutedMarketCap: "$1,000,000,000,000",
    circulatingMarketCap: "$100,000,000,010,000",
    price: "$1.00",
    daily: "+$45.1",
    balance: "$3,954.04",
    apy: "8.56%",
    state: "Fixed",
    startDate: "02.10.2024",
    totalValueLocked: "$6,700,000,000",
    network: "Polygon Mainnet",
    explorerUrl: "https://www.oklink.com/polygon/token/0x25a2db8659707766b3452ab38bCeA593C7E6B559",
    liquidity: "high",
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    contractAddress: "0x0000000000000000000000000000000000000000",
    maxTotalSupply: "21,000,000",
    circulatingSupply: "19,500,000",
    fullyDilutedMarketCap: "$287,000,000,000",
    circulatingMarketCap: "$266,000,000,000",
    price: "$13,643.21",
    daily: "+$213.8",
    balance: "$13,954.04",
    apy: "5.44%",
    state: "Fixed",
    startDate: "12.03.2024",
    totalValueLocked: "$50,000,000,000",
    network: "Bitcoin",
    explorerUrl: "https://blockchair.com/bitcoin",
    liquidity: "high",
  },
]

export function TokenProvider({ children }: { children: ReactNode }) {
  const [tokens, setTokens] = useState<TokenData[]>(initialTokens)

  const updateToken = (id: string, updates: Partial<TokenData>) => {
    setTokens((prev) => prev.map((token) => (token.id === id ? { ...token, ...updates } : token)))
  }

  const addToken = (token: TokenData) => {
    setTokens((prev) => [...prev, token])
  }

  const deleteToken = (id: string) => {
    setTokens((prev) => prev.filter((token) => token.id !== id))
  }

  return (
    <TokenContext.Provider value={{ tokens, updateToken, addToken, deleteToken }}>{children}</TokenContext.Provider>
  )
}

export function useTokens() {
  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error("useTokens must be used within a TokenProvider")
  }
  return context
}
