interface CoinGeckoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  market_cap_rank: number
  price_change_24h: number
}

interface CoinGeckoResponse {
  [key: string]: CoinGeckoPrice
}

const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3"

// Map our token symbols to CoinGecko IDs
const TOKEN_ID_MAP: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  MATIC: "matic-network",
  USDT: "tether",
  WSNS: "wrapped-sns", // This might not exist on CoinGecko
}

export interface TokenPriceData {
  symbol: string
  name: string
  price: number
  priceChange24h: number
  priceChangePercentage24h: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  btcPrice?: number
}

export async function fetchTokenPrices(symbols: string[]): Promise<Record<string, TokenPriceData>> {
  try {
    // Filter out symbols that don't have CoinGecko IDs
    const validSymbols = symbols.filter((symbol) => TOKEN_ID_MAP[symbol.toUpperCase()])
    const coinIds = validSymbols.map((symbol) => TOKEN_ID_MAP[symbol.toUpperCase()]).join(",")

    if (!coinIds) {
      throw new Error("No valid token symbols provided")
    }

    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${coinIds}&vs_currencies=usd,btc&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Also fetch detailed coin data for supply information
    const detailedResponse = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    )

    const detailedData: CoinGeckoPrice[] = detailedResponse.ok ? await detailedResponse.json() : []

    const result: Record<string, TokenPriceData> = {}

    validSymbols.forEach((symbol) => {
      const coinId = TOKEN_ID_MAP[symbol.toUpperCase()]
      const priceData = data[coinId]
      const detailedInfo = detailedData.find((coin) => coin.id === coinId)

      if (priceData) {
        result[symbol.toUpperCase()] = {
          symbol: symbol.toUpperCase(),
          name: detailedInfo?.name || symbol,
          price: priceData.usd || 0,
          priceChange24h: priceData.usd_24h_change || 0,
          priceChangePercentage24h: priceData.usd_24h_change || 0,
          marketCap: priceData.usd_market_cap || 0,
          volume24h: priceData.usd_24h_vol || 0,
          circulatingSupply: detailedInfo?.circulating_supply || 0,
          totalSupply: detailedInfo?.total_supply || 0,
          maxSupply: detailedInfo?.max_supply || 0,
          btcPrice: priceData.btc || 0,
        }
      }
    })

    return result
  } catch (error) {
    console.error("Error fetching token prices:", error)
    return {}
  }
}

export async function fetchSingleTokenPrice(symbol: string): Promise<TokenPriceData | null> {
  const result = await fetchTokenPrices([symbol])
  return result[symbol.toUpperCase()] || null
}

// Alternative API for tokens not available on CoinGecko
export async function fetchTokenPriceFromDEX(contractAddress: string, network = "polygon"): Promise<number | null> {
  try {
    // This is a placeholder for DEX price fetching
    // You could use APIs like 1inch, Uniswap, or QuickSwap for DEX prices
    const response = await fetch(
      `https://api.1inch.io/v5.0/${network === "polygon" ? "137" : "1"}/quote?fromTokenAddress=${contractAddress}&toTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&amount=1000000000000000000`,
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return Number.parseFloat(data.toTokenAmount) / 1e18
  } catch (error) {
    console.error("Error fetching DEX price:", error)
    return null
  }
}
