"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowRight, Search, Tag } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  tags: string[]
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Evolution of Digital Art in the Modern Era",
    excerpt: "Exploring how technology has transformed artistic expression and opened new creative possibilities.",
    content: "Digital art has revolutionized the way we create and experience visual art...",
    category: "Digital Art",
    author: "KSM",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    tags: ["Digital Art", "Technology", "Innovation"],
  },
  {
    id: 2,
    title: "Finding Inspiration in Urban Landscapes",
    excerpt: "How city environments influence my photographic work and creative process.",
    content: "The urban landscape offers endless opportunities for artistic exploration...",
    category: "Photography",
    author: "KSM",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Photography", "Urban", "Inspiration"],
  },
  {
    id: 3,
    title: "Color Theory in Contemporary Art",
    excerpt: "Understanding the psychological and emotional impact of color choices in visual art.",
    content: "Color is one of the most powerful tools in an artist's arsenal...",
    category: "Art Theory",
    author: "KSM",
    date: "2024-01-05",
    readTime: "10 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Color Theory", "Psychology", "Art"],
  },
  {
    id: 4,
    title: "Behind the Scenes: My Creative Process",
    excerpt: "A detailed look at how I approach new projects from concept to completion.",
    content: "Every piece begins with an idea, but the journey from concept to completion...",
    category: "Process",
    author: "KSM",
    date: "2023-12-28",
    readTime: "12 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    tags: ["Process", "Creative", "Behind the Scenes"],
  },
  {
    id: 5,
    title: "The Role of AI in Modern Art Creation",
    excerpt: "Examining the intersection of artificial intelligence and human creativity.",
    content: "Artificial intelligence is becoming an increasingly important tool...",
    category: "Technology",
    author: "KSM",
    date: "2023-12-20",
    readTime: "9 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["AI", "Technology", "Future"],
  },
  {
    id: 6,
    title: "Sustainable Practices in Art Production",
    excerpt: "How artists can reduce their environmental impact while maintaining creative quality.",
    content: "As artists, we have a responsibility to consider the environmental impact...",
    category: "Sustainability",
    author: "KSM",
    date: "2023-12-15",
    readTime: "7 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
    tags: ["Sustainability", "Environment", "Ethics"],
  },
]

const categories = ["All", "Digital Art", "Photography", "Art Theory", "Process", "Technology", "Sustainability"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = blogPosts

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm])

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log("Newsletter signup:", email)
    setEmail("")
    alert("Thank you for subscribing to our newsletter!")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Blog...</p>
        </div>
      </div>
    )
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navigation />
        <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setSelectedPost(null)}
              className="mb-8 border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white"
            >
              ← Back to Blog
            </Button>

            <div className="mb-8">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 mb-4">
                {selectedPost.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">{selectedPost.title}</h1>
              <div className="flex items-center gap-6 text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            <img
              src={selectedPost.image || "/placeholder.svg"}
              alt={selectedPost.title}
              className="w-full h-96 object-cover rounded-2xl mb-8"
            />

            <div className="prose prose-invert max-w-none">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">{selectedPost.excerpt}</p>
              <div className="text-gray-300 leading-relaxed space-y-6">
                <p>{selectedPost.content}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="border-gray-600 text-gray-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </article>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary animate-fade-up">Blog</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up delay-200">
            Insights, inspiration, and stories from my creative journey. Explore the intersection of art, technology,
            and human expression.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-primary text-white"
                    : "border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.some((post) => post.featured) && (
        <section className="px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Article</h2>
            {filteredPosts
              .filter((post) => post.featured)
              .slice(0, 1)
              .map((post) => (
                <Card key={post.id} className="bg-gray-900 border-gray-800 overflow-hidden hover-lift cursor-pointer">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 mb-4">
                        {post.category}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-gray-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button onClick={() => setSelectedPost(post)} className="bg-gradient-primary hover:opacity-90">
                        Read More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <Card
                  key={post.id}
                  className={`bg-gray-900 border-gray-800 overflow-hidden hover-lift cursor-pointer animate-fade-up delay-${index * 100}`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative">
                    <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
                    <Badge variant="secondary" className="absolute top-4 left-4 bg-purple-500/20 text-purple-300">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-primary p-8 text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white mb-4">Stay Updated</CardTitle>
              <p className="text-white/90 text-lg">
                Subscribe to my newsletter for the latest articles, insights, and creative updates.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/70"
                />
                <Button type="submit" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
