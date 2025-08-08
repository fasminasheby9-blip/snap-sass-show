import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle, Sparkles } from 'lucide-react';

const JUDGEMENTS = [
  "You look like the CEO of being late.",
  "Confidence level: 9000. Hair level: 4.",
  "Serving main character vibes, but your lighting team quit.",
  "This could be your LinkedIn photo… if you wanted to scare HR.",
  "10/10 would ask for your autograph.",
  "You're giving off 'I have my life together' energy (spoiler: nobody does).",
  "Professional headshot vibes with a hint of chaos.",
  "You look like you'd win a staring contest with a mirror.",
  "Main character energy but supporting cast budget.",
  "You're radiating 'I forgot what I was going to say' vibes.",
  "Peak human performance right there.",
  "You look like you know a secret that would change everything.",
  "Giving off 'I peaked in this exact moment' energy.",
  "You're serving looks and the restaurant is fully booked.",
  "Confidence level: Fake it till you make it champion.",
  "You look like you'd be the friend who remembers everyone's birthday.",
  "Plot twist: You're actually three kids in a trench coat.",
  "You're giving 'I definitely read the terms and conditions' vibes.",
  "This photo has 'future meme template' written all over it.",
  "You look like you'd survive a zombie apocalypse through pure charm.",
  "Serving 'I know what I'm doing' energy (narrator: they didn't).",
  "You're radiating 'I've got snacks in my bag' vibes.",
  "This screams 'I'm one coffee away from world domination'.",
  "You look like you'd give the best life advice at 2 AM."
];

interface JudgementDisplayProps {
  isVisible: boolean;
  onJudgeAgain: () => void;
}

export const JudgementDisplay: React.FC<JudgementDisplayProps> = ({ isVisible, onJudgeAgain }) => {
  const [currentJudgement, setCurrentJudgement] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateJudgement = () => {
    const randomIndex = Math.floor(Math.random() * JUDGEMENTS.length);
    return JUDGEMENTS[randomIndex];
  };

  useEffect(() => {
    if (isVisible && !currentJudgement) {
      setCurrentJudgement(generateJudgement());
    }
  }, [isVisible, currentJudgement]);

  const handleJudgeAgain = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentJudgement(generateJudgement());
      setIsAnimating(false);
      onJudgeAgain();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      <div className={`
        bg-card rounded-3xl p-8 shadow-playful transition-all duration-500 border-2 border-transparent
        ${isAnimating ? 'scale-95 opacity-50' : 'animate-fade-in'}
      `}>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Sparkles className="w-8 h-8 text-accent animate-wiggle" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground">
            The Mirror's Verdict
          </h3>
          
          <blockquote className={`
            text-lg text-foreground font-medium leading-relaxed transition-all duration-500
            ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}
          `}>
            "{currentJudgement}"
          </blockquote>
        </div>
      </div>
      
      <div className="text-center">
        <Button 
          variant="secondary" 
          size="lg" 
          onClick={handleJudgeAgain}
          className="min-w-[200px]"
          disabled={isAnimating}
        >
          <Shuffle className="w-5 h-5 mr-2" />
          Judge Me Again
        </Button>
      </div>
    </div>
  );
};