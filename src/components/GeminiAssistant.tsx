import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ChatSidebar } from './ChatSidebar';
import { ChatInterface } from './ChatInterface';
export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
export type ProcessingMode = 'explain' | 'summarize' | 'shorten';
export const GeminiAssistant: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  useEffect(() => {
    const savedChats = localStorage.getItem('gemini-chats');
    const savedApiKey = localStorage.getItem('gemini-api-key');    
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setChats(parsedChats);
    }
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('gemini-chats', JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    localStorage.setItem('gemini-api-key', apiKey);
  }, [apiKey]);
  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [],
      createdAt: new Date()
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };
  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
    }
  };
  const updateChat = (chatId: string, updatedChat: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, ...updatedChat } : chat
    ));
  };
  const addMessage = (chatId: string, message: Message) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, message],
            title: chat.messages.length === 0 ? message.content.slice(0, 30) + '...' : chat.title
          } 
        : chat
    ));
  };
  const currentChat = chats.find(chat => chat.id === activeChat);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
          onNewChat={createNewChat}
          onDeleteChat={deleteChat}
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
        />
        <main className="flex-1 flex flex-col">
          <ChatInterface
            chat={currentChat}
            onAddMessage={addMessage}
            apiKey={apiKey}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};