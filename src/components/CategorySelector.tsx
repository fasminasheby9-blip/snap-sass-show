import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Volume2, VolumeX, Heart, Flame, Zap } from 'lucide-react';

export type JudgementCategory = 'all' | 'roasts' | 'compliments' | 'motivational';

interface CategorySelectorProps {
  currentCategory: JudgementCategory;
  onCategoryChange: (category: JudgementCategory) => void;
}

const categories = [
  { id: 'all' as const, label: 'Mixed Bag', icon: Zap, color: 'bg-gradient-primary' },
  { id: 'roasts' as const, label: 'Roast Me', icon: Flame, color: 'bg-gradient-secondary' },
  { id: 'compliments' as const, label: 'Hype Me Up', icon: Heart, color: 'bg-gradient-accent' },
  { id: 'motivational' as const, label: 'Motivate Me', icon: Zap, color: 'bg-gradient-primary' },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  currentCategory, 
  onCategoryChange 
}) => {
  return (
    <Card className="p-4 bg-card/90 backdrop-blur-sm border-2 border-white/20">
      <h3 className="text-sm font-bold text-foreground mb-3 text-center">
        Choose Your Judgement Style
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={currentCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
              className={`
                text-xs transition-all duration-300 hover:scale-105
                ${currentCategory === category.id ? category.color : ''}
              `}
            >
              <IconComponent className="w-3 h-3 mr-1" />
              {category.label}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

interface AudioControlsProps {
  isEnabled: boolean;
  onToggle: () => void;
  isPlaying: boolean;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ 
  isEnabled, 
  onToggle, 
  isPlaying 
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={`
        transition-all duration-300 hover:scale-110
        ${isPlaying ? 'animate-pulse' : ''}
        ${isEnabled ? 'border-accent text-accent' : 'border-muted text-muted-foreground'}
      `}
    >
      {isEnabled ? (
        <Volume2 className="w-4 h-4 mr-2" />
      ) : (
        <VolumeX className="w-4 h-4 mr-2" />
      )}
      {isEnabled ? 'Audio On' : 'Audio Off'}
    </Button>
  );
};