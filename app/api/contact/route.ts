import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, projectType, budget, message } = await request.json()

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com",
        pass: process.env.EMAIL_PASS || "your-app-password",
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || "your-email@gmail.com",
      to: "mshalibhadra@gmail.com",
      subject: `New Portfolio Inquiry from ${firstName} ${lastName}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px;">
          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
            <h1 style="color: #fff; text-align: center; margin-bottom: 30px; font-size: 28px; font-weight: 900;">
              🎨 New Portfolio Inquiry - KSM
            </h1>
            
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px; font-weight: 700;">Client Information</h2>
              <p style="margin: 8px 0; font-size: 16px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 8px 0; font-size: 16px;"><strong>Project Type:</strong> ${projectType}</p>
              ${budget ? `<p style="margin: 8px 0; font-size: 16px;"><strong>Budget:</strong> ${budget}</p>` : ""}
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px;">
              <h2 style="color: #fff; margin-bottom: 15px; font-size: 20px; font-weight: 700;">Project Details</h2>
              <p style="line-height: 1.6; margin: 0; font-size: 16px;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <p style="font-size: 14px; opacity: 0.8; margin: 0;">
                Sent from KSM Portfolio Website<br>
                ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        New Portfolio Inquiry - KSM
        
        Name: ${firstName} ${lastName}
        Email: ${email}
        Project Type: ${projectType}
        ${budget ? `Budget: ${budget}` : ""}
        
        Message:
        ${message}
        
        Sent: ${new Date().toLocaleString()}
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      {
        message: "Email sent successfully",
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        message: "Failed to send email",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
