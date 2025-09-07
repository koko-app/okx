interface TokenLogoProps {
  symbol: string
  className?: string
}

export function TokenLogo({ symbol, className = "" }: TokenLogoProps) {
  const logos: Record<string, string> = {
    WSNS: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3904-vaid6OdXcukCoTFLdrNyADGJsMQlyt.jpeg",
    MATIC: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4249-i7G9meqxlRjRvA6gjH77BIAAvQIH7n.jpeg",
  }

  return (
    <div className={`relative aspect-square ${className}`}>
      <img
        src={logos[symbol.toUpperCase()] || `/placeholder.svg?height=24&width=24`}
        alt={`${symbol} Logo`}
        className="object-contain w-full h-full"
      />
    </div>
  )
}
