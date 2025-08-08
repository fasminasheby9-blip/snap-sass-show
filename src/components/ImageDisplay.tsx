import React from 'react';

interface ImageDisplayProps {
  imageSrc: string;
  alt?: string;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageSrc, alt = "Uploaded image" }) => {
  return (
    <div className="w-full max-w-md mx-auto animate-bounce-in">
      <div className="relative bg-card rounded-3xl p-4 shadow-playful hover:shadow-hover transition-all duration-300">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-secondary">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full shadow-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-accent rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};