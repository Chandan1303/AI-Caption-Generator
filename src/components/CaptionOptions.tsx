import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CaptionOptions as CaptionOptionsType } from '@/services/aiService';

interface CaptionOptionsProps {
  options: CaptionOptionsType;
  onOptionsChange: (options: CaptionOptionsType) => void;
}

export const CaptionOptions: React.FC<CaptionOptionsProps> = ({
  options,
  onOptionsChange,
}) => {
  const updateOptions = (updates: Partial<CaptionOptionsType>) => {
    onOptionsChange({ ...options, ...updates });
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5 text-accent" />
          Caption Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
     
        <div className="space-y-3">
          <Label className="text-sm font-medium">Tone</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'casual', label: 'Casual', emoji: '😊' },
              { value: 'professional', label: 'Professional', emoji: '💼' },
              { value: 'creative', label: 'Creative', emoji: '🎨' },
              { value: 'funny', label: 'Funny', emoji: '😄' },
            ].map((tone) => (
              <button
                key={tone.value}
                onClick={() => updateOptions({ tone: tone.value as any })}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  options.tone === tone.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                <span className="mr-2">{tone.emoji}</span>
                {tone.label}
              </button>
            ))}
          </div>
        </div>

       
        <div className="space-y-3">
          <Label className="text-sm font-medium">Length</Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'short', label: 'Short', desc: '1-2 sentences' },
              { value: 'medium', label: 'Medium', desc: '2-3 sentences' },
              { value: 'long', label: 'Long', desc: '3-5 sentences' },
            ].map((length) => (
              <button
                key={length.value}
                onClick={() => updateOptions({ length: length.value as any })}
                className={`p-3 rounded-lg border text-sm transition-all ${
                  options.length === length.value
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/40 hover:bg-primary/5'
                }`}
              >
                <div className="font-medium">{length.label}</div>
                <div className="text-xs text-muted-foreground">{length.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Platform</Label>
          <select
            value={options.platform}
            onChange={(e) => updateOptions({ platform: e.target.value as any })}
            className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
          >
            <option value="general">General</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Include Hashtags</Label>
            <p className="text-xs text-muted-foreground">
              Add relevant hashtags to your caption
            </p>
          </div>
          <Switch
            checked={options.includeHashtags}
            onCheckedChange={(checked) => updateOptions({ includeHashtags: checked })}
          />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>AI will customize the caption based on your preferences</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
