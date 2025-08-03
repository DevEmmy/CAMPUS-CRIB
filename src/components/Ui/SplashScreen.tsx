import React, { useEffect, useState } from 'react';
import { Home } from 'iconsax-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible && onComplete) {
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 500);

      return () => clearTimeout(fadeTimer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-500 opacity-0">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Home size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Campus Crib</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 z-50 flex items-center justify-center">
      <div className="text-center text-white px-6">
        {/* Logo and App Name */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/30">
            <Home size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Campus Crib</h1>
          <p className="text-white/80 text-lg">Your Student Housing Companion</p>
        </div>

        {/* Simple Loading Indicator */}
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-6">
          <p className="text-white/60 text-sm">Loading...</p>
        </div>
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default SplashScreen; 