"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface HorizontalLandingProps {
  scrollY: number
}

export function HorizontalLanding({ scrollY }: HorizontalLandingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleFabAction = (action: string) => {
    switch (action) {
      case "scroll-explore":
        window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        break
      case "quick-contact":
        router.push("/contact")
        break
      case "theme-toggle":
        document.body.classList.toggle("light-theme")
        break
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="text-center text-white">
          <div className="text-6xl font-black mb-4 animate-pulse bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            KSM
          </div>
          <div className="text-xl mb-8 opacity-80">Loading Portfolio...</div>
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-white to-gray-200 rounded-full animate-loading-progress"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-particles animate-float-particles"></div>
      <div className="absolute inset-0 bg-gradient-radial opacity-30 animate-gradient-shift"></div>

      {/* Horizontal Tablet Container */}
      <div
        className="relative transition-transform duration-300 hover:scale-105"
        style={{
          transform: `translateY(${scrollY * 0.2}px) scale(${1 - (scrollY / window.innerHeight) * 0.2})`,
        }}
      >
        <div className="w-[1000px] h-[700px] bg-gray-900 rounded-[40px] p-4 shadow-2xl border-8 border-gray-800">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-[30px] p-5 relative overflow-hidden">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-sm font-semibold mb-4">
              <span>9:41 AM</span>
              <div className="w-16 h-5 bg-gray-800 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 border border-white rounded-sm relative">
                  <div className="absolute inset-0.5 bg-green-400 rounded-sm w-4/5"></div>
                  <div className="absolute -right-1 top-1 w-1 h-1 bg-white rounded-r"></div>
                </div>
                <div className="text-white">📶</div>
              </div>
            </div>

            {/* Main Content - Horizontal Layout */}
            <div className="flex h-full gap-8">
              {/* Left Section - Artist Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-left">
                  <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-glow">
                    KSM
                  </h1>
                  <p className="text-xl text-gray-300 mb-6 font-light">Visual Artist & Creative Visionary</p>
                  <p className="text-gray-400 leading-relaxed max-w-md">
                    Transforming emotions into visual poetry through the intersection of traditional artistry and
                    digital innovation.
                  </p>
                </div>
              </div>

              {/* Right Section - App Grid */}
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-4 grid-rows-2 gap-6 max-w-md">
                  {[
                    { name: "Portfolio", icon: "🎨", path: "/portfolio", color: "from-purple-500 to-blue-500" },
                    { name: "About", icon: "👤", path: "/about", color: "from-pink-500 to-red-500" },
                    { name: "Services", icon: "🖌️", path: "/services", color: "from-orange-500 to-yellow-500" },
                    { name: "Gallery", icon: "📷", path: "/gallery", color: "from-green-500 to-teal-500" },
                    { name: "Contact", icon: "✉️", path: "/contact", color: "from-blue-500 to-indigo-500" },
                    { name: "Blog", icon: "📚", path: "/blog", color: "from-purple-500 to-pink-500" },
                    { name: "Shop", icon: "🛒", path: "/shop", color: "from-yellow-500 to-orange-500" },
                    { name: "Social", icon: "🔗", path: "/social", color: "from-pink-500 to-purple-500" },
                  ].map((app, index) => (
                    <button
                      key={app.name}
                      onClick={() => handleNavigation(app.path)}
                      className="group flex flex-col items-center p-3 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:-translate-y-2"
                    >
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center text-2xl mb-2 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      >
                        {app.icon}
                      </div>
                      <span className="text-xs text-gray-300 font-medium">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dock */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
              {[
                { icon: "🏠", path: "/" },
                { icon: "📁", path: "/portfolio" },
                { icon: "💬", path: "/contact" },
                { icon: "⚙️", path: "/settings" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl hover:bg-white/20 hover:scale-110 transition-all duration-300"
                >
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
        {[
          { icon: "↓", action: "scroll-explore", tooltip: "Scroll to Explore" },
          { icon: "✉", action: "quick-contact", tooltip: "Quick Contact" },
          { icon: "🌙", action: "theme-toggle", tooltip: "Toggle Theme" },
        ].map((fab, index) => (
          <button
            key={index}
            onClick={() => handleFabAction(fab.action)}
            className="group relative w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          >
            {fab.icon}
            <span className="absolute right-16 bg-black/80 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {fab.tooltip}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white/70 animate-bounce">
        <div className="text-sm mb-2">Scroll to Enter Portfolio</div>
        <div className="w-5 h-5 border-r-2 border-b-2 border-white/70 transform rotate-45 mx-auto"></div>
      </div>
    </div>
  )
}
