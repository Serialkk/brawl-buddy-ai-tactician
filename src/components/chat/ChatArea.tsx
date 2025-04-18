
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-mobile';

type ChatMessage = {
  id: string;
  user: string;
  avatar?: string;
  content: string;
  timestamp: Date;
};

// Beispiel-Nachrichten für die Demo
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    user: 'Brawl_Master',
    avatar: '/placeholder.svg',
    content: 'Hat jemand Tipps gegen den neuen Rico-Nerf?',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '2',
    user: 'Star_Player',
    avatar: '/placeholder.svg',
    content: 'Ich würde Brawler mit hoher Gesundheit spielen, die nicht so sehr auf Reichweite angewiesen sind.',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: '3',
    user: 'BrawlFan2025',
    avatar: '/placeholder.svg',
    content: 'Ich finde den Nerf eigentlich gut balanciert. Rico war zu stark im letzten Meta.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
];

export const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('Gast_' + Math.floor(Math.random() * 1000));
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: username,
        content: newMessage,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Scroll zum neuesten Nachricht
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const ChatContent = () => (
    <div className="flex flex-col h-full">
      <div className="bg-black/50 rounded-t-lg p-3 border-b border-border">
        <h2 className="text-lg font-bold text-center text-white flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5 text-brawl-yellow" />
          Brawl Stars Community-Chat
        </h2>
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-black/30 h-[300px]" ref={scrollAreaRef as any}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-2 ${msg.user === username ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="h-8 w-8 mt-1">
                <AvatarImage src={msg.avatar} alt={msg.user} />
                <AvatarFallback className="bg-brawl-purple text-white">
                  {msg.user.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className={`max-w-[75%] ${msg.user === username ? 'bg-brawl-blue/40' : 'bg-black/40'} rounded-lg p-2`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-bold text-brawl-yellow">{msg.user}</span>
                  <span className="text-xs text-white/60">{formatTime(msg.timestamp)}</span>
                </div>
                <p className="text-sm text-white">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 bg-black/50 rounded-b-lg border-t border-border">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            {isMobile ? (
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Schreibe eine Nachricht..."
                className="bg-black/30 border-border text-white"
              />
            ) : (
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Schreibe eine Nachricht..."
                className="bg-black/30 border-border text-white min-h-[60px] max-h-[120px]"
              />
            )}
          </div>
          <Button 
            onClick={handleSendMessage}
            size="icon"
            variant="ghost"
            className="bg-brawl-purple hover:bg-brawl-purple/80 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 flex items-center gap-2">
          <User className="h-4 w-4 text-white/60" />
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Dein Benutzername"
            className="bg-transparent border-none text-white/60 text-xs h-6 p-0 focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
  
  // Für mobile Ansicht verwenden wir eine Drawer-Komponente
  if (isMobile) {
    return (
      <div className="mt-6">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full bg-black/50 border-border">
              <MessageCircle className="h-5 w-5 mr-2 text-brawl-yellow" />
              Community-Chat öffnen
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <ChatContent />
          </DrawerContent>
        </Drawer>
      </div>
    );
  }
  
  // Desktop-Ansicht
  return (
    <div className="mt-6 border border-border rounded-lg overflow-hidden shadow-lg h-[450px]">
      <ChatContent />
    </div>
  );
};
