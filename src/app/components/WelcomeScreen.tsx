import { Upload, Video, Music, Scissors } from 'lucide-react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onAddVideo: () => void;
}

export function WelcomeScreen({ onAddVideo }: WelcomeScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center space-y-8 max-w-2xl px-4">
        {/* Logo/Icon */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary/60 rounded-3xl flex items-center justify-center shadow-[0_0_40px_var(--neon-violet-glow)]">
            <Video className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Welcome text */}
        <div className="space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to RybaCut
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Professional video editing made simple. Add clips, trim, combine, add audio, and export your masterpiece.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Multiple Videos</h3>
            <p className="text-sm text-muted-foreground">
              Add and combine multiple video clips
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Trim & Cut</h3>
            <p className="text-sm text-muted-foreground">
              Precisely trim each clip to perfection
            </p>
          </div>
          
          <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Audio Tracks</h3>
            <p className="text-sm text-muted-foreground">
              Add background music and voiceovers
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button
            onClick={onAddVideo}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_var(--neon-violet-glow)] hover:shadow-[0_0_40px_var(--neon-violet-glow)] transition-all duration-300 text-lg px-8 py-6"
          >
            <Upload className="w-5 h-5 mr-3" />
            Add Your First Video Clip
          </Button>
        </div>
      </div>
    </div>
  );
}
