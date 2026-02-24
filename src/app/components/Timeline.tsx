import { Slider } from './ui/slider';
import { VideoClip } from './VideoClipsPanel';

interface TimelineProps {
  selectedClip: VideoClip | null;
  onTrimStartChange: (time: number) => void;
  onTrimEndChange: (time: number) => void;
}

export function Timeline({
  selectedClip,
  onTrimStartChange,
  onTrimEndChange,
}: TimelineProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!selectedClip) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Select a video clip to trim</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Trim Selected Clip: {selectedClip.name}</h3>
        <div className="text-sm text-muted-foreground">
          Duration: {formatTime(selectedClip.trimEnd - selectedClip.trimStart)} / {formatTime(selectedClip.duration)}
        </div>
      </div>

      {/* Visual timeline */}
      <div className="relative h-20 bg-card rounded-lg border border-border overflow-hidden">
        {/* Trim overlay - before trim start */}
        <div
          className="absolute top-0 bottom-0 bg-muted/50"
          style={{
            left: 0,
            width: `${(selectedClip.trimStart / selectedClip.duration) * 100}%`,
          }}
        />
        {/* Trim overlay - after trim end */}
        <div
          className="absolute top-0 bottom-0 bg-muted/50"
          style={{
            right: 0,
            width: `${((selectedClip.duration - selectedClip.trimEnd) / selectedClip.duration) * 100}%`,
          }}
        />

        {/* Active region */}
        <div
          className="absolute top-0 bottom-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-l-2 border-r-2 border-primary"
          style={{
            left: `${(selectedClip.trimStart / selectedClip.duration) * 100}%`,
            right: `${((selectedClip.duration - selectedClip.trimEnd) / selectedClip.duration) * 100}%`,
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,var(--neon-violet-glow)_50%,transparent_100%)] opacity-50" />
        </div>

        {/* Time markers */}
        <div className="absolute inset-0 flex items-end justify-between px-2 pb-1">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-2 bg-border" />
              <span className="text-xs text-muted-foreground mt-1">
                {formatTime((selectedClip.duration * i) / 10)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trim controls */}
      <div className="space-y-3">
        <div className="space-y-2">
          <label className="text-sm text-foreground">Trim Start: {formatTime(selectedClip.trimStart)}</label>
          <Slider
            value={[selectedClip.trimStart]}
            onValueChange={([value]) => onTrimStartChange(Math.min(value, selectedClip.trimEnd - 0.1))}
            max={selectedClip.duration}
            step={0.1}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-foreground">Trim End: {formatTime(selectedClip.trimEnd)}</label>
          <Slider
            value={[selectedClip.trimEnd]}
            onValueChange={([value]) => onTrimEndChange(Math.max(value, selectedClip.trimStart + 0.1))}
            max={selectedClip.duration}
            step={0.1}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}