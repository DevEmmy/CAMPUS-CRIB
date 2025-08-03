import React from "react";
import { Link } from "react-router";
import { ArrowRight2, MessageText1, ShieldTick, Wallet3 } from "iconsax-react";

const StudentStep3: React.FC = () => {
  return (
    <section className="min-h-dvh w-full flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-full mb-6 shadow-lg">
            <ShieldTick size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-dark mb-4">
            Safe & Secure Booking
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Book with confidence knowing your accommodation is verified and secure
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border-2 border-primary/30 px-4 py-8 mb-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShieldTick size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">Verified Hostels</h3>
                <p className="text-gray-600 text-sm">All hostels are verified and meet our quality standards</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Wallet3 size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">Secure Payments</h3>
                <p className="text-gray-600 text-sm">Safe and encrypted payment processing for your bookings</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <MessageText1 size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-dark mb-1">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Get help anytime with our dedicated support team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            to="/signup" 
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-custom"
          >
            Get Started
            <ArrowRight2 size={20} />
          </Link>
          
          <p className="text-center text-gray-500 text-sm">
            Join thousands of students finding their perfect accommodation
          </p>
        </div>
      </div>
    </section>
  );
};

export default StudentStep3;
