import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Loader2, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
}

const SymptomChecker = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI health assistant. Please describe your symptoms, and I'll try to provide some preliminary guidance. Remember, this is not a substitute for professional medical advice.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: '1', text: 'I have a headache and fever' },
    { id: '2', text: 'My throat hurts when I swallow' },
    { id: '3', text: 'I feel dizzy when standing up' },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let response: Message;

      // Mock AI responses based on keywords
      if (inputValue.toLowerCase().includes('headache')) {
        response = {
          id: Date.now().toString(),
          content: "Headaches can be caused by various factors including stress, dehydration, lack of sleep, or more serious conditions. If you're also experiencing fever, it could be a sign of infection. I recommend staying hydrated, resting, and taking over-the-counter pain relievers if appropriate. If symptoms persist for more than 48 hours or are severe, please consult a healthcare professional.",
          sender: 'ai',
          timestamp: new Date(),
        };
      } else if (inputValue.toLowerCase().includes('throat')) {
        response = {
          id: Date.now().toString(),
          content: 'A sore throat can be a symptom of viral infections like the common cold or flu, bacterial infections like strep throat, or allergies. Try gargling with warm salt water, staying hydrated, and using throat lozenges for temporary relief. If you have difficulty swallowing, high fever, or the pain is severe, please consult a healthcare professional.',
          sender: 'ai',
          timestamp: new Date(),
        };
      } else if (inputValue.toLowerCase().includes('dizzy')) {
        response = {
          id: Date.now().toString(),
          content: 'Dizziness can be caused by inner ear problems, low blood pressure, dehydration, or medication side effects. If you feel dizzy when standing up, it might be orthostatic hypotension. Try standing up slowly and staying hydrated. If dizziness is severe, persistent, or accompanied by other symptoms like chest pain or severe headache, seek medical attention immediately.',
          sender: 'ai',
          timestamp: new Date(),
        };
      } else {
        response = {
          id: Date.now().toString(),
          content: 'Thank you for sharing your symptoms. Based on the information provided, I recommend monitoring your condition and resting. If symptoms worsen or persist for more than a few days, please consult a healthcare professional for proper diagnosis and treatment. Is there anything specific you\'d like to know about your symptoms?',
          sender: 'ai',
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsLoading(false);

      // Update suggestions based on the conversation
      setSuggestions([
        { id: '1', text: 'How long should I wait before seeing a doctor?' },
        { id: '2', text: 'What over-the-counter medications might help?' },
        { id: '3', text: 'Could this be something serious?' },
      ]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">AI Symptom Checker</h2>
          <p className="text-muted-foreground">
            Describe your symptoms for preliminary guidance
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 flex items-center gap-1">
          <Brain className="h-3 w-3" />
          AI Powered
        </Badge>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="h-5 w-5 text-health-500" />
            Health Assistant
          </CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">
                This is not a substitute for professional medical advice
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'ai' ? (
                      <Bot className="h-4 w-4 text-health-500" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    <span className="text-xs opacity-70">
                      {message.sender === 'ai' ? 'Health Assistant' : 'You'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-health-500" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-xs opacity-70">Analyzing symptoms...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="space-y-3">
            {!isLoading && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="text-xs"
                  >
                    {suggestion.text}
                  </Button>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your symptoms..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;