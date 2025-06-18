"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Eye, Heart, Share2, ZoomIn, X } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Abstract Emotions",
    category: "painting",
    image: "/placeholder.svg?height=600&width=800",
    description: "A vibrant exploration of human emotions through abstract forms and bold color palettes",
    year: "2024",
    medium: "Oil on Canvas",
    size: "48x36 inches",
    price: "$3,200",
    likes: 234,
    views: 1520,
  },
  {
    id: 2,
    title: "Urban Landscapes",
    category: "photography",
    image: "/placeholder.svg?height=600&width=800",
    description: "Capturing the soul of modern cityscapes through dramatic lighting and composition",
    year: "2023",
    medium: "Digital Photography",
    size: "Limited Edition Prints",
    price: "$450",
    likes: 189,
    views: 2340,
  },
  {
    id: 3,
    title: "Digital Dreams",
    category: "digital",
    image: "/placeholder.svg?height=600&width=800",
    description: "Surreal digital compositions that blur the line between reality and imagination",
    year: "2024",
    medium: "Digital Art",
    size: "4K Resolution",
    price: "$1,200",
    likes: 312,
    views: 1890,
  },
  {
    id: 4,
    title: "Nature's Symphony",
    category: "painting",
    image: "/placeholder.svg?height=600&width=800",
    description: "Oil paintings inspired by the harmonious patterns found in natural landscapes",
    year: "2023",
    medium: "Oil on Canvas",
    size: "60x40 inches",
    price: "$2,800",
    likes: 267,
    views: 1670,
  },
  {
    id: 5,
    title: "Portrait Series",
    category: "photography",
    image: "/placeholder.svg?height=600&width=800",
    description: "Intimate portraits that reveal the inner stories and emotions of subjects",
    year: "2024",
    medium: "Film Photography",
    size: "Various Sizes",
    price: "$350",
    likes: 198,
    views: 1230,
  },
  {
    id: 6,
    title: "Geometric Visions",
    category: "digital",
    image: "/placeholder.svg?height=600&width=800",
    description: "Mathematical beauty expressed through precise geometric forms and gradients",
    year: "2023",
    medium: "Digital Art",
    size: "Print & NFT",
    price: "$800",
    likes: 445,
    views: 2890,
  },
]

const categories = ["all", "painting", "photography", "digital"]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredItems, setFilteredItems] = useState(portfolioItems)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [likedItems, setLikedItems] = useState<number[]>([])

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(portfolioItems)
    } else {
      setFilteredItems(portfolioItems.filter((item) => item.category === activeCategory))
    }
  }, [activeCategory])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".fade-in-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredItems])

  const openLightbox = (item: any) => {
    setSelectedItem(item)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setSelectedItem(null)
    document.body.style.overflow = "unset"
  }

  const toggleLike = (itemId: number) => {
    setLikedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-particles opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-gradient-primary animate-fade-up">My Portfolio</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay">
              A curated collection of my finest works, spanning various mediums and artistic expressions. Each piece
              represents a journey of creative exploration and emotional depth.
            </p>
          </div>
        </section>

        {/* Portfolio Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {categories.map((category, index) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`capitalize px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black"
                  }`}
                >
                  {category === "all" ? "All Works" : category}
                </Button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-0 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                      <div className="flex justify-between items-start">
                        <Badge className="bg-purple-600/80 text-white border-none">{item.category}</Badge>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleLike(item.id)
                            }}
                            className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                          >
                            <Heart
                              size={16}
                              className={likedItems.includes(item.id) ? "fill-red-500 text-red-500" : "text-white"}
                            />
                          </button>
                          <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                            <Share2 size={16} className="text-white" />
                          </button>
                        </div>
                      </div>

                      <div className="text-white">
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {item.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart size={14} />
                            {item.likes + (likedItems.includes(item.id) ? 1 : 0)}
                          </span>
                        </div>
                        <button
                          onClick={() => openLightbox(item)}
                          className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
                        >
                          <ZoomIn size={16} />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        {item.year} • {item.medium}
                      </div>
                      <div className="text-purple-400 font-semibold">{item.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Interested in a Custom Piece?</h2>
            <p className="text-lg text-gray-300 mb-8">
              I create custom artworks tailored to your vision and space. Let's discuss your project and bring your
              ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                Commission Artwork
              </a>
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                Browse Shop
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 text-white border-none rounded-full flex items-center justify-center z-10"
            >
              <X size={24} />
            </button>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square">
                  <Image
                    src={selectedItem.image || "/placeholder.svg"}
                    alt={selectedItem.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <Badge className="bg-purple-600/80 text-white border-none mb-4">{selectedItem.category}</Badge>
                    <h2 className="text-4xl font-bold text-white mb-2">{selectedItem.title}</h2>
                    <p className="text-lg text-gray-300">
                      {selectedItem.year} • {selectedItem.medium}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">About This Piece</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedItem.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Medium</h4>
                        <p className="text-gray-400">{selectedItem.medium}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Size</h4>
                        <p className="text-gray-400">{selectedItem.size}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Year</h4>
                        <p className="text-gray-400">{selectedItem.year}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Price</h4>
                        <p className="text-purple-400 font-semibold">{selectedItem.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Eye size={16} />
                        <span>{selectedItem.views} views</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Heart size={16} />
                        <span>{selectedItem.likes + (likedItems.includes(selectedItem.id) ? 1 : 0)} likes</span>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                        Purchase
                      </button>
                      <button className="px-6 py-3 border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black rounded-lg font-medium transition-all duration-300 hover:scale-105">
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
