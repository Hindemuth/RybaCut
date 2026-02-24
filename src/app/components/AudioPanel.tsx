import { Music, Volume2, VolumeX, Trash2, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';

export interface AudioTrack {
  id: string;
  name: string;
  src: string;
  volume: number;
  startTime: number;
}

interface AudioPanelProps {
  audioTracks: AudioTrack[];
  onAddAudio: () => void;
  onRemoveAudio: (id: string) => void;
  onVolumeChange: (id: string, volume: number) => void;
}

export function AudioPanel({
  audioTracks,
  onAddAudio,
  onRemoveAudio,
  onVolumeChange,
}: AudioPanelProps) {
  return (
    <div className="h-full bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <Music className="w-5 h-5 text-primary" />
          Audio Tracks
        </h3>
        <Button
          onClick={onAddAudio}
          size="sm"
          className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_var(--neon-violet-glow)]"
        >
          <Upload className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {audioTracks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Music className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No audio tracks</p>
            <p className="text-sm mt-1">Add background music or voiceover</p>
          </div>
        ) : (
          audioTracks.map((track) => (
            <div
              key={track.id}
              className="p-3 rounded-lg border border-border bg-muted/30 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate flex items-center gap-2">
                    <Music className="w-4 h-4 text-primary shrink-0" />
                    {track.name}
                  </h4>
                </div>
                <Button
                  onClick={() => onRemoveAudio(track.id)}
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {track.volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-muted-foreground shrink-0" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary shrink-0" />
                  )}
                  <div className="flex-1">
                    <Slider
                      value={[track.volume]}
                      onValueChange={([value]) => onVolumeChange(track.id, value)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {track.volume}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
