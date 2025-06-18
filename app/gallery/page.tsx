"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight, Heart, Share2, Download } from "lucide-react"

interface Artwork {
  id: number
  title: string
  category: string
  year: string
  medium: string
  dimensions: string
  price: string
  image: string
  description: string
  featured: boolean
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Digital Dreams",
    category: "Digital Art",
    year: "2024",
    medium: "Digital Mixed Media",
    dimensions: "3840 × 2160 px",
    price: "$2,500",
    image: "/placeholder.svg?height=600&width=800",
    description:
      "An exploration of consciousness in the digital age, blending organic forms with technological elements.",
    featured: true,
  },
  {
    id: 2,
    title: "Urban Symphony",
    category: "Photography",
    year: "2023",
    medium: "Fine Art Photography",
    dimensions: "24 × 36 inches",
    price: "$1,800",
    image: "/placeholder.svg?height=600&width=800",
    description: "Capturing the rhythm and energy of city life through long exposure techniques.",
    featured: false,
  },
  {
    id: 3,
    title: "Abstract Emotions",
    category: "Painting",
    year: "2024",
    medium: "Acrylic on Canvas",
    dimensions: "48 × 60 inches",
    price: "$3,200",
    image: "/placeholder.svg?height=600&width=800",
    description: "A visceral representation of human emotions through color and form.",
    featured: true,
  },
  {
    id: 4,
    title: "Nature's Code",
    category: "Digital Art",
    year: "2023",
    medium: "Generative Art",
    dimensions: "4096 × 4096 px",
    price: "$2,000",
    image: "/placeholder.svg?height=600&width=800",
    description: "Algorithmic interpretation of natural patterns and growth systems.",
    featured: false,
  },
  {
    id: 5,
    title: "Midnight Reflections",
    category: "Photography",
    year: "2024",
    medium: "Night Photography",
    dimensions: "20 × 30 inches",
    price: "$1,500",
    image: "/placeholder.svg?height=600&width=800",
    description: "Contemplative moments captured in the quiet hours of the night.",
    featured: false,
  },
  {
    id: 6,
    title: "Cosmic Dance",
    category: "Painting",
    year: "2023",
    medium: "Oil on Canvas",
    dimensions: "36 × 48 inches",
    price: "$2,800",
    image: "/placeholder.svg?height=600&width=800",
    description: "A celebration of movement and energy inspired by celestial bodies.",
    featured: true,
  },
]

const categories = ["All", "Digital Art", "Photography", "Painting"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [filteredArtworks, setFilteredArtworks] = useState(artworks)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredArtworks(artworks)
    } else {
      setFilteredArtworks(artworks.filter((artwork) => artwork.category === selectedCategory))
    }
  }, [selectedCategory])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const nextArtwork = () => {
    if (!selectedArtwork) return
    const currentIndex = filteredArtworks.findIndex((art) => art.id === selectedArtwork.id)
    const nextIndex = (currentIndex + 1) % filteredArtworks.length
    setSelectedArtwork(filteredArtworks[nextIndex])
  }

  const prevArtwork = () => {
    if (!selectedArtwork) return
    const currentIndex = filteredArtworks.findIndex((art) => art.id === selectedArtwork.id)
    const prevIndex = (currentIndex - 1 + filteredArtworks.length) % filteredArtworks.length
    setSelectedArtwork(filteredArtworks[prevIndex])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Gallery...</p>
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary animate-fade-up">Gallery</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up delay-200">
            Explore my collection of visual narratives, each piece telling a unique story through color, form, and
            emotion.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
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

      {/* Gallery Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`group cursor-pointer animate-fade-up delay-${index * 100}`}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative overflow-hidden rounded-2xl bg-gray-900 hover-lift">
                  <img
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">{artwork.title}</h3>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {artwork.category}
                        </Badge>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(artwork.id)
                          }}
                          className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.includes(artwork.id) ? "fill-red-500 text-red-500" : "text-white"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  {artwork.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-primary text-white">Featured</Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="max-w-6xl w-full max-h-full overflow-auto">
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevArtwork}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextArtwork}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="grid md:grid-cols-2 gap-8 bg-gray-900 rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedArtwork.image || "/placeholder.svg"}
                    alt={selectedArtwork.title}
                    className="w-full h-96 md:h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedArtwork.title}</h2>
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                        {selectedArtwork.category}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFavorite(selectedArtwork.id)}
                        className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(selectedArtwork.id) ? "fill-red-500 text-red-500" : "text-white"
                          }`}
                        />
                      </button>
                      <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                        <Share2 className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                        <Download className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{selectedArtwork.description}</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Year</span>
                      <span className="text-white">{selectedArtwork.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Medium</span>
                      <span className="text-white">{selectedArtwork.medium}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Dimensions</span>
                      <span className="text-white">{selectedArtwork.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white font-bold">{selectedArtwork.price}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 bg-gradient-primary hover:opacity-90">Purchase</Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:border-purple-500 hover:text-white"
                    >
                      Inquire
                    </Button>
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
