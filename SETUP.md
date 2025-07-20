# AI Caption Generator 🎨✨

A modern, AI-powered web application that generates smart, engaging, and contextually relevant captions for uploaded images using OpenAI GPT-4 Vision or Google Gemini Pro Vision APIs.

## 🌟 Features

- **Smart Image Analysis**: AI analyzes visual content to understand context and emotions
- **Customizable Captions**: Generate captions with different tones (casual, professional, creative, funny)
- **Platform Optimization**: Tailor captions for Instagram, Twitter, Facebook, LinkedIn, or general use
- **Flexible Length Options**: Choose from short, medium, or long caption formats
- **Hashtag Integration**: Optionally include relevant hashtags
- **Copy to Clipboard**: Easy one-click copying for social media use
- **Drag & Drop Upload**: Intuitive image upload interface
- **Responsive Design**: Beautiful UI that works on all devices
- **Secure API Handling**: Safe storage of API keys with localStorage

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- An API key from either:
  - [OpenAI Platform](https://platform.openai.com/api-keys) (for GPT-4 Vision)
  - [Google AI Studio](https://makersuite.google.com/app/apikey) (for Gemini Pro Vision)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-caption-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔧 Configuration

### API Key Setup

Since this is a frontend-only application, API keys are stored securely in your browser's localStorage:

1. **Get your API key**:
   - **OpenAI**: Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - **Google**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)

2. **Configure in the app**:
   - Open the AI Caption Generator
   - Click on "API Configuration" card
   - Select your preferred provider (OpenAI or Google)
   - Enter your API key
   - Click "Save API Key"

### 🔒 Security Note

For production use, we recommend:
- Using [Supabase integration](https://docs.lovable.dev/supabase-integration) for secure API key storage
- Implementing server-side API calls to protect your keys
- Setting up environment variables in your deployment platform

## 📱 How to Use

1. **Configure API**: Set up your OpenAI or Google API key
2. **Customize Options**: Choose tone, length, platform, and hashtag preferences
3. **Upload Image**: Drag & drop or click to upload your image (JPG, PNG, GIF, WEBP)
4. **Generate Caption**: Click "Generate Caption" and let AI work its magic
5. **Copy & Use**: Copy the generated caption for your social media posts

## 🎨 Customization Options

### Caption Tone
- **Casual**: Friendly and conversational
- **Professional**: Polished for business contexts
- **Creative**: Engaging with storytelling elements
- **Funny**: Humorous and entertaining

### Caption Length
- **Short**: 1-2 sentences (under 50 words)
- **Medium**: 2-3 sentences (50-100 words)
- **Long**: 3-5 sentences (100-150 words)

### Platform Optimization
- **Instagram**: Visual storytelling focus
- **Twitter**: Concise and punchy (under 280 characters)
- **LinkedIn**: Professional and business-oriented
- **Facebook**: Engaging for diverse audiences
- **General**: Universal appeal

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components
- **File Upload**: React Dropzone
- **Icons**: Lucide React
- **Notifications**: Sonner
- **AI APIs**: OpenAI GPT-4 Vision / Google Gemini Pro Vision

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── ImageUpload.tsx     # Drag & drop image upload
│   ├── CaptionDisplay.tsx  # Caption results & copy functionality
│   ├── ApiKeyInput.tsx     # API key configuration
│   └── CaptionOptions.tsx  # Caption customization options
├── services/
│   └── aiService.ts        # AI API integration (OpenAI & Google)
├── pages/
│   └── Index.tsx           # Main application page
├── hooks/
│   └── use-toast.ts        # Toast notifications
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Design System

The app features a modern AI-inspired design with:
- **Colors**: Deep blues, purples, and cyan accents
- **Gradients**: Dynamic AI-themed gradients
- **Shadows**: Glowing effects and card shadows
- **Typography**: Clean, readable fonts
- **Animations**: Smooth transitions and hover effects

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for GPT-4 Vision API
- [Google](https://ai.google.dev/) for Gemini Pro Vision API
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling system
- [Lucide](https://lucide.dev/) for icons

## 💡 Future Enhancements

- [ ] Batch image processing
- [ ] Caption templates and presets
- [ ] Multi-language support
- [ ] Caption analytics and A/B testing
- [ ] Integration with social media APIs
- [ ] Image editing capabilities
- [ ] Caption history and favorites

---

**Built with ❤️ using React, TypeScript, and AI**