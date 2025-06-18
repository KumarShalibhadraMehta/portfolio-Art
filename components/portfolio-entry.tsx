"use client"

import { useRouter } from "next/navigation"

export function PortfolioEntry() {
  const router = useRouter()

  const handleCardClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full text-center">
        <div className="mb-16">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Welcome to KSM's World
          </h1>
          <p className="text-2xl text-gray-300 font-light">Where Art Meets Innovation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Portfolio",
              description: "Explore my latest artworks",
              path: "/portfolio",
              gradient: "from-purple-500 to-blue-500",
            },
            {
              title: "About",
              description: "Learn about my journey",
              path: "/about",
              gradient: "from-pink-500 to-red-500",
            },
            {
              title: "Contact",
              description: "Let's create together",
              path: "/contact",
              gradient: "from-blue-500 to-indigo-500",
            },
          ].map((card, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(card.path)}
              className="group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-4"
            >
              <div
                className={`w-full h-48 bg-gradient-to-br ${card.gradient} rounded-2xl mb-6 group-hover:shadow-2xl transition-all duration-500`}
              ></div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {card.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
