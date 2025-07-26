import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Crown } from 'lucide-react';
import { UserStats, DashboardTexts } from './constants';
import { getLevelProgress, getNextLevelRequirement } from './helpers';

interface LevelProgressProps {
  userStats: UserStats;
  texts: DashboardTexts;
}

export function LevelProgress({ userStats, texts }: LevelProgressProps) {
  const progressPercentage = getLevelProgress(userStats);
  const xpNeeded = getNextLevelRequirement(userStats);

  return (
    <Card className="border-2 border-[#4A773C] bg-gradient-to-r from-[#F2EAD3] to-[#D7E4C0]">
      <CardHeader>
        <CardTitle className="text-[#4A773C] flex items-center space-x-2">
          <Crown className="h-5 w-5" />
          <span>{texts.level} {userStats.level}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[#5A3E36]">{texts.experience}</span>
            <span className="text-[#4A773C] font-semibold">
              {userStats.experience} / {userStats.experienceToNext} XP
            </span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-[#5A3E36]/80 text-center">
            {xpNeeded} XP {texts.xpNeeded} {userStats.level + 1}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
