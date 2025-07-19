"use client"

import type React from "react"

import { useState } from "react"
import { Check, Zap, Crown, Users, BarChart3, Shield, Headphones } from "lucide-react"
import { Link } from "react-router"
import TitleHead from "../../components/Ui/TitleHead"

interface PricingPlan {
  id: string
  name: string
  price: string
  originalPrice?: string
  description: string
  badge?: string
  badgeColor?: string
  features: string[]
  buttonText: string
  buttonStyle: string
  popular?: boolean
  icon: React.ReactNode
}

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans: PricingPlan[] = [
    {
      id: "basic",
      name: "Basic Plan",
      price: "Free",
      description: "Ideal for new agents testing the platform",
      badge: "Free Forever",
      badgeColor: "bg-green-100 text-green-700",
      icon: <Users className="w-6 h-6" />,
      features: [
        "List up to 3 hostels",
        "Access to hostel management dashboard",
        "Receive basic booking requests",
        "Standard listing (no special ranking)",
        "Limited support (email only)",
        "Basic profile page",
      ],
      buttonText: "Get Started Free",
      buttonStyle: "border border-primary text-primary hover:bg-primary hover:text-white",
    },
    {
      id: "pro",
      name: "Pro Plan",
      price: isAnnual ? "₦30,000" : "₦3,000",
      originalPrice: isAnnual ? "₦36,000" : undefined,
      description: "For active agents who want more visibility and listings",
      badge: "Most Popular",
      badgeColor: "bg-primary text-white",
      popular: true,
      icon: <BarChart3 className="w-6 h-6" />,
      features: [
        "List up to 15 hostels",
        "Priority listing placement (above Basic users)",
        "Access to booking analytics (views, inquiries)",
        "Instant booking alerts via email & SMS",
        "Agent profile with rating and reviews",
        'Featured in "Trusted Agents" tag',
        "Email + WhatsApp support",
      ],
      buttonText: "Start Pro Plan",
      buttonStyle: "bg-primary text-white hover:bg-primary/90",
    },
    {
      id: "elite",
      name: "Elite Plan",
      price: isAnnual ? "₦70,000" : "₦7,000",
      originalPrice: isAnnual ? "₦84,000" : undefined,
      description: "For professional agents or businesses managing many hostels",
      badge: "Best Value",
      badgeColor: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Unlimited hostel listings",
        "Top placement on search results",
        "Featured agent badge",
        "Booking & earnings dashboard with weekly reports",
        "Custom profile with contact button",
        "Ability to create promo codes or discounts",
        "Push notifications for bookings",
        "Email, WhatsApp & phone support",
        "Early access to bidding requests from students",
      ],
      buttonText: "Go Elite",
      buttonStyle:
        "bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:from-yellow-600 hover:to-orange-700",
    },
  ]

  return (
    <>
        <TitleHead title={"Pricing"} />
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-8">
        
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Choose Your <span className="text-primary">Agent Plan</span>
          </h1>
          <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto">
            Scale your hostel business with the right tools. From getting started to managing unlimited listings.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? "text-primary" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                isAnnual ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-primary" : "text-gray-500"}`}>
              Annual
              <span className="ml-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Save 17%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-custom ${
                plan.popular ? "border-primary scale-105" : "border-gray-200 hover:border-primary/50"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${plan.popular ? "bg-primary/10" : "bg-gray-100"}`}>
                      <div className={plan.popular ? "text-primary" : "text-gray-600"}>{plan.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
                      )}
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    </div>
                    {plan.price !== "Free" && (
                      <span className="text-gray-500 text-sm">/{isAnnual ? "year" : "month"}</span>
                    )}
                    {plan.price !== "Free" && !isAnnual && (
                      <p className="text-xs text-gray-500 mt-1">~${plan.id === "pro" ? "2" : "5"}/month</p>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 rounded-full mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h4>
              <p className="text-gray-600 text-sm">Your data is protected with enterprise-grade security</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-green-100 rounded-full mb-4">
                <Headphones className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
              <p className="text-gray-600 text-sm">Get help whenever you need it from our support team</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-full mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy Setup</h4>
              <p className="text-gray-600 text-sm">Get started in minutes with our intuitive dashboard</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Plan?</h3>
            <p className="text-gray-600 mb-6">
              Managing 50+ hostels or need enterprise features? Let's create a plan that fits your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="https://www.instagram.com/campus_crib?igsh=aGh5a2lycHU5ZHg2"
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Contact Sales
              </Link>
              {/* <Link
                to="/demo"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Book a Demo
              </Link> */}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">What happens if I exceed my hostel limit?</h4>
              <p className="text-gray-600 text-sm">
                You'll be prompted to upgrade to a higher plan. Your existing listings will remain active.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h4>
              <p className="text-gray-600 text-sm">
                No setup fees. You only pay the monthly or annual subscription fee for your chosen plan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Pricing
