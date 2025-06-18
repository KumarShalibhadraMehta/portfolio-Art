"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Github,
  Heart,
  MessageCircle,
  Share2,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react"

interface SocialPost {
  id: number
  platform: string
  content: string
  image?: string
  video?: string
  likes: number
  comments: number
  shares: number
  date: string
  engagement: number
}

interface SocialStats {
  platform: string
  followers: string
  engagement: string
  growth: string
  icon: React.ReactNode
  color: string
  posts: number
}

const socialPosts: SocialPost[] = [
  {
    id: 1,
    platform: "Instagram",
    content:
      "Just finished this new digital piece! The interplay of light and shadow in urban environments never ceases to inspire me. ✨ #DigitalArt #UrbanPhotography",
    image: "/placeholder.svg?height=400&width=400",
    likes: 1247,
    comments: 89,
    shares: 156,
    date: "2024-01-15",
    engagement: 12.4,
  },
  {
    id: 2,
    platform: "Twitter",
    content:
      "Working on a new series exploring the intersection of AI and human creativity. The future of art is collaborative, not competitive. 🤖🎨",
    likes: 892,
    comments: 134,
    shares: 267,
    date: "2024-01-14",
    engagement: 8.9,
  },
  {
    id: 3,
    platform: "YouTube",
    content: "Behind the Scenes: Creating 'Digital Dreams' - Full Process Video",
    video: "/placeholder.svg?height=300&width=500",
    likes: 2341,
    comments: 198,
    shares: 445,
    date: "2024-01-12",
    engagement: 15.7,
  },
  {
    id: 4,
    platform: "LinkedIn",
    content:
      "Reflecting on the evolution of digital art in the past decade. From skepticism to mainstream acceptance, we've come a long way. What's next?",
    likes: 567,
    comments: 78,
    shares: 123,
    date: "2024-01-10",
    engagement: 6.8,
  },
  {
    id: 5,
    platform: "Facebook",
    content:
      "Excited to announce my upcoming exhibition 'Fragments of Tomorrow' opening next month at Gallery X. Preview some pieces here!",
    image: "/placeholder.svg?height=400&width=600",
    likes: 1834,
    comments: 267,
    shares: 389,
    date: "2024-01-08",
    engagement: 18.3,
  },
  {
    id: 6,
    platform: "GitHub",
    content: "Open-sourced my generative art algorithms! Check out the repository for creating procedural landscapes.",
    likes: 445,
    comments: 67,
    shares: 234,
    date: "2024-01-05",
    engagement: 11.2,
  },
]

const socialStats: SocialStats[] = [
  {
    platform: "Instagram",
    followers: "24.5K",
    engagement: "8.7%",
    growth: "+12%",
    icon: <Instagram className="w-6 h-6" />,
    color: "from-pink-500 to-purple-500",
    posts: 342,
  },
  {
    platform: "Twitter",
    followers: "18.2K",
    engagement: "6.4%",
    growth: "+8%",
    icon: <Twitter className="w-6 h-6" />,
    color: "from-blue-400 to-blue-600",
    posts: 1247,
  },
  {
    platform: "YouTube",
    followers: "12.8K",
    engagement: "12.3%",
    growth: "+25%",
    icon: <Youtube className="w-6 h-6" />,
    color: "from-red-500 to-red-600",
    posts: 67,
  },
  {
    platform: "LinkedIn",
    followers: "8.9K",
    engagement: "5.2%",
    growth: "+15%",
    icon: <Linkedin className="w-6 h-6" />,
    color: "from-blue-600 to-blue-700",
    posts: 156,
  },
  {
    platform: "Facebook",
    followers: "15.3K",
    engagement: "4.8%",
    growth: "+6%",
    icon: <Facebook className="w-6 h-6" />,
    color: "from-blue-500 to-blue-700",
    posts: 234,
  },
  {
    platform: "GitHub",
    followers: "3.4K",
    engagement: "15.6%",
    growth: "+32%",
    icon: <Github className="w-6 h-6" />,
    color: "from-gray-600 to-gray-800",
    posts: 89,
  },
]

export default function SocialPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [filteredPosts, setFilteredPosts] = useState(socialPosts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selectedPlatform === "All") {
      setFilteredPosts(socialPosts)
    } else {
      setFilteredPosts(socialPosts.filter((post) => post.platform === selectedPlatform))
    }
  }, [selectedPlatform])

  const totalFollowers = socialStats.reduce((sum, stat) => {
    const followers = Number.parseFloat(stat.followers.replace("K", "")) * 1000
    return sum + followers
  }, 0)

  const averageEngagement = (
    socialStats.reduce((sum, stat) => sum + Number.parseFloat(stat.engagement.replace("%", "")), 0) / socialStats.length
  ).toFixed(1)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Social Feed...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary animate-fade-up">Social</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up delay-200">
            Connect with me across platforms. Follow my creative journey, behind-the-scenes content, and join the
            conversation about art and technology.
          </p>
        </div>
      </section>

      {/* Social Stats Overview */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{Math.round(totalFollowers / 1000)}K+</div>
                <div className="text-gray-400 text-sm">Total Followers</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{averageEngagement}%</div>
                <div className="text-gray-400 text-sm">Avg Engagement</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">6</div>
                <div className="text-gray-400 text-sm">Platforms</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 border-gray-800 text-center">
              <CardContent className="p-6">
                <Share2 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">2.1K+</div>
                <div className="text-gray-400 text-sm">Total Posts</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialStats.map((stat, index) => (
              <Card key={stat.platform} className={`bg-gray-900 border-gray-800 text-center ${stat.color}`}>
                <CardContent className="p-6">
                  {stat.icon}
                  <div className="text-xl font-bold text-white mt-4">{stat.platform}</div>
                  <div className="text-gray-400 text-sm mb-2">Followers: {stat.followers}</div>
                  <div className="text-gray-400 text-sm mb-2">Engagement: {stat.engagement}</div>
                  <div className="text-gray-400 text-sm mb-2">Growth: {stat.growth}</div>
                  <div className="text-gray-400 text-sm">Posts: {stat.posts}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Posts */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setSelectedPlatform("All")}
              className={`mr-2 ${selectedPlatform === "All" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}
            >
              All
            </Button>
            {socialStats.map((stat) => (
              <Button
                key={stat.platform}
                onClick={() => setSelectedPlatform(stat.platform)}
                className={`mr-2 ${selectedPlatform === stat.platform ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}
              >
                {stat.platform}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>{post.platform}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {post.image && (
                    <img src={post.image || "/placeholder.svg"} alt={post.content} className="w-full h-auto mb-4" />
                  )}
                  {post.video && <video src={post.video} controls className="w-full h-auto mb-4"></video>}
                  <p>{post.content}</p>
                  <div className="flex justify-between mt-4">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <Share2 className="w-5 h-5 mr-2" />
                      <span>{post.shares}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
