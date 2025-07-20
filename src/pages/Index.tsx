import React, { useState } from 'react';
import { Sparkles, Wand2, Brain, Zap } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';
import { CaptionDisplay } from '@/components/CaptionDisplay';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { CaptionOptions } from '@/components/CaptionOptions';
import { AIService, CaptionOptions as CaptionOptionsType } from '@/services/aiService';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [provider, setProvider] = useState<'openai' | 'google' | null>(null);
  const [captionOptions, setCaptionOptions] = useState<CaptionOptionsType>({
    tone: 'creative',
    length: 'medium',
    includeHashtags: true,
    platform: 'general',
  });

  const handleApiKeySet = (key: string, selectedProvider: 'openai' | 'google') => {
    setApiKey(key);
    setProvider(key ? selectedProvider : null);
  };

  const handleImageUpload = (file: File) => {
    setUploadedImage(file);
    setCaption(''); // Clear previous caption
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setCaption('');
  };

  const generateCaption = async () => {
    if (!uploadedImage || !apiKey || !provider) {
      toast.error('Please upload an image and configure your API key');
      return;
    }

    setIsLoading(true);
    try {
      const aiService = new AIService(apiKey, provider);
      const generatedCaption = await aiService.generateCaption(uploadedImage, captionOptions);
      setCaption(generatedCaption);
      toast.success('Caption generated successfully!');
    } catch (error) {
      console.error('Error generating caption:', error);
      toast.error('Failed to generate caption. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI Caption Generator
              </h1>
              <p className="text-sm text-muted-foreground">
                Transform your images into engaging captions with AI
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Features Banner */}
          <Card className="mb-8 bg-gradient-secondary border-0 shadow-glow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                  <h3 className="font-semibold text-primary-foreground">Smart Analysis</h3>
                  <p className="text-sm text-primary-foreground/80">
                    AI analyzes your images to understand context and emotions
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Wand2 className="w-8 h-8 text-primary-foreground" />
                  <h3 className="font-semibold text-primary-foreground">Custom Captions</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Generate captions tailored to your tone and platform
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                  <h3 className="font-semibold text-primary-foreground">Instant Results</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Get engaging captions in seconds, ready to copy and use
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload & Options */}
            <div className="lg:col-span-1 space-y-6">
              {/* API Key Configuration */}
              <ApiKeyInput
                onApiKeySet={handleApiKeySet}
                currentProvider={provider}
              />

              {/* Caption Options */}
              <CaptionOptions
                options={captionOptions}
                onOptionsChange={setCaptionOptions}
              />
            </div>

            {/* Right Column - Image Upload & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Upload */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
                <CardContent className="p-6">
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    uploadedImage={uploadedImage}
                    onClearImage={handleClearImage}
                    isLoading={isLoading}
                  />
                  
                  {uploadedImage && provider && (
                    <div className="mt-6 flex justify-center">
                      <Button
                        variant="glow"
                        onClick={generateCaption}
                        disabled={isLoading}
                        className="px-8 py-3 text-base"
                      >
                        {isLoading ? (
                          <>
                            <Wand2 className="w-5 h-5 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate Caption
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Caption Display */}
              <CaptionDisplay
                caption={caption}
                isLoading={isLoading}
                onRegenerate={generateCaption}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            Powered by AI • Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
