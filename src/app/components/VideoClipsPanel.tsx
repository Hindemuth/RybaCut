import { X, Plus, GripVertical } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export interface VideoClip {
  id: string;
  name: string;
  src: string;
  duration: number;
  startTime: number;
  endTime: number;
  trimStart: number;
  trimEnd: number;
}

interface VideoClipsPanelProps {
  clips: VideoClip[];
  onAddClip: () => void;
  onRemoveClip: (id: string) => void;
  onSelectClip: (id: string) => void;
  selectedClipId: string | null;
}

export function VideoClipsPanel({
  clips,
  onAddClip,
  onRemoveClip,
  onSelectClip,
  selectedClipId,
}: VideoClipsPanelProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalDuration = () => {
    return clips.reduce((total, clip) => total + (clip.trimEnd - clip.trimStart), 0);
  };

  return (
    <div className="h-full bg-card rounded-lg border border-border p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-primary" />
          Video Clips
        </h3>
        <Button
          onClick={onAddClip}
          size="sm"
          className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_var(--neon-violet-glow)]"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      {clips.length > 0 && (
        <div className="mb-3 p-2 bg-muted/50 rounded text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Duration:</span>
            <span className="font-medium text-foreground">{formatTime(getTotalDuration())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Clips:</span>
            <span className="font-medium text-foreground">{clips.length}</span>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {clips.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No clips added yet</p>
              <p className="text-sm mt-1">Click "Add" to upload videos</p>
            </div>
          ) : (
            clips.map((clip, index) => (
              <div
                key={clip.id}
                onClick={() => onSelectClip(clip.id)}
                className={`
                  group p-3 rounded-lg border cursor-pointer transition-all duration-200
                  ${selectedClipId === clip.id 
                    ? 'border-primary bg-primary/10 shadow-[0_0_15px_var(--neon-violet-glow)]' 
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">#{index + 1}</span>
                      <h4 className="text-sm font-medium truncate">{clip.name}</h4>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <div>Duration: {formatTime(clip.trimEnd - clip.trimStart)}</div>
                      <div>Original: {formatTime(clip.duration)}</div>
                      {(clip.trimStart > 0 || clip.trimEnd < clip.duration) && (
                        <div className="text-primary">
                          Trimmed: {formatTime(clip.trimStart)} - {formatTime(clip.trimEnd)}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveClip(clip.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
