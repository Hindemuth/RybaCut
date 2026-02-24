import { Play, Pause, SkipBack, SkipForward, Upload, Download, Type, Sparkles, Scissors } from 'lucide-react';
import { Button } from './ui/button';

interface ControlPanelProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onUpload: () => void;
  onExport: () => void;
  hasVideo: boolean;
}

export function ControlPanel({
  isPlaying,
  onPlayPause,
  onSkipBackward,
  onSkipForward,
  onUpload,
  onExport,
  hasVideo,
}: ControlPanelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          onClick={onUpload}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_var(--neon-violet-glow)] hover:shadow-[0_0_30px_var(--neon-violet-glow)] transition-all duration-300"
        >
          <Upload className="w-4 h-4 mr-2" />
          Add Video Clip
        </Button>
      </div>

      {/* Playback controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onSkipBackward}
          disabled={!hasVideo}
          variant="outline"
          size="icon"
          className="border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button
          onClick={onPlayPause}
          disabled={!hasVideo}
          size="icon"
          className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_var(--neon-violet-glow)] hover:shadow-[0_0_30px_var(--neon-violet-glow)] transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </Button>
        <Button
          onClick={onSkipForward}
          disabled={!hasVideo}
          variant="outline"
          size="icon"
          className="border-primary/30 hover:border-primary hover:bg-primary/10"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      {/* Export button */}
      <div className="flex items-center gap-2">
        <Button
          onClick={onExport}
          disabled={!hasVideo}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_var(--neon-violet-glow)] hover:shadow-[0_0_30px_var(--neon-violet-glow)] transition-all duration-300"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Video
        </Button>
      </div>
    </div>
  );
}