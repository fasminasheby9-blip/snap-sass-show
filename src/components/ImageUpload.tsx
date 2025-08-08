import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  hasImage: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, hasImage }) => {
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

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
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
            ? 'border-primary bg-gradient-primary bg-opacity-10 scale-105' 
            : 'border-border bg-card hover:border-primary hover:bg-gradient-primary hover:bg-opacity-5'
          }
          ${hasImage ? 'border-accent' : ''}
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
          
          <Button variant="playful" size="lg" className="mt-4">
            {hasImage ? 'Choose New Image' : 'Browse Files'}
          </Button>
        </div>
      </div>
    </div>
  );
};