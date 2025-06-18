"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Send, MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showIpad, setShowIpad] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setShowIpad(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          projectType: "",
          budget: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      details: ["San Francisco, CA", "Available Worldwide"],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "Mon-Fri 9AM-6PM PST"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["hello@ksm.art", "Response within 24hrs"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Availability",
      details: ["Monday - Friday", "9:00 AM - 6:00 PM PST"],
    },
  ]

  if (showIpad) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        {/* iPad Interface */}
        <div className="relative transition-transform duration-300 hover:scale-105">
          <div className="w-[1000px] h-[700px] bg-gray-900 rounded-[40px] p-4 shadow-2xl border-8 border-gray-800">
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-[30px] p-5 relative overflow-hidden">
              {/* Status Bar */}
              <div className="flex justify-between items-center text-white text-sm font-semibold mb-4">
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

              {/* Contact App Interface */}
              <div className="flex h-full">
                {/* Left Side - Contact Form Preview */}
                <div className="flex-1 p-6 bg-white/5 rounded-2xl mr-4">
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={() => router.push("/")}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-2xl font-bold text-white">Contact</h1>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">Send Message</span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-8 bg-white/10 rounded"></div>
                        <div className="h-8 bg-white/10 rounded"></div>
                        <div className="h-20 bg-white/10 rounded"></div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Phone className="w-5 h-5 text-green-400" />
                        <span className="text-white font-medium">Quick Call</span>
                      </div>
                      <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                {/* Right Side - Contact Info */}
                <div className="flex-1 p-6">
                  <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
                  <p className="text-gray-300 mb-8">
                    Ready to bring your creative vision to life? Let's discuss your project.
                  </p>

                  <div className="space-y-4">
                    {contactInfo.slice(0, 3).map((info, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                        <div className="text-purple-400">{info.icon}</div>
                        <div>
                          <h3 className="text-white font-medium">{info.title}</h3>
                          <p className="text-gray-300 text-sm">{info.details[0]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Loading indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="text-white text-sm">Loading Contact Form...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-gradient-primary hover:scale-105 transition-transform"
            >
              KSM
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient-primary">Get In Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to bring your creative vision to life? Let's discuss your project and create something amazing
              together.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a project type</option>
                      <option value="Custom Painting">Custom Painting</option>
                      <option value="Photography Session">Photography Session</option>
                      <option value="Digital Art Commission">Digital Art Commission</option>
                      <option value="Art Direction">Art Direction</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select budget range</option>
                      <option value="Under $1,000">Under $1,000</option>
                      <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="Over $10,000">Over $10,000</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                      placeholder="Tell me about your project vision, timeline, and any specific requirements..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! I'll get back to you within 24 hours.</span>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
                      <AlertCircle className="w-5 h-5" />
                      <span>Failed to send message. Please try again or contact me directly.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-lg font-medium transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Contact Information</h2>
                <p className="text-gray-300 text-lg mb-8">
                  I'm always excited to work on new projects and collaborate with creative minds. Feel free to reach out
                  through any of the channels below.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-purple-400">{info.icon}</div>
                        <div>
                          <h3 className="font-semibold text-white mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-300 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-0">
                  <div className="h-64 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <p className="text-gray-300">San Francisco Bay Area</p>
                      <p className="text-sm text-gray-400">Available for remote work worldwide</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "What's your typical project timeline?",
                  answer:
                    "Project timelines vary depending on complexity, but most projects take 2-6 weeks from concept to completion. I'll provide a detailed timeline during our initial consultation.",
                },
                {
                  question: "Do you work with international clients?",
                  answer:
                    "I work with clients worldwide and am comfortable with different time zones. All communication is handled digitally for seamless collaboration.",
                },
                {
                  question: "What's included in your design packages?",
                  answer:
                    "Each package includes initial concepts, revisions, final artwork delivery, and source files. Specific deliverables are outlined in the project proposal.",
                },
                {
                  question: "How do you handle revisions?",
                  answer:
                    "I include up to 3 rounds of revisions in all packages. Additional revisions can be accommodated at an hourly rate if needed.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4 text-gradient-primary">KSM</div>
            <p className="text-gray-400 mb-6">Visual Artist & Creative Visionary</p>
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} KSM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
