"use client"

import { Card } from "@/components/ui/card"
import { ClipboardCopyIcon } from "lucide-react"

export default function MaticCard() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#1a0b2e]/50 border border-purple-500/20 backdrop-blur-sm">
        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="w-16 h-16 mx-auto mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4249-MzhlG3Mo2MGskslEF6siMo5Q8JgqdL.jpeg"
              alt="MATIC Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Price Section */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">MATIC</h2>
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-bold text-white">$0.42</p>
              <span className="text-green-400 text-sm">+2.57%</span>
            </div>
            <p className="text-purple-300/80 text-sm">@ 0.000004 BTC</p>
          </div>

          {/* Contract Address */}
          <div className="mt-4 p-3 bg-purple-500/5 rounded-lg border border-purple-500/10">
            <p className="text-purple-300/60 text-xs mb-1">Contract Address</p>
            <div className="flex items-center gap-2">
              <p className="text-purple-300 text-sm font-mono truncate">0x299cd046bfed4003544040fdc20776a73055f743</p>
              <button
                className="text-purple-300/60 hover:text-purple-300"
                onClick={() => navigator.clipboard.writeText("0x299cd046bfed4003544040fdc20776a73055f743")}
              >
                <ClipboardCopyIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Supply Information */}
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300/60">Max Total Supply</span>
                <span className="text-white font-medium">100,000,000,000,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-300/60">Circulating Supply</span>
                <span className="text-white font-medium">4,200,000,000,000,000</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-purple-300/60">Fully Diluted Market Cap</span>
                <span className="text-white font-medium">$4,200,000,000,000,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-300/60">Circulating Market Cap</span>
                <span className="text-white font-medium">$4,200,000,000,000,000</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="space-y-1">
              <p className="text-purple-300/60 text-sm">APY</p>
              <p className="text-white font-medium">8.56%</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-300/60 text-sm">Reward Rate</p>
              <p className="text-white font-medium">5.44%</p>
            </div>
            <div className="space-y-1">
              <p className="text-purple-300/60 text-sm">Start Date</p>
              <p className="text-white font-medium">05.31.2020</p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center justify-between pt-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Flexible
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20">
              Active
            </span>
          </div>
        </div>
      </Card>
    </div>
  )
}
