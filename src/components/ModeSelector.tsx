import React from 'react';
import { HelpCircle, FileText, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProcessingMode } from './GeminiAssistant';

interface ModeSelectorProps {
  mode: ProcessingMode;
  onModeChange: (mode: ProcessingMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, onModeChange }) => {
  const modes = [
    {
      id: 'explain' as ProcessingMode,
      label: 'What Does This Mean?',
      description: 'Explain like I\'m 5',
      icon: HelpCircle
    },
    {
      id: 'summarize' as ProcessingMode,
      label: 'Summarize',
      description: '2-3 paragraphs max',
      icon: FileText
    },
    {
      id: 'shorten' as ProcessingMode,
      label: 'Make This Shorter',
      description: 'Compact version',
      icon: Minimize2
    }
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-foreground">Processing Mode</h3>
      <div className="flex flex-wrap gap-2">
        {modes.map((modeOption) => {
          const Icon = modeOption.icon;
          const isActive = mode === modeOption.id;
          
          return (
            <Button
              key={modeOption.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onModeChange(modeOption.id)}
              className="flex items-center gap-2 h-auto p-3"
            >
              <Icon className="w-4 h-4" />
              <div className="text-left">
                <div className="font-medium text-sm">{modeOption.label}</div>
                <div className="text-xs opacity-70">{modeOption.description}</div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};