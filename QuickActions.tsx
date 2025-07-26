import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { BookOpen, Share2, Map, BarChart3 } from 'lucide-react';
import { DashboardTexts } from './constants';

interface QuickActionsProps {
  texts: DashboardTexts;
  onOpenPassbook?: () => void;
  onShareJourney?: () => void;
  onSetActiveTab: (tab: string) => void;
}

export function QuickActions({ 
  texts, 
  onOpenPassbook, 
  onShareJourney, 
  onSetActiveTab 
}: QuickActionsProps) {
  return (
    <Card className="border-2 border-[#4A773C] bg-gradient-to-r from-[#F2EAD3] to-[#D7E4C0]">
      <CardHeader>
        <CardTitle className="text-[#4A773C]">{texts.quickActions}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={onOpenPassbook}
            className="bg-[#7A9D54] hover:bg-[#4A773C] text-white flex-col h-auto py-3"
          >
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs">{texts.openPassbook}</span>
          </Button>
          <Button
            onClick={onShareJourney}
            className="bg-[#C45A00] hover:bg-[#B85000] text-white flex-col h-auto py-3"
          >
            <Share2 className="h-5 w-5 mb-1" />
            <span className="text-xs">{texts.shareJourney}</span>
          </Button>
          <Button
            onClick={() => onSetActiveTab('quests')}
            className="bg-[#F9C74F] hover:bg-[#E6B800] text-[#5A3E36] flex-col h-auto py-3"
          >
            <Map className="h-5 w-5 mb-1" />
            <span className="text-xs">{texts.exploreQuests}</span>
          </Button>
          <Button
            onClick={() => onSetActiveTab('rwa')}
            className="bg-[#5A3E36] hover:bg-[#4A2A26] text-white flex-col h-auto py-3"
          >
            <BarChart3 className="h-5 w-5 mb-1" />
            <span className="text-xs">{texts.viewRWAStats}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
