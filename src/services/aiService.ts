import {toast} from  'sonner';


export interface CaptionOptions {
  tone?: 'casual' | 'professional' | 'creative' | 'funny';
  length?: 'short' | 'medium' | 'long';
  includeHashtags?: boolean;
  platform?: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'general';
}


const DEFAULT_OPTIONS: CaptionOptions = {
    tone: 'creative',
    length: 'medium',
    includeHashtags: true,
    platform: 'general',
}

export class AIService {

private apiKey: string;
  private provider: 'openai' | 'google';

  constructor(apiKey: string, provider: 'openai' | 'google') {
    this.apiKey = apiKey;
    this.provider = provider;
  }

  async generateCaption(
    imageFile: File,
    options: CaptionOptions = DEFAULT_OPTIONS
  ): Promise<string> {
    try {
      if (this.provider === 'openai') {
        return await this.generateOpenAICaption(imageFile, options);
      } else {
        return await this.generateGeminiCaption(imageFile, options);
      }
    } catch (error) {
      console.error('Error generating caption:', error);
      toast.error('Failed to generate caption. Please check your API key and try again.');
      throw error;
    }
  }

  private async generateOpenAICaption(
    imageFile: File,
    options: CaptionOptions
  ): Promise<string> {
    const base64Image = await this.fileToBase64(imageFile);
    
    const prompt = this.buildPrompt(options);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Unable to generate caption.';
  }

  private async generateGeminiCaption(
    imageFile: File,
    options: CaptionOptions
  ): Promise<string> {
    const base64Image = await this.fileToBase64(imageFile);
    
    const prompt = this.buildPrompt(options);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
                {
                  inline_data: {
                    mime_type: imageFile.type,
                    data: base64Image,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate caption.'
    );
  }

  private buildPrompt(options: CaptionOptions): string {
    const { tone, length, includeHashtags, platform } = { ...DEFAULT_OPTIONS, ...options };

    let prompt = `Analyze this image and create a compelling caption for social media. `;

    switch (tone) {
      case 'casual':
        prompt += `Use a casual, friendly tone that feels conversational and relatable. `;
        break;
      case 'professional':
        prompt += `Use a professional, polished tone suitable for business contexts. `;
        break;
      case 'creative':
        prompt += `Use a creative, engaging tone with vivid descriptions and storytelling elements. `;
        break;
      case 'funny':
        prompt += `Use a humorous, witty tone that's entertaining and light-hearted. `;
        break;
    }

    switch (length) {
      case 'short':
        prompt += `Keep it concise (1-2 sentences, under 50 words). `;
        break;
      case 'medium':
        prompt += `Make it moderately detailed (2-3 sentences, 50-100 words). `;
        break;
      case 'long':
        prompt += `Create a detailed caption (3-5 sentences, 100-150 words). `;
        break;
    }

    switch (platform) {
      case 'instagram':
        prompt += `Optimize for Instagram with visual storytelling and engagement. `;
        break;
      case 'twitter':
        prompt += `Keep it concise and punchy for Twitter, under 280 characters. `;
        break;
      case 'linkedin':
        prompt += `Make it professional and suitable for LinkedIn's business audience. `;
        break;
      case 'facebook':
        prompt += `Create engaging content suitable for Facebook's diverse audience. `;
        break;
    }


    if (includeHashtags) {
      prompt += `Include 3-5 relevant hashtags at the end. `;
    } else {
      prompt += `Do not include hashtags. `;
    }

    prompt += `Focus on what makes this image special, interesting, or worth sharing. Be authentic and engaging.`;

    return prompt;
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); 
      };
      reader.onerror = reject;
    });
  }
}