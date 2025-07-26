import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { KalikhasanTokens } from './KalikhasanTokens';
import { CulturalQuest } from './CulturalQuest';
import { RWADashboard } from './RWADashboard';
import { User, Crown, Leaf, Gamepad2, BarChart3, Trophy } from 'lucide-react';

// Dashboard sub-components
import { QuickActions } from './dashboard/QuickActions';
import { LevelProgress } from './dashboard/LevelProgress';
import { StatsGrid } from './dashboard/StatsGrid';
import { RecentActivity } from './dashboard/RecentActivity';
import { LifetimeStats } from './dashboard/LifetimeStats';
import { LeaderboardPreview } from './dashboard/LeaderboardPreview';

// Constants and types
import { UserStats, dashboardTexts } from './dashboard/constants';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onStatsUpdate: (stats: UserStats) => void;
  questProgress: { [key: string]: number };
  onQuestProgressUpdate: (provinceId: string, progress: number) => void;
  language?: 'en' | 'fil';
  onOpenPassbook?: () => void;
  onShareJourney?: () => void;
}

export function UserDashboard({ 
  isOpen, 
  onClose, 
  userStats, 
  onStatsUpdate,
  questProgress,
  onQuestProgressUpdate,
  language = 'fil',
  onOpenPassbook,
  onShareJourney
}: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const texts = dashboardTexts[language];

  const handleBadgeEarned = (badge: string) => {
    onStatsUpdate({
      ...userStats,
      badges: [...userStats.badges, badge],
      tokens: userStats.tokens + 1,
      experience: userStats.experience + 50
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden border-2 border-[#4A773C] bg-[#FFF8E1]">
        <DialogHeader>
          <DialogTitle className="text-[#4A773C] flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{texts.title}</span>
          </DialogTitle>
          <DialogDescription className="text-[#5A3E36]/80">
            {texts.description}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-[#E8F5E9]">
            <TabsTrigger value="overview" className="text-[#4A773C] data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
              <Crown className="h-4 w-4 mr-1" />
              {texts.overview}
            </TabsTrigger>
            <TabsTrigger value="tokens" className="text-[#4A773C] data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
              <Leaf className="h-4 w-4 mr-1" />
              {texts.tokensAndBadges}
            </TabsTrigger>
            <TabsTrigger value="quests" className="text-[#4A773C] data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
              <Gamepad2 className="h-4 w-4 mr-1" />
              {texts.culturalQuests}
            </TabsTrigger>
            <TabsTrigger value="rwa" className="text-[#4A773C] data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-1" />
              {texts.rwaDashboard}
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-[#4A773C] data-[state=active]:bg-[#4A773C] data-[state=active]:text-white">
              <Trophy className="h-4 w-4 mr-1" />
              {texts.achievements}
            </TabsTrigger>
          </TabsList>

          {/* Fixed height container for all tab content */}
          <div className="h-[70vh] overflow-y-auto mt-4">
            <TabsContent value="overview" className="space-y-4 h-full">
              <QuickActions 
                texts={texts}
                onOpenPassbook={onOpenPassbook}
                onShareJourney={onShareJourney}
                onSetActiveTab={setActiveTab}
              />
              
              <LevelProgress userStats={userStats} texts={texts} />
              
              <StatsGrid userStats={userStats} questProgress={questProgress} />
              
              <RecentActivity texts={texts} language={language} />
            </TabsContent>

            <TabsContent value="tokens" className="h-full">
              <div className="h-full">
                <KalikhasanTokens 
                  userStats={userStats} 
                  onStatsUpdate={onStatsUpdate}
                />
              </div>
            </TabsContent>

            <TabsContent value="quests" className="h-full">
              <div className="h-full">
                <CulturalQuest
                  userProgress={questProgress}
                  onProgressUpdate={onQuestProgressUpdate}
                  onBadgeEarned={handleBadgeEarned}
                />
              </div>
            </TabsContent>

            <TabsContent value="rwa" className="h-full">
              <div className="h-full">
                <RWADashboard language={language} />
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4 h-full">
              <LifetimeStats 
                userStats={userStats} 
                questProgress={questProgress}
                texts={texts}
              />
              
              <LeaderboardPreview userStats={userStats} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
