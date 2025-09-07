import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { TokenProvider } from "@/contexts/token-context"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TokenProvider>{children}</TokenProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
