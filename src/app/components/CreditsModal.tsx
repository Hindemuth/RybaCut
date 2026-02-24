import { X, Github, Mail, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent } from './ui/dialog';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-primary/20">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-primary via-purple-600 to-violet-700 p-8 text-white">
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

          <div className="text-center space-y-4">
            {/* Animated logo */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-white/30">
                <svg
                  className="w-12 h-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">RybaCut</h2>
              <p className="text-white/90">Professional Video Editor</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Made by section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Heart className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium">Made with passion</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-600 to-violet-700 bg-clip-text text-transparent">
                Зроблено Максимом Рибачуком
              </h3>
              <p className="text-sm text-muted-foreground">
                Full-stack Developer & Video Enthusiast
              </p>
            </div>
          </div>

          {/* Features highlight */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm mb-3">✨ Features</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Multi-clip editing
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Audio tracks
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Text overlays
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Visual effects
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Trim & combine
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Dark/Light theme
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="text-center text-sm text-muted-foreground">
            Version 1.0.0 • 2026
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6 bg-muted/20">
          <Button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 shadow-[0_0_20px_var(--neon-violet-glow)]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
