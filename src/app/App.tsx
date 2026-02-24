import { useState, useRef, useCallback, useEffect } from 'react';
import { Video, HelpCircle, Info } from 'lucide-react';
import { VideoPreview } from './components/VideoPreview';
import { Timeline } from './components/Timeline';
import { ControlPanel } from './components/ControlPanel';
import { ToolsPanel, TextStyle } from './components/ToolsPanel';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { VideoClipsPanel, VideoClip } from './components/VideoClipsPanel';
import { AudioPanel, AudioTrack } from './components/AudioPanel';
import { MultiTimeline } from './components/MultiTimeline';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Tutorial } from './components/Tutorial';
import { CreditsModal } from './components/CreditsModal';
import { Toaster, toast } from 'sonner';
import { Button } from './components/ui/button';

interface TextOverlay {
  id: string;
  text: string;
  style: TextStyle;
}

export default function App() {
  const [clips, setClips] = useState<VideoClip[]>([]);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState('none');
  const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem('rybaCut_tutorialCompleted');
    const creditsShown = localStorage.getItem('rybaCut_creditsShown');
    if (!creditsShown) {
      setTimeout(() => {
        setShowCredits(true);
        localStorage.setItem('rybaCut_creditsShown', 'true');
      }, 500);
    }
    if (!tutorialCompleted && creditsShown) {
      setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
    }
  }, []);

  const selectedClip = clips.find((clip) => clip.id === selectedClipId) || null;
  const totalDuration = clips.reduce((acc, clip) => acc + (clip.trimEnd - clip.trimStart), 0);

  const handleVideoFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
          const newClip: VideoClip = {
            id: Date.now().toString(),
            name: file.name,
            src: url,
            duration: video.duration,
            startTime: totalDuration,
            endTime: totalDuration + video.duration,
            trimStart: 0,
            trimEnd: video.duration,
          };
          setClips((prev) => [...prev, newClip]);
          setSelectedClipId(newClip.id);
          toast.success(`Added "${file.name}" to timeline`);
        };
        video.src = url;
      } else {
        toast.error('Please select a valid video file');
      }
      if (e.target) e.target.value = '';
    },
    [totalDuration]
  );

  const handleAudioFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      const newTrack: AudioTrack = {
        id: Date.now().toString(),
        name: file.name,
        src: url,
        volume: 80,
        startTime: 0,
      };
      setAudioTracks((prev) => [...prev, newTrack]);
      toast.success(`Added audio track "${file.name}"`);
    } else {
      toast.error('Please select a valid audio file');
    }
    if (e.target) e.target.value = '';
  }, []);

  const handleAddVideoClick = () => videoFileInputRef.current?.click();
  const handleAddAudioClick = () => audioFileInputRef.current?.click();

  const handleRemoveClip = (id: string) => {
    setClips((prev) => prev.filter((clip) => clip.id !== id));
    if (selectedClipId === id) setSelectedClipId(null);
    toast.success('Clip removed');
  };

  const handleRemoveAudio = (id: string) => {
    setAudioTracks((prev) => prev.filter((track) => track.id !== id));
    toast.success('Audio track removed');
  };

  const handleAudioVolumeChange = (id: string, volume: number) => {
    setAudioTracks((prev) =>
      prev.map((track) => (track.id === id ? { ...track, volume } : track))
    );
  };

  const handlePlayPause = () => {
    if (clips.length === 0) return;
    setIsPlaying(!isPlaying);
  };

  const handleSkipBackward = () => setCurrentTime(Math.max(0, currentTime - 5));
  const handleSkipForward = () => setCurrentTime(Math.min(totalDuration, currentTime + 5));
  const handleSeek = (time: number) => setCurrentTime(time);

  const handleTrimStartChange = (time: number) => {
    if (!selectedClipId) return;
    setClips((prev) =>
      prev.map((clip) => (clip.id === selectedClipId ? { ...clip, trimStart: time } : clip))
    );
  };

  const handleTrimEndChange = (time: number) => {
    if (!selectedClipId) return;
    setClips((prev) =>
      prev.map((clip) => (clip.id === selectedClipId ? { ...clip, trimEnd: time } : clip))
    );
  };

  const handleAddText = (text: string, style: TextStyle) => {
    const newOverlay: TextOverlay = {
      id: Date.now().toString(),
      text,
      style,
    };
    setTextOverlays([...textOverlays, newOverlay]);
    toast.success('Text overlay added!');
  };

  const handleApplyFilter = (newFilter: string) => {
    setFilter(newFilter);
    toast.success('Filter applied!');
  };

  const handleExport = () => {
    if (clips.length === 0) return;
    toast.info('Preparing video for export...', { description: 'Processing your video composition' });
    setTimeout(() => {
      const clipCount = clips.length;
      const audioCount = audioTracks.length;
      const effectsCount = textOverlays.length + (filter !== 'none' ? 1 : 0);
      toast.success('Video exported successfully!', {
        description: `${clipCount} clip${clipCount !== 1 ? 's' : ''}, ${audioCount} audio track${audioCount !== 1 ? 's' : ''}, ${effectsCount} effect${effectsCount !== 1 ? 's' : ''}`,
      });
    }, 2000);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-[0_0_20px_var(--neon-violet-glow)]">
                  <Video className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary to-purple-600 bg-clip-text text-transparent">
                  RybaCut
                </h1>
                <p className="text-sm text-muted-foreground">Professional Video Editor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowTutorial(true)} variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                <HelpCircle className="w-5 h-5 text-primary" />
              </Button>
              <Button onClick={() => setShowCredits(true)} variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10">
                <Info className="w-5 h-5 text-primary" />
              </Button>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-1 space-y-4">
            <div className="h-[400px]">
              <VideoClipsPanel clips={clips} onAddClip={handleAddVideoClick} onRemoveClip={handleRemoveClip} onSelectClip={setSelectedClipId} selectedClipId={selectedClipId} />
            </div>
            <div className="h-[300px]">
              <AudioPanel audioTracks={audioTracks} onAddAudio={handleAddAudioClick} onRemoveAudio={handleRemoveAudio} onVolumeChange={handleAudioVolumeChange} />
            </div>
          </div>

          <div className="xl:col-span-3 space-y-6">
            {clips.length === 0 ? (
              <WelcomeScreen onAddVideo={handleAddVideoClick} />
            ) : (
              <>
                <div className="relative">
                  <div className="bg-card rounded-lg overflow-hidden border border-border shadow-2xl" style={{ width: '640px', height: '360px' }}>
                    <VideoPreview clips={clips} currentTime={currentTime} isPlaying={isPlaying} onTimeUpdate={setCurrentTime} onEnded={handleEnded} filter={filter} />
                    {textOverlays.map((overlay) => (
                      <div
                        key={overlay.id}
                        className="absolute pointer-events-none"
                        style={{
                          top: `${overlay.style.position.y}%`,
                          left: `${overlay.style.position.x}%`,
                          transform: 'translate(-50%, -50%)',
                          fontSize: `${overlay.style.fontSize}px`,
                          color: overlay.style.color,
                          textShadow: '0 0 10px rgba(0,0,0,0.8), 0 0 20px var(--neon-violet-glow)',
                          fontWeight: 'bold',
                        }}
                      >
                        {overlay.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
                  <ControlPanel isPlaying={isPlaying} onPlayPause={handlePlayPause} onSkipBackward={handleSkipBackward} onSkipForward={handleSkipForward} onUpload={handleAddVideoClick} onExport={handleExport} hasVideo={clips.length > 0} />
                </div>

                <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
                  <h3 className="mb-4 font-medium">Timeline</h3>
                  <MultiTimeline clips={clips} audioTracks={audioTracks} currentTime={currentTime} onSeek={handleSeek} selectedClipId={selectedClipId} />
                </div>

                {selectedClip && (
                  <div className="bg-card rounded-lg border border-border p-6 shadow-lg">
                    <Timeline selectedClip={selectedClip} onTrimStartChange={handleTrimStartChange} onTrimEndChange={handleTrimEndChange} />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="xl:col-span-1">
            <div className="h-[600px]">
              <ToolsPanel onAddText={handleAddText} onApplyFilter={handleApplyFilter} hasVideo={clips.length > 0} />
            </div>
          </div>
        </div>
      </main>

      <input ref={videoFileInputRef} type="file" accept="video/*" onChange={handleVideoFileUpload} className="hidden" />
      <input ref={audioFileInputRef} type="file" accept="audio/*" onChange={handleAudioFileUpload} className="hidden" />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />

      <Tutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
      <CreditsModal isOpen={showCredits} onClose={() => setShowCredits(false)} />

      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => toast('Привіт, я Ozzoxiff або ж Максим Рибачук')} variant="outline" size="sm">
          About the Developer
        </Button>
      </div>
    </div>
  );
}