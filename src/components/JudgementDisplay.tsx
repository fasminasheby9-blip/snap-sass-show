import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Shuffle, Sparkles, Volume2, Share2, Settings } from 'lucide-react';
import { CategorySelector, AudioControls, type JudgementCategory } from '@/components/CategorySelector';

const JUDGEMENTS = {
  roasts: [
    "You look like the CEO of being late.",
    "Confidence level: 9000. Hair level: 4.",
    "Serving main character vibes, but your lighting team quit.",
    "This could be your LinkedIn photo… if you wanted to scare HR.",
    "You're giving off 'I have my life together' energy (spoiler: nobody does).",
    "Main character energy but supporting cast budget.",
    "You're radiating 'I forgot what I was going to say' vibes.",
    "Plot twist: You're actually three kids in a trench coat.",
    "You're giving 'I definitely read the terms and conditions' vibes.",
    "Serving 'I know what I'm doing' energy (narrator: they didn't).",
    "This screams 'I'm one coffee away from world domination'."
  ],
  compliments: [
    "10/10 would ask for your autograph.",
    "Peak human performance right there.",
    "You look like you know a secret that would change everything.",
    "Giving off 'I peaked in this exact moment' energy.",
    "You're serving looks and the restaurant is fully booked.",
    "You look like you'd be the friend who remembers everyone's birthday.",
    "You look like you'd survive a zombie apocalypse through pure charm.",
    "You're radiating 'I've got snacks in my bag' vibes.",
    "Absolute legend energy radiating from this photo.",
    "You look like you give the best hugs and life advice.",
    "This photo has 'inspiration poster' written all over it."
  ],
  motivational: [
    "You look ready to conquer the world one small step at a time.",
    "This photo screams 'I believe in myself and so should you.'",
    "You're giving off serious 'I've got this' energy.",
    "Future success story in the making right here.",
    "You look like someone who turns obstacles into opportunities.",
    "This is the face of someone who doesn't give up easily.",
    "You're radiating 'watch me prove them wrong' vibes.",
    "Champion mindset detected in this photograph.",
    "You look like you'd motivate a rock to roll uphill.",
    "This photo has 'breakthrough moment' energy.",
    "You look like the person everyone wants on their team."
  ]
};

const getAllJudgements = () => [
  ...JUDGEMENTS.roasts,
  ...JUDGEMENTS.compliments,
  ...JUDGEMENTS.motivational
];

interface JudgementDisplayProps {
  isVisible: boolean;
  onJudgeAgain: () => void;
  category: JudgementCategory;
  onCategoryChange: (category: JudgementCategory) => void;
}

export const JudgementDisplay: React.FC<JudgementDisplayProps> = ({ 
  isVisible, 
  onJudgeAgain, 
  category, 
  onCategoryChange 
}) => {
  const [currentJudgement, setCurrentJudgement] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const generateJudgement = () => {
    let judgements;
    if (category === 'all') {
      judgements = getAllJudgements();
    } else {
      judgements = JUDGEMENTS[category];
    }
    
    const randomIndex = Math.floor(Math.random() * judgements.length);
    return judgements[randomIndex];
  };

  const playJudgement = async (text: string) => {
    if (!audioEnabled || !apiKey.trim()) return;
    
    try {
      setIsPlaying(true);
      
      // Use ElevenLabs API to generate speech
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/cgSgspJ2msm6clMCkdW9', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey.trim()
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      } else {
        throw new Error('Failed to generate speech');
      }
    } catch (error) {
      console.error('Error playing judgement:', error);
      setIsPlaying(false);
    }
  };

  const shareJudgement = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Judgement Mirror Verdict',
        text: `The Judgement Mirror says: "${currentJudgement}"`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`The Judgement Mirror says: "${currentJudgement}"`);
    }
  };

  useEffect(() => {
    if (isVisible && !currentJudgement) {
      setCurrentJudgement(generateJudgement());
    }
  }, [isVisible, currentJudgement, category]);

  useEffect(() => {
    if (isVisible && currentJudgement && audioEnabled && apiKey.trim()) {
      playJudgement(currentJudgement);
    }
  }, [currentJudgement, audioEnabled, apiKey]);

  const handleJudgeAgain = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const newJudgement = generateJudgement();
      setCurrentJudgement(newJudgement);
      setIsAnimating(false);
      onJudgeAgain();
    }, 300);
  };

  const handleCategoryChange = (newCategory: JudgementCategory) => {
    onCategoryChange(newCategory);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentJudgement(generateJudgement());
      setIsAnimating(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-lg mx-auto space-y-6">
      {/* Category Selector */}
      <CategorySelector 
        currentCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      {/* Judgement Card */}
      <div className={`
        relative bg-card/90 backdrop-blur-sm rounded-3xl p-8 shadow-playful transition-all duration-500 border-2 border-white/20
        ${isAnimating ? 'scale-95 opacity-50' : 'animate-fade-in hover:shadow-hover'}
      `}>
        {/* Floating sparkles */}
        <div className="absolute -top-2 -right-2 text-accent animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="absolute -bottom-2 -left-2 text-primary animate-bounce" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="w-4 h-4" />
        </div>

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
      
      {/* Controls */}
      <div className="space-y-4">
        {/* Audio Settings */}
        {showApiKeyInput && (
          <Card className="p-4 bg-card/90 backdrop-blur-sm border-2 border-white/20">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">
                ElevenLabs API Key (for voice features):
              </label>
              <Input
                type="password"
                placeholder="Enter your ElevenLabs API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">elevenlabs.io</a>
              </p>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={handleJudgeAgain}
            disabled={isAnimating}
            className="min-w-[140px]"
          >
            <Shuffle className="w-5 h-5 mr-2" />
            Judge Again
          </Button>

          <AudioControls
            isEnabled={audioEnabled}
            onToggle={() => {
              if (!audioEnabled && !apiKey.trim()) {
                setShowApiKeyInput(true);
              }
              setAudioEnabled(!audioEnabled);
            }}
            isPlaying={isPlaying}
          />

          <Button 
            variant="outline" 
            size="lg"
            onClick={shareJudgement}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>

          <Button 
            variant="ghost" 
            size="lg"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};