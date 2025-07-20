import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string, provider: 'openai' | 'google') => void;
  currentProvider: 'openai' | 'google' | null;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  onApiKeySet,
  currentProvider,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<'openai' | 'google'>('openai');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    // Check for existing API key in localStorage
    const savedKey = localStorage.getItem('ai_caption_api_key');
    const savedProvider = localStorage.getItem('ai_caption_provider') as 'openai' | 'google';
    if (savedKey && savedProvider) {
      setApiKey(savedKey);
      setProvider(savedProvider);
      onApiKeySet(savedKey, savedProvider);
    }
  }, [onApiKeySet]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('ai_caption_api_key', apiKey.trim());
      localStorage.setItem('ai_caption_provider', provider);
      onApiKeySet(apiKey.trim(), provider);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('ai_caption_api_key');
    localStorage.removeItem('ai_caption_provider');
    setApiKey('');
    onApiKeySet('', provider);
  };

  if (currentProvider) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                {currentProvider === 'openai' ? 'OpenAI' : 'Google Gemini'} API Connected
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleClear}>
              Change API Key
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Key className="w-5 h-5 text-accent" />
          API Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            For production use, we recommend using{' '}
            <a 
              href="https://docs.lovable.dev/supabase-integration" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline inline-flex items-center gap-1"
            >
              Supabase integration
              <ExternalLink className="w-3 h-3" />
            </a>{' '}
            to securely store API keys.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">AI Provider</Label>
            <select
              id="provider"
              value={provider}
              onChange={(e) => setProvider(e.target.value as 'openai' | 'google')}
              className="w-full p-2 rounded-lg bg-background border border-input text-foreground"
            >
              <option value="openai">OpenAI (GPT-4 Vision)</option>
              <option value="google">Google Gemini </option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">
              {provider === 'openai' ? 'OpenAI API Key' : 'Google API Key'}
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={
                  provider === 'openai' 
                    ? 'sk-...' 
                    : 'AIza...'
                }
                className="pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              • Get your {provider === 'openai' ? 'OpenAI' : 'Google'} API key from:{' '}
              <a
                href={
                  provider === 'openai'
                    ? 'https://platform.openai.com/api-keys'
                    : 'https://makersuite.google.com/app/apikey'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {provider === 'openai' ? 'OpenAI Platform' : 'Google AI Studio'}
              </a>
            </p>
            <p>• Your API key is stored locally in your browser</p>
          </div>

          <Button type="submit" variant="glow" className="w-full">
            Save API Key
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};