import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface HeritageItem {
  id: number;
  title: string;
  location: string;
  description: string;
  category: string;
}

const heritageHighlights: HeritageItem[] = [
  {
    id: 1,
    title: "Banaue Rice Terraces",
    location: "Ifugao Province",
    description: "Home to the ancient Tinawon Rice, cultivated for over 2,000 years",
    category: "UNESCO World Heritage"
  },
  {
    id: 2,
    title: "Sagada's Mossy Forest",
    location: "Mountain Province",
    description: "A living ecosystem of forgotten crops, now revived through virtual exhibits and sensory storytelling.",
    category: "Biodiversity Hotspot"
  },
  {
    id: 3,
    title: "Kalinga Rice Wine (Tapuy)",
    location: "Kalinga Province",
    description: "More than a drink — a fermented story we now bottle in code and culture through digital preservation.",
    category: "Cultural Heritage"
  }
];

export function HeritageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heritageHighlights.length);
      setIsAnimating(false);
    }, 200);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + heritageHighlights.length) % heritageHighlights.length);
      setIsAnimating(false);
    }, 200);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 200);
  };

  const currentItem = heritageHighlights[currentIndex];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Content - Reduced Height */}
      <div className={`transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-[#4A773C]/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-block bg-[#4A773C]/10 text-[#4A773C] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#4A773C]/20">
              {currentItem.category}
            </span>
          </div>

          {/* Title and Location */}
          <div className="mb-2">
            <h3 className="text-base sm:text-lg font-bold text-[#5A3E36] mb-1 leading-tight">
              {currentItem.title}
            </h3>
            <div className="flex items-center text-[#4A773C] font-medium">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span className="text-sm">{currentItem.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-[#5A3E36]/80 text-sm leading-relaxed mb-3 line-clamp-2">
            {currentItem.description}
          </p>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Navigation Dots */}
            <div className="flex items-center space-x-1.5">
              {heritageHighlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#4A773C] w-4'
                      : 'bg-[#4A773C]/30 hover:bg-[#4A773C]/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrevious}
                disabled={isAnimating}
                className="p-1 rounded-full bg-[#D7E4C0]/50 hover:bg-[#D7E4C0] text-[#4A773C] transition-colors duration-200 disabled:opacity-50"
                aria-label="Previous heritage site"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                className="p-1 rounded-full bg-[#D7E4C0]/50 hover:bg-[#D7E4C0] text-[#4A773C] transition-colors duration-200 disabled:opacity-50"
                aria-label="Next heritage site"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 w-full bg-[#D7E4C0]/30 rounded-full h-0.5 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#4A773C] to-[#7A9D54] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / heritageHighlights.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
