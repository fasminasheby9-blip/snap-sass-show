import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ImageDisplay } from '@/components/ImageDisplay';
import { JudgementDisplay } from '@/components/JudgementDisplay';
import { type JudgementCategory } from '@/components/CategorySelector';
import { CameraCapture } from '@/components/CameraCapture';
import { Eye, Sparkles, Zap } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showJudgement, setShowJudgement] = useState(false);
  const [judgementKey, setJudgementKey] = useState(0);
  const [category, setCategory] = useState<JudgementCategory>('all');
  const [showCamera, setShowCamera] = useState(false);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setShowJudgement(true);
      setJudgementKey(prev => prev + 1);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleJudgeAgain = () => {
    setJudgementKey(prev => prev + 1);
  };

  const handleCategoryChange = (newCategory: JudgementCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-accent/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-secondary/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-32 right-8 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Eye className="w-12 h-12 text-white animate-wiggle" />
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text">
              Judgement Mirror
            </h1>
            <Sparkles className="w-10 h-10 text-accent animate-bounce-in" />
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            <p className="text-xl md:text-2xl text-white/95 font-bold">
              🎭 Upload your photo and discover what the mirror really thinks! 🎭
            </p>
            <p className="text-lg text-white/80 font-medium">
              Get brutally honest, hilariously chaotic feedback that'll either boost your ego or roast you to perfection!
            </p>
          </div>
          
          {/* Feature highlights */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-white font-medium">AI Voice Reading</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Eye className="w-4 h-4 text-accent" />
              <span className="text-white font-medium">Camera Capture</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-white font-medium">Multiple Categories</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Image Upload/Display Section */}
          <div className="flex justify-center">
            {uploadedImage ? (
              <ImageDisplay imageSrc={uploadedImage} />
            ) : (
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                onCameraCapture={handleCameraCapture}
                hasImage={!!uploadedImage} 
              />
            )}
          </div>

          {/* Upload New Image Button (when image exists) */}
          {uploadedImage && (
            <div className="text-center animate-fade-in">
              <ImageUpload 
                onImageUpload={handleImageUpload} 
                onCameraCapture={handleCameraCapture}
                hasImage={!!uploadedImage} 
              />
            </div>
          )}

          {/* Judgement Section */}
          {showJudgement && (
            <div className="animate-fade-in">
              <JudgementDisplay 
                key={judgementKey}
                isVisible={showJudgement}
                onJudgeAgain={handleJudgeAgain}
                category={category}
                onCategoryChange={handleCategoryChange}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8 animate-fade-in">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <p className="text-white/90 text-sm mb-2 font-medium">
              🪞 Remember: The mirror speaks only truths... 
            </p>
            <p className="text-accent font-bold text-sm">
              (and occasionally lies for comedic effect) ✨
            </p>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      <CameraCapture
        isOpen={showCamera}
        onClose={handleCameraClose}
        onCapture={handleImageUpload}
      />
    </div>
  );
};

export default Index;