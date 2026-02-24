import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Video, Scissors, Music, Sparkles, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const tutorialSteps = [
  {
    title: 'Welcome to RybaCut!',
    description: 'Learn how to create amazing videos in just a few steps. This quick tutorial will guide you through all the features.',
    icon: Video,
    color: 'from-purple-500 to-violet-600',
  },
  {
    title: 'Step 1: Add Video Clips',
    description: 'Click "Add Video Clip" or use the "Add" button in the Video Clips panel. You can add multiple videos that will be combined in sequence.',
    icon: Video,
    color: 'from-blue-500 to-cyan-600',
    tips: ['Supports MP4, WebM, MOV formats', 'Add as many clips as you need', 'Clips play in order from top to bottom'],
  },
  {
    title: 'Step 2: Trim Your Clips',
    description: 'Select a clip from the list, then use the trim controls to cut out unwanted parts. Adjust the start and end points with the sliders.',
    icon: Scissors,
    color: 'from-pink-500 to-rose-600',
    tips: ['Each clip can be trimmed independently', 'Use the timeline visualization', 'Precise control with sliders'],
  },
  {
    title: 'Step 3: Add Audio Tracks',
    description: 'Enhance your video with background music or voiceovers. Add audio files and adjust the volume for each track individually.',
    icon: Music,
    color: 'from-green-500 to-emerald-600',
    tips: ['Supports MP3, WAV, OGG formats', 'Control volume per track', 'Add multiple audio layers'],
  },
  {
    title: 'Step 4: Apply Effects',
    description: 'Use the Tools panel to add text overlays, apply filters, and adjust colors. Make your video stand out with professional effects.',
    icon: Sparkles,
    color: 'from-orange-500 to-amber-600',
    tips: ['Add custom text with different colors', 'Apply artistic filters', 'Adjust brightness, contrast, saturation'],
  },
  {
    title: 'Step 5: Export Your Video',
    description: 'When you\'re happy with your creation, click "Export Video" to save your masterpiece. All clips, audio, and effects will be included.',
    icon: Download,
    color: 'from-indigo-500 to-purple-600',
    tips: ['Review your timeline before exporting', 'All effects are applied automatically', 'High-quality output'],
  },
];

export function Tutorial({ isOpen, onClose }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('rybaCut_tutorialCompleted', 'true');
    onClose();
  };

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-primary/20">
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${step.color} p-8 text-white`}>
          <div className="absolute top-4 right-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">
                Step {currentStep + 1} of {tutorialSteps.length}
              </div>
              <h2 className="text-2xl font-bold">{step.title}</h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            {step.description}
          </p>

          {step.tips && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm text-foreground mb-2">💡 Pro Tips:</h4>
              <ul className="space-y-1">
                {step.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-primary w-8'
                    : index < currentStep
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 flex items-center justify-between bg-muted/20">
          <Button
            onClick={handlePrevious}
            variant="outline"
            disabled={currentStep === 0}
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <Button
            onClick={() => {
              handleFinish();
            }}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            Skip Tutorial
          </Button>

          <Button
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_var(--neon-violet-glow)]"
          >
            {currentStep === tutorialSteps.length - 1 ? (
              'Get Started'
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
