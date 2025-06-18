"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [emailDetails, setEmailDetails] = useState<any>(null)

  const handleTestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      message: formData.get("message"),
    }

    // Show what will be sent
    setEmailDetails(data)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitMessage("✅ SUCCESS: Test email sent successfully! Check mshalibhadra@gmail.com")
      } else {
        const error = await response.json()
        setSubmitMessage(`❌ ERROR: ${error.message}`)
      }
    } catch (error) {
      setSubmitMessage("❌ NETWORK ERROR: Make sure the server is running")
    }

    setIsSubmitting(false)
  }

  const fillTestData = () => {
    const form = document.querySelector("form") as HTMLFormElement
    if (form) {
      ;(form.querySelector('[name="firstName"]') as HTMLInputElement).value = "John"
      ;(form.querySelector('[name="lastName"]') as HTMLInputElement).value = "Doe"
      ;(form.querySelector('[name="email"]') as HTMLInputElement).value = "john.doe@example.com"
      ;(form.querySelector('[name="projectType"]') as HTMLSelectElement).value = "Custom Painting"
      ;(form.querySelector('[name="message"]') as HTMLTextAreaElement).value =
        "I would like to commission a custom painting for my living room. The piece should be abstract with warm colors and measure approximately 36x48 inches. My budget is flexible and I'm looking to have it completed within 2-3 months."
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            KSM Portfolio - Email Test Page
          </h1>
          <p className="text-gray-300">Test the contact form to verify KSM branding in emails</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Test Form */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Test Contact Form</CardTitle>
              <Button onClick={fillTestData} className="w-fit bg-purple-600 hover:bg-purple-700">
                Fill Test Data
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTestSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                    <Input
                      name="firstName"
                      required
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                    <Input
                      name="lastName"
                      required
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <Input
                    name="email"
                    type="email"
                    required
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Type</label>
                  <select
                    name="projectType"
                    required
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white"
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <Textarea
                    name="message"
                    required
                    className="bg-white/10 border-white/20 text-white h-32"
                    placeholder="Describe your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isSubmitting ? "Sending Test Email..." : "Send Test Email"}
                </Button>
              </form>

              {submitMessage && (
                <div
                  className={`mt-4 p-4 rounded-lg ${
                    submitMessage.includes("SUCCESS")
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Preview */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Email Preview</CardTitle>
              <p className="text-gray-400 text-sm">This is what the email will look like</p>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-4 rounded-lg">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <h2 className="text-xl font-bold mb-4 text-center">🎨 New Portfolio Inquiry</h2>

                  {emailDetails && (
                    <>
                      <div className="bg-white/10 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold mb-2">Client Information</h3>
                        <p>
                          <strong>Name:</strong> {emailDetails.firstName} {emailDetails.lastName}
                        </p>
                        <p>
                          <strong>Email:</strong> {emailDetails.email}
                        </p>
                        <p>
                          <strong>Project Type:</strong> {emailDetails.projectType}
                        </p>
                      </div>

                      <div className="bg-white/10 p-4 rounded-lg mb-4">
                        <h3 className="font-semibold mb-2">Project Details</h3>
                        <p className="text-sm">{emailDetails.message}</p>
                      </div>
                    </>
                  )}

                  <div className="text-center text-sm opacity-80">
                    <p>Sent from KSM Portfolio Website</p>
                    <p>{new Date().toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <h4 className="font-semibold text-blue-300 mb-2">Email Details:</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>
                    <strong>To:</strong> mshalibhadra@gmail.com
                  </li>
                  <li>
                    <strong>Subject:</strong> New Portfolio Inquiry from [Name]
                  </li>
                  <li>
                    <strong>Branding:</strong> KSM Portfolio
                  </li>
                  <li>
                    <strong>Format:</strong> HTML + Plain Text
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Check */}
        <Card className="mt-8 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Email Configuration Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-purple-300 mb-3">Required Setup:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Create .env.local file
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Set EMAIL_USER variable
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Set EMAIL_PASS variable
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Enable Gmail 2FA
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Generate App Password
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-pink-300 mb-3">What to Check:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    Email arrives at mshalibhadra@gmail.com
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    Subject shows "KSM Portfolio"
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    HTML formatting works
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    All form data included
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    KSM branding visible
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
