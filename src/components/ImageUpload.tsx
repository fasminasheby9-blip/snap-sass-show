import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Camera } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  onCameraCapture: () => void;
  hasImage: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onImageUpload, 
  onCameraCapture, 
  hasImage 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const triggerFileInput = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onImageUpload(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`
          relative border-4 border-dashed rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-primary bg-gradient-primary bg-opacity-10 scale-105 shadow-hover' 
            : 'border-border bg-card/90 backdrop-blur-sm hover:border-primary hover:bg-gradient-primary hover:bg-opacity-5 hover:scale-102'
          }
          ${hasImage ? 'border-accent shadow-playful' : 'shadow-playful'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <div className="space-y-4">
          <div className="flex justify-center">
            {hasImage ? (
              <ImageIcon className="w-12 h-12 text-accent animate-bounce-in" />
            ) : (
              <Upload className={`w-12 h-12 transition-all duration-300 ${isDragOver ? 'text-primary animate-wiggle' : 'text-muted-foreground'}`} />
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {hasImage ? 'Upload a New Image' : 'Upload Your Image'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Drag & drop or click to {hasImage ? 'replace' : 'select'}
            </p>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button variant="playful" size="lg">
              <Upload className="w-4 h-4 mr-2" />
              {hasImage ? 'New Image' : 'Browse Files'}
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                onCameraCapture();
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </Button>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-accent/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-secondary/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
};