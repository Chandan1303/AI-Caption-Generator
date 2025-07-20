import React, { useState } from 'react';
import { Copy, Check, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CaptionDisplayProps {
  caption: string;
  isLoading: boolean;
  onRegenerate: () => void;
}

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({
  caption,
  isLoading,
  onRegenerate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-gradient-primary animate-spin flex items-center justify-center">
              <Wand2 className="w-3 h-3 text-primary-foreground" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-primary/20 rounded animate-pulse" />
              <div className="h-4 bg-primary/10 rounded animate-pulse w-3/4" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            AI is analyzing your image and generating a caption...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!caption) return null;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-accent" />
              Generated Caption
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              className="text-xs"
            >
              Regenerate
            </Button>
          </div>
          
          <div className="relative group">
            <div className="p-4 bg-background/50 rounded-lg border border-primary/10 text-foreground leading-relaxed">
              {caption}
            </div>
            <div 
              className={cn(
                "absolute inset-0 rounded-lg transition-opacity opacity-0 group-hover:opacity-100",
                "bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5"
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant={copied ? "secondary" : "glow"}
              onClick={handleCopy}
              className="transition-all duration-300"
              disabled={!caption}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Caption
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};