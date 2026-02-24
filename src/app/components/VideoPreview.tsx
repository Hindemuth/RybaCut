import { useEffect, useRef } from 'react';
import { VideoClip } from './VideoClipsPanel';

interface VideoPreviewProps {
  clips: VideoClip[];
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  onEnded: () => void;
  filter?: string;
}

export function VideoPreview({
  clips,
  currentTime,
  isPlaying,
  onTimeUpdate,
  onEnded,
  filter = 'none',
}: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCurrentClip = () => {
    let accumulatedTime = 0;
    for (const clip of clips) {
      const clipDuration = clip.trimEnd - clip.trimStart;
      if (currentTime >= accumulatedTime && currentTime < accumulatedTime + clipDuration) {
        const timeInClip = currentTime - accumulatedTime;
        return { clip, timeInClip: clip.trimStart + timeInClip };
      }
      accumulatedTime += clipDuration;
    }
    return null;
  };

  const currentClipData = getCurrentClip();

  useEffect(() => {
    if (videoRef.current && currentClipData) {
      videoRef.current.src = currentClipData.clip.src;
      videoRef.current.currentTime = currentClipData.timeInClip;
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [currentClipData?.clip.id, isPlaying]);

  useEffect(() => {
    if (videoRef.current && currentClipData) {
      const diff = Math.abs(videoRef.current.currentTime - currentClipData.timeInClip);
      if (diff > 0.5) videoRef.current.currentTime = currentClipData.timeInClip;
    }
  }, [currentClipData?.timeInClip]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!currentClipData) return;
    const videoTime = e.currentTarget.currentTime;
    if (videoTime >= currentClipData.clip.trimEnd) {
      let accumulatedTime = 0;
      for (let i = 0; i < clips.length; i++) {
        const clipDuration = clips[i].trimEnd - clips[i].trimStart;
        if (clips[i].id === currentClipData.clip.id) {
          if (i < clips.length - 1) onTimeUpdate(accumulatedTime + clipDuration);
          else onEnded();
          return;
        }
        accumulatedTime += clipDuration;
      }
    } else {
      let accumulatedTime = 0;
      for (const clip of clips) {
        if (clip.id === currentClipData.clip.id) {
          const timeInClip = videoTime - clip.trimStart;
          onTimeUpdate(accumulatedTime + timeInClip);
          return;
        }
        accumulatedTime += clip.trimEnd - clip.trimStart;
      }
    }
  };

  return (
    <div
      className="relative w-full max-w-[600px] max-h-[400px] mx-auto bg-black/90 rounded-lg shadow-2xl border border-primary/20 flex items-center justify-center"
      style={{ filter }}
    >
      {clips.length > 0 && currentClipData ? (
        <video
          ref={videoRef}
          className="w-[600px] h-[400px]"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            let accumulatedTime = 0;
            for (let i = 0; i < clips.length; i++) {
              if (clips[i].id === currentClipData.clip.id && i < clips.length - 1) {
                const clipDuration = clips[i].trimEnd - clips[i].trimStart;
                onTimeUpdate(accumulatedTime + clipDuration);
                return;
              }
              accumulatedTime += clips[i].trimEnd - clips[i].trimStart;
            }
            onEnded();
          }}
        />
      ) : (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="text-muted-foreground">
            <p className="text-lg">No video clips added</p>
            <p className="text-sm">Add video clips to get started</p>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}