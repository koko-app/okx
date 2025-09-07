interface BrandLogoProps {
  className?: string
}

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3904-vaid6OdXcukCoTFLdrNyADGJsMQlyt.jpeg"
        alt="wSNS Logo"
        className="object-contain w-full h-full"
      />
    </div>
  )
}
