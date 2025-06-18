"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, Star, Search, Plus, Minus, X, CreditCard, Truck, Shield } from "lucide-react"

interface Product {
  id: number
  title: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  description: string
  inStock: boolean
  featured: boolean
  tags: string[]
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    title: "Digital Dreams Print",
    category: "Prints",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=400&width=400",
    description: "High-quality giclée print on archival paper. Limited edition of 50.",
    inStock: true,
    featured: true,
    tags: ["Digital Art", "Limited Edition", "Giclée"],
  },
  {
    id: 2,
    title: "Urban Symphony Canvas",
    category: "Canvas",
    price: 245,
    rating: 4.9,
    reviews: 18,
    image: "/placeholder.svg?height=400&width=400",
    description: "Museum-quality canvas print with gallery wrap. Ready to hang.",
    inStock: true,
    featured: false,
    tags: ["Photography", "Canvas", "Ready to Hang"],
  },
  {
    id: 3,
    title: "Abstract Emotions Original",
    category: "Originals",
    price: 1200,
    rating: 5.0,
    reviews: 3,
    image: "/placeholder.svg?height=400&width=400",
    description: "Original acrylic painting on canvas. One-of-a-kind artwork.",
    inStock: true,
    featured: true,
    tags: ["Original", "Acrylic", "Painting"],
  },
  {
    id: 4,
    title: "Nature's Code NFT",
    category: "NFTs",
    price: 0.5,
    rating: 4.7,
    reviews: 12,
    image: "/placeholder.svg?height=400&width=400",
    description: "Unique digital artwork minted on Ethereum blockchain.",
    inStock: true,
    featured: false,
    tags: ["NFT", "Digital", "Blockchain"],
  },
  {
    id: 5,
    title: "Midnight Reflections Photo",
    category: "Photography",
    price: 65,
    rating: 4.6,
    reviews: 31,
    image: "/placeholder.svg?height=400&width=400",
    description: "Fine art photography print on premium paper.",
    inStock: false,
    featured: false,
    tags: ["Photography", "Night", "Fine Art"],
  },
  {
    id: 6,
    title: "Cosmic Dance Poster",
    category: "Posters",
    price: 25,
    originalPrice: 35,
    rating: 4.4,
    reviews: 67,
    image: "/placeholder.svg?height=400&width=400",
    description: "High-quality poster print perfect for any space.",
    inStock: true,
    featured: false,
    tags: ["Poster", "Affordable", "Decorative"],
  },
]

const categories = ["All", "Prints", "Canvas", "Originals", "NFTs", "Photography", "Posters"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Rating", "Newest"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("Featured")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<number[]>([])
  const [showCart, setShowCart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = products

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "Featured":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, searchTerm, sortBy])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Shop...</p>
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-primary animate-fade-up">Shop</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up delay-200">
            Bring my art into your space. From limited edition prints to original works, find the perfect piece for your
            collection.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button onClick={() => setShowCart(true)} className="bg-gradient-primary hover:opacity-90 relative">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Cart ({cartItemCount})
            </Button>
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

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`bg-gray-900 border-gray-800 overflow-hidden hover-lift animate-fade-up delay-${index * 100}`}
              >
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                  {product.featured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-primary text-white">Featured</Badge>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"
                      }`}
                    />
                  </button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{product.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">
                        ${product.category === "NFTs" ? `${product.price} ETH` : product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {product.category}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="w-full bg-gradient-primary hover:opacity-90 disabled:opacity-50"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-gray-900 h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{item.title}</h3>
                          <p className="text-gray-400 text-sm">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded bg-gray-700 hover:bg-gray-600"
                            >
                              <Minus className="w-4 h-4 text-white" />
                            </button>
                            <span className="text-white px-2">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded bg-gray-700 hover:bg-gray-600"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-800 pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl font-bold text-white">Total:</span>
                      <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 mb-4">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Checkout
                    </Button>
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <span>Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        <span>Secure Payment</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
