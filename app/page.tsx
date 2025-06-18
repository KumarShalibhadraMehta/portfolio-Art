"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleFabAction = (action: string) => {
    switch (action) {
      case "quick-contact":
        router.push("/contact")
        break
      case "theme-toggle":
        document.body.classList.toggle("light-theme")
        break
      case "fullscreen":
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
        break
    }
  }

  // Only rotate to vertical when screen is very small (about half size)
  const shouldRotate = windowSize.width < 600 || (windowSize.width < 800 && windowSize.height < 500)

  // Calculate iPad size based on screen size
  const getIPadSize = () => {
    if (shouldRotate) {
      // Portrait mode for very small screens
      const maxWidth = Math.min(windowSize.width * 0.85, 400)
      const maxHeight = Math.min(windowSize.height * 0.9, 600)
      return {
        width: Math.min(maxWidth, maxHeight * 0.75),
        height: Math.min(maxHeight, maxWidth * 1.33),
      }
    } else {
      // Landscape mode for normal and larger screens
      const maxWidth = Math.min(windowSize.width * 0.85, 1000)
      const maxHeight = Math.min(windowSize.height * 0.85, 700)
      return {
        width: Math.min(maxWidth, maxHeight * 1.43),
        height: Math.min(maxHeight, maxWidth * 0.7),
      }
    }
  }

  const iPadSize = getIPadSize()

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600">
        <div className="text-center text-white">
          <div className="text-8xl font-black mb-6 animate-pulse text-gradient-primary">KSM</div>
          <div className="text-2xl mb-8 opacity-80 font-light">Loading Portfolio...</div>
          <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-white to-gray-200 rounded-full animate-loading"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 overflow-hidden flex items-center justify-center relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-particles opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse delay-300"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      {/* iPad Container */}
      <div
        className="relative transition-all duration-500 hover:scale-105"
        style={{
          width: `${iPadSize.width}px`,
          height: `${iPadSize.height}px`,
        }}
      >
        <div
          className="w-full h-full bg-gray-900 rounded-[40px] p-4 shadow-2xl border-6 border-gray-800 hover-glow"
          style={{
            borderRadius: shouldRotate ? "35px" : "40px",
            padding: shouldRotate ? "12px" : "16px",
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-[30px] relative overflow-hidden flex flex-col">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-sm font-semibold p-5 pb-3 flex-shrink-0">
              <span>9:41 AM</span>
              <div className="w-16 h-5 bg-gray-800 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-3 border border-white rounded-sm relative">
                  <div className="absolute inset-0.5 bg-green-400 rounded-sm w-4/5"></div>
                  <div className="absolute -right-1 top-1 w-1 h-1 bg-white rounded-r"></div>
                </div>
                <div className="text-white">📶</div>
              </div>
            </div>

            {/* Main Content Area - Flexible */}
            <div className="flex-1 flex px-5 pb-20 min-h-0">
              <div className={`flex w-full h-full gap-6 ${shouldRotate ? "flex-col" : "flex-row"}`}>
                {/* Artist Info Section */}
                <div className={`${shouldRotate ? "flex-none" : "flex-1"} flex flex-col justify-center`}>
                  <div className={`${shouldRotate ? "text-center" : "text-left"}`}>
                    <h1
                      className={`${shouldRotate ? "text-4xl" : "text-6xl"} font-black mb-4 text-gradient-primary animate-pulse`}
                    >
                      KSM
                    </h1>
                    <p className={`${shouldRotate ? "text-base" : "text-xl"} text-gray-300 mb-4 font-light`}>
                      Visual Artist & Creative Visionary
                    </p>
                    <p
                      className={`${shouldRotate ? "text-sm" : "text-base"} text-gray-400 leading-relaxed ${shouldRotate ? "max-w-full" : "max-w-md"}`}
                    >
                      Transforming emotions into visual poetry through the intersection of traditional artistry and
                      digital innovation.
                    </p>
                  </div>
                </div>

                {/* App Grid Section */}
                <div className={`${shouldRotate ? "flex-1" : "flex-1"} flex items-center justify-center`}>
                  <div className={`grid grid-cols-4 grid-rows-2 ${shouldRotate ? "gap-3" : "gap-5"} w-full max-w-lg`}>
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
                        className="group flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:-translate-y-2 aspect-square"
                      >
                        <div
                          className={`${shouldRotate ? "w-10 h-10 text-lg" : "w-14 h-14 text-xl"} rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-1 shadow-lg group-hover:shadow-xl transition-all duration-300 hover-glow flex-shrink-0`}
                        >
                          {app.icon}
                        </div>
                        <span
                          className={`${shouldRotate ? "text-xs" : "text-xs"} text-gray-300 font-medium text-center leading-tight`}
                        >
                          {app.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dock - Fixed at Bottom */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 z-10">
              {[
                { icon: "🏠", path: "/", tooltip: "Home" },
                { icon: "📁", path: "/portfolio", tooltip: "Portfolio" },
                { icon: "💬", path: "/contact", tooltip: "Contact" },
                { icon: "⚙️", path: "/settings", tooltip: "Settings" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`group relative ${shouldRotate ? "w-10 h-10" : "w-12 h-12"} rounded-xl bg-white/10 flex items-center justify-center ${shouldRotate ? "text-lg" : "text-xl"} hover:bg-white/20 hover:scale-110 transition-all duration-300`}
                  title={item.tooltip}
                >
                  {item.icon}
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {item.tooltip}
                  </span>
                </button>
              ))}
            </div>

            {/* Home Indicator (like real iPad) */}
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-10">
        {[
          { icon: "✉", action: "quick-contact", tooltip: "Quick Contact" },
          { icon: "🌙", action: "theme-toggle", tooltip: "Toggle Theme" },
          { icon: "⛶", action: "fullscreen", tooltip: "Fullscreen" },
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

      {/* Screen Size Indicator */}
      <div className="absolute bottom-4 left-4 text-white/50 text-xs">
        {shouldRotate ? "Portrait Mode" : "Landscape Mode"} • {windowSize.width}x{windowSize.height}
      </div>
    </div>
  )
}
