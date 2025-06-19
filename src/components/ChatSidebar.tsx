import React, { useState } from 'react';
import { Plus, Trash2, MessageSquare, Key, Eye, EyeOff } from 'lucide-react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Chat } from './GeminiAssistant';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChat,
  onChatSelect,
  onNewChat,
  onDeleteChat,
  apiKey,
  onApiKeyChange
}) => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="font-semibold text-foreground">Gemini Assistant</h1>
        </div>
        
        <Button onClick={onNewChat} className="w-full" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <div className="space-y-4">
          {/* API Key Section */}
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-xs text-muted-foreground flex items-center gap-1">
              <Key className="w-3 h-3" />
              Gemini API Key
            </Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Gemini API key..."
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                className="pr-10 text-xs"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
              </Button>
            </div>
          </div>

          {/* Chat List */}
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Conversations</Label>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    isActive={activeChat === chat.id}
                    onClick={() => onChatSelect(chat.id)}
                    className="w-full justify-between group"
                  >
                    <span className="truncate text-sm">{chat.title}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-auto p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            {chats.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                No conversations yet. Create your first chat!
              </p>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};