"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Palette, Camera, Layers, Brush, Building, GraduationCap, CheckCircle, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Custom Paintings",
    description:
      "Bespoke oil and acrylic paintings tailored to your vision and space, created with meticulous attention to detail.",
    features: [
      "Oil & Acrylic mediums",
      "Custom sizes available",
      "Personal consultation included",
      "Professional framing options",
    ],
    price: "Starting at $2,500",
    color: "from-purple-500 to-blue-500",
    popular: false,
  },
  {
    icon: Camera,
    title: "Photography Sessions",
    description: "Professional portrait and artistic photography sessions that capture the essence of your story.",
    features: ["Portrait sessions", "Event photography", "Fine art prints", "Digital delivery included"],
    price: "Starting at $800",
    color: "from-pink-500 to-red-500",
    popular: true,
  },
  {
    icon: Layers,
    title: "Digital Art",
    description: "Contemporary digital compositions and graphic design solutions for modern brands and individuals.",
    features: ["Digital illustrations", "NFT creation", "Brand design", "Print-ready files"],
    price: "Starting at $1,200",
    color: "from-orange-500 to-yellow-500",
    popular: false,
  },
  {
    icon: Brush,
    title: "Art Direction",
    description: "Creative direction and consultation for brands, publications, and artistic projects.",
    features: ["Creative strategy", "Brand consultation", "Project management", "Team collaboration"],
    price: "$150/hour",
    color: "from-green-500 to-teal-500",
    popular: false,
  },
  {
    icon: Building,
    title: "Art Installation",
    description: "Large-scale art installations for galleries, corporate spaces, and public venues.",
    features: ["Site-specific design", "Installation management", "Interactive elements", "Maintenance support"],
    price: "Custom Quote",
    color: "from-blue-500 to-indigo-500",
    popular: false,
  },
  {
    icon: GraduationCap,
    title: "Art Workshops",
    description: "Educational workshops and masterclasses for aspiring artists and art enthusiasts.",
    features: ["Group workshops", "Private lessons", "Online courses", "Materials included"],
    price: "$200/session",
    color: "from-purple-500 to-pink-500",
    popular: false,
  },
]

const processSteps = [
  {
    number: "1",
    title: "Consultation",
    description: "We discuss your vision, requirements, and project scope in detail",
    icon: "💬",
  },
  {
    number: "2",
    title: "Concept Development",
    description: "I create initial sketches and concepts based on our discussion",
    icon: "✏️",
  },
  {
    number: "3",
    title: "Creation",
    description: "The artwork comes to life with regular progress updates",
    icon: "🎨",
  },
  {
    number: "4",
    title: "Delivery",
    description: "Final artwork delivery with professional packaging and installation if needed",
    icon: "📦",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Art Collector",
    content:
      "KSM's custom painting exceeded all my expectations. The attention to detail and emotional depth is remarkable.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    role: "Gallery Director",
    content:
      "Working with KSM on our exhibition was a pleasure. Professional, creative, and delivered exceptional results.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emma Rodriguez",
    role: "Interior Designer",
    content: "The digital art pieces KSM created perfectly complemented our modern office space. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function ServicesPage() {
  const router = useRouter()

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

  const handleGetQuote = () => {
    router.push("/contact")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-particles opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-6xl md:text-7xl font-black mb-6 text-gradient-primary animate-fade-up">My Services</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-up-delay">
              Bringing your creative visions to life through diverse artistic mediums and professional expertise. Let's
              collaborate to create something extraordinary.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden border-0 bg-white/5 backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 fade-in-on-scroll ${
                    service.popular
                      ? "border-purple-400/50 ring-2 ring-purple-400/20"
                      : "border-white/10 hover:border-purple-400/50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="text-white" size={24} />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-purple-400 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between mb-6">
                      <Badge
                        className={`bg-gradient-to-r ${service.color} text-white border-none px-4 py-2 text-lg font-semibold`}
                      >
                        {service.price}
                      </Badge>
                    </div>

                    <Button
                      onClick={handleGetQuote}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white group-hover:scale-105 transition-all duration-300"
                    >
                      Get Quote
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Process Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-8 text-gradient-primary">My Creative Process</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Every project follows a structured approach to ensure the highest quality results and client
                satisfaction.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {processSteps.map((step, index) => (
                <Card
                  key={index}
                  className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 scale-in-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Testimonials */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-8 text-gradient-primary">What Clients Say</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 fade-in-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mr-4"></div>
                      <div>
                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                        <p className="text-purple-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Let's discuss your vision and create something amazing together. Get in touch for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetQuote}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-medium rounded-full hover:scale-105 transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                onClick={() => router.push("/portfolio")}
                variant="outline"
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-12 py-4 text-lg font-medium rounded-full hover:scale-105 transition-all duration-300"
              >
                View Portfolio
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
