import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { ImageDisplay } from '@/components/ImageDisplay';
import { JudgementDisplay } from '@/components/JudgementDisplay';
import { Eye, Sparkles } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showJudgement, setShowJudgement] = useState(false);
  const [judgementKey, setJudgementKey] = useState(0);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setShowJudgement(true);
      setJudgementKey(prev => prev + 1);
    };
    reader.readAsDataURL(file);
  };

  const handleJudgeAgain = () => {
    setJudgementKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Eye className="w-12 h-12 text-white animate-wiggle" />
            <h1 className="text-5xl font-black text-white tracking-tight">
              Judgement Mirror
            </h1>
            <Sparkles className="w-10 h-10 text-accent animate-bounce-in" />
          </div>
          <p className="text-xl text-white/90 font-medium max-w-2xl mx-auto">
            Upload your photo and discover what the mirror really thinks about you. 
            Prepare for brutally honest (and hilariously chaotic) feedback!
          </p>
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
                hasImage={!!uploadedImage} 
              />
            )}
          </div>

          {/* Upload New Image Button (when image exists) */}
          {uploadedImage && (
            <div className="text-center">
              <ImageUpload 
                onImageUpload={handleImageUpload} 
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
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-white/70 text-sm">
            Remember: The mirror speaks only truths... 
            <br />
            <span className="text-accent font-semibold">
              (and occasionally lies for comedic effect)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;