"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Message, Call, Send, Headphone, Sms } from "iconsax-react"
import { useNavigate } from "react-router"
import { errorToast, successToast } from "oasis-toast"
import CustomInput from "../components/Reuseables/CustomInput"

const ContactSupport = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      errorToast("Please fill in all required fields", "")
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Implement contact form submission API
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call

      successToast("Message sent successfully!", "We'll get back to you within 24 hours")

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "",
      })
    } catch (error) {
      errorToast("Failed to send message", "Please try again")
    } finally {
      setIsSubmitting(false)
    }
  }

  const supportCategories = [
    "General Inquiry",
    "Technical Support",
    "Account Issues",
    "Payment Problems",
    "Hostel Booking",
    "Agent Support",
    "Feature Request",
    "Bug Report",
    "Other",
  ]

  const contactInfo = [
    {
      icon: <Call size={20} />,
      title: "Phone Support",
      value: "09043672319",
      description: "Available Mon-Fri, 9AM-6PM",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Sms size={20} />,
      title: "Email Support",
      value: "Campuscrib033@gmail.com",
      description: "We respond within 24 hours",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: <Message size={20} />,
      title: "Chat with us on WhatsApp",
      value: "Click to chat",
      description: "Get instant support via WhatsApp",
      color: "text-green-600",
      bgColor: "bg-green-100",
      link: "https://wa.me/+2349043672319?text=Hi%20CampusCrib%20Support,%20I%20need%20help%20with:",
    },
  ]

  return (
    <main className="min-h-dvh bg-gray-50 dark:bg-theme">
      {/* Header */}
      <div className="bg-white dark:bg-theme border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <h1 className="text-lg font-semibold text-dark dark:text-white">Contact Support</h1>

          <div className="w-8"></div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphone size={40} className="text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-dark dark:text-white">How can we help you?</h2>

            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're here to help! Send us a message and we'll respond as soon as possible. You can also reach us through
              phone, email, or live chat.
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#222] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 ${info.bgColor} dark:bg-opacity-30 rounded-xl flex items-center justify-center`}
                  >
                    <div className={info.color}>{info.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-white">{info.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{info.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary transition-colors cursor-pointer underline"
                    >
                      {info.value}
                    </a>
                  ) : info.title === "Phone Support" ? (
                    <a
                      href={`tel:${info.value}`}
                      className="font-medium text-primary transition-colors cursor-pointer underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-medium text-dark dark:text-white">{info.value}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{info.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-theme rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name *</label>
                  <CustomInput
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    handleChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address *</label>
                  <CustomInput
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    handleChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <CustomInput
                  type="select"
                  name="category"
                  placeholder="Select a category"
                  value={formData.category}
                  options={supportCategories}
                  handleChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject *</label>
                <CustomInput
                  type="text"
                  name="subject"
                  placeholder="Brief description of your issue"
                  value={formData.subject}
                  handleChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your issue in detail..."
                  className="w-full p-4 border border-gray-300 dark:border-gray-600 dark:bg-[#222] dark:text-white dark:placeholder-gray-400 rounded-xl resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  rows={6}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">{formData.message.length}/1000 characters</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          {/* <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-dark mb-6">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-medium text-dark mb-2">How do I book a hostel?</h4>
                <p className="text-sm text-gray-600">
                  Browse available hostels, select your preferred one, and click "Book Now" to proceed with the booking process.
                </p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-medium text-dark mb-2">How do I list my hostel as an agent?</h4>
                <p className="text-sm text-gray-600">
                  Sign up as an agent, complete your profile, and use the "Create Hostel" feature to list your property.
                </p>
              </div>
              
              <div className="border-b border-gray-100 pb-4">
                <h4 className="font-medium text-dark mb-2">What payment methods are accepted?</h4>
                <p className="text-sm text-gray-600">
                  We accept bank transfers, card payments, and mobile money. All payments are processed securely.
                </p>
              </div>
              
              <div className="pb-4">
                <h4 className="font-medium text-dark mb-2">How can I cancel a booking?</h4>
                <p className="text-sm text-gray-600">
                  Go to your bookings section and select the booking you want to cancel. Cancellation policies vary by hostel.
                </p>
              </div>
            </div>
          </div> */}

          {/* Office Hours */}
          {/* <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Office Hours</h3>
                <p className="text-sm text-white/80">We're here when you need us</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Monday - Friday</p>
                <p className="text-sm text-white/80">9:00 AM - 6:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Saturday</p>
                <p className="text-sm text-white/80">10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  )
}

export default ContactSupport
