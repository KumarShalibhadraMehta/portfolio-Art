// Script to verify email configuration
const checkEmailConfig = () => {
  console.log("🔧 KSM Portfolio Email Configuration Check\n")

  // Check environment variables
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS

  console.log("📋 Environment Variables:")
  console.log("EMAIL_USER:", emailUser ? "✅ Set" : "❌ Not set")
  console.log("EMAIL_PASS:", emailPass ? "✅ Set" : "❌ Not set")

  if (!emailUser || !emailPass) {
    console.log("\n⚠️  Missing Configuration!")
    console.log("Create a .env.local file in your project root with:")
    console.log("EMAIL_USER=your-gmail@gmail.com")
    console.log("EMAIL_PASS=your-16-character-app-password")
    console.log("\n📖 Gmail App Password Setup:")
    console.log("1. Enable 2-factor authentication on Gmail")
    console.log("2. Go to: https://myaccount.google.com/apppasswords")
    console.log('3. Generate an App Password for "Mail"')
    console.log("4. Use the 16-character password (not your regular password)")
    return
  }

  console.log("\n✅ Configuration looks good!")
  console.log("📧 Emails will be sent to: mshalibhadra@gmail.com")
  console.log("📤 From address:", emailUser)
  console.log("🎨 Branding: KSM Portfolio")
}

checkEmailConfig()
