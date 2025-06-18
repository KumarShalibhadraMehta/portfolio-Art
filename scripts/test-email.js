// Test script to verify email functionality
const testEmailSystem = async () => {
  console.log("🧪 Testing KSM Portfolio Email System...\n")

  // Test data
  const testData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    projectType: "Custom Painting",
    message:
      "I would like to commission a custom painting for my living room. The piece should be abstract with warm colors and measure approximately 36x48 inches. My budget is flexible and I'm looking to have it completed within 2-3 months.",
  }

  try {
    console.log("📧 Sending test email with the following data:")
    console.log("Name:", `${testData.firstName} ${testData.lastName}`)
    console.log("Email:", testData.email)
    console.log("Project Type:", testData.projectType)
    console.log("Message:", testData.message.substring(0, 50) + "...\n")

    // Make API call to contact endpoint
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    if (response.ok) {
      console.log("✅ SUCCESS: Email sent successfully!")
      console.log("📨 Response:", result.message)
      console.log("\n🔍 Check your email inbox (mshalibhadra@gmail.com) for:")
      console.log('   • Subject: "New Portfolio Inquiry from John Doe"')
      console.log("   • KSM branding in email template")
      console.log("   • Professional HTML formatting")
      console.log("   • All form data included")
    } else {
      console.log("❌ ERROR: Failed to send email")
      console.log("📨 Response:", result.message)
      console.log("\n🔧 Troubleshooting steps:")
      console.log("   1. Check your .env.local file exists")
      console.log("   2. Verify EMAIL_USER and EMAIL_PASS are set")
      console.log("   3. Ensure Gmail App Password is correct")
      console.log("   4. Check if 2FA is enabled on Gmail")
    }
  } catch (error) {
    console.log("❌ NETWORK ERROR:", error.message)
    console.log("\n🔧 Possible issues:")
    console.log("   • Server not running (run: npm run dev)")
    console.log("   • Network connectivity issues")
    console.log("   • API endpoint not accessible")
  }
}

// Run the test
testEmailSystem()
