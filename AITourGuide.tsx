import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, X, Send, Bot, Leaf, Wheat, Coffee, MapPin, Clock, Users } from 'lucide-react';
import { Input } from './ui/input';

interface AITourGuideProps {
  language?: 'en' | 'fil';
  currentScreen?: 'home' | 'museum';
  hoveredCrop?: any;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'crop' | 'ritual' | 'tool' | 'general';
}

export function AITourGuide({ language = 'fil', currentScreen = 'home', hoveredCrop }: AITourGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Language texts
  const texts = {
    fil: {
      assistantName: 'Manong Guide',
      greeting: 'Kumusta! Ako si Manong Guide, inyong kasama sa paggalugad ng Binhi Heritage Museum. Ano ang gusto ninyong malaman?',
      placeholder: 'Magtanong tungkol sa mga binhi, kultura, o kasaysayan...',
      send: 'Ipadala',
      close: 'Isara',
      typing: 'Nagsusulat si Manong Guide...',
      quickQuestions: [
        'Ano ang Tinawon Rice?',
        'Paano ginagamit ang Siling Labuyo?',
        'Ano ang mga tradisyonal na ritwal sa pagsasaka?',
        'Paano mag-adopt ng NFT?'
      ],
      categories: {
        crop: 'Pananim',
        ritual: 'Ritwal',
        tool: 'Kasangkapan',
        general: 'Pangkalahatan'
      }
    },
    en: {
      assistantName: 'Kuya Guide',
      greeting: 'Hello! I\'m Kuya Guide, your companion in exploring the Binhi Heritage Museum. What would you like to learn about?',
      placeholder: 'Ask about seeds, culture, or history...',
      send: 'Send',
      close: 'Close',
      typing: 'Kuya Guide is typing...',
      quickQuestions: [
        'What is Tinawon Rice?',
        'How is Siling Labuyo used?',
        'What are traditional farming rituals?',
        'How do I adopt an NFT?'
      ],
      categories: {
        crop: 'Crops',
        ritual: 'Rituals',
        tool: 'Tools',
        general: 'General'
      }
    }
  };

  const t = texts[language];

  // Knowledge base for AI responses
  const knowledgeBase = {
    fil: {
      'tinawon rice': 'Ang Tinawon Rice ay isang heirloom variety na tumutubo sa mga rice terraces ng Ifugao. Ito ay itinatanim lamang isang beses sa isang taon at ginagamit sa mga seremonya. May 9 buwan ang growth cycle at may mataas na cultural significance sa mga Ifugao.',
      'siling labuyo': 'Ang Siling Labuyo ay napakatalas na sili na ginagamit sa buong Pilipinas. Natural na pesticide at antimicrobial ito. May 3-4 buwan na growth cycle at mahalagang bahagi ng Filipino cuisine.',
      'traditional farming': 'Ang mga tradisyonal na paraan ng pagsasaka sa Pilipinas ay nagsasama ng mga ritwal tulad ng pagdiriwang sa ani, paggamit ng kalabaw sa pagararo, at pakikipag-ugnayan sa kalikasan. Ang mga indigenous communities ay may mga sariling calendar para sa pagtatanim.',
      'nft adoption': 'Upang mag-adopt ng NFT sa museum, pumili ng binhi na gusto ninyo, i-click ang "Alagaan Ito", at sundin ang mga hakbang sa pagbabayad gamit ang GCash, Ethereum, o Credit Card. Ang inyong NFT ay magiging simbolo ng inyong suporta sa pagpapanatili ng endangered varieties.',
      'museum navigation': 'Maaari ninyong galugarin ang museum sa pamamagitan ng mga sections: Tahanan para sa overview, Galeri para sa mga binhi, Cultural Quest para sa mga laro, at Dashboard para sa inyong mga koleksyon.',
      'default': 'Salamat sa inyong tanong! Bilang tour guide, magtanong lang kayo tungkol sa mga pananim, kultura, kasaysayan, o kung paano gamitin ang museum.'
    },
    en: {
      'tinawon rice': 'Tinawon Rice is an heirloom variety that grows in the rice terraces of Ifugao. It\'s planted only once a year and used in ceremonies. It has a 9-month growth cycle and high cultural significance to the Ifugao people.',
      'siling labuyo': 'Siling Labuyo is a very spicy chili used throughout the Philippines. It\'s a natural pesticide and antimicrobial. It has a 3-4 month growth cycle and is an important part of Filipino cuisine.',
      'traditional farming': 'Traditional farming methods in the Philippines include rituals like harvest celebrations, using carabao for plowing, and connecting with nature. Indigenous communities have their own calendars for planting.',
      'nft adoption': 'To adopt an NFT in the museum, choose a seed you like, click "Adopt This", and follow the payment steps using GCash, Ethereum, or Credit Card. Your NFT will be a symbol of your support for preserving endangered varieties.',
      'museum navigation': 'You can explore the museum through sections: Home for overview, Gallery for seeds, Cultural Quest for games, and Dashboard for your collections.',
      'default': 'Thank you for your question! As your tour guide, feel free to ask me about crops, culture, history, or how to use the museum.'
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      // Initialize with greeting
      setMessages([{
        id: '1',
        type: 'ai',
        content: t.greeting,
        timestamp: new Date(),
        category: 'general'
      }]);
    }
  }, [language]);

  useEffect(() => {
    // Auto-suggest information when hovering over crops
    if (hoveredCrop && isOpen) {
      const cropInfo = getCropInfo(hoveredCrop.name.toLowerCase());
      if (cropInfo) {
        simulateAIResponse(cropInfo, 'crop');
      }
    }
  }, [hoveredCrop, isOpen]);

  const getCropInfo = (cropName: string): string => {
    const kb = knowledgeBase[language];
    const key = Object.keys(kb).find(k => cropName.includes(k.replace(' ', '').toLowerCase()));
    return key ? kb[key as keyof typeof kb] : '';
  };

  const simulateAIResponse = (content: string, category: 'crop' | 'ritual' | 'tool' | 'general' = 'general') => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'ai',
        content,
        timestamp: new Date(),
        category
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simple AI response logic
    const query = inputMessage.toLowerCase();
    const kb = knowledgeBase[language];
    let response = kb.default;
    let category: 'crop' | 'ritual' | 'tool' | 'general' = 'general';

    for (const [key, value] of Object.entries(kb)) {
      if (query.includes(key) || key.includes(query.split(' ')[0])) {
        response = value;
        if (key.includes('rice') || key.includes('siling') || key.includes('corn')) {
          category = 'crop';
        } else if (key.includes('ritual') || key.includes('traditional')) {
          category = 'ritual';
        } else if (key.includes('nft') || key.includes('museum')) {
          category = 'general';
        }
        break;
      }
    }

    simulateAIResponse(response, category);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-[#4A773C] to-[#7A9D54] hover:from-[#355E3B] hover:to-[#4A773C] shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow"
          >
            <Bot className="h-6 w-6 text-white" />
          </Button>
        ) : (
          <Card className="w-80 h-96 border-2 border-[#4A773C] bg-[#F2EAD3] shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
            <CardHeader className="bg-gradient-to-r from-[#4A773C] to-[#7A9D54] text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-sm font-bold">{t.assistantName}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col h-80 p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-[#4A773C] text-white'
                          : 'bg-white border border-[#D7E4C0] text-[#5A3E36]'
                      }`}
                    >
                      {message.category && message.type === 'ai' && (
                        <Badge className="mb-2 text-xs bg-[#F9C74F] text-[#5A3E36]">
                          {t.categories[message.category]}
                        </Badge>
                      )}
                      <p className="leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#D7E4C0] text-[#5A3E36] p-3 rounded-lg text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#4A773C] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#4A773C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-[#4A773C] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-[#5A3E36]/70">{t.typing}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="p-4 border-t border-[#D7E4C0]">
                  <p className="text-xs text-[#5A3E36]/70 mb-2">Quick questions:</p>
                  <div className="grid grid-cols-1 gap-1">
                    {t.quickQuestions.slice(0, 2).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-left text-xs p-2 bg-[#D7E4C0]/50 hover:bg-[#D7E4C0] rounded transition-colors text-[#4A773C]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-[#D7E4C0] bg-white/50">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t.placeholder}
                    className="flex-1 text-sm border-[#D7E4C0] focus:border-[#4A773C]"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="bg-[#4A773C] hover:bg-[#355E3B] text-white"
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
}
