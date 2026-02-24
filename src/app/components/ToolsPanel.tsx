import { useState } from 'react';
import { Type, Sparkles, Scissors, Palette, Volume2, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';

interface ToolsPanelProps {
  onAddText: (text: string, style: TextStyle) => void;
  onApplyFilter: (filter: string) => void;
  hasVideo: boolean;
}

export interface TextStyle {
  fontSize: number;
  color: string;
  position: { x: number; y: number };
}

export function ToolsPanel({ onAddText, onApplyFilter, hasVideo }: ToolsPanelProps) {
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(32);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const handleAddText = () => {
    if (textInput.trim()) {
      onAddText(textInput, {
        fontSize,
        color: textColor,
        position: { x: 50, y: 50 },
      });
      setTextInput('');
    }
  };

  const filters = [
    { name: 'None', value: 'none' },
    { name: 'Grayscale', value: 'grayscale(100%)' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Blur', value: 'blur(5px)' },
    { name: 'Invert', value: 'invert(100%)' },
  ];

  return (
    <div className="h-full bg-card rounded-lg border border-border p-4 overflow-y-auto">
      <h3 className="mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-primary" />
        Tools & Effects
      </h3>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="text" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Type className="w-4 h-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="filters" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Sparkles className="w-4 h-4 mr-2" />
            Filters
          </TabsTrigger>
          <TabsTrigger value="adjust" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Palette className="w-4 h-4 mr-2" />
            Adjust
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Text Content</Label>
            <Input
              placeholder="Enter text..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              disabled={!hasVideo}
              className="bg-input-background border-input"
            />
          </div>

          <div className="space-y-2">
            <Label>Font Size: {fontSize}px</Label>
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => setFontSize(value)}
              min={12}
              max={72}
              step={1}
              disabled={!hasVideo}
            />
          </div>

          <div className="space-y-2">
            <Label>Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                disabled={!hasVideo}
                className="w-20 h-10 cursor-pointer"
              />
              <Input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                disabled={!hasVideo}
                className="flex-1 bg-input-background border-input"
              />
            </div>
          </div>

          <Button
            onClick={handleAddText}
            disabled={!hasVideo || !textInput.trim()}
            className="w-full bg-primary hover:bg-primary/90 shadow-[0_0_15px_var(--neon-violet-glow)]"
          >
            Add Text to Video
          </Button>
        </TabsContent>

        <TabsContent value="filters" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.name}
                onClick={() => onApplyFilter(filter.value)}
                disabled={!hasVideo}
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="adjust" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Brightness: {brightness}%</Label>
            <Slider
              value={[brightness]}
              onValueChange={([value]) => {
                setBrightness(value);
                onApplyFilter(`brightness(${value}%) contrast(${contrast}%) saturate(${saturation}%)`);
              }}
              min={0}
              max={200}
              step={1}
              disabled={!hasVideo}
            />
          </div>

          <div className="space-y-2">
            <Label>Contrast: {contrast}%</Label>
            <Slider
              value={[contrast]}
              onValueChange={([value]) => {
                setContrast(value);
                onApplyFilter(`brightness(${brightness}%) contrast(${value}%) saturate(${saturation}%)`);
              }}
              min={0}
              max={200}
              step={1}
              disabled={!hasVideo}
            />
          </div>

          <div className="space-y-2">
            <Label>Saturation: {saturation}%</Label>
            <Slider
              value={[saturation]}
              onValueChange={([value]) => {
                setSaturation(value);
                onApplyFilter(`brightness(${brightness}%) contrast(${contrast}%) saturate(${value}%)`);
              }}
              min={0}
              max={200}
              step={1}
              disabled={!hasVideo}
            />
          </div>

          <Button
            onClick={() => {
              setBrightness(100);
              setContrast(100);
              setSaturation(100);
              onApplyFilter('none');
            }}
            disabled={!hasVideo}
            variant="outline"
            className="w-full border-primary/30 hover:border-primary hover:bg-primary/10"
          >
            Reset Adjustments
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
