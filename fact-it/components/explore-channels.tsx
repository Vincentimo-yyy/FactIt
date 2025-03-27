import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Channel data type
type Channel = {
  id: string
  name: string
  logoUrl: string
}

// Sample channel data
const channels: Channel[] = [
  {
    id: "square-news",
    name: "SQUARE News Politics Daily",
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "cnn",
    name: "CNN Headlines",
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "abc-news",
    name: "ABC CNN News",
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "daily-news",
    name: "Daily News",
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "politics-global",
    name: "Politics Global",
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "sample",
    name: "SAMPLE",
    logoUrl: "/placeholder.svg?height=40&width=40",
  },
]

export function ExploreChannels() {
  return (
    <Card className="bg-[#F3F0FF] border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#4F3E9E] text-lg font-semibold">Explore Channels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white rounded-lg p-2 shadow-sm flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 mb-1 relative">
                <Image src={channel.logoUrl || "/placeholder.svg"} alt={channel.name} fill className="object-contain" />
              </div>
              <p className="text-xs text-center line-clamp-2 text-[#4F3E9E]">{channel.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

