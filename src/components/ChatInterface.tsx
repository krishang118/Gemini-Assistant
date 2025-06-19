import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Chat, Message, ProcessingMode } from './GeminiAssistant';
import { ModeSelector } from './ModeSelector';
import { MessageBubble } from './MessageBubble';

interface ChatInterfaceProps {
  chat: Chat | undefined;
  onAddMessage: (chatId: string, message: Message) => void;
  apiKey: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  chat,
  onAddMessage,
  apiKey
}) => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<ProcessingMode>('explain');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);

  const getModePrompt = (mode: ProcessingMode, text: string) => {
    switch (mode) {
      case 'explain':
        return `Please explain the following text in simple terms, as if explaining to a 5-year-old. Make it clear and easy to understand:\n\n${text}`;
      case 'summarize':
        return `Please provide a concise summary of the following text in 2-3 paragraphs maximum:\n\n${text}`;
      case 'shorten':
        return `Please make the following text more compact and shorter while preserving the key information:\n\n${text}`;
    }
  };

  const callGeminiAPI = async (prompt: string): Promise<string> => {
    if (!apiKey) {
      throw new Error('Please enter your Gemini API key first');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.8,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !chat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    onAddMessage(chat.id, userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = getModePrompt(mode, input.trim());
      const response = await callGeminiAPI(prompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      onAddMessage(chat.id, assistantMessage);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from Gemini"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Welcome to Gemini Assistant</h2>
            <p className="text-muted-foreground">Create a new chat to get started</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <div className="border-b border-border p-4">
        <ModeSelector mode={mode} onModeChange={setMode} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card rounded-lg p-4 max-w-3xl">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing your request...
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            className="min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button 
            type="submit" 
            size="sm" 
            disabled={!input.trim() || isLoading}
            className="self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};