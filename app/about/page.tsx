"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Palette, Users, Eye, Award, Calendar, MapPin, Heart, Star } from "lucide-react"

const stats = [
  { number: "150+", label: "Artworks Created", icon: Palette, color: "from-purple-500 to-blue-500" },
  { number: "50+", label: "Happy Clients", icon: Users, color: "from-pink-500 to-red-500" },
  { number: "25+", label: "Exhibitions", icon: Eye, color: "from-orange-500 to-yellow-500" },
  { number: "10+", label: "Awards Won", icon: Award, color: "from-green-500 to-teal-500" },
]

const timeline = [
  {
    year: "2024",
    title: "Digital Innovation Series",
    description:
      "Launched my first NFT collection exploring the intersection of traditional art and blockchain technology",
    icon: "🚀",
  },
  {
    year: "2023",
    title: "San Francisco Gallery Exhibition",
    description: "Solo exhibition featuring 30 paintings at the prestigious Modern Art Gallery SF",
    icon: "🎨",
  },
  {
    year: "2022",
    title: "International Recognition",
    description: "Awarded 'Emerging Artist of the Year' by the Contemporary Art Foundation",
    icon: "🏆",
  },
  {
    year: "2020",
    title: "Professional Art Career Launch",
    description: "Transitioned to full-time artist, opening my first studio in San Francisco",
    icon: "🎯",
  },
]

const skills = [
  { icon: "🎨", title: "Oil Painting", description: "Traditional techniques with modern themes", level: 95 },
  { icon: "💻", title: "Digital Art", description: "Contemporary digital compositions", level: 90 },
  { icon: "📷", title: "Photography", description: "Portrait and artistic photography", level: 85 },
  { icon: "🎭", title: "Mixed Media", description: "Experimental combinations", level: 88 },
]

const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Every piece is created with genuine passion and emotional depth",
  },
  {
    icon: Star,
    title: "Excellence",
    description: "Committed to the highest standards of artistic quality and craftsmanship",
  },
  {
    icon: Users,
    title: "Connection",
    description: "Art should create meaningful connections between artist and viewer",
  },
  {
    icon: Eye,
    title: "Vision",
    description: "Constantly pushing boundaries and exploring new creative possibilities",
  },
]

export default function AboutPage() {
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

    const animatedElements = document.querySelectorAll(
      ".fade-in-on-scroll, .slide-in-left, .slide-in-right, .scale-in-on-scroll",
    )
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-particles opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-gradient-primary animate-fade-up">About Me</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay">
              Discover the artist behind the vision - my journey, inspiration, and creative process that drives every
              piece I create.
            </p>
          </div>
        </section>

        {/* Main About Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="slide-in-left">
                <h2 className="text-4xl font-bold mb-8 text-white">My Artistic Journey</h2>
                <div className="space-y-6 text-gray-300 leading-relaxed">
                  <p className="text-lg">
                    I'm a passionate visual artist with over a decade of experience in creating compelling visual
                    narratives. My work spans across traditional painting, digital art, and photography, always seeking
                    to push the boundaries of creative expression.
                  </p>
                  <p className="text-lg">
                    Based in San Francisco, I draw inspiration from the intersection of technology and human emotion,
                    creating pieces that resonate with contemporary audiences while honoring classical artistic
                    traditions.
                  </p>
                  <p className="text-lg">
                    My artistic philosophy centers on the belief that art should not just be seen, but felt. Each piece
                    I create is designed to evoke emotion, spark conversation, and challenge perspectives.
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>Active since 2020</span>
                  </div>
                </div>
              </div>

              <div className="relative slide-in-right">
                <div className="relative z-10 hover-scale">
                  <Image
                    src="/placeholder.svg?height=700&width=600"
                    alt="Artist Portrait"
                    width={600}
                    height={700}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl animate-pulse-slow" />
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 scale-in-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full mb-4 hover-scale`}
                    >
                      <stat.icon className="text-white" size={24} />
                    </div>
                    <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skills Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-12 text-center text-white">My Specialties</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 fade-in-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{skill.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{skill.title}</h3>
                          <p className="text-gray-400 text-sm">{skill.description}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-purple-400 mt-2">{skill.level}%</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Values Section */}
            <div className="mb-20">
              <h2 className="text-4xl font-bold mb-12 text-center text-white">My Values</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <Card
                    key={index}
                    className="text-center p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 fade-in-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full mb-4 hover-scale">
                        <value.icon className="text-purple-400" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div>
              <h2 className="text-4xl font-bold mb-12 text-center text-white">Artistic Timeline</h2>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-8 fade-in-on-scroll"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl mb-4">
                        {item.icon}
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none px-4 py-2">
                        {item.year}
                      </Badge>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Let's Create Something Amazing Together</h2>
            <p className="text-lg text-gray-300 mb-8">
              Ready to bring your artistic vision to life? I'd love to hear about your project and explore how we can
              collaborate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                Start a Project
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black rounded-full font-medium transition-all duration-300 hover:scale-105"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
