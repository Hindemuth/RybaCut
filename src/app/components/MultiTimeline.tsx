import { VideoClip } from './VideoClipsPanel';
import { AudioTrack } from './AudioPanel';

interface MultiTimelineProps {
  clips: VideoClip[];
  audioTracks: AudioTrack[];
  currentTime: number;
  onSeek: (time: number) => void;
  selectedClipId: string | null;
}

export function MultiTimeline({
  clips,
  audioTracks,
  currentTime,
  onSeek,
  selectedClipId,
}: MultiTimelineProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = clips.reduce((acc, clip) => {
    return acc + (clip.trimEnd - clip.trimStart);
  }, 0);

  const pixelsPerSecond = totalDuration > 0 ? 800 / totalDuration : 100;

  let currentPosition = 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{formatTime(currentTime)}</span>
        <span>Total: {formatTime(totalDuration)}</span>
      </div>

      <div className="relative">
        {/* Timeline ruler */}
        <div className="h-8 bg-card rounded-t-lg border border-b-0 border-border flex items-center px-2">
          <div className="flex-1 relative">
            {Array.from({ length: Math.ceil(totalDuration / 5) + 1 }, (_, i) => {
              const time = i * 5;
              const position = time * pixelsPerSecond;
              return (
                <div
                  key={i}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${position}px` }}
                >
                  <div className="w-px h-2 bg-border" />
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {formatTime(time)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video tracks */}
        <div className="bg-card border border-t-0 border-border rounded-b-lg p-2">
          <div className="space-y-2">
            {/* Video clips track */}
            <div className="relative h-16 bg-muted/30 rounded border border-border overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                {clips.map((clip) => {
                  const clipDuration = clip.trimEnd - clip.trimStart;
                  const clipWidth = clipDuration * pixelsPerSecond;
                  const clipElement = (
                    <div
                      key={clip.id}
                      className={`h-12 rounded transition-all duration-200 ${
                        selectedClipId === clip.id
                          ? 'bg-gradient-to-r from-primary to-primary/80 shadow-[0_0_15px_var(--neon-violet-glow)]'
                          : 'bg-gradient-to-r from-primary/60 to-primary/40'
                      } border-2 ${
                        selectedClipId === clip.id ? 'border-primary' : 'border-primary/30'
                      } flex items-center justify-center text-xs text-white font-medium px-2 cursor-pointer hover:scale-[1.02]`}
                      style={{
                        width: `${clipWidth}px`,
                        marginLeft: currentPosition === 0 ? '0' : '2px',
                      }}
                    >
                      <span className="truncate">{clip.name}</span>
                    </div>
                  );
                  currentPosition += clipWidth;
                  return clipElement;
                })}
              </div>
            </div>

            {/* Audio tracks */}
            {audioTracks.map((track) => (
              <div
                key={track.id}
                className="relative h-12 bg-muted/30 rounded border border-border overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="h-8 rounded bg-gradient-to-r from-purple-500/60 to-purple-700/60 border border-purple-500/30 flex items-center justify-center text-xs text-white font-medium px-2"
                    style={{
                      width: `${totalDuration * pixelsPerSecond}px`,
                    }}
                  >
                    <span className="truncate">🎵 {track.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_10px_var(--neon-violet-glow)] z-20 pointer-events-none"
          style={{
            left: `${currentTime * pixelsPerSecond}px`,
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_var(--neon-violet-glow)]" />
        </div>
      </div>

      {/* Seek bar */}
      <div className="relative">
        <input
          type="range"
          min={0}
          max={totalDuration}
          step={0.1}
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_10px_var(--neon-violet-glow)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-[0_0_10px_var(--neon-violet-glow)] [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
